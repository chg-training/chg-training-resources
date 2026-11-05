---
sidebar_position: 3
---

# Make it evolve

In the Wright-Fisher model, in each generation, each individual 'samples' its haplotype from a **randomly chosen
parent** in the generation before.  That should be easy to implement, right?  Let's write a function to generate a new
generation given the current one (a row of `population`):

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

That was pretty easy!  For example if you run this on our starting population:

<div className="r-py-columns">

```r
evolve( population[1,] )
```
```python
evolve(population[0])
```
</div>

Great, so let's now evolve the population over $G$ generations:
<div className="r-py-columns">

```r
for( generation in 2:G ) {
  population[generation,] = evolve( population[generation-1,] )
}
```
```python
for generation in range(1, G):
    population[generation] = evolve(population[generation-1])
```
</div>

Look at the result before and after evolution:

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

Wow!

**Question.** What features of this do you notice?

It's worth emphasising here that there is nothing going on in our model except inheritance.  Any structure that appears
is purely due to random inheritance.

