---
sidebar_position: 102
---

# The normal approximation

As the last part of this tutorial, I wanted to mention an approximation that is **very** **very** important in
statistics. This is the **normal approximation to the likelihood** (or the posterior) and it underlies most of classical
statistics. 

Think classical statistical tests, like the likelihood ratio test, T tests, chi-squared tests, ANOVA.  (But not
[Fisher's exact test](https://en.wikipedia.org/wiki/Fisher%27s_exact_test) which is 'exact' because it doesn't use this
approximation).

It also underlies commonly-used bayesian methods, such as (for example) [the fGWAS functional GWAS
method](https://en.wikipedia.org/wiki/Fisher%27s_exact_test), the Bayes factors in [our malaria GWAS
paper](https://doi.org/10.1038/s41467-019-13480-z), and many others.  When the approximation works it is an extremely
useful calculational tool.

For now we will just illustrate using the beta distribution.

:::tip Normal distribution approximation

You already know how to [plot a beta distribution](./some_distributions.md#beta-distribution).  Let's do this again
using some chosen counts - to illustrate, I'll pick the counts from [African American O blood group
data](./allele_frequencies.md), but you can choose your own values if you like:

```r
nA = 32
nB = 29
x = seq( from = 0, to = 1, by = 0.001 )
plot(
	x,
	dbeta(
		x,
		shape1 = nB+1,
		shape2 = nA+1
	),
	ylim = c( 0, 8 ), # Adjust if your plot is too high or low
	type = 'l',       # Plot as a line
	lwd = 2           # 'line width'
);
grid()
```

Now let's fit a normal approximation to this.  I happen to know a good way to do this (explained further in class or below).
The key formula we need is the **curvature of the logarithm of the distribution function**, or in other words, the **second derivative of the log-posterior**.
For the beta distribution this can be worked out (calculus challenge!) and is:

$$
\text{curvature}(f) = \frac{d^2}{\text{df}^2} \log P(f|\text{data}) = -\frac{n_B}{f^2} - \frac{n_A}{(1-f)^2}
$$

Let's code that in R:
```r
curvature_of_log_posterior = function(f, nA, nB ) {
	# This is the second derivative of the log-posterior
	-(
		nB/(x^2) + nA/((1-x)^2)
	)
}
```

The mode (maximum point) of the posterior is [also known](https://en.wikipedia.org/wiki/Beta_distribution) - it is:
$$
\text{posterior mode} = \frac{n_B}{n_A+n_B}
$$

Now we are ready to fit the normal approximation.  The appropriate thing turns out to be to take a normal distribution
with mean equal to the mode and variance equal to $-1$ over the 2nd derivative, at the mode:

$$
\begin{align*}
\text{approximation} = N\left( \text{mean}= \frac{n_B}{n_A+n_B}, \text{variance} = \frac{-1}{\text{curvature}(f)} \right)
\end{align*}
$$

Let's now use that to plot a normal approximation to the posteiror:

```r
posterior_mode = nB / (nA + nB)
variance = -1 / curvature_of_log_posterior( posterior_mode, nA, nB )

points(
	x,
	dnorm(
		x,
		mean = posterior_mode,
		sd = sqrt( variance )
	),
	type = 'l',
	lwd = 2 ,
	lty = 2,       # Line type - 2 means 'dashed'
	col = 'red',   # Plot in red!
)

```
Pretty good, right?
:::

## Explanation 

This is to be written...
