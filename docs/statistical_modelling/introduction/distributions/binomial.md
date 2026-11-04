---
sidebar_position: 1
---

# Binomial distribution

The [binomial distribution](https://en.wikipedia.org/wiki/Binomial_distribution) answers the question:

"given $n$ trials which each have a probability $p$ of success, how many successes will I see?"

You can translate that question into many useful ones, such as:

"If I sample 100 chromosomes from a population, how many will carry the non-reference allele (at a variant I'm interested in)?"

or

"If I sequence this heterozygous gene to 10x depth, what's the chance I will see both copies?"

And so on.

:::tip Challenge

Pick a **number of trials** *n* (start between 5 and 20) and a probability $p$ (start between 0.1 and 0.9).  For example:
```r
n = 20
p = 0.1
```

Then plot the *binomial distribution* over the range of integers $x = 0, 1, 2, \cdots, n$.

The binomial distribution is given by `dbinom()` in R, and can be used like this:
```r
dbinom( x, size = n, prob = p )
```

How does the shape of the binomial differ as you vary $n$ and $p$?

:::


:::caution for experts
The expression for the binomial distribution is:

$$
x|n,p \sim {n \choose x} p^x (1-p)^{n-x}
$$

Here ${n \choose x}$ means 'n choose x' - the number of ways of choosing x things from n things - which can be computed using `choose(n,x)` in R.
For **extra kudos**, try using the formula to write your own `binomial(x, n, p)` function and plot it.

:::

## Cumulative distribution

`dbinom()` answers: what's the chance of seeing exactly $x$ successes, given $n$ and $p$?  But what if we want to know the chance of seeing at least that many, or no more than that many?

Well one way is to add it up (add up the height of the bars).  If you want this done for you, it's a job for `pbinom()`.  For example:

```r
n = 20
p = 0.1
# Chance of seeing 5 or fewer success
pbinom( q = 5, prob = p, size = n )
```

:::tip Note

`pbinom()` implementes the **cumulative density function** for the binomial distribution.  It's just obtained by adding
up the values in the density you plotted above, from left to right.
:::

Note the function is just the same as `dbinom()`, but you change the first letter of the function name.  (The only
difference is that first argument name has become 'q' and not 'x'!)

If you want the chance of 5 or more, you can invert it:
```
# Chance of seeing 5 or more success
1 - pbinom( q = 4, prob = p, size = n )
```

But `pbinom()` also has an argument, `lower.tail = FALSE` which does this:
```
pbinom( q = 4, prob = p, size = n, lower.tail = FALSE )
```

