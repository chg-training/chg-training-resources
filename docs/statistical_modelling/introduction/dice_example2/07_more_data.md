---
sidebar_position: 7
---

# Replicate!

One of the best lessons in statistics is that a result isn't a result until it's convincingly replicated.

:::tip Question

We actually rolled the dice many more times.  You can load the next tranche of data like this:
```r
data2 = readr::read_tsv( 'https://users.ox.ac.uk/~whgu0376/training/msc_gm/2026/data/dice_data2.tsv' )
```

or the full set of 311 rolls like this:
```r
full_data = readr::read_tsv( 'https://users.ox.ac.uk/~whgu0376/training/msc_gm/2026/data/dice_data_full.tsv' )
```

What happens if you repeat the analysis in these datasets?

* Does the finding replicate in dataset 2?

* Does it hold up in the full dataset?

* How do the likelihood, or posterior change as more data is added?

* What's your conclusion

:::



