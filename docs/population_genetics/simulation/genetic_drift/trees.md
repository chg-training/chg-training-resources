---
sidebar_position: 6
---

# Tracking inheritance

So far we've been thinking about the patterns of haplotypes - frequencies, LD and so on.

But what about the underlying patterns of inheritance?  Let's add something now to track the 'genealogy'.

## Tracking paterns

Currently our `evolve()` function looks like this:

<div className="r-py-columns">

```r
evolve <- function( currentGeneration ) {
	parents = sample( 1:N, size = N, replace = TRUE )
	return( currentGeneration[parents] )
}
```
```python
def evolve(current_generation):
	parents = np.random.choice(N, size=N, replace=True)
	return current_generation[parents]
```
</div>

Let's change this to something *even simpler* that tracks the parents instead:
<div className="r-py-columns">

```r
choose.parents <- function( N ) {
	parents = sample( 1:N, size = N, replace = TRUE )
	return( parents )
}
```
```python
def choose_parents( N ):
	parents = np.random.choice(N, size=N, replace=True)
	return parents
```
</div>

To use this in our simulation we need to update the code to track it.  Let's create another matrix to track the parents:
```r
<div className="r-py-columns">

```r
N = 100 # number of individuals
G = 100 # number of generations
population = matrix(
	NA, nrow = G, ncol = N,
  dimnames = list(
    sprintf( "generation=%d", 1:G ),
    sprintf( "individual=%d", 1:N )
  )
)

# Add an empty `parents` matrix too
parents = population
```
```python
N = 100  # number of individuals
G = 100  # number of generations

population = np.empty((G, N), dtype=int)
# Add an empty `parents` matrix too
parents    = np.empty_like(population)
```
</div>

We'll initialise the population too:

<div className="r-py-columns">

```r
population[1,] = sample( 1:H, size = N, replace = TRUE )
```
```python
population[0] = np.random.choice(H, size=N, replace=True)
```
</div>

Finally, let's change our simulation so it tracks the parents:

```r
for( generation in 2:G ) {
  my_parents = choose.parents(N)
  population[generation,] = population[ generation-1, my_parents ]
  # Track the parents!
  parents[generation,] = my_parents
}

```

Let's check that still works:
<div className="r-py-columns">

```r
layout( matrix( 1:2, nrow = 2 ) )
par( mar = c( 3, 3, 1, 1 ))
plot.haplotypes( haplotypes[population[1,],])
plot.haplotypes( haplotypes[population[G,],])
```
```python
fig, axes = plt.subplots(ncols=2, figsize=(10, 4))

ax = plot_haplotypes(haplotypes[population[0]], "Gen 0", axes[0])
ax = plot_haplotypes(haplotypes[population[G-1]], f"Gen {G-1}", axes[1])
```
</div>
