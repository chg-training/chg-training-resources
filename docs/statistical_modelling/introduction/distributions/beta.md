---
sidebar_position: 2.5
---

# Beta distribution

The [beta distribution](https://en.wikipedia.org/wiki/Beta_distribution) is a flexible distribution useful for modelling things between $0$ and $1$ - like frequencies, proportions, or probabilities.

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
:::

:::tip Expert challeng
For **extra kudos**, ignore `dbeta()` and write your own function `beta_distribution()` to compute this based on the normal distributino density formula:

$$
x | \alpha, \beta \sim \frac{1}{B(\alpha,\beta)} x^{(\alpha-1)} \cdot (1-x)^{(\beta-1)}
$$

(You can use the `beta()` function to compute the value $B(\alpha,\beta)$ on the demoninator.)

:::

## Cumulative and quantiles

Just like the normal and binomial, the beta distribution has cumulative desnity `pbeta()` and quantile function `qbeta()`.

For example, 95% of the mass of a $\text{beta}(1,1)$ distribution is between:

```r
qbeta( c( 0.025, 0.975 ), 1, 1 )
```

(Hmm - these values look familiar.  Why?)
