---
sidebar_position: 4
---

# Guidance on encoding genotypes

You can choose to model the predictor variables $X$ in whatever way makes most sense for your problem.

For example, suppose $X$ is a genotype (for a human individual at an autosomal site).  For simple variants the person can have $0$, $1$, or $2$ copies of an allele at that site.  So a natural encoding is:

$$
X = \text{number of copies of the allele}
$$
which we might call the 'additive' encoding, since each allele copy adds one to the predictor.


On the other hand, maybe you're interested in recessive effects of the allele?  Then this encoding might be better:
$$
X_{\text{recessive}} = \text{$1$ if the individual has $2$ copies of the allele, otherwise $0$}
$$

Or for a dominance effect:
$$
X_{\text{dominant}} = \text{$1$ if the individual has at least $1$ copy of the allele, otherwise $0$}
$$

The great thing about regression is it's easy to include any of these versions as predictors - or indeed try more than one of them at once:
```r
library( dplyr )
my_data = tibble::tibble(
	Y           = rnorm( 100 ),
	X_additive  = rbinom( 100, size = 2, prob = 0.2 )
) %>% mutate(
	X_recessive = (X_additive == 2),
	X_dominant  = (X_additive > 1)
)

broom::tidy(
	lm(
		Y ~ X_additive + X_dominant,
		data = my_data
	)
)
```

```
# A tibble: 3 × 5
  term           estimate std.error statistic p.value
  <chr>             <dbl>     <dbl>     <dbl>   <dbl>
1 (Intercept)       0.151     0.135     1.12    0.267
2 X_additive       -0.190     0.191    -0.995   0.322
3 X_dominantTRUE    0.382     0.513     0.744   0.458
```

:::warning Warning

If you try and include all three variables at once - what do you get?


```r
broom::tidy(
	lm(
		Y ~ X_additive + X_dominant + X_recessive,
		data = my_data
	)
)
```

This is an example where your predictors are linearly dependent (one of them is a linear combination of the others) and
so mathematically there's no solution to the regression.  R has probably decided to remove one of the predictors from the regression to handle this.

**Moral of the story** add all the predictors you feel like - but be wary if the predictors are correlated.

:::
