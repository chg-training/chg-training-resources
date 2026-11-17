---
sidebar_position: 3
---

# Fitting linear regression

Let's use a **linear regression model** to estimate the relationship between GC content and
chromosome length in humans.  This turns out to be really easy to do using `lm()`.

In short, we just pass the data to `lm()` while giving it a model **formula** relating the **outcome variable**
(`gc_percent`, i.e. the 'y axis' variable) to the **predictor variables** - like this:
```R
fit = lm(
	gc_percent ~ chromosome_length,
	data = gc_data %>% filter( organism == 'human' )
)
```

You can see information on the results using `summary()`:
```r
summary( fit )
```

but the most important bit are the *coefficients*:
```r
summary( fit )$coefficients
```

However, if you're like me you probably wish that was a data frame.  If you have tidyverse installed then the
`broom::tidy()` function can help:
```r
broom::tidy( fit )
```

Congratulations!  You probably see something like this!
```r
# A tibble: 2 × 5
  term                   estimate     std.error statistic  p.value
  <chr>                     <dbl>         <dbl>     <dbl>    <dbl>
1 (Intercept)       44.3          1.09              40.7  3.32e-22
2 chromosome_length -0.0000000237 0.00000000775     -3.05 5.82e- 3
```

Remember that this is a linear regression model.  So that estimate says that the model thinks each increase in length by
1bp is associated with... a -0.0000000237% change in GC content.

:::tip Yikes!

That's a really, really small number.  Why?

:::

To get our numbers back on to a reasonable scale, we could **rescale our variables**.  Currently we have `chromosome_length` in bases, and `gc_percent` in percent.  Let's scale them:
```r
gc_data = (
	gc_data
	%>% mutate(
		chromosome_length_in_mb = chromosome_length / 1000000 
	)
)
```

:::tip Question

What will happen to the estimate if we re-fit with this re-scaled variable?

:::

Try it:
```r
broom::tidy(
	lm(
		gc_percent ~ chromosome_length_in_mb,
		data = gc_data %>% filter( organism == 'human' )
	)
)
```

You should see that the estimate is 1 million times bigger than before:
```r
# A tibble: 2 × 5
  term                    estimate std.error statistic  p.value
  <chr>                      <dbl>     <dbl>     <dbl>    <dbl>
1 (Intercept)              44.3      1.09        40.7  3.32e-22
2 chromosome_length_in_mb  -0.0237   0.00775     -3.05 5.82e- 3
```

:::tip Variable scales

This illustrates a key point.  The estimates you get from a (linear) regression model, are *relative to the scale of the
variables that go on*.

If you scale one of the variables, you will also scale the estimate.

:::

You probably want to see how well that fits:
```r
p = (
	ggplot( data = gc_data %>% filter( organism == 'human' ) )
	+ geom_point( aes( x = chromosome_length_in_mb, y = gc_percent ))
	+ geom_abline( intercept = 44.3, slope = -0.0237, colour = 'blue' )
#	+ mytheme()
)
print(p)
```

Hmm again!

:::tip Interpretation

Our `lm()` model thinks that, in humans, there is a negatively sloped relationship between chromosome length and GC
content.  The slope is $-0.0237$.

Moreover, it thinks that we are *reasonably* certain about this estimate (standard error = $0.00775$).  The estimate is
about three standard errors away from zero.  Our model therefore thinks that a slope this big wouldn't be very likely to
be seen 'by chance' ($\text{pvalue} = 5.8\times 10^{-3}$).

It is important to realise this interpretation **only makes any sense** if we assume the relationship really was like a
linear regression model - that is, if GC content really *was* normally distributed around a line of best fit like this.  

Of course it isn't like this!  GC content is the result of complex processes of evolution over millions of years.

Nevertheless, the linear model is still a useful way to estimate the relationship - you just have to remember it's not in any sense the 'true' model for this data.

:::
