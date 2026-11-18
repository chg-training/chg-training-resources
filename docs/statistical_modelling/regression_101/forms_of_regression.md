---
sidebar_position: 2
---

# Forms of regression

There are in fact a plethora of different regression models which can be used to model different types of $Y$ variable.
They come with a choice of distribution for $Y$.  However, they also typically come with a "link function" that explains how
the parameters of the distribution are related to the linear predictor. 

The job of the link function is to make it so that the linear predictor
$$
\beta_0 + \beta_1 X_1 + \beta_2 X_2 + \cdots
$$

is unconstrained - that is, it can be any real number - even if $Y$ itself only has a restricted range of values.

Because of these different link functions, the interpretation of the parameters is also different between different
models.

For example, here are some common forms of regression:

import identity_thumbnail_url from '@site/static/img/identity_thumbnail.png';
import exp_thumbnail_url from '@site/static/img/exp_thumbnail.png';
import logistic_thumbnail_url from '@site/static/img/logistic_thumbnail.png';

| Outcome variable        | Regression model name | $Y$ modelled as<br/><small>(a distribution)</small>    |  <small>(Inverse of)</small><br/> 'Link' function | Interpretation of the parameter |
| -------                 | ---             | ---        | --- | -- |
| $Y$ is a real number<br/><small>and reasonably gaussian</small>    | **Linear regression** |  [Normal](../introduction/distributions/normal.md) |  <img src={identity_thumbnail_url} style = {{ width: '200px' }} /><br/>Identity $y = x$ | Estimated change in $Y$<br/> for unit change in $X$ |
| $Y$ is $0$ or $1$   | **Logistic regression** |  [Binomial](../introduction/distributions/binomial.md) with $N = 1$<br/><small>Also known as 'Bernoulli'</small> | <img src={logistic_thumbnail_url} style={{width:'200px'}} /><br/>Logistic $y=\frac{e^x}{1+e^x}$ | Estimated change<br/>in **log-odds of $Y$**<br/> for unit change in $X$ |
| $Y$ is a proportion or frequency<br/><small>e.g. proportion of a cell type<br/>in a FACS experiment</small>   | **Beta regression** |  [Beta](../introduction/distributions/beta.md) | <img src={logistic_thumbnail_url} style={{width:'200px'}} /><br/>Also logistic | Estimated change<br/> in **log-odds of $Y$**<br/> for unit change in $X$ |
| $Y$ is a count<br/><small>of rare events in a given time</small>   | **Poisson regression** |  [Poisson](https://en.wikipedia.org/wiki/Poisson_distribution) | <img src={exp_thumbnail_url} style={{width:'200px'}} /><br/>Exponential $y=e^x$  | Estimated change<br/>in $\log(Y)$<br/> for unit change in $X$ |
| *etc.* | | |


To see how this works, look at an example of a [logistic regression](./logistic_regression.md).
