---
sidebar_position: 5
---

# 4. Control for population

Fitting across the whole dataset like this is probably a **bit dodgy** because the samples come from several different
countries.

In fact, each of the countries involves a different study site, with different people involved and different sampling
schemes.  And moreover the locations differ widely in terms e.g. of their environmental settings (for example, the local
rates of malaria infection).  Thus, even though the study took care to make 'severe malaria' as homogeneous a phenotype
as possible, there could still be a lot of variation between sites.

One way you could perhaps handle this is to include `country` as a predictor:
```r
broom::tidy( glm( status ~ rs8176719_recessive + country, family = "binomial", data = abo_data ) )
```

However you'll probably notice something odd here.  You added a single predictor, but got back four rows of output!

In fact it's even more odd because there were *five* countries in the data (what were they?) but you only got four back.

What's happening is that behind the scenes, R has turned your categorical variable
```
country = c( "Gambia", "Kenya", "Tanzania", ... )
```

into a giant 0-1 matrix:

```r
Gambia   Ghana   Cameroon   Tanzania   Kenya
     1       0          0          0       0
     0       0          0          0       1
     0       0          0          1       0
     (etc).
```

One of the columns (which one was it?) then gets treated as a 'baseline' level and dropped - and all the other columns
are included as seperate variables in the regression.

In fact, the reason it's done this way is because we already have an overall baseline 'intercept' in the model.  A nicer
way to deal with this, then, is to remove this intercepy - which you do that by specifying `- 1` in the model formula:

```r
broom::tidy( glm( status ~ rs8176719_recessive + country - 1, family = "binomial", data = abo_data ) )
```

If you try this you should see a row per country - but the overall intercept has gone.

**However** you'll probably see that doing this **does not change the effect of rs8176719 at all**.  In a sense, the two
versions are the same, just with different mathematical parameterisations of the country.

:::tip Question

How has controlling for country affected the regression results?

:::

In answering this you should look at the **effect estimate** as well as the **standard error**.  The P-value will get
smaller the further the estimate is from zero, so is useful to look at too.

