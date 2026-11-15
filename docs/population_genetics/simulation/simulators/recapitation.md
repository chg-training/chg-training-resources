---
sidebar_position: 17
---

# Recapitation

In the context of population genetic simulation, recapitation means putting the "head"
back on an ancestry. We saw that often when simulating in forward time, if we want to 
fully capture genetic diversity, we have to run for a huge length of time:
a number of generations at least 4 times the effective population size.

For example in humans, that's about 4 x 40_000 generations, which is over 4 million years!!!

Normally, however, we'll 

See https://tskit.dev/tutorials/completing_forward_sims.html

We'll first run our 

```python
coalesced_ts = msprime.sim_ancestry(
    population_size=N, 
    initial_state=wf_ts, 
    recombination_rate=1 / num_loci, 
    ploidy=1,
    random_seed=7)
coalesced_ts.draw_svg()
```