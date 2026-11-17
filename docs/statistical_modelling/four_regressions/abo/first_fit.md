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

## Interpreting the odds ratios

To interpret these results though, you have to remember the [scale that logistic regression estimates are on](../interpreting_regression.md).

It goes like this:

* The **intercept** is the estimated log-odds of a sample being a 'CASE', for samples with genotype level $0$ (i.e. non-O genotype in our example).

* The **other parameter** is the **estimated change in log-odds** associated with a unit change in the predictor variable.  (That is, 'O' versus non-'O' blood group in our example.)

The estimated change in log-odds is also known as the "log odds ratio" because that's what it is - the logarithm of a ratio of odds.

Let's work that out in our example. In the recessive version of the regression run above, the intercept is about $0.149$ and the rs8176719 log odds ratio is $-0.334$.  Therefore, the estimated odds ratio is
```r
> exp( -0.334 )
0.7160538
```

So across samples, the *odds of being a case* are about 28% lower in O blood type individuals than in non-O individuals - in other words 'O' is associated with ~28% protection against severe malaria.  Hmm.

But of course we'd also like to quantify the uncertainty too.  The **golden rule** for doing this is:

:::tip Golden rule: computing a 95% interval

Always compute the interval in the log-odds space, then transform back to odds space with `exp()`:

:::

So for example you could do this:
```r
(
	# Fit the regression and get a data frame...
	broom::tidy(
		glm(
			status  ~ rs8176719_recessive,
			family  = "binomial",
			data    = abo_data
		)
	)

	# Get rid of the intercept, which isn't a 'log odds ratio'
	%>% filter( term != '(Intercept)' )

	# ...add the 95% interval
	%>% mutate(
		lower     = estimate - 1.96 * std.error,
		upper     = estimate + 1.96 * std.error
	)

	# ...and transform to odds ratio scale:
	%>% mutate(
		OR_and_interval = sprintf(
			"%.3f ( %.3f - %.3f )",
			exp( estimate ),
			exp( lower ),
			exp( upper )
		)
	)
)

```

For the additive regression the odds ratio is about $0.72$ - but could reasonably be as low as $0.66$ or as high as
$0.77$.

:::tip Which encoding?

Which genotype encoding has the lowest odds ratio?  Which has the lowest P-value?  Which is the most plausible model?

:::

## Absolute frequencies

If you want to know the absolute modelled frequencies of cases/controls, they can also be worked out.  First, remember that to get from the linear predictor scale back to probability scale you need the logistic function:

```r
logistic = function(x) {
	exp(x) / ( 1 + exp(x))
}
```

The mdoel fit tells us that the estimated frequency of cases among non-O-blood type samples is: 

```r
> logistic( 0.149 )
0.537
```

...and the frequency in O blood type individuals is:
```r
> logistic( 0.34 - 0.253 )
0.454
```

Either way you look at it, it's clear cases are less common in O blood type than non-O blood type individuals.

:::warning Case-control study warning.

This is a **case-control** study so the overall frequencies of cases has more to do with the sampling design than the actual rate of severe malaria in these populations!  But it turns out the differences between genotypes are still relevant.

:::

Finally, although we've talked about odds ratios here, this is in fact a case-vs-*population* control study and because
of this there's an interpretation in terms of *relative risk* or *risk ratio* (rather than odds ratio) in the
population:

:::tip Case-control interpretation

In a case-control study with 'unselected' or 'population' controls, drawn from the general population, it turns out that the odds ratio is an estimate of the *relative risk* in the population:

$$
\text{relative risk} = \frac{P(\text{severe malaria}|\text{O blood group})}{P(\text{severe malaria}|\text{not O blood group})} \approx \text{odds ratio in study}
$$

So you might say here: "O blood type is associated with a 28% redueced risk of severe malaria in these populations".

:::