---
sidebar_position: 6
---

# Bayesian inference

We're nearly there!  We have (log)likelihoods computed for a set of possible models.  To compute the posterior, we must:

1. multiply by a **prior probability**
2. divide by a **normalising constant**

For this analysis, let's assume the prior places equal weight (of $1/6$) on all the models.

Here were the likelihoods:

```r
loglikelihoods = (
	tibble::tribble(
		~model, ~loglikelihood,
		"normal dice",        total_loglikelihood( data$sum_of_dice, rep( 1/6, 6 )),
		"Omit 1",             total_loglikelihood( data$sum_of_dice, c(  0.0,  0.2,  0.2,  0.2,  0.2,  0.2 ) ),
		"Omit 2",             total_loglikelihood( data$sum_of_dice, c(  0.2,  0.0,  0.2,  0.2,  0.2,  0.2 ) ),
		"Omit 3",             total_loglikelihood( data$sum_of_dice, c(  0.2,  0.2,  0.0,  0.2,  0.2,  0.2 ) ),
		"Omit 4",             total_loglikelihood( data$sum_of_dice, c(  0.2,  0.2,  0.2,  0.0,  0.2,  0.2 ) ),
		"Omit 5",             total_loglikelihood( data$sum_of_dice, c(  0.2,  0.2,  0.2,  0.2,  0.0,  0.2 ) ),
		"Omit 6",             total_loglikelihood( data$sum_of_dice, c(  0.2,  0.2,  0.2,  0.2,  0.2,  0.0 ) )
	)
)
```

```r
posteriors = (
	loglikelihoods
	%>% mutate(
		prior = 1/6,
		likelihood = exp( loglikelihood )
	)
	%>% mutate(
		normalising_constant = sum( likelihood * prior )
	)
	%>% mutate(
		posterior = (likelihood * prior) / sum( likelihood * prior )
	)
)
```

:::
Print it or plot it:

```r
print( posteriors )

(
	ggplot( data = posteriors )
	+ geom_col( aes( x = model, y = posterior) )
	    + theme(
        axis.text.x = element_text( angle = 60, hjust = 1, vjust = 1 )
    )
)
```

Wow.

:::tip Question

Which dice model had the highest posterior?  How high?

What does it mean?

What happens if you remove the 'normal dice' model (since that wasn't really plausible here?)

What do you think would happen if you add the actual best-fitting model?  It's `c( 0.263, 0.174, 0,  0.148,  0.199,  0.279 )`.  
:::


Congratulations!  You've completed your first (or another) bayesian statistical inference!
