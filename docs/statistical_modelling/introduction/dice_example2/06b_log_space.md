---
sidebar_position: 6.5
---

# Log space, revisited

That posterior calculation was ok but didn't really exploit the 'log space' likelihoods.  (It just `exp()`'d them.)
It may be susceptible to the problem of **underflow**.

:::caution Underflow

Underflow happens because, on the computer, numbers have a finite precision.  Problems turn up, in particular, when you combined larger and tiny numbers.

For example, here is a tiny number (which you can try in R - it works fine):
```r
0.01^30
```

But if you make it smaller:
```r
0.01^300
```

Uh-oh - **underflow**.

Something similar happens if you add our small number to a bigger one, like $1$:
```r
1 + 0.01^30
```

You will probably see just '1'.  The result really is $1$:
```r
(1 + 0.01^30) == 1
```

What is happening is that R can't handle

- numbers that are too tiny (though they have to be pretty small)
- or combinations of tiny numbers with larger numbers

...due to the limited precision representation.

Unfortunately, this problem is common in statistical models where the number of data points - and so the tinyness of the probabilities - can grow quite large quite fast.

:::

To make the calculation robust, here's a version of the calculation that works in log space right up until the last
minute - we'll also make it into a convenient function `compute_posteriors()`.

First let's group our models of interest into a data frame:

```r

models = tibble::tribble(
	~model,          ~p1, ~p2, ~p3, ~p4, ~p5, ~p6,
	"normal dice",   1/6, 1/6, 1/6, 1/6, 1/6, 1/6,
	"Omit 1",          0, 0.2, 0.2, 0.2, 0.2, 0.2,
	"Omit 2",        0.2,   0, 0.2, 0.2, 0.2, 0.2,
	"Omit 3",        0.2, 0.2,   0, 0.2, 0.2, 0.2,
	"Omit 4",        0.2, 0.2, 0.2,   0, 0.2, 0.2,
	"Omit 5",        0.2, 0.2, 0.2, 0.2,   0, 0.2,
	"Omit 6",        0.2, 0.2, 0.2, 0.2, 0.2,   0,
)
```

To do the calculation in log space, we still need to sum probabilities (while keeping the values in log space).  What we need is **log sum exp**.

```
log_sum_exp = function( log_values ) {
	a = max( log_values )
	a + log( sum( exp(log_values - a)))
}
```

`log_sum_exp()` computes a sum of values, just like `sum()` - in a numerically stable way.  The difference is that both
the values, and the result, are expressed in log space.


With that, the posterior calculation can be translated as:

```r

compute_posteriors = function(
	data,
	models,
	prior = rep( 1/nrow(models), length( models ))
) {
	(
		models
		%>% mutate( prior = prior )
		%>% group_by( model )
		%>% mutate(
			loglikelihood = total_loglikelihood( data$sum_of_dice, c( p1, p2, p3, p4, p5, p6 ))
		)
		%>% mutate(
			log_prior = log(prior)
		)
		%>% mutate(
			log_normalising_constant = log_sum_exp( log(prior) + loglikelihood)
		)
		%>% mutate(
			posterior = exp(
				(log_prior + loglikelihood) - log_normalising_constant
			)
		)
	)
}
```

Check the result:
```r
compute_posteriors( data, models )
```

This formulation should also make it easier to change the data or models.
