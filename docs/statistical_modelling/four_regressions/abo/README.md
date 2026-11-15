---
sidebar_position: 5
---

# Do ABO blood types protect against malaria?

In this section we ask you to investigate association between ABO blood type genotypes and malaria susceptibility, using
**logistic regression**.  The suggested plan of attack is:

1. Load and inspect the data
2. Encode the outcome variable (case/control 'status') appropriately
3. Encode the genotypes, including 'O' blood group appropriately
4. Try fitting a logistic regression model between the genotype and the phenotype
5. Fit it controlling for the population; or
6. Fit it seperately in different populations and make a forest plot
7. Try to see whether you can 'explain' the association using other variables in the data.
8. Repeat the analysis for A/B or A/B/O blood type.  What do you conclude?

Go [here](./data.md) to get started.

Load the data for this question like this:
```r
abo_data = readr::read_tsv( "https://raw.githubusercontent.com/chg-training/chg-training-resources/main/docs/statistical_modelling/regression_modelling/data/o_bld_group_data.tsv" )
```

Have a good look at the data first to see what's in there.  It consists of

* Data on children from different African countries (how many samples in each?)
* ...with a severe malaria `status` column reflecting their phenotype
* .. and other columns, reflecting their sex and ethnicity
* and `PC` columns reflecting their genome-wide genetic background

Finally there are two columns - `rs8176719` and `rs8176746` which contain **genotypes** for the two common variants that determine ABO blood type.  

