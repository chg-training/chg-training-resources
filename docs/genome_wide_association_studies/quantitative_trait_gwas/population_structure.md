---
sidebar_position: 8
---

# Part 4: Working with population substructure and multi-ethnic populations

Our analysis up to now has been carried out under the assumption that response to Norovirus is standard across everyone,
regardless of ethniciy, age, or gender. However, this is not always the case, and these assumptions can lead to spurious
signals or obscure signals that could otherwise be relevant to a subset of individuals. The use of linear mixed models
(LMMs) allow the incorporation of this information into the regression equation, while also accounting for potential
other unidentified or random effects. The inclusion of covariates within the regression analysis allows us to account
for known potential effects. Commonly included covariates, particularly for disease related traits, are age and sex. 

To account for genetic ancestry and ethnicity within a study population, two common methods are to calculate
[Principal Components](../../population_genetics/principal_components_analysis/README.md) and include these within
the model as covariates; or to calculate a **relationship matrix** to be included within the model. In this part of the
tutorial, we will use a calculated relationship matrix to accommodate our multi-ethnic population, and LMMs as
implemented in GCTA. Generating the genetic relatedness matrix (GRM) The first step is to generate our GRMs. Usually,
these would be generated from genotype data across the whole genome. For the purpose of this tutorial, we will only
generate this matrix from the genotype data for the region we are looking at. 

We will use GCTA to generate the GRM files:

```sh
mkdir grm/
./gcta64 \
--bfile Genotype_data/AMR_genotypes.filtered \
--make-grm-bin \
--out grm/AMR_genotypes
```

## Running an association analysis with LMMs

Once you have your GRMs, we can use GCTA to run a linear mixed model association analysis using the `--mlma` flag (for 'mixed linear model association'). We will also include sex as a covariate in the analysis by creating a covariates file from the input .fam file.

First, to generate the (discrete) covariates file:
```
cat Genotype_data/AMR_genotypes.filtered.fam | cut -d " " -f 1,2,5 > Genotype_data/AMR_genotypes.filtered.covars
```

And then to run GCTA:

```sh
./gcta64 \
--mlma \
--bfile Genotype_data/AMR_genotypes.filtered \
--grm grm/AMR_genotypes \
--pheno Phenotype_data/AMR_phenotype.INT_transformed.txt \
--mpheno 2 \
--covar Genotype_data/AMR_genotypes.filtered.covars \
--out output/AMR_genotypes.gcta
```

The resulting `.mlma` files can then be used to generate manhattan and Q-Q plots in a manner similar to that used [before](./testing_for_association.md).

:::tip Questions
Are the association signals consistent between GCTA and PLINK?
What other data could be used as covariates in the analysis? Would these be discrete or continuous covariates?
:::
