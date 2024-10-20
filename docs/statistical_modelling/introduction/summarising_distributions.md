---
sidebar_position: 1.9
---

# Distribution summaries

We can also handle distributions by creating some single-number **summaries** of the distributions.

If $P(x)$ is a distribution function, here are a few commonly encountered summaries:

| Name | Symbol | Description | Expression |
| ---- | ------ | ---------- | ----------- |
| **Mean** | $\text{mean}()$ | Average (or mean) **value**<br /><small>Also known as 'expected value' or 'expectation'</small> | $\sum_x P(x)\cdot x$ |
| **Variance** | $\text{var}()$ | Average **squared distance to mean**<br /><small>where $\mu = \text{mean}(X)$</small> | $\sum_x P(x)\cdot (x-\mu)^2$ |
| **Entropy** | $H()$ | The average negative log probability<br /><small>interpreted as the average amount of 'information' in a value of $X$</small> | $-\sum_x P(x) \ln\left(P(x)\right)$  |

What you'll note about these summaries is that they all have the **same form**.  We are forming an average of some quantity over all possible values of $X$, with the average **weighted by the probability**.  The quantity averaged is either:

* The value itself, leading to the mean or average value
* The (squared) distance of the value to the mean, forming the variance.  This is a measure of how 'spread out' or 'uncertain' the distribution is.  If most of the likely values are close together (i.e. we are relatively certain about the value), the variance will be low, but if the probability mass is spread out a lot then the variance will be high.
* Or (minus) the logarithm of the probability itself, forming the entropy.  This is another measure of how 'uncertain' the distribution is.  We won't make much use of it in this course but you may come across it.

:::tip Challenge

On the [previous page](./distributions.md) you computed the distribution of the sum of two dice rolls.

Now compute the mean, the variance and standard deviation, and the entropy.  (Use a computer or calculator to do this - the results won't necessarily be nice round numbers.)

What happens to the mean, the variance and the entropy if we change the distribution?  For example what if you make the middle value $7$ have higher probability (and scale other values down accordingly so that it still sums to $1$).  What happens if you make the distribution completely 'flat' (i.e. give the same probabilty to every possible value)?

:::

## Understanding variance

Variance is a measure of the 'uncertainty' of a distribution.  It measures the average squared distance of values to the mean.

Intuitively, what this means is that if a lot of the distribution is far from the mean (i.e. the distribution is 'spread out'), the variance will be large.  While if most of the values are close to the mean, the variance will be small.

:::tip note

Why 'squared distance' instead of something else, like 'absolute distance' here?  There's nothing to stop you measuring 

:::

## Understanding entropy

We won't make much use of entropy in this course, but here is an explainer in case you are interested.

:::tip Entropy is average information content

One way to think of the entropy is like this.  Imagine we draw a value $X=x$ from the distribution.  Suppose we measure how 'surprising' this value is as the negative logarithm of its probability:
$$
\text{surprisingness}(x) = -\log P(X=x)
$$
The entropy is just the *average surprisingness*:
$$
H(X) = \sum_x P(X=x)\cdot\text{surprisingness}(x)
$$

Why is this a sensible definition of "surprisingness"?  Well, note that:

* If $x$ is a very *likely* value (i.e. $P(X=x)$ is close to $1$) it will have a surprisingness close to zero.  
* If $x$ is a value that is very *unlikely* (i.e. $P(X=x)$ is close to $0$) it will have a surprisingness close to infinity.

I've called this 'surprisingness' above, but another way to think of that is 'how much information does a value provide'?  If the value is surprising, it conveys a lot of new information (we should update our beliefs about $X$!) while if it was unsurprising it won't 

:::

Information and uncertainty are two sides of the same coin.

If a distribution has high levels of uncertainty (i.e. it has high entropy) - then observing some values could tell you a lot of new information.

On the other hand, if a distribution has low levels of uncertainty (low entropy) then it will already be concentrated on one or a few highly probable values.  Observing one of values doesn't provide much new information.  

So the **amount of uncertainty in a distribution** is equivalent to **the amount of information an observation gives**, on average (i.e. the entropy).

:::tip Example

Imagine a distribution where all $100\%$ of the mass is on one value, so we are already completely certain about the value of $X$.  The logarithm of $1$ is $0$, so in this case the entropy works our as

$$
H(X)= -1 \times 0 = 0
$$

So entropy = 0 corresponds to the situation of complete certainty in the value.

to the case where all the values $2,\cdots,12$ have the same probability $\tfrac{1}{11}$, so that we are, so to speak, 'completely uncertain' about the value of $X$.  Then the entropy is

$$
H(X) = -\sum_2^{12} \tfrac{1}{11}\cdot \ln\left(\tfrac{1}{11}\right) = -\ln\left(\tfrac{1}{11}\right) \approx 2.4
$$

Like the variance, the **entropy gets bigger** as the probabilty mass gets more spread out - higher entropy means more uncertainty.

:::