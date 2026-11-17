---
sidebar_position: 1
---

# 1. Load and inspect the data

Load the data for this question like this:
```r
abo_data = readr::read_tsv( "https://raw.githubusercontent.com/chg-training/chg-training-resources/main/docs/statistical_modelling/regression_modelling/data/o_bld_group_data.tsv" )
```

These are real data - they come from [this study](https://doi.org/10.1038/s41467-019-13480-z) of severe malaria
susceptibility in African children.

Have a good look at the data first to see what's in there.  It consists of

* Data on children from different African countries (how many samples in each?)
* ...with a severe malaria `status` column reflecting their phenotype
* .. and other columns, reflecting their sex and ethnicity
* and `PC` columns reflecting their genome-wide genetic background

Finally there are two columns - `rs8176719` and `rs8176746` which contain **genotypes** for the two common variants that determine ABO blood type:

* `rs8176719` is a 1 base-pair indel which determines 'O' blood group type.  Haplotypes which carry the deletion do not produce a functional *ABO* gene.
* `rs8176746` is a SNP in the ABO coding sequene which determines A/B blood group type.  Haplotypes carrying the 'G' allele express A blood type, while those that carry the 'T' allele express B blood type.


If you want to learn more about these variants, I highly recommend looking them up in the [UCSC genome browser](https://genome.ucsc.edu) or the [Ensembl genome browser](https://www.ensembl.org).

:::caution Do due diligence!

You should always inspect data closely before starting any analysis.

Do your due diligence on this data frame now. For example

* Which countries are in the data?
* What is the sample size in each country?
* How many samples are severe malaria cases and how many controls?
* What about rs8176719 and rs8176746 genotypes?
* Are there any other columns?
* Is there any missing data?


**Hint** `table()` or the data verbs can help solve this, e.g.
```r
library( dplyr )
abo_data %>% group_by( country ) %>% count()
```

:::
