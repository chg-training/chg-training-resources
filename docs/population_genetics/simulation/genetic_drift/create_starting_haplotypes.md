---
sidebar_position: 1
---

# Create some starting haplotypes

There isn't really anything about *genetics* in the basic Wright-Fisher model. So to give ourselves some genetic data to
work with, we'll start by generating a set of haplotypes and have them evolve through the model.

Let's imagine we are looking at set of *L = 20* SNPs to start with and that there are (say) up to 10 different
haplotypes in our population at the start of the simulation.  We'll create a matrix to put a simulated set of
haplotypes:

<div className="r-py-columns">

```r
L = 20
H = 10
haplotypes = matrix( NA, nrow = H, ncol = L )
```
```python
L = 20
H = 10
# NB: create & fill the haplotypes in one step, below
```
</div>


To generate some simple haplotypes to look at, let's take a simple situation in which the variants are all biallelic (we'll encode the alleles as `0` or `1`), they all start off independent of each other, and they all have 20% frequency.  We can simulate by random sampling from the binomial distribution. R being a statistical programming language, the `rbinom` function is built-in, but Python is a more general language, so we need to load the "Numerical Python" library, [numpy](https://numpy.org/doc/stable/user/absolute_beginners.html).

<div className="r-py-columns">

```r

haplotypes[,] = rbinom(n=H*L, size=1, prob=0.2)
```
```python
import numpy as np
haplotypes = np.random.binomial(1, p=0.2, size=(H, L))
```
</div>

Here's a function to make a quick plot of our starting haplotypes. R has built-in graphics, but in Python we will use the *matplotlib* library, specifically its  `pyplot` module.

<div className="r-py-columns">

```r


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
```python
import matplotlib.pyplot as plt

def plot_haplotypes(haplotypes, title=None, ax=None):
  # matplotlib plots on an "axes" object, called `ax`.
  if ax is None:
    fig, ax = plt.subplots()

  colormap_used_by_R = "YlOrRd"
  ax.imshow(haplotypes, cmap=colormap_used_by_R, aspect="auto")
  ax.set(xlabel='variant', ylabel='haplotype', title=title)
  return ax
```
</div>

If you call it
<div className="r-py-columns">

```
plot.haplotypes( haplotypes )
```
```
ax = plot_haplotypes(haplotypes)
```
</div>

You should see something like this:

![img](../solutions/initial_haplotypes.png)

I.e. $H=10$ haplotypes (rows) at $L=20$ SNPs.  Wow!

