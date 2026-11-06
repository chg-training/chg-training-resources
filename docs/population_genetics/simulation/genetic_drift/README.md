---
sidebar_position: 0
---

# Simulating genetic drift

The Wright-Fisher model is about the simplest population-genetic model there is.  It consists of:

* A population of *N* individuals (which stays fixed over time).
* non-overlapping generations
* in each generation, each individual 'samples' its parents uniformly from individuals in the parent generation.

It looks like this:

(TODO figure)

It's pretty simple to implement, but even so it turns out to have many of the key features of real populations. We are going
to implement a simplified version, where each individual picks only one parent (as if we were following a single DNA haplotype).

Note that both R and Python are used extensively in genetics so to get you comfortable,
this session shows the equivalent code in both. Later we will use Python software such
as `msprime` to perform genetic simulation, so it's worth getting to grips with the differences
between the two languages.