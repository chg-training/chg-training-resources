import numpy as np
import matplotlib.pyplot as plt
from matplotlib.collections import LineCollection


def simulatePopulation(L, N, G, H=10, initial_frequency=0.2):
    # Generate the starting haplotypes
    haplotypes = np.random.binomial(1, p=initial_frequency, size=(H, L))

    # Each individual carries one of the starting haplotypes
    population = np.empty((G, N), dtype=int)
    population[0] = np.random.choice(H, size=N, replace=True)

    # Evolve the population by randomly sampling parents
    for generation in range(1, G):
        parents = np.random.choice(N, size=N, replace=True)
        population[generation] = population[generation-1, parents]

    return {
        "L": L, "H": H, "N": N, "G": G,
        "haplotypes": haplotypes,
        "population": population
    }


def compute_haplotype_frequencies(population, haplotypes):
    G, N = population.shape
    H = haplotypes.shape[0]
    result = np.empty((G, H))

    for i in range(G):
        current_generation = population[i]
        for h in range(H):
            result[i, h] = np.sum(current_generation == h) / N

    return result


def compute_variant_frequencies(population, haplotypes):
    G, N = population.shape
    L = haplotypes.shape[1]
    result = np.empty((G, L))

    for i in range(G):
        current_generation = haplotypes[population[i]]
        result[i] = np.sum(current_generation, axis=0) / N

    return result


def compute_ld(haplotypes):
    with np.errstate(divide="ignore", invalid="ignore"):
        return np.corrcoef(haplotypes.T)


def plot_haplotypes(haplotypes, title=None, ax=None):
    if ax is None:
        fig, ax = plt.subplots()

    colormap_used_by_R = "YlOrRd"
    ax.imshow(
        haplotypes,
        cmap=colormap_used_by_R,
        vmin=0, vmax=1,
        aspect="auto",
        interpolation="nearest",
    )
    ax.set(xlabel="variant", ylabel="haplotype", title=title)
    ax.set_xticks(np.arange(haplotypes.shape[1]))
    ax.tick_params(axis="x", pad=1)
    ax.set_xticklabels(
        np.arange(haplotypes.shape[1]),
        rotation=90,
        va="top",
    )
    return ax


def plot_ld(haplotypes, ax=None):
    if ax is None:
        fig, ax = plt.subplots()

    colormap = plt.colormaps["autumn_r"].with_extremes(
        under="lightgrey", bad="white"
    )
    r = compute_ld(haplotypes)

    ax.imshow(
        r**2,
        cmap=colormap,
        vmin=0.1, vmax=1,
        origin="lower",
        interpolation="nearest"
    )
    ax.set(xlabel="variant", ylabel="variant")
    return ax


def plotSimulation(sim, G=None):
    if G is None:
        G = sim["G"]

    if not 1 <= G <= sim["G"]:
        raise ValueError("G must be between 1 and the number of simulated generations")

    population = sim["population"]
    haplotypes = sim["haplotypes"]

    # Make a multi-panel plot
    fig, axes = plt.subplots(3, 2, figsize=(8, 12))

    # Summarise the simulation parameters
    fig.suptitle(
        f"Variants (L) = {sim['L']}    "
        f"Haplotypes (H) = {sim['H']}    "
        f"Individuals (N) = {sim['N']}\n"
        f"Generations (G) = {sim['G']}    "
        f"Plotting to generation {G}"
    )

    # Plot starting and ending haplotypes
    first = population[0]
    last = population[G-1]

    plot_haplotypes(
        haplotypes[first],
        f"1st generation ({len(np.unique(first))} segregating haplotypes)",
        axes[0, 0]
    )

    plot_haplotypes(
        haplotypes[last],
        f"Generation {G} ({len(np.unique(last))} segregating haplotypes)",
        axes[1, 0]
    )

    # Compute haplotype and variant frequencies
    haplotype_frequencies = compute_haplotype_frequencies(
        population, haplotypes
    )
    variant_frequencies = compute_variant_frequencies(
        population, haplotypes
    )

    generations = range(1, G+1)

    # Plot haplotype frequency evolution
    colours = plt.cm.rainbow(np.linspace(0, 1, sim["H"]))

    for h in range(sim["H"]):
        axes[0, 1].plot(
            generations,
            haplotype_frequencies[:G, h],
            color=colours[h]
        )

    axes[0, 1].set(
        title="Haplotype frequency evolution",
        xlabel="Generations",
        ylabel="Haplotype frequencies",
        xlim=(1, sim["G"]),
        ylim=(0, 1)
    )
    axes[0, 1].grid()

    # Plot variant frequency evolution
    colours = plt.cm.rainbow(np.linspace(0, 1, sim["L"]))

    for l in range(sim["L"]):
        axes[1, 1].plot(
            generations,
            variant_frequencies[:G, l],
            color=colours[l]
        )

    axes[1, 1].set(
        title="Variant frequency evolution",
        xlabel="Generations",
        ylabel="Variant frequencies",
        xlim=(1, sim["G"]),
        ylim=(0, 1)
    )
    axes[1, 1].grid()

    # Plot LD at the starting and ending generations
    plot_ld(haplotypes[first], axes[2, 0])
    axes[2, 0].set_title("LD ($r^2$) at starting generation")

    plot_ld(haplotypes[last], axes[2, 1])
    axes[2, 1].set_title(f"LD ($r^2$) at generation {G}")

    fig.tight_layout(rect=(0, 0, 1, 0.93))


