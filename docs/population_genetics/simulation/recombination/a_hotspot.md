---
sidebar_position: 1
---

# Adding a hotspot

**Warning** this page is kindof unfinished!

Implementing recombination could be tricky in general.  But a simple way is to add a single **recombination hotspot** to our model - this is what we'll do.

Let's go back to the setting of our [mutations simulation](../mutations/README.md) - this was a 5kb region with a 5% mutation rate:

```r
L = 5000                   # number of sites
H = 10                     # number of haplotypes at start
N = 250                    # number of individuals in the population
G = 1000                   # number of generations
mutation_rate = 0.05       # mutation rate per locus per generation
```

And let's add a hotspot half way through:
```r
hotspot_location = 2500
```

Fully simulating recombination is tricky with our simple framework, but here we'll take a simple approach.

We'll split all our matrices (the `population`, the `haplotypes`, and the `parents`) into two: one for the left side of the interval, and one for the right side.  Like this:

```r
L = 5000 # should be even!
H = 10
l_haplotypes       = matrix( NA, nrow = H + 25000, ncol = L/2 )
l_haplotypes[1:H,] = rbinom( n = H*L/2, size = 1, prob = 0.01 )
l_highest = H
r_haplotypes       = matrix( NA, nrow = H + 25000, ncol = L/2 )
r_haplotypes[1:H,] = rbinom( n = H*L/2, size = 1, prob = 0.01 )
r_highest = H

# Which haplotype does each individual carry on the left and right of the hotspot?
# And which parent did they inherit from on each side?
l_population = l_parents = matrix( NA, nrow = G, ncol = N )
r_population = r_parents = matrix( NA, nrow = G, ncol = N )

# Initialise the population
l_population[1,] = sample( 1:l_highest, N, replace = T )
r_population[1,] = sample( 1:r_highest, N, replace = T )

```

We also need to update our `evolve()` function.  I'll call it `evolve_lr()` to make clear there's seperate evolution on the left and right.
```r
evolve_lr <- function(
	currentGeneration,
	mutation_rate_per_locus = 0.05,
	recombination_rate      = 0.05
) {
  # Inherit from parents, as before
  N = length( currentGeneration )
  l_parents = sample( 1:N, size = N, replace = TRUE )

  # by default parents on right are the same as on left...
  r_parents = l_parents

  # ...but not if we recombine!
  # Then recombinants get different parents on right side!
  who_should_recombine = sample( N, c( 0, 1 ), prob = recombination_rate, replace = TRUE )
  r_parents[ recombine == 1 ] = sample( 1:N, size = sum( who_should_recombine ), replace = TRUE )

  # set this up as before:
  l_new = currentGeneration[l_parents]
  r_new = currentGeneration[r_parents]

  # Now decide if any haplotypes should mutate
  # First randomly pick samples to mutate...
  who.mutates = sample( 1:N, prob = mutation_rate_per_locus )
  # ...and mutate them:
  for( i in who.mutates ) {
    new[i] = mutate_lr( l_new[i], r_new[i] )
  }

  return( new )
}


```

Of course for this to work we'll need to fix `mutate()` as well - a bit fiddly, but doable:
```r
mutate_lr <- function( l_haplotype, r_haplotype ) {
  # Take an existing haplotype...
  old_l_haplotype = l_haplotypes[l_haplotype,]
  old_r_haplotype = r_haplotypes[r_haplotype,]

  # mutate it at a single site, either on the left or right.
  L = ncol( l_haplotypes ) + ncol( r_haplotypes )
  which_site = sample( 1:L, 1 )
  if( L <= ncol( l_haplotypes )) {
	# mutate the inherited haplotype on the left of the hotspot!
	new_haplotype = old_l_haplotype
	new_haplotype[which_site] = 2
	l_highest <<= l_highest + 1
	l_haplotypes[l_highest,] <<- new_haplotype
  } else {
	new_haplotype = old_r_haplotype
	# mutate the inherited haplotype on the right of the hotspot!
	new_haplotype[which_site - ncol(l_haplotypes)] = 2
	r_highest <<= r_highest + 1
	r_haplotypes[r_highest,] <<- new_haplotype
  }
}

```

:::warning Warning

Once again - I'm not advocating this as Good Coding Practice.  I'm just getting it working here!

:::

At this point we may be able to try this.

Make sure you have set 
Try:
```r
L = 5000                   # number of sites
H = 10                     # number of haplotypes at start
N = 250                    # number of individuals in the population
G = 1000                   # number of generations
mutation_rate_per_locus = 0.05       # mutation rate per locus per generation
recombination_rate = 0.05

source( ")
```