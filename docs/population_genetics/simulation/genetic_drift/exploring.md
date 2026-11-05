---
sidebar_position: 6
---

# Exploring the simulations.

In this file: [on github](https://raw.githubusercontent.com/chg-training/chg-training-resources/refs/heads/main/docs/population_genetics/simulation/simulation_and_visualisation.R) (right click and choose 'Save as' to save it).

I've wrapped up the above simulation into two key functions:

* `simulate.population()` which simulates from the model as above.
* `plot.simulation()` which makes a multi-panel plot of the result.

To get this code, save it somewhere and `source()` it into your session:
```
source( "simulation_and_visualisation.R" )
```

You can run it like this:
```
sim = simulate.population( L = 20, N = 100, G = 100 )
plot.simulation(sim)
```

or on one line:
```
plot.simulation( simulate.population( L = 20, N = 100, G = 100 ) )
```

It produces a plot like this:

![img](../solutions/simulation.png)


:::tip Questions

* Explore the simulations and try varying the parameters. 

How does varying the population size $N$ affect the simulations?  e.g. what if you set $N = 1,000$?  $10,000$?

(**NB.** One effect is, it's slower!)

What if you turn up $N$ to $1,000$, but also run 1,000 generations?

Describe in general what happens to haplotypes and variants as the simulations proceed.

What does genetic drift do to frequencies, and LD?
:::

:::caution Reminder

Remember that in this simulation

* $L$ is the number of variants across the region
* $N$ is the population size,
* and $G$ is the number of generations. 

In this code, if you want, you can also specify:

* $H$, the number of different haplotypes we created at the simulation start, and
* `initial.frequency`, the starting frequency of each genetic variant.

:::

## Next steps

Next let's look at some [key population genetic statistics](../statistics.md).