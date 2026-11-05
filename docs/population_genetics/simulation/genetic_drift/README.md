---
sidebar_position: 0
---

# Simulating genetic drift

The Wright-Fisher model is about the simplest population-genetic model there is.  It consists of:

* A population of *N* individuals (which stays fixed over time).
* non-overlapping generations
* in each generation, each individual 'samples' its parent uniformly from individuals in the parent generation.

It looks like this:

(TODO figure)

It's pretty simple to implement, but even so it turns out to have many of the key features of real populations. In the next few minutes we are going to implement it.

