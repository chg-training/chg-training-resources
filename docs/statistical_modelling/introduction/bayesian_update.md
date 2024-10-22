---
sidebar_position: 99
---

# The bayesian update

Now let's consider a more complex situation.

:::tip Scenario

Imagine we're interested in a genetic variant which has two alleles **A** and **B**.  We sample some chromosomes from a large
population and want to use Bayes to estimate the allele frequency.  

:::

How does Bayes theorem learn about data?  To find out, type your observed alleles (a list of A's and B's) into the **Bayesian update-o-meter™** below:

<iframe src="/chg-training-resources/html/bayesian_update.html" width="1000px" height="600px"> 
</iframe>

What you are seeing is the **bayesian update**.  With each observation you make, Bayes' theorem computes its new belief (i.e. the posterior distribution) about the frequency of the 'B' allele.

The **solid line** shows the current posterior.  The estimate shows the posterior mean estimate (that is, the mean of the distribution.  

The **dashed line** shows the posterior one data step before (i.e. before the last observation).

The **estimates on the right** show the posterior mean and posterior mode (peak) values.  (For most data, these are similar but not quite the same as each other.)

:::tip Note

The *order* of A's and B's does not matter to the posterior, just their number.

:::



Play around with this a little and then try this.

* Press 'reset' data (and/or 'reset prior') or delete the data to get back to the start.
* Add a single 'A' allele observation.  What does the posterior look like?  What is the 'best guess' allele frequency estimate?
* Delete it and add a single 'B' allele observation instead.  What does the posterior look like?  What is the 'best guess' allele frequency estimate?
* What if you add two 'B' alleles? Three?  How many do you have to be really confident the frequency is 100%?
* Now try adding a mixture of 'A' and 'B' alleles.  For example, try four `A`s and two `Bs`.  What does the posterior look like?


## Adding prior information

Reset the data again.

Suppose we already had data on this population - for example, suppose we'd done a pilot experiment and already observed five of each allele.  Model this now by setting 'Prior A' and 'Prior B' to 5.

Now you can see that, before we start collecting data, the prior is already reasonably sure that we have an allele frequency somewhere in the middle of the range.

What happens now as we add data (for example, four `A`s and two `B`s again)?  Is the change in posterior

If you press 'reset data' you can see what this looks like. The **prior data** behaves just like the data, 

## Explanation

In this scenario it turns out that:

1. **The likelihood function is a [binomial distribution](./some_distributions.md).**

**Explanation**: Provided we are drawing alleles from a large population (so that sampling doesn't change the frequency
much), the probability of the data just depends on the true population frequency.  If $n_A$ and $n_B$ are the counts of 'A' and 'B' alleles, and if $f$ is the frequency of the 'B' allele, the likelihood is
$$
\text{likelihood}(f) = P(\text{data}|f) = \text{a constant} \times
f^{n_B}\cdot(1-f)^{n_A}
$$

2. **The posterior is a [beta distribution](./some_distributions.md).**

**Explanation**: specifically, it is
$$
\text{posterior}(f) = \text{another constant} \times f^{n_B}\cdot (1-f)^{n_A}
$$

If this looks suspiciously like the likelihood, it is!

:::tip Key point

The only difference is in the **constant**.  

The constant in the likelihood is supposed to normalise the distribution over all possible values of data.  If the data is the number of 'A' and 'B' alleles in the data, the constant is $A+B\choose B$ as in the [definition of the binomial distribution](./some_distributions.md).  (On the other hand, if we think of the whole ordered sequence of A's and B's as the data, the constant is just $1$.)  Regardless, this is *constant with respect to the frequency $f$* so it doesnt really affect our inference.

On the other hand the constant in the posterior has the job of normalising the distribution over all possible allele frequencies $f$.
This is where the mathematical form of the beta distribution is useful - it can be worked out, and turns out to be
$$
\frac{1}{B(n_A+1,n_B+1)}
$$
where $B()$ is a particular function called the [*beta function*])(https://en.wikipedia.org/wiki/Beta_function).  If you read its definition, you'll see it is, essentially, just the function needed to normalise this distribution.

In other words, even though in principle we'd have to work out the normalising constant to figure out the posterior - here it is determined by the maths.  Someone has worked it out for us already.  Thanks!

:::

In shorter version we could write:
$$
P\left(f|n_A,n_B\right) = \text{beta}(n_B+1,n_A+1)
$$

If we add prior inforamtion - say $x_A$ 'A's and $x_B$ 'B's - the posterior changes to:
$$
P\left(f|n_A,n_B\right) ~ \text{beta}( n_B + x_B + 1, n_A + x_A + 1 )
$$

In other words to
$$
\text{posterior}(f) = \text{another constant} \times f^{n_B+x_B}\cdot (1-f)^{n_A+x_A}
$$
