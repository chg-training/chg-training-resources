---
sidebar_position: 4
---

# 4. Fit the model

Whichever of these you like, note how we've arranged all the variables so they use the same 'baseline' - they are all set up so that the non-O blood type genotype `C/C` is the first level, or the level corresponding to $0$.

Now you ought to be able to run the regression and get something with sensible levels:

```r
broom::tidy( glm( status ~ rs8176719_additive, family = "binomial", data = abo_data ) )
broom::tidy( glm( status ~ rs8176719_recessive, family = "binomial", data = abo_data ) )
broom::tidy( glm( status ~ rs8176719_general, family = "binomial", data = abo_data ) )
```

Hmm!

To interpret these results though, you have to remember the [scale that logistic regression estimates are on](../interpreting_regression.md).

It goes like this:

The intercept is the estimated log-odds of a sample being a 'CASE', if it has genotype level $0$ (i.e. non-O genotype in our example).

To get this back to probability / frequency scale you use $\text{logistic}()$:
```r
logistic = function(x) {
	exp(x) / ( 1 + exp(x))
}
```

For example, one of these estimates is about $0.34$ so the estimated frequency of cases among non-O-blood type samples is: 
```
logistic( 0.34 )
```

:::warning Case-control study warning.

This is a **case-control** study so the frequency of cases has more to do with the sampling design than the actual rate
of severe malaria in these populations!

:::

The parameters for the genotypes are the **estimated change in log-odds** - that is, the **log odds ratio** -
corresponding to having the genotype vs. not having it.  To represent this in 'odds' scale, use `exp()`.  For example:

```r
exp( -2.53 )
```

But maybe you want a 95% interval?  The **golden rule** is:

:::tip Golden rule: computing a 95% interval

Always compute the interval in the log-odds space, then transform back to odds space with `exp()`:

:::

For example you could do this:
```r
coefficients = broom::tidy( glm( status ~ rs8176719_recessive, family = "binomial", data = abo_data ) )

(
	coefficients
	%>% filter( term != '(Intercept)' )
	%>% mutate(
		lower     = estimate - 1.96 * std.error,
		upper     = estimate + 1.96 * std.error,
		OR_and_interval = sprintf(
			"%.3f ( %.3f - %.3f )",
			exp( estimate ),
			exp( lower ),
			exp( upper )
		)
	)
)

```

For this regression  the odds ratio is about $0.72$ - but could reasonably be as low as 0.66 or as high as 0.77.  (That
last way of writing is is a useful one to put in your paper!)

:::tip Case-control interpretation

In a case-control study with 'unselected' controls from the general population (like this study), it turns out that the
odds ratio is an estimate of the *relative risk* in the population:

$$
\text{relative risk} = \frac{P(\text{severe malaria}|\text{O blood group})}{P(\text{severe malaria}|\text{not O blood group})}
$$

So you might say here:

    "we estimate that children with O blood group have 34% lower chance of having severe malaria."

:::