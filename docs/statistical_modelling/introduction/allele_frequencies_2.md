---
sidebar_position: 101
---

# The credible interval

The plot [we just made](./allele_frequencies.md) is ok, but surely visually wasteful.

Instead of this let's make a **forest plot**, that is, we'll plot point estimates and their 95% credible intervales.

How to compute these intervals?  Well, since we know the posterior distirbution (it's a beta distribution), it's easy - we just need to find quantiles of the beta distribution.  That can be done with the `qbeta()` function in R.

To find a 95\% posterior interval (an interval containing 95% of the posterior mass) let's compute the 2.5% and 97.5% quantiles.


That plot of the [posterior distributions](./allele_frequencies.md) is all very well, but it would be better if we had a
much more compact plot.  
