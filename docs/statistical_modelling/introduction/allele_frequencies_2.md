---
sidebar_position: 101
---

# The credible interval

A much more compact way to plot distributions is the **forest plot**.  It works by plotting point estimates and their
95% credible intervales.

Fortunately for our [allele frequencies example](./allele_frequencies.md) there's an easy way to do this.  The posterior
distributions are beta distributions, so we can find regions containing 95% of the mass simply by chopping off 2.5% of
the mass on either side.  The `qbeta()` function, which computes *quantiles of the beta distribution*, can be used to do
this.




That plot of the [posterior distributions](./allele_frequencies.md) is all very well, but it would be better if we had a
much more compact plot.  
