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

To do this in practice we need a bit of coding.  We'll make it a bit more efficient by pre-allocating enough memory for 25,000 haplotypes.  Then we'll use a variable to keep track of which of these haplotypes are already assigned:

```r
haplotypes = rbind(
	haplotypes,
	matrix( NA, nrow = 25000, ncol = L )
)
highest.haplotype = H
```

Here's our new `mutate()` function that:

```r
mutate <- function( which_haplotype ) {
  # Take an existing haplotype...
  old_haplotype = haplotypes[which_haplotype,]

  # mutate it at a single site
  new_haplotype = old_haplotype
  which_site = sample( 1:L, 1 )
  new_haplotype[which_site] = 2 # described below

  # Add the new haplotype to our global table.
  # Important!  You need <<- here:
  highest.haplotype              <<- highest.haplotype + 1
  haplotypes[highest.haplotype,] <<- new_haplotype
  return( highest.haplotype )
}
```

:::caution Bad programming alert!

The syntax `<<-` used above tells R to alter the **global** `haplotypes` matrix and the `highest.haplotype` variable. If
you don't do this, R makes a local copy which only exists inside the function - and then not very helpfully edits it.

It is a unusual to use this type of edit-a-global approach in R (I had to look up how to do it), and in general using a
global variable is **bad programming practice**, but it will work for our simulation so we're going with for the
moment...

:::

Note also that the starting entries of the haplotypes are all 0 or 1, but in `mutate()` I chose to mutate to a value of
2. The main reason is to have them appear a different colour on our output plots, so we can easily see the effect of
mutations on the population.

If you call `mutate()`, say like this: `mutate(5)`, you ought now to find that:

* `haplotypes` now has filled in an extra row (row 11 presumably).
* the new row is the same as row 5, except for one mutation in it.
* `mutate()` will return the index of the newly mutated haplotype.
* and `highest.haplotype` has been updated to reflect this number, 11 haplotypes in total.

With a mechanism for mutations in place we can write an updated `evolve()` function.  We will take in a **mutation
rate** parameter and, after each inheritance takes place, randomly decide whether a mutation occurs.  If it does, we
mutate it using `mutate()`:

```r

evolve <- function(
	currentGeneration,
	mutation_rate_per_locus = 0.05
) {
  # Inherit from parents, as before
  parents = sample( 1:N, size = N, replace = TRUE )
  new = currentGeneration[parents]

  # Now decide if any haplotypes should mutate
  # First randomly pick samples to mutate...
  who.mutates = sample( 1:N, prob = mutation_rate_per_locus )
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
