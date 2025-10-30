---
sidebar_position: 1
---

# Warmup: examining read coverage in a region #

Welcome! The practical studies a region of the human genome on chromosome 4 that is known to
contain large *copy number variants*. These are genetic variants that occur due to mistakes in DNA
replication and lead to deletions, duplications, or other rearrangements of large tracts of DNA. In
general copy number variants (and other structural variants that don't change copy number, such as
inversions) are thought to be extremely important determinants of human disease - the CNVs in
this practical delete or duplicate whole genes, and some of them are 
[associatied with malaria susceptibility](https://dx.doi.org/10.1126/science.aam6393).

On the other hand CNVs and other structural variation are not that well studied, particularly when they
occur in regions of genome duplication or paralogy.

In this practical the plan is to try to genotype CNVs in one such region - the region containing
[*GYPA*](https://en.wikipedia.org/wiki/Glycophorin_A). *GYPA* encodes Glycophorin A, which is one
of the most abundant red cell surface proteins. Malaria parasites are known to interact with
Glycophorin A during invasion, and we got interested in this because it turns out that these CNVs
can provide protection against malaria. The practical is based on data from this paper
<https://dx.doi.org/10.1126/science.aam6393> where we investigated that protection.

To call CNVs we will look at *sequence coverage data* (i.e. how many reads aligned to each genomic
location from short-read sequence data) and look for variation in coverage that might indicate loss
or gain of DNA copies. To make this simple, we have grouped the genome into consecutve 1600bp bins
and we work with *mean coverage in each bin*.

## First look at the data

First of all let's load and look at the data - we'll use R for this practical (but if you are expert you are welcome to
explore other methods).

```R
data = readr::read_tsv( "https://www.chg.ox.ac.uk/bioinformatics/training/gms/data/glycophorin_binned_coverage.tsv.gz" )
View(data)
```

The data has position information in the first few columns, and samples in columns 4 onwards.
Let's split these things out for easier handling.  We'll call the actual data `X`:
```R
sites = data[,1:3]
X = as.matrix( data[,4:ncol(data)] )
rownames(X) = sites$position
samples = colnames( X )
```

How could we plot this data?  One way is just to make a heatmap:

```
image( X, x = 1:nrow(sites), y = 1:length(samples) )
```

This is not all that edifying but a few features are evident. Clearly samples vary in coverage (some rows are more red
than others). Also, some sites seem to have more coverage than others (some columns are more red). Also some sites have
missing data! (White columns). The reason for this is that the region contains paralogous gene copies which make read
mapping difficult - we have excluded bins where mappability was poor.

If you stare hard between bins 300-400, you may start to see some samples seem to have something going on (long
horizontal bands of more yellow or more red). This is the signal we want to extract.  There are a few ways we could try this - for example, a dimension reduction method, like PCA, might work.  Feel free to try that!  Here we are going to explore a modelling approach.

## Using an empirical model to handle variation in the data

Let's look at how coverage actually looks across sites, for the first few samples:
```R
par( mar = c( 2, 2, 2, 1 ) )                                    # this line adjust margins to get more on plot
layout( matrix( 1:25, byrow = T, ncol = 5 ))                    # put multiple panes on one plot
for( i in 1:25 ) {
    h = hist(
        X[,i],                      # coverage values for individual i
        breaks = 25,                # Number of bars to plot
        freq = FALSE,               # This scales the y axis so density sums to 1, i.e. empirical distribution
        main = samples[i]           # This is the plot title
    )
    grid()
}
```

The data for each sample looks kind of uni-modal and sort of symmetrical-ish in general, with a few bumps. Of course
any CNVs might affect that, and that could explain some of the bumps - that's what we want to find out.

For a practical approach we will assume that this **binned coverage follows a Gaussian distribution**. And for a first
guess, we will fit the gaussian using all the data in the 1st 100 bins (which from the plot above don't obviously seem
to contain many CNVs). So let's go ahead and compute the parameters of these gaussians now:

```
coverage.parameters = data.frame(
    sample    = samples,
    mean      = sapply( 1:ncol( X ), function(i) { mean( X[1:100,i], na.rm = T ) }),
    variance  = sapply( 1:ncol( X ), function(i) { var( X[1:100,i], na.rm = T ) })
)
View( coverage.parameters )
```

:::tip R tip

The above might look a bit confusing.  It uses `sapply()` which basically means "apply this function to each of these
values".  In the above we've used it to compute the mean, and variance, of each column of $X$ (but restricting to the first 100 rows).

:::


We're going to use a Gaussian likelihood function to model sequence coverage data.  The `dnorm()` function in R can be used to implement this. In the spirit of making code readable, let's use this to write a `gaussian.ll()` ("Gaussian log-likelihood") function that we will use in our code:

```R
gaussian.ll <- function(
    data,
    params = list(
        mean = 0,
        variance = 1
    )
) {
    return(
        dnorm( data, mean = params$mean, sd = sqrt( params$variance ), log = TRUE )
    )
}
```

:::tip Note

We are working in **log space**, that is, the above computes the **logarithm of the likelihood function**.

The main reason for doing this is that it helps numerically, in particular, helps numerically when multiplying numbers
that are very small.

:::

Let's plot data again along with these likelihood functions, and see how the fit looks:
```
par( mar = c( 2, 2, 2, 1 ) )                                    # this line adjust margins to get more on plot
layout( matrix( 1:25, byrow = T, ncol = 5 ))
x = seq( from = 0, to = 20, by = 0.01 )
for( i in 1:25 ) {

    # Histogram the data
    h = hist(
        X[,i],                      # coverage values for individual i
        breaks = 25,                # Number of bars to plot
        freq = FALSE,               # This scales the y axis so density sums to 1, i.e. empirical distribution
        main = samples[i]           # This is the plot title
    )

    # Overlay the fitted normal / gaussian likelihood curve
    points(
        x,
        exp(
            gaussian.ll(
                data = x,
                params = list(
                    mean = coverage.parameters$mean[i],
                    variance = coverage.parameters$variance[i]
                )
            )
        ),
        type = 'l',
        col = 'red'
    )
    grid()
}
```

The fit looks ... sort of ok.  Not perfect, but not bad, depending on the sample.

:::tip Exercise
Feel free to see how this looks for other samples.  (For example, you could replace `1:25` in the loop above with a random choice of 25 samples - something like:
```
sample( 1:length(samples), 25 )
```

You could also make a quantile-quantile plot for each sample to see how well the model fits.
:::

Clearly this model is not a perfect model of the data, but it might be enough to work with - for the purposes of this
practical we'll go with it.

