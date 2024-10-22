---
sidebar_position: 101
---

# Plotting a credible interval

The plot [we just made](./allele_frequencies.md) is ok, but surely visually pretty wasteful.

Instead of this let's make a **forest plot**, that is, we'll plot point estimates and their 95% credible intervals.

:::tip Challenge question

Instead of using `compute_posterior_density()`, use `summarise()` to compute a simpler summary of the posterior:
the mean, the 2.5% quantile, and the 97.5% quantile.  (**Note.** 95% of the mass is between these quantiles.)

If you're working in R, you can compute the quantiles using the `qbeta()` function, for example:
```r
qbeta( p = 0.025, shape1 = n2+1, shape2 = n1+1 )
```

Happily, it turns out that the posterior mean is just the natural estimate you might have expected:
$$
\text{posterior mean} = \frac{n_2}{n_1+n_2}
$$
...so that's easy to compute as well.  

You should end up with a data frame looking something like this:
```
population            n1    n2   posterior_mean   
African Ancestry SW  
```

You should compute the 

Change your plotting code so it plots a forest plot.

Each row should show the point estimate (posterior mean) and a line segment showing the 95% CI.
As before, order the populations from lowest to highest 

How to compute these intervals?  Well, since we know the posterior distirbution (it's a beta distribution), it's easy - we just need to find quantiles of the beta distribution.  That can be done with the `qbeta()` function in R.

To find a 95% posterior interval (an interval containing 95% of the posterior mass) let's compute the 2.5% and 97.5% quantiles.

To find the posterior mean estimate we need the mean of the posterior.


That plot of the [posterior distributions](./allele_frequencies.md) is all very well, but it would be better if we had a
much more compact plot.  
