---
sidebar_position: 2
---

# Maximum likelihood copy number inference

Remember that the 'likelihood function' should compute the "probability of the data given the parameters of interest".
In our case, the 'parameters' are the **unobserved copy number** and the data is - you guessed it - the read coverage!
Let's use our [empirical modelling](./glycophorin_cnv_warmup.md) to set up a likelhood now.

Our general model of the effect of CNVs on coverage is that coverage of a site with copy number `c` should be `c` times
as large as at a site with copy number 1 - plus noise.  (Humans are diploid so the copy number at most sites is 2).

If we think of sequence reads as being generated from each copy independently, a bit of thought shows that the same
relationship happens for the variance as well. So following our normal distribution, our model for copy number c would be that

$$
\text{coverage} \sim \mathcal{N}\left( c \times \text{mean}, c \times \text{variance} \right)
$$

:::tip Note

This is a good formula, isn't ot?  It provides a direct way to link the true copy number, which we want to know, to the
coverage (accounting for noise in the coverage values), that might allow us to infer copy numbers.

:::

Let's try that now. To make it work:

- We will assume only copy numbers of 0 to 5 are possible (i.e. from a homozygous deletion up to a possible three extra copies).  Feel free to increase this if you want to!
- We'll put the results in a giant multidimensional array of `sites` x `samples` x `copy number states`.

We start by computing the per-site likelihood of each data point for each possible copy number. Importantly *we will
continue to work throughout in log space* to avoid any numerical issues. This makes some computations more difficult,
but is a generally good idea when more than a few data points are involved.  So we'll make our array *an array of
copy-number log-likelihoods* and call it `copy.number.lls`:

```
copy.numbers = 0:5 
copy.number.lls = array(
    NA,                                 # fill with missing data to start
    dim = c(                            # dimensions
        nrow  ( sites        ),
        length( samples      ),
        length( copy.numbers )
    ),
    dimnames = list(                    # A good feature of R is you can name everything
        sites$position,
        samples,
        sprintf( "cf=%d", copy.numbers )
    )
)
```

Let's compute these lls:
```
for( sample in 1:length(samples) ) {
    for( i in 1:length(copy.numbers) ) {
        copy.number = copy.numbers[i]
        mean.multiplier = copy.number/2
        variance.multiplier = max( copy.number/2, 0.01 ) # this to be error tolerant, as explained below
        copy.number.lls[,sample,i] = gaussian.ll(
            X[,sample],
            params = list(
                mean = coverage.parameters$mean[sample] * mean.multiplier,
                variance = coverage.parameters$variance[sample] * variance.multiplier
            )
        )
        # Handle the missing data sites.
        # We will just treat missing data as having likelihood 1 (loglikelihood zero) here.
        copy.number.lls[ is.na(X[,sample]),sample, ] = 0
    }
}
```

Look at the top left of the output:
```
View( copy.number.lls[1:10,1:10,] )
```

:::tip Note

In practice it's possible that even sites with zero "real" coverage might get some *observed* coverage. This could
happen due to spurious read alignment, or mis-alignment, for example.

For this reason we used a `variance.multiplier` variable above.  It equals `copy.number / 2` except for copy number
zero, where it allows a small amount of coverage to exist.
:::

These copy number log-likelihoods should now capture some of the important signal in the data.  But how to plot it given it's 3-dimensional?  Here are two ways we could do it.

We could take the maximum likelihood copy number call and plot that (for each sample and each site).

Or, we could recognise that the above is daft because it doesn't take into account what we know - that most people will be diploid at most sites.  Instead, we could use a Bayesian approach to build this information in.
   
The rest of this practical does both these things.  We'll use this function to plot the results:
```R
plot.copy.numbers <- function(
    copy.number,
    filename = NULL,
    title = NULL,
    palette = c( "darkorange2", "darkgoldenrod1", "forestgreen", "deepskyblue2", "deepskyblue4", "blueviolet" )
) { 
    if( !is.null( filename )) {
        pdf( file = filename, width = 6, height = 8 )
    } 
    par(mfrow=c(1,1))
    par( mar = c( 4, 4, 2 + 2 *!is.null(title), 2 ) + 0.1 )
    image( copy.number, x = 1:nrow(copy.number), y = 1:ncol(copy.number), xlab = "sites", ylab = "samples", col = palette, zlim = c( 0, length(palette)-1 ), main = title )
    legend( "topleft", pch = 22, col = 'black', pt.bg = palette, legend = c( "hom deletion", "het deletion", "normal", "1 extra copy", "2 extra copies", "3 extra copies" ), bg = "white" )
    if( !is.null( filename )) {
        dev.off()
    }
}
```

## Copy number inference using MLEs

Let's use our likelihood function to compute the **maximum likelihood copy number state** for each individual at each site:
```
maximum.likelihood.state = array( NA, dim = c( nrow(X), ncol( X ) ), dimnames = list( sites$position, samples ))
for( variant in 1:nrow( X )) {
    for( sample in 1:ncol(X)) {
        w = which.max( copy.number.lls[variant,sample,] )
        stopifnot( !is.na(w) )
        maximum.likelihood.state[variant,sample] = copy.numbers[w]
    }
}

plot.copy.numbers( maximum.likelihood.state, title = "Maximum likelihood copy number" )
```

That plot definitely looks cleaner!  Still lots of noise though, can we do better?

