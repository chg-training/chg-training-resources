---
sidebar_position: 3
---

# Make it evolve

In the Wright-Fisher model, in each generation, each individual 'samples' its haplotype from a **randomly chosen
parent** in the generation before.  That should be easy to implement, right?  Let's write a function to generate a new
generation given the current one (a row of `population`):

```r
evolve <- function( currentGeneration ) {
	parents = sample( 1:N, size = N, replace = TRUE )
	return( currentGeneration[parents] )
}
```

That was pretty easy!  For example if you run this on our starting population:
```r
evolve( population[1,] )
```

Great, so let's now evolve the population over $G$ generations:
```r
for( generation in 2:G ) {
  population[generation,] = evolve( population[generation-1,] )
}
```

Look at the result before and after evolution:
```r
layout( matrix( 1:2, nrow = 2 ) )
par( mar = c( 3, 3, 1, 1 ))
plot.haplotypes( haplotypes[population[1,],])
plot.haplotypes( haplotypes[population[G,],])
```

Wow!

**Question.** What features of this do you notice?

It's worth emphasising here that there is nothing going on in our model except inheritance.  Any structure that appears
is purely due to random inheritance.

