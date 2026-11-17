---
sidebar_position: 4
---

# Guidance on what predictors to include

The question of 'which predictors should I include in my model?' turns out to be a pretty interesting - and potentially complex one.

The first thing to say is that, if all you want to do is *predict* $Y$, then the answer is 'include all the variables
that help predict $Y$.'  (We haven't talked about cross-validation or use of 'training' and 'test' datasets in this
tutorial, but that'd be a good way to help find a set of predictors that are reasonably generalisable if you were trying this.)

For this page I'm going to assume that what you are really trying to do is estimate a **causal effect** of $X$ on $Y$ -
that is, figure out whether changes in $X$ plausibly cause changes in $Y$.  You can't usually *prove* this using a
regression model, but by including other predictors you can certainly try to rule out plausible confounding effects that
might cause spurious association - so if there's still an association, it could plausibly be the one you're looking for.

However - which variables you should include in a model like this turns out to depend  on the [causal relationships
between the variables](../../regression_modelling/causal_graphs.md) - something that you typically don't know for sure
but might be able to hypothesise - as well as on what one is trying to estimate by the model.  

Some general guidance on what to try including is as follows:

* You should definitely include your $X$ variable of interest in there (of course) - encoded appropriately.

* If a variable is unrelated to $X$ but might 'explain some of the variation in $Y$' - it's often a good idea to include
  as a predictor.  Including it soaks up some of the unexplained variation and allows you to get a better estimate of
  the effect of $X$ on the part of $Y$ that really matters.  (This gets more complicated in biased sampling designs,
  like [case-control designs](https://www.nature.com/articles/ng.2346#citeas), though.)

* If a variable is a **mediator** (something affected by $X$ that in turn affects $Y$) - you'd better be careful about
  including it.  You might remove all of the effect of $X$ by doing so!  (In other words it depends if you want to
  estimate the effect through the mediator, or not.)

* If a variable is a **confounder** (something that affects both $X$ and $Y$) - you **definitely** need to include it as
  another predictor.  Otherwise, you will find an association between $X$ and $Y$ despite neither affecting the other.

* There are also variables known as 'colliders' (affected by both $X$ and $Y$) which it is generally a bad idea to
  include in the model.

Here is a quick example to illustrate this.  I'll simulate an $X$ and $Y$ variable, but also a confounder, a mediator,
and a collider - and then see what happens to the regression estimates:

```r
my_data = tibble::tibble(
	a_confounder = rnorm( 1000 ),
	X            = 0.5 * a_confounder + rnorm( 1000, sd = 0.5 ),
	a_mediator   = 0.5 * X + rnorm( 1000, sd = 0.5 ),
	Y            = 0.5 * a_mediator + 0.5 * a_confounder + rnorm( 1000, sd = 0.5 ),
	a_collider   = X + Y + rnorm( 1000, sd = 0.5 )
)
```

The true (causal) effect of $X$ on $Y$ is $0.25$ here - but the effect goes through the mediator variable.

Let's fit it all ways:

**Without any extra variables**:

```
> broom::tidy( lm( Y ~ X, data = my_data ))

  term        estimate std.error statistic   p.value
2 X             0.760     0.0284     26.8  1.51e-119
```

:::warning Oh no!
The estimate of $0.76$ is **much too high**.
:::

**With the confounder in**:

```
> broom::tidy( lm( Y ~ X + a_confounder, data = my_data ))

  term         estimate std.error statistic  p.value
2 X              0.271     0.0339      7.98 4.16e-15
```

:::tip Hmm
The estimate of $0.271$ is **in the right ballpark**.  (It's less than one standard error from the true value, $0.25$.)
:::

**With the mediator in**:
```
> broom::tidy( lm( Y ~ X + a_confounder + a_mediator, data = my_data ))

  term         estimate std.error statistic  p.value
2 X              0.0212    0.0354     0.600 5.49e- 1
```

:::warning Oh no!
The estimate of $0.02$ is **much too small**.
:::

**With the collider in**:

```
> broom::tidy( lm( Y ~ X + a_confounder + a_collider, data = my_data ))

  term         estimate std.error statistic   p.value
2 X            -0.355      0.0296   -12.0   5.19e- 31
```

:::warning Yikes!
The estimate of $-0.355$ **doesn't even have the right sign.**
:::
