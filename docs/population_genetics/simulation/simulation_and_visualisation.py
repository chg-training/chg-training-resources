import numpy as np
import matplotlib.pyplot as plt


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
