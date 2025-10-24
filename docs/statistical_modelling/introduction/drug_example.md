---
sidebar_position: 2.1
---

# Toy example 1: a drug trial

Acme Inc. has run a trial of some new treatments against a chronic, currently untreatable condition. They ascertained affected people and either gave them a placebo, or one of two treatments.  They then followed up with each participant after a year.

The data looks like this:

```
data = tibble::tribble(
	       ~group,  ~disease, ~recovered,
	    'placebo',       465,         35,
	'treatment A',        78,         12,
	'treatment B',         5,          1
)
```

There are two key **scientific questions** we would like to know about a trial like this.

:::note Basic questions, simple form
**Question 1**: Does treatment A or B have any effect (over and above that of the placebo)?

**Question 2**: What's the strength of the treatment effect?
:::

:::tip Question

What's your estimate do you make of the proportion of recovered people given each treatment?

:::

You'll notice that - if we just look at point estimates - both treatments seem to be doing something here - maybe better than the placebo?

However, if you've simply computed $\text{recovery rate} = \frac{\text{recovered}}{\text{total}}$, these estimates don't tell us *how uncertain we are* in the estimates. For that, we need to model the data using a distribution.

## The key statistical questions

A moment's thought should tell you that, taken literally, the questions are unanswerable (after all, we only have a small sample of people to study here, so the best we can do is estimate).  Let's modify them to something we might be able to answer:

:::note Basic questions, improved form
**Question 1**: How much evidence is there that treatment A or B has any effect (over and above that of the placebo)?

**Question 2**: What's our best estimate of the treatment effect, and how uncertain are we in it?
:::

Questions 1 and 2 are clearly the right questions to ask, but there's also a **3rd question** which is often asked (and answered) first - largely because it is **simpler to address**:

:::tip Easier-to-answer question

**Question 3**: How unlikely was the treatment data 'by chance' (i.e. if there was no true effect?)

:::

Question 3 is sort-of-but-not-quite an answer to Question 1.  It is usually answered by computing a **P-value**.

We'll attack Question 3 first and to make progress we'll take the following approach:

1. Model the data using a [distribution](./some_distributions.md).
2. Use the distribution to compute a P-value

## Modelling the data using a binomial distribution

In the example above we could work as follows: we could assume that the 'true' rate of recovery for people in treatment class X is some fraction, say $\pi$.  Then, a reasonable way to model the row for treatment X would be a [binomial distribution](./some_distributions.md).  In maths we might write:
$$
\#(\text{recovered}) \sim \text{binom}\left(n = \#\text{total participants},p = \pi\right)
$$

So for example, in the first row there are 100 participants, so we might model the number of recovered participants as
$$
\#(\text{recovered})|\text{placebo} \sim \text{binom}\left(n = 100, p = \pi\right)
$$

You should realise that in doing this we are making an **approximation**.  For example, in the above we've ignored all the real details of the study, like who the people are, how they were ascertained, their ages or other characteristics.  Instead we've just assumed they are all governed by a single 'recover frequency' parameter $\pi$.

## P-values in the drug trial example

We're in a good position to answer Question 3 already so let's do that on this page.  The basic idea goes:

1. Model the data using a **likelihood function** as we did above.
2. Use it to assess Question 3 by computing a **P-value**, reflecting the chance of seeing such extreme observations 'by chance' (if there wasn't any true effect).

:::tip P-value challenge

Let's assume that rate of recovery among untreated (or placebo-treated) individuals is exactly 7% (as it's well estimated from the placebo effect data).

For treatment A and B, use the cumulative distribution function of the binomial distribution (`pbinom()`) to answer the question:

**How unlikely was it to see such an extreme number of recovered individuals 'by chance'**? (i.e. if the treatment had no true effect).

**Hint 1.** The cdf for the binomial can be computed using `pbinom()`.  As with [`dbinom()`](./some_distributions.md), it uses the notation `prob` instead of $\pi$ and `size` instead of $n$.  And the 'quantile' (i.e. the observation) goes in as `q`.  So if we were doing this for the placebo row, you could compute the cdf using something like this:
```
pbinom( q = <something>, size = <something>, prob = 0.07 )
```

:::

:::warning Warning

You might find your P-values seem quite large - maybe they're very close to one.  Is this right?

**Hint** you have used `pbinom()` to compute the mass under the tail of the binomial distribution of values 'more extreme' than the observation.  But which tail did you use?

:::

## Answering scientific questions

Great! We've answered question 3.  Many people stop here and take the P-value as the output of their analysis.

However, if you look back at what question 3 is - you'll see it's not quite the same as the scientific questions we wanted answered. In particular it *doesn't* answer: how much evidence is there that the drug has an effect?  Nor does it tell us what estimates of the effects we should take.

One reason for this is that question 3 makes no mention of what a 'true' effect might look like.  Questions 1 and 2 are in fact **fundamentally harder** because they reflect the underlying scientific questions rather than just the maths of our likelihood function under a particular assumed parameter value.

We'll now turn to a framework which helps reason about it, using [Bayes theorem](./bayes.md).
