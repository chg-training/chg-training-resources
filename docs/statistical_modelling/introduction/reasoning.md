---
sidebar_position: 1.5
---

# Statistics is reasoning with uncertainty

I read the above title [on the internet](https://www.johndcook.com/blog/2020/03/30/reasoning-under-uncertainty/).  I
think it sums it well what statistics actually is about.

Another way you could put it is that statistics is about **making inferences when we have incomplete information**.
After all

- "making inferences" is the same thing as reasoning.
- "having incomplete information" is the same thing as being uncertain.

## Modelling uncertainty with distributions

The key way to handle uncertain information in statistics, is to use a **probability distribution**.  This is a mathematical function that expresses the probability that something occurs.  For example, suppose $X$ is a thing we care about.  A distribution for $X$ will have the following properties:

* It should assign a probability (a number between $0$ and $1$) to any possible value of $X$.
* And since $X$ has *some* value, the total probability (across all possible values of $X$) has to add up to $1$.

That's more or less it - it's simply a function that distributes 100% of the probability mass across all the possible values.
A function like this can probability express what we know about the possible values of the variable.

:::tip Example

For example, what is the distribution of the sum of two dice rolls?  Use a pen and paper to draw it.

**Hint**

This can be worked out just by *counting possibilities*.  E.g. if there are $4$ possible dice rolls that generate the value $5$, and there are $36$ possible dice rolls in total, then the probability of getting a $5$ will be $\tfrac{4}{36} = \tfrac{1}{9}$.

:::

## Summarising uncertainty

Ok, so you've worked out 