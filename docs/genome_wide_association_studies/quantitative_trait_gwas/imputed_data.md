---
sidebar_position: 8
---

# Part 4: Imputation

Genotype imputation allows us to test associations at ungenotyped markers, increase genotyping density for fine-mapping
of GWAS signals, or combine datasets that were genotyped on different arrays. Genotyping arrays are limited by the
number of SNPs and variants that can be included in the array. Genotype imputation is a method by which we can use our
genotype data and additional reference data to statistically infer missing genotypes. This additional data could include
data from other genotype arrays, whole genome sequences, exome capture, etc. There are a number of publicly available
databases which could be used as reference data, such as the 1000 Genomes Project, the Haplotype Reference Consortium,
and the GNOMAD database.

At its core, imputation works on the basis on comparing observed genotypes for each sample with those present in a
reference panel then using intersecting markers to identify reference haplotypes that are most similar to each sample
and fill the gaps in the genotyped sample. The choice of reference population is important when imputing genotype data.
Different populations will have different frequencies of alleles, and varying LD across the genome, both of which can
affect the accuracy of imputation. Populations may also have novel variants that are not present elsewhere, that are not
likely to be successfully imputed if it is not present within the reference population. We have provided imputed
genotype data for each of the sample datasets in GWAS_workshop_files/Imputed_data. The imputed data is generated from
the genotype data that you have been working with above, and imputed using SHAPEIT and IMPUTE2 with the entire 1000
Genomes phase 3 dataset as the reference panel.

IMPUTE2 provides data in the Oxford format. Genotype data is stored in .gen files and the associated sample information
is saved in the .sample file. GCTA does not support this format, so to run the regression using a GRM, you will need to
convert to "best-guess" phenotypes using PLINK then provide these files to GCTA.

## QC of imputed data

Before running regression analyses with imputed data, it is good practice to check the quality of your imputation and
filter out low-quality data. Additional information about the imputation stats for each marker can be found in the `.info`
files. We are going to use this data to check the imputation quality for each population and create a list of poorly
imputed markers to exclude from the association tests. This file contains an "info score" for each marker representing
the observed statistical information associated with allele frequency estimates, and a "certainty" which represents the
average certainty of best-guess genotypes. More information about the file format can be found on the IMPUTE website.

First we are going to check the distribution of info scores for each imputed marker.  Here is an example script to do
this:

```r
library(ggplot2)

# Read in the info file
data <- readr::read_table( "Imputed_data/AMR_imputed.info" )

# Provide a filename for the filtered output
filtered_variants <- "Imputed_data/AMR_imputed.exclude.list"

# Provide a filename for the plot output
png( file = "AMR.info_score.png" )

exclude_data <- subset( data, info <= 0.3 )

readr::write_tsv(
	exclude_data$rs_id,
	file = filtered_variants
)

p <- (
	ggplot(
		data = data,
		mapping = aes( x = info )
	)
	+ geom_histogram( binwidth = 0.01 )
	+ labs( title="Imputation info score", x="info score", y="count" )
)
ggsave( p, file = "AMR.info_score.png" )
print(p)
```

You should see that a fair number of variants have **low IMPUTE info scores** but many have high scores.
For this analysis we've excluded variants with `info < 0.3`.

This script will have generated a list of markers (`AMR_imputed.exclude.list``) to exclude from downstream analyses. We
can then convert the gen file to PLINK format using the following command:

```
plink \
--gen Imputed_data/AMR_imputed.gen.gz \
--sample Imputed_data/AMR_imputed.sample \
--exclude Imputed_data/AMR_imputed.exclude.list \
--oxford-single-chr 19 \
--make-bed \
--out Imputed_data/AMR_imputed.filtered
```


:::tip Challenge

Now go and run the association tests as above, using the filtered imputed data.

How do the associations change when using genotyped or imputed data?

What are some possible reasons for this?

:::
