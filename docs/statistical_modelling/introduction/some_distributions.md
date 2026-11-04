---
sidebar_position: 4
---

# Some useful probability distributions

In practice in statistics we often use a set of well-known distributions.
These have specific mathematical forms that come with parameters to make them flexibly useful.

Here are some of the most useful and commonly-used ones:

| Name | Expression<br /><small>and R function</small> | Parameters | Explanation | 
| ---- | ----------- | -------------------- | -----------  |
| **Binomial** | <center>$${n \choose x}p^x(1-p)^{(n-x)}$$</center><br /><center><small>(`dbinom()` in R)</small></center> | Number of 'trials' $n$ <br />'Success probability' $p$ | How many 'successes'<br />from $n$ trials?<br/><small>E.g.  'alternate' alleles in a sample of $n$ chromosomes?</small><br/><br/>$x\in 0, \cdots, n$ |
| **Beta** | <center>$$\frac{1}{B(\alpha,\beta)} x^{\alpha-1} (1-x)^{\beta-1}$$</center><br /><center><small>(`dbeta()` in R)</small></center> | 'Shape' parameters<br />$\alpha$ and $\beta$ | Modelling **proportions** or **frequencies**<br/><small>E.g. allele frequencies or cell proportions</small><br/><br/>$x \in [0,1]$ | 
| **Poisson** | <center>$$\frac{\lambda^xe^-\lambda}{k!}$$</center><br /><center><small>(`dnorm()` in R)</small></center> | Mean or *rate* parameter $\lambda$| How often a (rare) event<br/>occurs in a given time interval<br/><br/> $x\in\{0, 1, 2, ...\}$ |
| **Normal**<br />or **Gaussian** | <center>$$\frac{1}{\sqrt{2\pi v}} e^{-\frac{1}{2}\frac{(x-\mu)^2}{v}}$$</center><br /><center><small>(`dnorm()` in R)</small></center> | Mean $\mu$<br />Variance $v$| Ubiquitously useful<br/><small>as we'll see later</small><br/><br/>$x \in \text{Real numbers}$ |

If you don't understand the maths above, **don't worry**.  You can understand these distributions by plotting what they look like as we'll do below.

:::tip Normalising constants

Many of these mathematical expressions have complicated-looking bit at the front that doesn't depend on $x$.  For example - the normal distribution has this bit:
$$
\frac{1}{\sqrt{2\pi v}}
$$
while the beta distribution has this bit:
$$
\frac{1}{B(\alpha,\beta)}
$$
(here $B()$ is the ['beta function'](https://en.wikipedia.org/wiki/Beta_function)). 

This bits can look complicated but the **don't depend on $x$**.  In fact, they are just **normalising constants**: their purpose is to ensure the distribution sums to $1$ over all the possible values of $x$.

**Question**. The expression $n \choose x$ in front of the binomial isn't a normalising constant in the same way - why not?

:::

## Distributions challenge

Go and [explore some distributions](./distributions/README.md) now - and figure out how to answer these questions:

:::tip Challenge questions

* Where would I find 95% of the mass of a [normal distribution](./distributions/normal.md) with mean 10 and variance 20?

* Suppose I sample 100 chromosomes from a population, to examine a variant of interest that is at 1% frequency.  What's the chance I will detect at least one chromosome with the allele?  (**Hint** this is a job for the [binomial distribution](./distributions/binomial.md)).

* Can you generate a beta distribution that looks like a one-sided smile?  (High one one side, low on the other.)

:::