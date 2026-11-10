---
sidebar_position: 3
---

# Saving ancestry using tskit

If we want to scale up our simulations to store and analyse millions of
individual genomes we need something more sophisticated than allocating
all the nodes and edges at the start. Instead, we'll use the
[tskit](https://tskit.dev/tskit/docs) library.
You can think of this as a slightly more sophisticated way to
store *nodes* and *edges* (and haplotypes too, which we'll come to later).


Although the _tskit_ library can be used from R, it's much more natural
to use its [Python interface](https://tskit.dev/tskit/docs/stable/python-api.html),
so we'll only use Python code from hereon. Using _tskit_ actually makes the code
simpler: we just store the nodes as rows in a "nodes table", and the edges as rows in
an "edges table". We can create the empty tables by calling
`tables = tskit.TableCollection(L)`, where L is the length of the genome we are
simulating. For simplicity, we'll assume this corresponds to a single chromomsome or
part of a chromosome.

```python
import numpy as np

def add_ancestry(edges, child_id, parent_ids, rng):
    edges.add_row(
        left=0, right=chrom_length,
        parent=rng.choice(parent_ids), child=child_id,
    )   

def WFsimulation(N, G, chrom_length, random_seed=None):
    rng = np.random.default_rng(random_seed)
    tables = tskit.TableCollection(chrom_length)
    flags = tskit.NODE_IS_SAMPLE
    parent_ids = [tables.nodes.add_row(flags, time=G) for _ in range(N)]

    for g in tqdm(reversed(range(G))):
        child_ids = [tables.nodes.add_row(flags, time=g) for _ in range(N)]
        for child in child_ids:
            add_ancestry(tables.edges, child, parent_ids, rng)
        parent_ids = child_ids

    tables.sort()
    return tables.tree_sequence()
```

As well as accessing the nodes using `tables.nodes` and the edges using `tables.edges`,
there are a few other changes:
* We add nodes to the node table one-by-one, using the
`add_row()` method. This requires specifying a `time`, and another variable called `flags` (which we'll return to later). When `nodes.add_row()` is called, it returns the ID of
the added node, adn the code above uses a Python
[list comprehension](https://docs.python.org/3/tutorial/datastructures.html#list-comprehensions) to create a list of all the added node IDs. 
* When we add an edge, we give it a `left` and a `right` value, which defines the *span* of genome that is inherited. The code above 
the span covers the 
Finally, the more eagle eyed
among you might notice that we have reversed the meaning of `time`: the oldest
nodes are at time G, and the youngest at time 0. One easy way to think of this is that
time measures "generations ago".

Finally (and perhaps most importantly), instead of return the tables directly,
we `sort()` them (which puts the edges in a standard order), and turn the tables into
a **succinct tree sequence** (or "tree sequence" for short).
You can think of a tree sequence as a set of sanity-checked tables
(for instance, we check that parent nodes are always older than their children). 

If the tables can be turned into a tree sequence, we know that they describe a valid
ancestry. Tskit gives some nice ways of plotting the data

<div className="r-py-columns">

```r
nodes = result$nodes
edges = result$edges
nodes_align = nodes[, "align"]
nodes_time = nodes[, "time"]
edges_parent = result$edges[, "parent"]
edges_child = result$edges[, "child"]

plot(nodes, type="n", ylim = c(max(nodes_time), 0))
segments(
    nodes_align[edges_parent], nodes_time[edges_parent],
    nodes_align[edges_child], nodes_time[edges_child],
    col = "grey85"
)
points(nodes, pch = 16, cex=0.5)  # plot points on top

```
```python
import matplotlib.pyplot as plt
from matplotlib.collections import LineCollection

nodes, edges = result  # unpack the result
nodes_align, nodes_time = nodes.T 
edges_parent, edges_child = edges.T

fig, ax = plt.subplots(figsize=(20, 20))

ax.add_collection(LineCollection(nodes[edges], colors="0.85"))
ax.scatter(nodes_align, nodes_time, s=8, color="black", zorder=2)
ax.invert_yaxis()

# Assuming this is in a jupyter notebook, show the figure
display(fig)
plt.close(fig)
```
</div>

Often we are only interested in the ancestry of the individuals in the current generation.
In that case we can plot the edges backwards from the current generation in a different colour.
We'll wrap the previous plotting routine in a reuseable function that does this:

<div className="r-py-columns">

```r
surviving_lineages = function(nodes, edges) {
    # return an array denoting the nodes that are ancestral
    # to those in the last generation
    use = nodes[, "time"] == max(nodes[, "time"])

    for (j in rev(seq_len(nrow(edges)))) {
        if (use[edges[j, "child"]])
            use[edges[j, "parent"]] = TRUE
    }
    use
}

ancestral_nodes = surviving_lineages(nodes, edges)
use_edge = ancestral_nodes[edges[, "child"]]
segments(
    nodes_align[edges_parent[use_edge]], nodes_time[edges_parent[use_edge]],
    nodes_align[edges_child[use_edge]], nodes_time[edges_child[use_edge]],
    col = "red"
)
```
```python
def surviving_lineages(nodes, edges):
    # Find nodes ancestral to the final generation
    # The assumes edges are in oldest to youngest order
    nodes_time = nodes[:, 1]
    use = (nodes_time == nodes_time.max())

    for edge in reversed(edges):
        if use[edge[1]]:
            use[edge[0]] = True

    return use

ancestral_nodes = surviving_lineages(nodes, edges)
use_edge = ancestral_nodes[edges_child]
ax.add_collection(LineCollection(nodes[edges[use_edge]], colors="red"))
# Assuming this is in a jupyter notebook, re-show the figure
display(fig)
plt.close(fig)
```
</div>

To make the plot a little more like a conventional tree, we've made a `realign_nodes()` function available
which adjusts the "align" value to make the surviving lineages line up a bit better.




-----

All this has been a prelude to the main point of this practical, which is to introduce a special
softare library that makes all this easy. It's called "tskit" (pronouced "T S kit"), and it takes care of 


<div className="r-py-columns">

```r
WFsimulation <- function(N, G, random_seed = NULL) {
    if (!is.null(random.seed)) set.seed(random.seed)
    # Preallocate storage for num.nodes = N * ( G + 1 )
    nodes = matrix(NA, nrow=N * ( G + 1 ), ncol = 2)
    colnames(nodes) = c("align", "time")
    # Preallocate storage for num.edges = N * G   
    edges = matrix(NA_integer_, nrow=N * G, ncol = 2)
    colnames(edges) = c("parent", "child")
    
    parents = 1:N
    nodes[parents, ] = cbind(align = seq_len(N), time = 0)

    for (generation in 1:G) {
        children = max(parents) + seq_len(N)
        nodes[children, 'time'] = generation
        
        edges[parents, ] = cbind(
            parent=sample(parents, N, replace = TRUE ), child=children)

        # For plotting, order children by their parents' alignment position
        nodes[children, 'align'] = rank(
            nodes[edges[parents, "parent"], "align"], ties.method = "first")

        parents = children
    }
    return(list(nodes=nodes, edges=edges))
}
```
```python
import numpy as np
from scipy.stats import rankdata  # equivalent of R's rank()

def WFsimulation(N, G, random_seed=None):
    rng = np.random.default_rng(random_seed)
    # Preallocate storage for num_nodes = N * (G + 1)
    nodes = np.empty((N * (G + 1), 2))
    ALIGN, TIME = 0, 1  # shorthand: first and second col index
    # Preallocate storage for num.edges = N * G   
    edges = np.empty((N * G, 2), dtype=int)
    PARENT, CHILD = 0, 1 # shorthand: first and second col index

    parents = np.arange(N)
    nodes[parents, ALIGN], nodes[parents, TIME] = np.arange(1, N+1), 0

    for generation in range(1, G+1):
        children = parents.max() + np.arange(1, N+1)
        nodes[children, TIME] = generation

        edges[parents] = np.column_stack((
            rng.choice(parents, N, replace=True), children))

        # For plotting, order children by their parents' align value
        nodes[children, ALIGN] = rankdata(
            nodes[edges[parents, PARENT], ALIGN], method="ordinal")

        parents = children

    return nodes, edges
```
</div>