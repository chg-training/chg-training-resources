---
sidebar_position: 2
---

# Simulating unfair dice

What if our dice were unfair in some way?  Maybe they are weighted oddly.

Turns out this is easy to try - you can just pass the weights into `sample()`:

```r
simulate_two_dice <- function(
	number_of_rolls,
	die_model = rep( 1/6, 6 )
) {
	die1 = sample( 1:6, size = number_of_rolls, replace = T, prob = die_model )
	die2 = sample( 1:6, size = number_of_rolls, replace = T, prob = die_model )
	return(
		tibble::tibble(
			roll = 1:number_of_rolls,
			sum_of_dice = die1 + die2
		)
	)
}
```

So by default this gives you rolls of two fair die - but if you change the probabilities, they'll be unfair.

:::tip Question

What does the histogram look like if you try unfair dice?

For example here's a simulation of a dice that **never rolls 5**:
```r
(
    ggplot(
		data = simulate_two_dice(
			10000,
			die_model = c( 0.2, 0.2, 0.2, 0.2, 0, 0.2 )
		)
	)
    + geom_histogram(
        aes( x = result ),
        breaks = (2:13)-0.5
    )
)
```

How does it look?

Play around with the probabilities. (**Remember** the probabilities ought to sum to 1!)

:::


:::tip Note

Apart from plotting, you could also just count the values in the simulation.  The 'base R' way to do this is `table()`:
```r
simulation = simulate_two_dice( 100, c( 0.2, 0.2, 0.2, 0.2, 0, 0.2 ))
table( simulation$sum_of_dice )
```

The tidyverse way is `group_by()` and `summarise()`, `count()`:
```r
simulation %>% group_by( sum_of_dice ) %>% count()
```
:::
