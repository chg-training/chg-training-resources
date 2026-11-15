---
sidebar_position: 4.5
---

# Guidance on the model formula

The [link function](../forms_of_regression.md) transforms the **linear predictor** into a scale useful for modelling $Y$.
In R, you specify this by a 'model formula' - something like `Y ~ A + B + C...`.  This page explains how this works.

For example, in the [linear regression example](../regression.md), we showed this regression:
```r
	lm(
		# model 'formula':
		blood_pressure ~ genotype + another_variable,
		# model data:
		data = simulated_data
	)
```

The line
```
blood_pressure ~ genotype + another_variable
```
is the **model formula**.  There was something similar in the [logistic regression example](../logistic_regression.md).

To figure out how this works, the first thing to know is that by default R silently adds something to your model formula
- specifically it adds a '1'.  So it works like this:

| Formula you type | Formula you get |
| ---------------- | --------------- |
| `Y ~ A`          | `Y ~ 1 + A`     |
| `Y ~ A + B`      | `Y ~ 1 + A + B` |

In other words, R is going to model your $Y$ in terms of a **constant variable $1$** along with the other variables you have
specified.

The second thing to realise is that the formula doesn't actually mean "Add $1$ and $A$ and $B$".  Instead, the `+` signs
mean **"please add this variable as a term to the model"**.  It works like this:

| Formula you type | Formula you get | Linear predictor you get |
| ---------------- | --------------- | --------------------- |
| `Y ~ A`          | `Y ~ 1 + A`     | $\beta_0 + \beta_1 \times A$ |
| `Y ~ A + B`      | `Y ~ 1 + A + B` | $\beta_0 + \beta_1 \times A + \beta_2 \times B$ |

**Maths note.** In writing maths it's common to use $\cdot$ instead of $\times$ to represent multiplication - or even
just omit the times sign altogether. So we will often remove the $\times$ sign altogether to make our formula shorter:

| Formula you type | Formula you get | Linear predictor you get |
| ---------------- | --------------- | --------------------- |
| `Y ~ A`          | `Y ~ 1 + A`     | $\beta_0 + \beta_1 A$ |
| `Y ~ A + B`      | `Y ~ 1 + A + B` | $\beta_0 + \beta_1 A + \beta_2 B$ |

Smooth!

:::tip Definition of the linear predictor

The term on the right-hand side of the tables above is the **linear predictor**.  

It is the sum of $\text{parameter} \times \text{variable}$ for all of the variables you have put in the
model, plus the added constant term.

:::

Note that in your actual model fit the parameters won't be called $\beta_0$, $\beta_1$ and so on.  Instead they'll be
called something more useful that identifies which predictor variable they corresponded to.  For example in the
[original example](../regression.md):

```
# A tibble: 3 × 5
  term             estimate std.error 
  <chr>               <dbl>     <dbl> 
1 (Intercept)       -0.0147    0.0224  ... This is β_0!
2 genotype           0.239     0.0299  ... This is β_1!
3 another_variable   0.0342    0.0201  ... This is β_2!
```

The wonderful thing about the linear predictor is that it can be **any real number at all** - that is, those parameters
can take on any values at all; they are **unconstrained**.  THis is true even though $Y$ might be on different scales.
It is the job of the [link function](../forms_of_regression.md) to turn this back into an interpretable scale.
