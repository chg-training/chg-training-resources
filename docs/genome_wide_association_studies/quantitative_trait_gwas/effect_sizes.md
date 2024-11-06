---
sidebar_position: 11
---

# Assessing effect sizes

Looking at the genomic region around our main peak, one of the genes in this region is fucosyltransferase 2 (FUT2).
Using the genetic variation data present in Ensembl, we can see that there is a known SNP (rs601338) that is associated
with a known phenotype (Secretor/non-secretor). The wild-type allele (G) encodes a functional copy of the FUT2 gene,
allowing secretion of ABO histo-blood group antigens in the gastro-intestinal tract. These glycoproteins serve as a
viral attachment factor or receptor for some strains of norovirus, influencing susceptibility to infection. A nonsense G
> A mutation at position 428 of the FUT2 gene (position 19:49206674 on GRCh37) results in a defective copy of the FUT2
gene. Individuals homozygous for this mutation (AA; non-secretors) do not express ABO glycoproteins at the gut surface,
providing a protective effect against norovirus infection.

We can test whether the presence of this mutation is associated with differences in antibody responses to norovirus in
our dataset, firstly by checking if the SNP is genotyped in our data, then by testing for an effect of genotype on
phenotype distribution. We can use this information to locate summary statistics for this SNP from our PLINK and GCTA
output using `grep`. See the [file formats](../file_formats/README.md) section for what each column means. You might notice that
grep returns nothing for the genotyped data. This is because the SNP was not included in the original dataset, as is
often the case when using genotype arrays. In this case, imputation has allowed us to estimate genotypes for each
individual.

Both PLINK and GCTA report betas relative to the A1 allele. An A1 frequency > 0.5 indicates that the A1 allele represents the major allele. Likewise, an A1 frequency < 0.5 indicates that the A1 allele represents the minor allele. The betas can give an indicator of the expected effect direction. In quantitative studies, a negative beta would usually be associated with the lower phenotypic value, while the positive beta would suggest that the A1 allele is associated with a higher phenotypic value.
A simple method to test this is to extract the genotypes for each individual in the final dataset (GG/GA/AA), assign them to secretor (GG or GA) or non-secretor (AA) status, and conduct a two-sided Students T-test to test for a significant difference between secretors and non-secretors.

An example R script to test for differences in antibody responses to norovirus between genotypes and plot the
distributions as box and whisker plots is this:

```r
library( ggpubr )
library( dplyr )

# Read in genotypes for the prefiltered dataset
data <- readr::read_tsv( "Phenotype_data/AMR_geno_status.txt" )

# Read in phenotypes for the filtered dataset
phenotypes <- readr::read_tsv("Phenotype_data/AMR_phenotype.INT_transformed.txt" )

# Get list of individuals retained after filtering
keep <- readr::read_table_("AMR_filtered_samples.keep.list" )
colnames(keep) <- c("FID", "IID")

# Get genotypes for only those individuals retained in the analysis
# ... and add the phenotypes
filtered_subset = (
	data 
	%>% filter( IID %in% keep$IID )
	%>% select( IID, Se_genotype )
	%>% inner_join( phenotypes, by = c( "IID" ))
)


# Perform pairwise comparisons between genotypes and plot
my_comparisons <- list(
	c("GG", "GA"),
	c("GA", "AA"),
	c("GG", "AA")
)
p = (
	ggboxplot(
		filtered_subset,
		x = "Se_genotype",
		y = "Noro_response_INT"
	)
	+ stat_compare_means(
		comparisons = my_comparisons,
		method="t.test",
		paired=FALSE
	)
)

ggsave( p, "AMR.Norovirus_response_by_genotype.png" )

```

:::tip Question

Amend the script to use secretor status instead of genotype to determine if these differences also occur
when the population is grouped by secretor status (as described above).

:::

For practicality, we have included the genotypes and secretor status of all individuals in the pre-filtered datasets in
`Phenotype_data/AMR.FUT2_geno_status.txt`. Genotypes are encoded as `GG`, `GA`, `AA` or `NA` for those with at least one
missing allele. If you have time, we encourage you to try to create your own script to extract this information from the
PLINK files yourself. 

:::tip Questions

What is the effect size for rs601338? What does this suggest about the effect of the wild-type and mutated alleles with regards to antibody responses to norovirus?

Are there differences in antibody response against norovirus between genotypes?

What about between secretors and non-secretors?

:::
