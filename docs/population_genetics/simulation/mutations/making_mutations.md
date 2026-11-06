---
sidebar_position: 3
---

# Implementing mutations

Our `evolve()` function is pretty simple at the moment - it looks like this:

```r
evolve <- function( currentGeneration ) {
  parents = sample( 1:N, size = N, replace = TRUE )
  return( currentGeneration[parents] )
}
```

Let's update it to account for mutations.  

Doing this takes a bit of care because of the way we have set our simulation up.  We are using the `haplotypes` matrix
to keep track of the actual alleles on each haplotype - therefore, to add mutations we have to add them to the haplotypes matrix.  To solve this, let's create a `mutate()` function which:

1. reads in the index of a current haplotype
2. mutates it at a single site, and
3. adds the new mutant haplotype to the list of haplotypes:

To make this a bit more efficient we will also pre-allocate enough memory for 10,000 haplotypes:

```r
haplotypes = rbind(
	haplotypes,
	matrix( NA, nrow = 10000, ncol = L )
)
highest.haplotype = H

mutate <- function( which_haplotype ) {
  # Take an existing haplotype...
  old_haplotype = haplotypes[which_haplotype,]

  # mutate it at a single site
  new_haplotype = old_haplotype
  which_site = sample( 1:L, 1 )
  new_haplotype[which_site] = 2 # described below

  # Important!  Use <<- here
  highest.haplotype              <<- highest.haplotype + 1
  haplotypes[highest.haplotype,] <<- new_haplotype
  return( highest.haplotype )
}
```

:::caution Bad programming alert!

The syntax `<<-` used above is important!  It tells R to alter the **global** `haplotypes` matrix and the
`highest.haplotype` variable - rather than a local copy which only exists inside the function.

It is unusual to use this in R (I had to look it up), and in general using a global variable like this is **bad
programming practice**, but it will work for our simulation so we're going with for the moment...

:::

Note that most entries of the haplotypes are 0 or 1, but in `mutate()` I chose to mutate to a value of 2.  The main reason is t have them appear a different colour on our output plots, so we can easily see the effect of mutations on the population.

If you call `mutate()`, say like this: `mutate(5)`, you ought now to find that:

* `haplotypes` now has an extra row (row 11 presumably).
* the new row is the same as row 5, except for one mutation in it.
* also `mutate()` will return the index of the newly mutated haplotype.

With mutations in place we can write an updated `evolve()` function.  We will take in a **mutation rate** parameter and, after each inheritance takes place, randomly decide whether a mutation occurs.  If it does, we mutate it using `mutate()`:

```r

evolve <- function(
	currentGeneration,
	mutation_rate_per_locus = 0.2
) {
  # Inherit from parents, as before
  parents = sample( 1:N, size = N, replace = TRUE )
  new = currentGeneration[parents]

  # Now decide if any haplotypes should mutate
  # I'm using `rbinom()` which randomly samples a 0 or 1 for each individual:
  who.mutates = which( rbinom( N, size = 1, prob = mutation_rate_per_locus ) == 1 )
  # ...and mutate them:
  for( i in who.mutates ) {
    new[i] = mutate( new[i] )
  }

  return( new )
}
```

:::tip Mutation rate note

When talking about mutation rates, you have to be careful to decide if you are talking about mutation **per locus** (i.e. over the whole 10kb here) or **per site**.  If you look at the code you'll see the function above is using the **mutation rate per locus** (so the rate per site is 1/10,000 times this.)

:::
