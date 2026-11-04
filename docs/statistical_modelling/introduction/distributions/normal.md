---
sidebar_position: 2
---

# Normal distribution

The [normal distribution](https://en.wikipedia.org/wiki/Normal_distribution) is a ubiquitously useful distribution that
turns up all over the place in statistics.  You're probably already familiar but let's make sure you are:

:::tip Challenge

Pick a *mean value* $\mu$ (start somewhere between $-10$ and $10$) and a *variance* $v$ (which must be positive - for example, $2$ is a good starting choice). Then plot the density of the **normal distribution** over the continuous range $x=-20 \cdots 20$.

**Note**. the normal distribution density is given by `dnorm()` in R, but you have to specify the standard deviation (i.e. the **square root of the variance**) instead of the variance:
```r
dnorm( x, mean = mu, sd = sqrt(v) )
```

How does the distribution differ as you vary $\mu$ and $v$?
:::

:::tip for experts
The normal distributino density formula is:

$$
x|\mu,v \sim \frac{1}{\sqrt{2*\pi*v}}\cdot e^{\frac{1}{2}\frac{(x-\mu)^2}{v}}
$$

Can you implement that directly, without `dnorm()`?

:::

## Cumulative desnity

Just like `binom`, the normal distribution has a cumulative version called `pnorm()`.  Plot that now.

The cumulative function is the result of adding up (integrating) the values in the normal distribution density from left to right.

:::tip Question

The graph of `pnorm()` goes up to $1$ on the right - why?

:::

## Quantile function

The **quantiles** tell you where in the range of $x$ the mass of the distribution is located.
It is computed by `qnorm()`.

For example, let's find the range on the left of a standard normal where *at least* 10% of the mass is:
```r
qnorm(
	p = 0.1,
	mean = 10,
	sd = 1
)
```

and the range on the right:
```r
qnorm(
	p = 0.1,
	mean = 10,
	sd = 1,
	lower.tail = FALSE
)
```

**Question.** Where is 95% of the mass?
