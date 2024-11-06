---
sidebar_position: 100
---

# Appendix: Looking for independent signals

It is of course possible that there are multiple independent signals within a single region. To test if this is the
case, we can carry out a conditional analysis on the region, using the allelic dosage of one SNP of interest (usually
the most significant). An example using our causal SNP within FUT2 is provided below.

First we need generate a list of SNP IDs that we want to condition on. For a single ID, this can be done with
```
echo "rs601338:49206674:G:A" > output/rs601338.extract.list
```

Then use this file with GCTA to extract the allelic dosage of this SNP:

```sh
./gcta64 \
--bfile Genotype_data/AMR_imputed.filtered \
--extract output/rs601338.extract.list \
--recode \
--out output/rs601338
```

This will produce and xmat file containing the dosage information. We then unzip this file

```
gunzip -c output/rs601338.xmat.gz > output/rs601338.xmat
```

...and use it as a quantitative covariate in GCTA

```sh
./gcta64 \
--mlma \
--bfile Genotype_data/AMR_imputed.filtered \
--grm grm/AMR_genotypes.filtered \
--pheno Phenotype_data/AMR_phenotype.INT_transformed.txt \
--mpheno 2 \
--qcovar output/rs601338.xmat \
--out output/AMR_imputed.filtered.rs601338
```

We can use the output of this to plot manhattan and Q-Q plots as before. Looking at the manhattan plot for this analysis, we can see that the previous signal is no longer present, suggesting that all the SNPs that reached significance in that part of the genome are linked with that signal. This is consistent with the results from our PLINK LD clump analysis that suggested that there were ~130 SNPs in a linked group around our FUT2 SNP.

:::tip Note

Another way to do this kind of analysis is to use a full fine-mapping approach, such as the one [described here](../meta-analysis_and_fine-mapping/README.md).

:::
