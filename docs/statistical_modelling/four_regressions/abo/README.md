---
sidebar_position: 5
---

# Do ABO blood types protect against malaria?

In this section we ask you to investigate association between ABO blood type genotypes and malaria susceptibility, using
**logistic regression**.  The suggested plan of attack is:

1. [Load and inspect the data](./data.md);
2. [Encode the outcome variable](./encoding.md) (case/control 'status') appropriately;
3. [Encode the genotypes](./encode_genotypes.md), including 'O' blood group appropriately;
4. Try [fitting a logistic regression model](./first_fit.md) between the genotype and the phenotype
5. Fit it [controlling for the population](./populations.md); or
6. Fit it seperately in different populations and [make a forest plot](./populations2.md);
7. Try to see whether you can 'explain' the association [using other variables in the data](./other_covariates.md).
8. Repeat the analysis [for A/B or A/B/O blood type](./a_b.md).  What do you conclude?

Go [here](./data.md) to get started.

