---
sidebar_position: 2
---

# Some useful probability distributions

In practice in statistics we often use a set of well-known distributions.
These have specific mathematical forms that come with parameters to make them flexibly useful.

Here are some of the commonly-used ones:

| Name | Domain | Expression<br /><small>and R function</small> | Parameters | Explanation | 
| ---- | ------ | ----------- | -------------------- | -----------  |
| **Binomial** | $x\in 0, \cdots, n$ | <center>$${n \choose x}p^x(1-p)^{(n-x)}$$</center><br /><center><small>(`dbinom()` in R)</small></center> | Number of 'trials' $n$ <br />'Success probability' $p$ | How many 'successes'<br />from $n$ trials? |
| **Normal**<br />or **Gaussian** | $x\in\text{Real numbers}$ | <center>$$\frac{1}{\sqrt{2\pi v}} e^{-\frac{1}{2}\frac{(x-\mu)^2}{v}}$$</center><br /><center><small>(`dnorm()` in R)</small></center> | Mean $\mu$<br />Variance $v$| Ubiquitously useful |
| **Beta** | $x\in[0,1]$ | <center>$$\frac{1}{B(\alpha,\beta)} x^{\alpha-1} (1-x)^{\beta-1}$$</center><br /><center><small>(`dbeta()` in R)</small></center> | 'Shape' parameters<br />$\alpha$ and $\beta$ | E.g. allele frequency estimates | 

If you don't understand the maths above, **don't worry**.
You can understand these distributions by plotting what they look like as we'll do below.

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

**Question**. However, the expression $n \choose x$ in front of the binomial isn't a normalising constant in the same why - why not?

:::

## Binomial distribution

:::tip Challenge

Pick a **number of trials** *n* (start between 5 and 20) and a probability $p$ (start between 0.1 and 0.9).  Then plot the *binomial distribution* over the range of integers $x = 0, 1, 2, \cdots, n$.

The binomial distribution is given by `dbinom()` in R, and can be used like this:
```r
dbinom( x, size = n, prob = p )
```

How does the shape of the binomial differ as you vary $n$ and $p$?

**Note.** The expression for the binomial distribution is:

$$
x|n,p \sim {n \choose x} p^x (1-p)^{n-x}
$$

Here ${n \choose x}$ means 'n choose x' - the number of ways of choosing x things from n things - which can be computed using `choose(n,x)` in R.
For **extra kudos**, plot this using your own function `binomial(x, n, p)` implementing the above formula.

:::

## Normal distribution

:::tip Challenge

Pick a *mean value* $\mu$ (start somewhere between $-10$ and $10$) and a *variance* $v$ (which must be positive - for example, $2$ is a good starting choice). Then plot the density of the **normal distribution** over the continuous range $x=-20 \cdots 20$.

**Note**. the normal distribution density is given by `dnorm()` in R, but you have to specify the standard deviation (i.e. the **square root of the variance**) instead of the variance:
```r
dnorm( x, mean = mu, sd = sqrt(v) )
```

How does the distribution differ as you vary $\mu$ and $v$?

For **extra kudos**, ignore `dnorm()` and write your own function `normal()` to compute this based on the normal distributino density formula:

$$
x|\mu,v \sim \frac{1}{\sqrt{2*\pi*v}}\cdot e^{\frac{1}{2}\frac{(x-\mu)^2}{v}}
$$
:::

## Beta distribution

:::tip Challenge

Pick 'shape' parameters $\alpha$ and $\beta$ (make them between 1 and 10 to start) and plot the *beta distribution*:

$$
x | \alpha,\beta \sim \frac{1}{B(\alpha,\beta)} x^{\alpha-1} (1-x)^{\beta-1}
$$

over the (continuous) range $x=0 \cdots 1$.

**Note.** The beta distribution is implemented as `dbeta()` in R, but you have to use "shape1" and "shape2" instead of $\alpha$ and $\beta$:
```r
dbeta( x, shape1 = alpha, shape2 = beta )
```
How does the shape vary as you change the parameters?  What happens if they are less than 1?

For **extra kudos**, ignore `dbeta()` and write your own function `beta_distribution()` to compute this based on the normal distributino density formula:

$$
x | \alpha, \beta \sim \frac{1}{B(\alpha,\beta)} x^{(\alpha-1)} \cdot (1-x)^{(\beta-1)}
$$

(You can use the `beta()` function to compute the value $B(\alpha,\beta)$ on the demoninator.)
:::

