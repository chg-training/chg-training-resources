---
sidebar_position: 3
---

# Saving ancestry in tskit

If we want to scale up our simulations to store and analyse millions of
individual genomes we need something more sophisticated than allocating
all the nodes and edges at the start. Instead, we'll use the
[tskit](https://tskit.dev/tskit/docs) library.
You can think of this as a slightly more sophisticated way to
store *nodes* and *edges* (and haplotypes too, which we'll come to later).


Although _tskit_ can be used from R, it's much more natural
to use its [Python interface](https://tskit.dev/tskit/docs/stable/python-api.html),
so we'll switch to only show Python code. Fortunately, _tskit_ actually makes the code
simpler: we just store the nodes as rows in a "nodes table", and the edges as rows in
an "edges table". 

A few more things to note. For future extensions, choosing parents and saving edges
is spun off into its own simple 2-line function, `add_ancestry()`,
and the empty tables are created by calling `tables = tskit.TableCollection(L)`.
Here, L is the length of the genome we are simulating, which for simplicity we'll
assume to be a single chromomsome. Also we wrap the per-generation loop in a call
to `tqdm()` which should give us a nice progressbar for long-running simulations -
that will come in handy later. We'll call the _tskit_ version `simForwardWF()` to
distinguish it from the more basic `WFsimulation()` on the previous page.

```python
import numpy as np
import tskit
from tqdm.auto import tqdm  # this is used to make a progressbar 

def add_ancestry(edges, child_id, parent_ids, L, rng):
    # link children to one random parent: we can modify this later  
    parent_id = rng.choice(parent_ids) # select a single parent
    edges.add_row(parent=parent_id, child=child_id, left=0, right=L)

def simForwardWF(N, G, chrom_length, show_progressbar=False, random_seed=None):
    rng = np.random.default_rng(random_seed)
    tables = tskit.TableCollection(chrom_length)
    tables.time_units="generations"  # optional
    flags = tskit.NODE_IS_SAMPLE
    parent_ids = [tables.nodes.add_row(flags, time=G) for _ in range(N)]

    for g in tqdm(reversed(range(G)), total=G, disable=not show_progressbar):
        child_ids = [tables.nodes.add_row(flags, time=g) for _ in range(N)]
        for child in child_ids:
            add_ancestry(tables.edges, child, parent_ids, chrom_length, rng)
        parent_ids = child_ids

    tables.sort()
    return tables.tree_sequence()
```

As well as accessing the nodes using `tables.nodes` and the edges using `tables.edges`,
you'll see a few other novelties:
* The `add_row()` method is used to add nodes to the node table one-by-one. We specify a `time` and another variable called `flags` (which we'll return to shortly).
* When `nodes.add_row()` is called, it returns the ID of
the added node: the code uses a Python
[list comprehension](https://docs.python.org/3/tutorial/datastructures.html#list-comprehensions) to create a list of all the added node IDs. 
* Each edge is added with not just a `parent` and `child`, but also a `left` and `right`.
This defines the *span* of genome that is inherited by each edge
(at the moment this span is the whole genome)
* The more eagle eyed
among you might notice that we have reversed the meaning of `time`: the initial
nodes are at time G, and the most recent at time 0. One easy way to think of this is that
time measures "generations ago". _Tskit_ requires 

Finally (and perhaps most importantly), instead of return the tables directly,
we `sort()` them (which puts the edges in a standard order), and return the
tables transformed into a **succinct tree sequence** (or "tree sequence" for short).
You can think of a tree sequence as a set of sanity-checked tables
(for instance, we check that parent nodes are always older than their children). 

Ensuring that the tables are in "tree sequence" format means we know that the
ancestry makes sense. That enables all sorts of extra functionality:

```python
ts = simForwardWF(20, 40, 100, random_seed=42)
ts.draw_svg(size=(1000, 700), node_labels={}, symbol_size=2, y_axis=True)
```

Here we've saved the output under the name `ts`, which stands for "tree sequence".
A tree sequence has *lots* of functions (or "methods") asociated with it, such as
`draw_svg()` which when run in a Jupyter notebook, plots the ancestry on screen,
in Scalable Vector Graphics ([SVG](https://en.wikipedia.org/wiki/SVG)) format.

![img](../solutions/fwd_tskit.svg)

We can also extract the underlying data. For instance, we can recover the chromosome
length as a single value, or the node times as a big array:

```python
print("Chromosome length:", ts.sequence_length)
print("Node times:", ts.nodes_time)
```

```
Chromosome length: 100.0
Node times: [40. 40. 40. 40. 40. 40. 40. 40. 40. 40. 40. 40. 40. 40. 40. 40. 40. 40.
 40. 40. 39. 39. 39. 39. 39. 39. 39. 39. 39. 39. 39. 39. 39. 39. 39. 39.
 39. 39. 39. 39. 38. 38. 38. 38. 38. 38. 38. 38. 38. 38. 38. 38. 38. 38.
 38. 38. 38. 38. 38. 38. 37. 37. 37. 37. 37. 37. 37. 37. 37. 37. 37. 37.
 37. 37. 37. 37. 37. 37. 37. 37. 36. 36. 36. 36. 36. 36. 36. 36. 36. 36.
 36. 36. 36. 36. 36. 36. 36. 36. 36. 36. 35. 35. 35. 35. 35. 35. 35. 35.
 35. 35. 35. 35. 35. 35. 35. 35. 35. 35. 35. 35. 34. 34. 34. 34. 34. 34.
 34. 34. 34. 34. 34. 34. 34. 34. 34. 34. 34. 34. 34. 34. 33. 33. 33. 33.
 33. 33. 33. 33. 33. 33. 33. 33. 33. 33. 33. 33. 33. 33. 33. 33. 32. 32.
 32. 32. 32. 32. 32. 32. 32. 32. 32. 32. 32. 32. 32. 32. 32. 32. 32. 32.
 31. 31. 31. 31. 31. 31. 31. 31. 31. 31. 31. 31. 31. 31. 31. 31. 31. 31.
 31. 31. 30. 30. 30. 30. 30. 30. 30. 30. 30. 30. 30. 30. 30. 30. 30. 30.
 30. 30. 30. 30. 29. 29. 29. 29. 29. 29. 29. 29. 29. 29. 29. 29. 29. 29.
 29. 29. 29. 29. 29. 29. 28. 28. 28. 28. 28. 28. 28. 28. 28. 28. 28. 28.
 28. 28. 28. 28. 28. 28. 28. 28. 27. 27. 27. 27. 27. 27. 27. 27. 27. 27.
 27. 27. 27. 27. 27. 27. 27. 27. 27. 27. 26. 26. 26. 26. 26. 26. 26. 26.
 26. 26. 26. 26. 26. 26. 26. 26. 26. 26. 26. 26. 25. 25. 25. 25. 25. 25.
 25. 25. 25. 25. 25. 25. 25. 25. 25. 25. 25. 25. 25. 25. 24. 24. 24. 24.
 24. 24. 24. 24. 24. 24. 24. 24. 24. 24. 24. 24. 24. 24. 24. 24. 23. 23.
 23. 23. 23. 23. 23. 23. 23. 23. 23. 23. 23. 23. 23. 23. 23. 23. 23. 23.
 22. 22. 22. 22. 22. 22. 22. 22. 22. 22. 22. 22. 22. 22. 22. 22. 22. 22.
 22. 22. 21. 21. 21. 21. 21. 21. 21. 21. 21. 21. 21. 21. 21. 21. 21. 21.
 21. 21. 21. 21. 20. 20. 20. 20. 20. 20. 20. 20. 20. 20. 20. 20. 20. 20.
 20. 20. 20. 20. 20. 20. 19. 19. 19. 19. 19. 19. 19. 19. 19. 19. 19. 19.
 19. 19. 19. 19. 19. 19. 19. 19. 18. 18. 18. 18. 18. 18. 18. 18. 18. 18.
 18. 18. 18. 18. 18. 18. 18. 18. 18. 18. 17. 17. 17. 17. 17. 17. 17. 17.
 17. 17. 17. 17. 17. 17. 17. 17. 17. 17. 17. 17. 16. 16. 16. 16. 16. 16.
 16. 16. 16. 16. 16. 16. 16. 16. 16. 16. 16. 16. 16. 16. 15. 15. 15. 15.
 15. 15. 15. 15. 15. 15. 15. 15. 15. 15. 15. 15. 15. 15. 15. 15. 14. 14.
 14. 14. 14. 14. 14. 14. 14. 14. 14. 14. 14. 14. 14. 14. 14. 14. 14. 14.
 13. 13. 13. 13. 13. 13. 13. 13. 13. 13. 13. 13. 13. 13. 13. 13. 13. 13.
 13. 13. 12. 12. 12. 12. 12. 12. 12. 12. 12. 12. 12. 12. 12. 12. 12. 12.
 12. 12. 12. 12. 11. 11. 11. 11. 11. 11. 11. 11. 11. 11. 11. 11. 11. 11.
 11. 11. 11. 11. 11. 11. 10. 10. 10. 10. 10. 10. 10. 10. 10. 10. 10. 10.
 10. 10. 10. 10. 10. 10. 10. 10.  9.  9.  9.  9.  9.  9.  9.  9.  9.  9.
  9.  9.  9.  9.  9.  9.  9.  9.  9.  9.  8.  8.  8.  8.  8.  8.  8.  8.
  8.  8.  8.  8.  8.  8.  8.  8.  8.  8.  8.  8.  7.  7.  7.  7.  7.  7.
  7.  7.  7.  7.  7.  7.  7.  7.  7.  7.  7.  7.  7.  7.  6.  6.  6.  6.
  6.  6.  6.  6.  6.  6.  6.  6.  6.  6.  6.  6.  6.  6.  6.  6.  5.  5.
  5.  5.  5.  5.  5.  5.  5.  5.  5.  5.  5.  5.  5.  5.  5.  5.  5.  5.
  4.  4.  4.  4.  4.  4.  4.  4.  4.  4.  4.  4.  4.  4.  4.  4.  4.  4.
  4.  4.  3.  3.  3.  3.  3.  3.  3.  3.  3.  3.  3.  3.  3.  3.  3.  3.
  3.  3.  3.  3.  2.  2.  2.  2.  2.  2.  2.  2.  2.  2.  2.  2.  2.  2.
  2.  2.  2.  2.  2.  2.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.  1.
  1.  1.  1.  1.  1.  1.  1.  1.  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.
  0.  0.  0.  0.  0.  0.  0.  0.  0.  0.]
```

Note that (as before) this simulator assumes one chromosome per individual. This
is the equivalent of modelling a *haploid* species, such as moss or malaria.
In reality, most species, including humans, are *diploid*, so that for any
chromosome an individual possesses a paternal and a maternal version.
In _tskit_ this is captured by assigning multiple nodes to a row in an
*individuals table*. For example, when simulating a human genome, each
individual should have two nodes. To avoid confusion, we'll talk about nodes
when elaborating on our simulator.