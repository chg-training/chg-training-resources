---
sidebar_position: 1
---

# Create some starting haplotypes

There isnt really anything about *genetics* in the basic Wright-Fisher model. So to give ourselves some genetic data to
work with, we'll start by generating a set of haplotypes and have them evolve through the model.

Let's imagine we are looking at set of *L = 20* SNPs to start with and that there are (say) up to 10 different
haplotypes in our population at the start of the simulation.  We'll create a matrix to put a simulated set of
haplotypes:

```
L = 20
H = 10
haplotypes = matrix( NA, nrow = H, ncol = L )
```

To generate some simple haplotypes to look at, let's take a simple situation in which the variants are all biallelic (we'll encode the alleles as `0` or `1`), they all start off independent of each other, and they all have 20% frequency.  We can simulate using `rbinom()` like this:
```
haplotypes[,] = rbinom( n = H*L, size = 1, prob = 0.2 )
```

Here's function to make a quick plot of our starting haplotypes:
```
plot.haplotypes <- function( haplotypes ) {
  image(
	t(haplotypes),
	x = 1:ncol(haplotypes),
	y = 1:nrow(haplotypes),
	xlab = "variant",
	ylab = "haplotype"
  )
}
```

If you call it
```
plot.haplotypes( haplotypes )
```
You should see something like this:

![img](../solutions/initial_haplotypes.png)

I.e. $H=10$ haplotypes (rows) at $L=20$ SNPs.  Wow!