def surviving_lineages(nodes, edges):
    # Find nodes ancestral to the final generation
    # The assumes edges are in oldest to youngest order
    nodes_time = nodes[:, 1]
    use = (nodes_time == nodes_time.max())

    for edge in reversed(edges):
        if use[edge[1]]:
            use[edge[0]] = True

    return use

def realign_nodes(nodes, edges, spread=0.1):
    """Realign extinct nodes around surviving lineages for plotting.

    ``nodes`` has columns ``align`` and ``time``. Edge parent and child values
    are zero-based row indices into ``nodes``.
    """
    if not np.isscalar(spread) or not np.isfinite(spread) or not 0 <= spread <= 1:
        raise ValueError("spread must be a finite number between 0 and 1")

    nodes = np.array(nodes, copy=True)
    ids = np.arange(nodes.shape[0])
    original_align = nodes[:, 0].copy()
    align = original_align.copy()
    times = nodes[:, 1]
    live = surviving_lineages(nodes, edges)
    generations = np.sort(np.unique(times))[::-1]
    N = np.count_nonzero(times == times.min())

    # Group child IDs by parent, corresponding to the R split() call.
    kids = {}
    for parent, child in edges:
        kids.setdefault(parent, []).append(child)

    # Move surviving ancestors toward the mean position of their surviving
    # children, processing from the final generation back toward the past.
    for generation in generations[:-1]:
        generation_ids = ids[times == generation]
        for parent in generation_ids[live[generation_ids]]:
            children = np.asarray(kids.get(parent, []), dtype=int)
            if children.size == 0:
                continue
            children = children[live[children]]
            if children.size == 0:
                continue

            centre = np.mean(align[children])
            align[parent] = (1 - spread) * centre + spread * original_align[parent]

    # Put non-lineage nodes between lineage positions in their original
    # left-to-right order. The end gaps extend to positions 1 and N.
    for generation in generations:
        generation_ids = ids[times == generation]
        generation_ids = generation_ids[
            np.lexsort((generation_ids, original_align[generation_ids]))
        ]
        live_ids = generation_ids[live[generation_ids]]
        extinct_ids = generation_ids[~live[generation_ids]]

        if extinct_ids.size == 0:
            continue
        if live_ids.size == 0:
            align[generation_ids] = np.linspace(1, N, generation_ids.size)
            continue

        rank = np.empty(nodes.shape[0], dtype=int)
        rank[generation_ids] = np.arange(generation_ids.size)
        live_rank = rank[live_ids]
        extinct_rank = rank[extinct_ids]
        boundaries = np.concatenate(([ -1 ], live_rank, [generation_ids.size]))
        boundary_x = np.concatenate(([1.0], align[live_ids], [float(N)]))

        for k in range(boundaries.size - 1):
            left_rank, right_rank = boundaries[k:k + 2]
            gap_ranks = extinct_rank[
                (extinct_rank > left_rank) & (extinct_rank < right_rank)
            ]
            if gap_ranks.size == 0:
                continue

            positions = np.linspace(
                boundary_x[k], boundary_x[k + 1], gap_ranks.size + 2
            )[1:-1]
            align[generation_ids[gap_ranks]] = positions

    nodes[:, 0] = align
    return nodes

def plot_nodes_and_edges(nodes, edges, ax=None, title="", label_mrca=False):
    if ax is None:
        fig, ax = plt.subplots(figsize=(10, 10))
    nodes_align, nodes_time = nodes.T 
    edges_parent, edges_child = edges.T
    ancestral_nodes = surviving_lineages(nodes, edges)
    use_edge = ancestral_nodes[edges_child]
    ax.add_collection(LineCollection(nodes[edges], colors="0.85"))
    ax.add_collection(LineCollection(nodes[edges[use_edge]], colors="blue", linewidths=2))
    ax.scatter(nodes_align, nodes_time, s=8, color="black", zorder=2)
    ax.set(ylabel="time", xticks=[], ylim=[max(nodes_time)+1, -1], title=title)

    # Optionally label the MRCA
    if label_mrca:
        # find the times that have only one ancestral node
        _, idx, counts = np.unique(
            nodes_time[ancestral_nodes], return_counts=True, return_index=True)
        mrca_id = np.where(ancestral_nodes)[0][max(idx[counts == 1])]
        ax.text(*nodes[mrca_id,:], f"\nMRCA\nnode\n#{mrca_id}", ha="center", va="top", linespacing=0.8)

    return ax
