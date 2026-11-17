---
sidebar_position: 3
---

# Example: logistic regression

If $Y$ is a binary variable - say a case/control status - it could reasonably be modelled using **logistic regression**.

Logistic regression models $Y$ using a binomial distribution (which broadly models ['the number of successes is $n$ trials'](../introduction/distributions/binomial.md)).  Most commonly, it's assumed that $n=1$ in the binomial distribution (also known as a 'Bernoulli distribution') so that the logistic regression models is for a binary $Y$:

$$
Y\in \{0,1\} \quad \text{or} \quad \text{$Y\in\{\text{control}, \text{case}\}$, say.}
$$

Apart from $n$, the other parameter of the binomial distribution is the *success probability* $p$, which is of course a
probability between $0$ and $1$.  So, to model this, logistic regression uses the **logistic function** to map the
linear predictor

$$
\text{"linear" predictor} = \beta_0 + \beta_1 X_1 + \beta_2 X_2 + \cdots
$$

onto probability space.  The logistic function looks like this:

![image](../regression_modelling/images/logistic.png)

So the way it works is that small values of the linear predictor - maybe -5 or less on the $x$ axis above - get mapped
onto very small probabilities, while large values - say $5$ or above - get mapped onto probabilities close to $1$.
While in the middle, you get intermediate probabilities according to the curved shape of the function.

Fitting a logistic regression is very similar to fitting a linear one.  For example here's a simulated dataset
with a case-control outcome variable representing lung cancer status:

```r
# Useful function that maps [-∞, ∞] to probabilities in [0,1]:
logistic = function(x) { exp(x) / ( 1 + exp(x) )}

simulated_data2 = tibble::tibble(
	# Simulate a genotype taking values 0, 1, 2:
	cigarettes_per_day            = rbinom( 100, size = 10, prob = 0.1 ),
	# Simulate a binary 'lung cancer' variable depending on the above.
	lung_cancer                   = rbinom( 100, size = 1, prob = logistic( -2 + cigarettes_per_day * 2 ))
)
```

It could be fit using logistic regression like this:

```r
# Fit the regression and print results nicely:
broom::tidy(
	# Here is the actual regression:
	glm(
		# model 'formula':
		lung_cancer ~ cigarettes_per_day,
		# model data:
		data        = simulated_data2,
		# model Y using this distribution:
		family      = "binomial"
	)
)

```

```
# A tibble: 2 × 5
  term               estimate std.error statistic     p.value
  <chr>                 <dbl>     <dbl>     <dbl>       <dbl>
1 (Intercept)           -2.23     0.516     -4.33 0.0000148  
2 cigarettes_per_day     2.40     0.466      5.15 0.000000255

```

Wow!  Remember this is a **maximum likelhiood* fit - these parameters find the linear predictor which maximises the probability of the $Y$ data given the predictors.

:::tip Note

To fit a **logistic regression* in R, use the `glm()` function with the `family="binomial"` argument.

:::

Together with the [first example](./regression.md) this illustrates a neat feature of regression modelling.  It gives
you different options for modelling the outcome variable $Y$, but the output of the model is interpreted similarly.

:::warning Warning!

To interpret what the parameters mean, you of course have to remember that this link function is here.  As it turns out, the linear predictor for logistic regression is in 'log odds' space. 

We'll [describe parameter interpretation in more detail later](./interpreting_regression.md).

:::