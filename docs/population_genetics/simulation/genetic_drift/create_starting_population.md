---
sidebar_position: 2
---

# Create a starting population

Those are just a set of different haplotypes though.

Let's now generate a set of *N* individuals forming a **population**.  We'll assume they are *haploid* here so each will
carry has one of the starting haplotypes. To keep track of the evolution over *G* generations, let's also record these
haplotypes in the first row of a matrix.

You can choose your favourite population size but I'm going to pick $N=100$ to keep things simple (don't go *too* huge
at the moment!)

```
N = 100 # number of individuals
G = 100 # number of generations
population = matrix(
  NA, nrow = G, ncol = N,
  dimnames = list(
	sprintf( "generation=%d", 1:G ),
	sprintf( "individual=%d", 1:N )
  )
)
```
To generate our starting population let's randomly sample our generated haplotypes for the first generation:

```
population[1,] = sample( 1:H, size = N, replace = TRUE )
```

Now we can plot what our population looks like:
```
plot.haplotypes( haplotypes[population[1,],] )
```

Which should show something like this:

![img](../solutions/initial_population.png)

So this looks a lot like our plot of starting haplotypes, except each of our $N=100$ samples (rows) has picked one of the
starting haplotypes at random.