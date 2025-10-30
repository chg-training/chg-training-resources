---
sidebar_position: 2.5
---

# Bayesian copy number inference

Taking the maximum likelihood approach as we [did a moment
ago](./modelling_copy_number_variation.md#copy-number-inference-using-mles) is a bit daft, isn't it?   It's
sub-optimal because we have salient prior information: most people will be diploid at most sites, with possibly a few
CNVs sprinkled in. Let's build that knowledge in by applying our bayesian reasoning. 

## A prior for copy number variant frequency

Still working seperately for each sample and each site, we will take a prior distribution that puts most weight on
diploid state, and estiamte copy number state by taking posterior expectations.

```R
# our prior - note this should sum to one
prior = c(
    `cn=0` = 0.02,
    `cn=1` = 0.02,
    `cn=2` = 0.9,       # I put 90% weight on diploid state...
    `cn=3` = 0.02,      # ...and 2% weight on everything else - feel free to try different values (make it sum to 1)
    `cn=4` = 0.02, 
    `cn=5` = 0.02
) 
```

Here is another big array to put our results in:
```R
expected.posterior.state = array(
    NA,
    dim = c( nrow(sites), length(samples) ),
    dimnames = list(
        sites$position,
        samples
    )
)
```

Now let's compute it.

Here a small potential technical problem occurs. To compute the normalisation factor in Bayes rule we need to sum over
the possible copy numbers. (Just like with the fair/unfair dice example fom the stats modelling session.) The
probabilities for different copy numbers vary widely in magnitude (from close to -Inf to > 1) and this is a classic
case that causes numerical difficulties. To solve that we are working in log space.

But to compute expectations we now need to compute a sum over probabilities. A direct approach would use `log( sum(
exp( values )))` but this runs the risk of the above numerical problems. Instead, a more numerically stable computation
uses the "**log-sum-exp**" formula, which computes the same value but avoids numerical errors by separating out the largest
value. 

:::tip The log-sum-exp formula

This formula computes
$$
\log \left( \sum_i e^{a_i} \right)
$$
...by first finding the maximum value $a = \text{max}_i(a_i)$ and then doing this:
$$
\log \left( \sum_i e^{a_i} \right) = a + \log \left( \sum_i e^{a_i-a} \right)
$$

:::


Here is a fairly robust implementation:

```R
log.sum.exp <- function(
    x,
    na.rm = FALSE               # This mimics the na.rm argument of base R's sum() function
) {
    result = NA
    z = max( x )
    if( !is.na( z )) {
        terms = x-z
        if( na.rm ) {
            w = which( !is.na( terms ) )
        } else {
            w = 1:length( terms )
        }
        if( length( w ) > 0 ) {
            result = z + log( sum( exp( terms[w] ) ))
        }
    }
    return( result )
}
```

Now let's compute the posteriors:
```R
for( variant in 1:nrow( sites )) {
    for( sample in 1:length(samples)) {

        # These three lines implement Bayes rule, but working in log space
        log.unnormalised.posterior = copy.number.lls[variant,sample,] + log(prior)
        log.normalisation.constant = log.sum.exp( log.unnormalised.posterior )      # equivalent to: log( sum( exp( log.unnormalised.posterior )))
        log.posterior = log.unnormalised.posterior - log.normalisation.constant
        
        # Now compute expected copy number given the posterior distribution
        expected.posterior.state[variant,sample] = sum( exp(log.posterior) * copy.numbers )
    }
}

plot.copy.numbers( expected.posterior.state, title = "Expected posterior copy number" )
```

Compare this with the maximum likelihood copy number calls above - the posterior version is much much cleaner.

It's clear now that there is something goin on in that region - a number of samples have clear runs of deleted or
apparently duplicated bins. To draw out this signal we can cluster samples - here using hierarchical clustering:

```
clustered.order = hclust(
    # we will cluster based on a distances between expected posterior state vectors
    dist( t(expected.posterior.state) )             
)$order

plot.copy.numbers( expected.posterior.state[,clustered.order], title = "Expected posterior copy number (clustered)" )
```

**Note** when you get here, please email me (gavin.band@chg.ox.ac.uk) with the results of your last plot!

## What next?

So, you can use a **likelihood function** along wiht a prior in **Bayes theorem** to estimate copy number in a set of bins.

However, this model **still isn't good enough** because it still only works marginally at each site and sample.  Copy number variants typically arise through recombinations between misaligned sequences ('unequal crossover' or 'non-allelic homologous recombination', although a number of other mechanisms can occur as well). So they lead to long runs of duplicated or deleted DNA and we'd like to include that information in the model too, if only we could figure out how to put it in.  

In the [next part of the tutorial](./glycophorin_cnv_hmm.md) we will see how that can be done by linking this to a type
of model known as a Hidden Markov Model, that models copy number state across the region.

