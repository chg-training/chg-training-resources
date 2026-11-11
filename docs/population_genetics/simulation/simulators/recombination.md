---
sidebar_position: 11
---

# Adding recombination

Using _tskit_ makes it easy to model recombination (i.e. sex, such that one
individual has 2 parents). In our `simForwardWF()` code, we simply
need to use a different `add_ancestry()` function.

Here's one way to add crossover recombination. We choose 2 parents, and recombine
with a certain probability, proportional to the length of simulated chromosome L. If
a crossover occurs, we pick a *recombination breakpoint* `X` along the genome, and take
the region of the chromosome from 0..X from one parent, and X..L from the other parent.

By making recombination depend on the sequence length, we can also simulate a small
region of a chromosome (i.e. the first L basepairs).

```python
# The recombination rate per base per generation (for simplicity we save
# it as a global constant, although that's generally bad programming style.
# To do this properly, redefine simForwardWF() to take a `rho` parameter)
RHO = 1e-8   # A roughly human-like recombination rate

def add_ancestry(edges, child_id, parent_ids, L, rng):
    parent1, parent2 = rng.choice(parent_ids, size=2, replace=False)
    prob_recomb = Rp.clip(RHO * L, 0, 1)
    has_crossover = rng.binomial(n=1, p=prob_recomb)
    if has_crossover:
        X = rng.integers(1, L-1)  # breakpoint must be >0 and <L
        edges.add_row(parent=parent1, child=child_id, left=0, right=X)
        edges.add_row(parent=parent2, child=child_id, left=X, right=L)
    else:
        edges.add_row(parent=parent1, child=child_id, left=0, right=L)
```

Note that this is a highly simplified model: we don't have variable recombination rates
along the genome (i.e. a "genetic map"), we are modelling haploid hermaphrodite
individuals (rather than human-like diploids with separate sexes), we have a maximum of
one breakpoint per chromosome, and we aren't modelling gene conversion. All these things
can be done in more advanced simulators like SLiM, but the version decribed above is
a surprisingly good approximation.

Now all we need to do is run it!

```python
# let's use a larger number of individuals, and simulate a megabase of genome
ts = simForwardWF(1000, 2000, chrom_length = 1e6, show_progressbar=True)
```

You previously saw that 

Simplify to a subset of the current day individuals

```
current_nodes = ts.samples(time=0)
current_subset = current_nodes(10)
ts_min = ts.simplify(current_subset)
```


