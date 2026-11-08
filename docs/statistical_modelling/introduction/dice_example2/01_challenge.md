---
sidebar_position: 1
---

# Blu-tack challenge

**Challenge.** Over the weekend I rolled a pair of dice 30 times to generate some data.

The **snag** is that before rolling, I covered up one side of each die with blu-tack.  (The same side on each dice.)
The upshot is that the die never rest on that side (so the number on the opposite side never turns up.). Now I can't remember which one!

Here are the results:

```r
data = readr::read_tsv( "https://users.ox.ac.uk/~whgu0376/training/msc_gm/2026/data/dice_data1.tsv" )
```

**Can you help me figure out which side the blu-tack was on?**

:::tip

As with all real data analysis - the place to start is with examining the data.

Make sure you know what's in the `data` data frame now - try histogramming or viewing it.

You could perhaps compare to some simulated data too to see if it looks like the simulations.

For example to compare to a simulation where 5 is never rolled (using the [code from earlier](../dice_example1/03_unfair_distribution.md)):

```
simulation = simulate_two_dice(
	30,
	die_model = c( 0.2, 0.2, 0.2, 0.2, 0, 0.2 )
)
breaks = (2:13) - 0.5
ggplot( data = simulation ) + geom_histogram( aes( x= sum_of_dice), breaks = breaks ) + scale_x_continuous( breaks = 2:12 )
ggplot( data = data       ) + geom_histogram( aes( x= sum_of_dice), breaks = breaks ) + scale_x_continuous( breaks = 2:12 )
```

Is it obvious from this comparison what the inference should be?

:::

