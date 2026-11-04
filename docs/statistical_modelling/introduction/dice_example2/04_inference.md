---
sidebar_position: 5
---

# Maximum likelihood inference

:::tip Challenge

By looking at the (log) likelihoods for different dice models, try to work out which model fits best.  

Is it the one where I blu-tacked 1 (so that 6 never turns up?). Or the one where I blu-tacked 4 (so that 3 never turns
up)?  Or another one?

:::

Here is a way to do that using `tribble()` (a tibble specified row-wise) to put together the loglikeihood under all the
possible models:

```r
loglikelihoods = tibble::tribble(
	~model, ~loglikelihood,
	"Normal dice",        total_loglikelihood( data$sum_of_dice, rep( 1/6, 6 ) ),
	"Omit 1",             total_loglikelihood( data$sum_of_dice, c(  0.0,  0.2,  0.2,  0.2,  0.2,  0.2 ) ),
	"Omit 2",             total_loglikelihood( data$sum_of_dice, c(  0.2,  0.0,  0.2,  0.2,  0.2,  0.2 ) ),
	"Omit 3",             total_loglikelihood( data$sum_of_dice, c(  0.2,  0.2,  0.0,  0.2,  0.2,  0.2 ) ),
	"Omit 4",             total_loglikelihood( data$sum_of_dice, c(  0.2,  0.2,  0.2,  0.0,  0.2,  0.2 ) ),
	"Omit 5",             total_loglikelihood( data$sum_of_dice, c(  0.2,  0.2,  0.2,  0.2,  0.0,  0.2 ) ),
	"Omit 6",             total_loglikelihood( data$sum_of_dice, c(  0.2,  0.2,  0.2,  0.2,  0.2,  0.0 ) )
)
```

```r
print( loglikelihoods )
```

We could plot that:
```r
(
	ggplot( data = loglikelihoods )
	+ geom_point(
		aes( x = model, y = loglikelihood )
	)
    + theme(
        axis.text.x = element_text( angle = 60, hjust = 1, vjust = 1 )
    )
)
```

What does that mean?
