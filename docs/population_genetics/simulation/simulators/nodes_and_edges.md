---
sidebar_position: 1
---

# Nodes and edges

In our [previous Wright Fisher model](../genetic_drift/) we saved haplotypes as numbers in a
matrix of _generations_ × _population_size_. However, it's more flexible to save a flat list
of individuals, regardless of which generation each is from. So we'll recode the model to:

* Store every "individual" as a unique numbered **node**, each is a row in a "nodes" object. The most important value in the row is the *time* of birth (i.e the generation); for display purposes we'll also save an arbitrary *align* value, to separate the nodes when plotting
* Record ancestry using a *pair* of numbers, the parent node ID and the child node ID. Each (parent, child) pair is known as an **edge**, and stored as a row in an "edges" object.

Also, we won't bother storing haplotypes for each node (we can work them out using the ancestry).


To show you that nothing "magic" is going on, here's some code, wrapped in a single function `WFsimulation`.
The R and Python code is almost line-by-line identical, other than R indexing from 1..N and Python indexing from 0..N-1.
To make the simulation repeatable, we'll also allow a random_seed to be specified.


<div className="r-py-columns">

```r
WFsimulation <- function(N, G, random_seed = NULL) {
    if (!is.null(random_seed)) set.seed(random_seed)
    # Allocate matrix to store N*(G+1) nodes; each node is a row
    nodes = matrix(NA, nrow=N * ( G + 1 ), ncol = 2)
    colnames(nodes) = c("align", "time")
    # Allocate matrix to store N*G edges; each edge is a row
    edges = matrix(NA_integer_, nrow=N * G, ncol = 2)
    colnames(edges) = c("parent", "child")
    
    parents = 1:N  # initial generation at time 0
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
    # Allocate array to store N*(G+1) nodes; each node is a row
    nodes = np.empty((N * (G + 1), 2))
    ALIGN, TIME = 0, 1  # shorthand to index first and second col
    # Allocate array to store N*G edges; each edge is a row
    edges = np.empty((N * G, 2), dtype=int)
    PARENT, CHILD = 0, 1 # shorthand to index first and second col

    parents = np.arange(N)  # initial generation at time 0
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

Saving each node as a unique row is very flexible: for example, we can allow difference population sizes each generation. Similarly, saving each inheritance link as a (parent, child) edge will help when we stert modeling inheritance from 2 parents.

Running a simulation is the same in either R or Python

<div className="r-py-columns">

```r
result = WFsimulation(20, 50, random_seed=42)
```
```python
result = WFsimulation(20, 40, random_seed=42)
```
</div>

Let's just check that it give the same sort of results as the previous inheritance-tracing example. Plotting is fairly easy because each node is a point: we can plot `time` on the Y axis and `align` on the X. Note that the way R and Python plot lines is quite different (no need to memorize those details!).


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
In that case we can find the lineages that trace backward from the current generation,
and plot them in a different colour.

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

The code above is written as a function, `plot_nodes_and_edges()`, in the `simulation_and_visualisation` file. Additionally, to make the plot a little more like a conventional tree, we've made a `realign_nodes()` function available
which adjusts the "align" value to make the surviving lineages line up a bit better.

<div className="r-py-columns">

```r
source( "simulation_and_visualisation.R" )

layout( matrix( 1:2, ncol = 2 ), widths = c(1, 1.5))
realigned_nodes = realign_nodes(result$nodes, result$edges)
plot_nodes_and_edges(result$nodes, result$edges)
plot_nodes_and_edges(realigned_nodes, result$edges)
```
```python
from simulation_and_visualisation import (
  realign_nodes, plot_nodes_and_edges
)
realigned_nodes = realign_nodes(nodes, edges, "original")
plot_nodes_and_edges(realigned_nodes, edges, "realigned")
```
</div>

![img](../solutions/nodes_and_edges.png)

