---
sidebar_position: 5
---

# Mutation vs drift

This simulation illustrates the fate of mutations under genetic drift.

If mutations don't have any selective forces on them - so they are **neutral** - they behave as follows.  They are created when they mutate, drift around in frequency for some time, and ultimately are either lost or fix in the population.

If you watch your population for a while, though, you'll see it never seems to lose all its polymorphism.  Many of the
original variants have been lost, but new ones have popped up to replace them.  Congratulaions, your population is showing
**mutation-drift balance**.  It's a balance because the rate at which mutations are being lost, is in balance with the rate at which new mutations are being added.  The result is a population that retains polymorphism through time (but the polymorphisms are constantly changing.)

To quantify this let's look at the basic measure of diversity in the population - **nucleotide diversity**, or the
average number of pairwise differences between haplotypes.  It is often denoted $\pi$.  Here is a function that computes
it for our population:

```r
nucleotide.diversity <- function( population ) {
	N = length( population )
	count.variant.alleles <- function( population ) {
		population_haplotypes = haplotypes[population,]
		return( colSums( population_haplotypes > 0 ))
	}

	f = count.variant.alleles( population )
	return( sum( f * ( N - f )) / (N * (N-1) / 2) )
}
```

And then we could compute it across generations:
```r
pi = sapply(
	1:G,
	function(g) {  nucleotide.diversity( population[g,] ) }
)

plot( 1:G, pi, type = 'l', ylim = c( 0, max(pi, na.rm = T )) )
grid()
```

This can be compared to a **famous result** which says that the *expected* nucleotide diversity is equal to twice the
effective population size, times the mutation rate:

$$
E(\pi) = 2\times N\times \mu
$$

We could add that expectation on the graph:
```r
abline( a = 2 * N * mutation_rate, b = 0, col = 'red' )
```

It might not be particularly similar!  The expected value is just that - an *expected* value, that is, on average, over
many runs of the simulation (or over a long simulation time period).  So our actual population might not be particularly
close to it in this simulation.


:::caution Warning

You should be aware that

- the population size here is, (of course), *much much* lower than real population sizes.  For humans the 'effective' size of human populations is often taken in the 10s of thousands (even though the true size is billions).

- the mutation rate here is **much, much** higher than real mutation rates.  For example in humans the mutation rate is thought to be around $1\times 10^-8$ mutations per base per generation (although [maybe it's changing](https://pmc.ncbi.nlm.nih.gov/articles/PMC1832099/)).  So it would be around $5\times 10^-5$ in a 5kb region.

These matter quantitatively - but not so much qualitatively, since these simple populations evolve in much the same way (as long as we scale time).

:::