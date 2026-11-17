---
sidebar_position: 2
---

# A complete solution

Here is a complete solution of the ABO example.  See the sections on the right.

## Initial regressions

```r
abo_data = (
    readr::read_tsv( "https://raw.githubusercontent.com/chg-training/chg-training-resources/main/docs/statistical_modelling/regression_modelling/data/o_bld_group_data.tsv" )
    # Encode the outcome
    %>% mutate(
        status = factor( status, levels = c( "CONTROL", "CASE" ))
    )
    # Encode the rs8176719 genotypes
    %>% mutate(
        rs8176719_additive  = c( 'C/C' = 0, '-/C' = 1, '-/-' = 2 )[ rs8176719 ],
        rs8176719_recessive = c( 'C/C' = 0, '-/C' = 0, '-/-' = 1 )[ rs8176719 ],
        rs8176719_general   = factor( rs8176719, levels = c( 'C/C', '-/C', '-/-' ) )
    )
    # Encode the rs8176746 genotypes
    %>% mutate(
        rs8176746_additive  = c( 'G/G' = 0, 'G/T' = 1, 'T/T' = 2 )[ rs8176746 ]
    )
    # Encode joint genotypes
    %>% mutate(
        abo_type = case_when(
            (rs8176719 == 'C/C' & rs8176746 == 'G/G')   ~ 'A',
            (rs8176719 == 'C/C' & rs8176746 == 'G/T')   ~ 'AB',
            (rs8176719 == 'C/C' & rs8176746 == 'T/T')   ~ 'B',
            (rs8176719 == '-/C' & rs8176746 == 'G/G')   ~ 'A',
            (rs8176719 == '-/C' & rs8176746 == 'G/T')   ~ 'B', # !! Assume non-O copy is on the B background !!
            (rs8176719 == '-/C' & rs8176746 == 'T/T')   ~ 'B',
            (rs8176719 == '-/-' )                       ~ 'O',
            .default = NA
        )
    )
    # For regression it's always good to insist on a particular order:
    %>% mutate(
        abo_type = factor( abo_type, levels = c( "A", "AB", "B", "O" ))
    )
)
```

Regression tests:
```r
broom::tidy( glm( status ~ rs8176719_additive,  family = "binomial", data = abo_data ))
broom::tidy( glm( status ~ rs8176719_recessive, family = "binomial", data = abo_data ))
broom::tidy( glm( status ~ rs8176719_general,   family = "binomial", data = abo_data ))

broom::tidy( glm( status ~ rs8176719_recessive + rs8176746_additive,   family = "binomial", data = abo_data ))
broom::tidy( glm( status ~ rs8176719_general   + rs8176746_additive,   family = "binomial", data = abo_data ))

broom::tidy( glm( status ~ abo_type,            family = "binomial", data = abo_data ))
```

Based on this there seems to be: good evidence that 'O' blood group associates with lower risk of disease; some evidence
that heterozygosity for I is also associated with protection, and possibly evidence that AB is associated with greater
risk.

## By population

Regression tests by population:
```r
grouped = abo_data %>% group_by( country )

grouped %>% reframe( broom::tidy( glm( status ~ rs8176719_additive, family = "binomial", data = pick( everything()) )) %>% filter( term != '(Intercept)' ))
grouped %>% reframe( broom::tidy( glm( status ~ rs8176719_recessive, family = "binomial", data = pick( everything()) )) %>% filter( term != '(Intercept)' ))
grouped %>% reframe( broom::tidy( glm( status ~ rs8176719_general, family = "binomial", data = pick( everything()) )) %>% filter( term != '(Intercept)' ))

grouped %>% reframe( broom::tidy( glm( status ~ rs8176719_recessive + rs8176746_additive,   family = "binomial", data = pick( everything()) )) )
grouped %>% reframe( broom::tidy( glm( status ~ rs8176719_general + rs8176746_additive,   family = "binomial", data = pick( everything()) )) )

grouped %>% reframe( broom::tidy( glm( status ~ rs8176746_additive,  family = "binomial", data = pick( everything()) )) )

grouped %>% reframe( broom::tidy( glm( status ~ abo_type,            family = "binomial", data = pick( everything() ) )))

```

Looking at these it looks like:

* Clear O blood group (with additive or recessive encoding) has good evidence of association in multiple populations -
  and a -ve effect size everywhere.  (Including in Kenya and Gambia where the sample size is largest).

* The A/B SNP rs8176746 is also associated with a risk effect, including in Kenya and Gambia where the sample size is largest.

* But the A/B association seems to largely disappear when including both variants in the model.

* There is, maybe, limited evidence of a small risk effect of 'AB' blood type (e.g. in Gambia and Kenya) but it's pretty weak.

## Making forest plots

Here is a basic forest plot of the recessive effect:
This plot is similar to before, but split into panels based on the term:
```r
p = (
    ggplot(
        data = (
            broom::tidy( glm( status ~ rs8176719_recessive + rs8176746_additive,   family = "binomial", data = abo_data ))
            %>% filter( term != '(Intercept)' )
            %>% mutate(
                logOR_lower = estimate - 1.96 * std.error,
                logOR_upper = estimate + 1.96 * std.error,
                OR          = exp( estimate ),
                OR_lower    = exp( logOR_lower ),
                OR_upper    = exp( logOR_upper )
            )
            # Let's order countries roughly west to east:
            %>% mutate(
                country = factor( country, levels = c( "Gambia", "Ghana", "Cameroon", "Tanzania", "Kenya" ))
            )
        )
    )
	# Add this line to split into panels, one for each term, if you have multiple:
    + geom_segment( aes( x = OR_lower, xend = OR_upper, y = country, yend = country ))
    + geom_point( aes( x = OR, y = country ), size = 8 )
    + geom_vline( xintercept = 1, linetype = 2, linewidth = 2 )
    + theme_minimal( 24 )
)

print( p )
```

For the models by population (or with multiple effects), one approach is to plot similarlyt but use `facet_wrap()` to
split into panels:

```r
p = (
    ggplot(
        data = (
            grouped %>% reframe( broom::tidy( glm( status ~ rs8176719_recessive + rs8176746_additive,   family = "binomial", data = pick( everything()) )) )
            %>% filter( term != '(Intercept)' )
            %>% mutate(
                logOR_lower = estimate - 1.96 * std.error,
                logOR_upper = estimate + 1.96 * std.error,
                OR          = exp( estimate ),
                OR_lower    = exp( logOR_lower ),
                OR_upper    = exp( logOR_upper )
            )
            # Let's order countries roughly west to east:
            %>% mutate(
                country = factor( country, levels = c( "Gambia", "Ghana", "Cameroon", "Tanzania", "Kenya" ))
            )
        )
    )
	# Add this line to split into panels, one for each term, if you have multiple:
    + facet_grid( term ~ . )
    + geom_segment( aes( x = OR_lower, xend = OR_upper, y = country, yend = country ))
    + geom_point( aes( x = OR, y = country ), size = 8 )
    + geom_vline( xintercept = 1, linetype = 2, linewidth = 2 )
    + theme_minimal( 24 )
)

print( p )
```

## Visualising principal components

You might also want to plot the principal components - how much structure is there?
Let's plot them coloured by ethnic group (which here have been re-coded.)

```r
p = (
    ggplot( data = abo_data )
    + geom_point( aes( x = PC_1, y = PC_2, colour = ethnicity ))
    + facet_wrap( ~ country, scales = "free" )
    + theme_minimal( 24 )
)

print(p)
```

Hmm, quite a lot of genetic structure in there.