**Note**: these are real data which come from [this study](https://doi.org/10.1038/s41467-019-13480-z) of severe malaria susceptibility in African children.

## The question

:::tip Question

Your question is:

**Do ABO blood groups protect against malaria?**

You can use **logistic regression** to try to answer this.

:::

I will now suggest an attack on this problem!

## Try logistic!

You ought to be able to attack this by fitting a logistic regression model of the outcome variable (severe malaria) on
the genotypes - something like:

```r
broom::tidy(
	glm(
		status ~ rs8176746,
		data   = abo_data,
		family = "binomial"
	)
)
```

But you'll probably find an error in there about the $Y$ variable.  You'll have to encode it appropriately.  Using cases=$1$, controls = $0$ is a good way:
```
abo_data = abo_data %>% mutate(
	Y = case_when(
		status == 'CASE'    ~ 1,
		status == 'CONTROL' ~ 0,
		.default            = NA
	)
)
```

```r
broom::tidy(
	glm(
		Y ~ rs8176746,
		data   = abo_data,
		family = "binomial"
	)
)
```

```
# A tibble: 3 × 5
  term         estimate std.error statistic   p.value
  <chr>           <dbl>     <dbl>     <dbl>     <dbl>
1 (Intercept)   -0.0521    0.0232     -2.24 0.0250   
2 rs8176746G/T   0.179     0.0430      4.16 0.0000325
3 rs8176746T/T   0.372     0.109       3.40 0.000666 
```

Yay!  Is it obvious what the answer is?

## Encode your genotypes

That variant `rs8176746` is the major variant which determines whether the corresponding copy of $ABO$  expresses the A or B antigen - like this:

|  Allele | Antigen   |
| ------- | --------- |
| `T` | B antigen     |
| `G` | A antigen     |

But of course humans are diploid, so the genotypes are `T/T`, `G/T`, and `G/G`.  

A first thing to do is get the genotyes encoded the right way for the regression you want to perform.

To control this, you will want to define a 'baseline' level of the genotype (against which the effects are measured) and then define the other genotypes as other levels.  (An R `factor` is useful for this.)

Do you want to encode it so it's just the number of copies of the 'G' allele, for example?

```r
abo_data = abo_data %>% mutate(
	rs8176746_encoded = c( "T/T" = 0, "G/T", "G/G" = 2 )[rs8176746]
)
```

Or maybe you want to encode it so the different genotypes are all different?  Here a factor is useful:

```r
abo_data = abo_data %>% mutate(
	rs8176746_encoded = factor( rs8176746, levels = c( "T/T", "G/T" "G/G" ))
)
```

Or there could be dominance/recessive effects - maybe it just matters whether you have at least one functional A antigen?

(You can of course try different encodings.)

Make sure you know what different encodings do to the regression.

:::tip Note

Whichever way(s) you encode it, remember that the **estimates in the output** are relative to the encoding you've put in.

:::

But!  Remember you have two variants in the data!  We'll come back to `rs8176719` below.

## Interpret your output

**Note.** More advice on interpreting results is on [this page](../interpreting_regression.md).

For logistic regression, remember that the linear predictor is on the [log-odds scale](../regression.md). This turns out
to mean that the estimates are **log odds ratios** (except the intercept, which is a log odds).  You could calculate
odds ratios easily, as

```r
(
	broom::tidy(
		glm(
			Y ~ <my encoded variable>,
			data   = abo_data,
			family = "binomial"
		)
	)
	%>% filter( term != '(Intercept)' )
	%>% mutate(
		OR = exp( estimate ),
		lower = exp( estimate - 1.96 * std.error ),
		upper = exp( estimate + 1.96 * std.error )
	)
)
```

What do those odds ratios mean?

## Looking across populations

Of course you probably want to see if results are consistent across populations.  It turns out there is a really easy
way to do that using `dplyr` and `group_by()`:

```r
(
	abo_data
	# Do this once, for each country in the data!
	%>% group_by( country )
	# reframe is like summarise(), but works for functions that return data frames:
	%>% reframe(
		broom::tidy(
			glm(
				Y ~ rs8176746, #<my encoded variable>,
				data   = abo_data,
				family = "binomial"
			)
		)
	)
)
```

This slightly magical bit of code runs your regression once for each of the grouping variables - it's like a big loop but you don't have to write the loop!

You will see lots of numbers in the output - estimates for each country seperately.

:::tip Challenge

Staring at numbers is boring - you should [make a forest plot](https://en.wikipedia.org/wiki/Forest_plot)
showing the estimates and 95% intervals for each country.

:::

## Controlling for possible confounders

Association [could be caused by confounding](../appendices/guidance_on_predictors_to_include.md).  You should check to see if your results
are affected by inclusion of confounders.

:::tip Note

Because the sampling 'unit' here is one country, it's best to do this in the per-country regressions.
:::

Watch out that you might get a lot of rows of output - a bit of `filter()`ing may be needed!

## Encoding ABO blood type

So, does A/B blood type protect against malaria?

But hang on!  We haven't used the other genotype field `rs8176719` which encodes O blood group.  That's important because it's a loss-of-function variant that encodes O blood type.

Specifially, genes that carry a deletion at `rs8176719`, have a frameshift that leads to a loss of function of the
corresponding copy of *ABO*.  So on each chromosome the encoding is:

|  Allele | Phenotype |
| ------- | --------- |
| `C`     | Intact *ABO* gene <br/><small>potential expression of A and/or B antigens</small>  |
| `-` (deletion) | Truncated, nonfunction *ABO* gene<br/><small>no expression of A and/or B antigens</small> |

:::tip Note
But of course people are diploid.  How should we encode this variable to make sense of it?

Moreover, each chromosome carries one allele at the A/B variant (rs8176746) and one at the O variant rs8176719. Should we encode these all together?
:::

Your challenge:

Find a way, or ways to encode both variants so that you can make sense of this.  What's your conclusion about whether ABO blood type is protective against malaria?


:::tip Final tip

In principle, since these data are not phased, it's hard to know which A/B haplotypes correspond to which O/ non-O ones.
The possibilities are:


```
combined rs8176719 / rs8176746 genotype       blood group phenotype
---------------------------------------       ---------------------
    C/C  G/G                                  A
    C/C  G/T                                  AB
    C/C  T/T                                  B
    -/C  G/G                                  A
    -/C  G/T                                  B or A? (*)
    -/C  T/T                                  B
    -/-  G/G                                  O
    -/-  G/T                                  O
    -/-  T/T                                  O
```

Those double heterozygotes (*) make it tricky ☹️

**However** if you table the genotypes at the two variants, you'll probably see that the O blood
type seems to be almost always on the 'B' type background:


```
table( data$rs8176719, data$rs8176746 )
```

          G/G  G/T  T/T
     -/- 4621  264    7
     -/C 2331 2244   60
     C/C  331  510  287

For example in that first row - among homozygotes, only 7 of 4,628 of the O blood type mutations are on the A haplotype background.

So one way you could approach this is to **pretend this is always the case** and use it to define a combined 'A/B/O' type of each haplotype based on both variants together.

:::

## Causal or not?

Finally - you should realise we can't really answer out question using this observational data. As we have done, we can
however try and see if they're 'associated' with protection, and try to check that's not a spurious result.  

If the association holds up and you can't think of another possible scientific explanation, it might be plausible (if
not completely demonstrated) that it is really due to a protective effect.

