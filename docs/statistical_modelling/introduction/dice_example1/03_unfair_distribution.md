---
sidebar_position: 3
---

# The actual unfair dice distribution
Of course you may want to know the actual distribution of the two dice.

Here is a function that computes it, for any given sum of dice.  For reasons that will become clear later,
I'll call it a **likelihood**:

```r
two_dice_likelihood <- function(
	x,                                     # sum of dice to evaluate on
	die_model = rep( 1/6, 6 )          # dice model as in simulate_two_dice
) {
	dice1 = tibble::tibble( dice1 = 1:6, dice1_probability = die_model )
	dice2 = tibble::tibble( dice2 = 1:6, dice2_probability = die_model )
	both_dice = (
		dice1
		%>% cross_join( dice2 )
		%>% mutate(
			sum_of_dice = dice1 + dice2,
			probability = dice1_probability * dice2_probability
		)
	)
	by_result = (
		both_dice
		%>% group_by( sum_of_dice )
		%>% summarise(
			number_of_ways = n(),
			probability = sum( probability )
		)
	)

	result = (
		tibble::tibble( sum_of_dice = x )
		%>% left_join( by_result, by = "sum_of_dice" )
	)

	return( result )
}
```

For example here's the result for a fair dice:
```r
two_dice_likelihood( 2:12 )
```

:::tip Question

Plot this for fair or unfair dice - does it match your simulation?

:::

:::tip Question

Feel free to compute the [distribution summary statistics](../summarising_distributions.md) for this distribution.

:::

