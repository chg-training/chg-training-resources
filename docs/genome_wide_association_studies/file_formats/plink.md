---
sidebar_position: 1
---

# PLINK file formats

Data in binary PLINK format, such as that provided for this tutorial, consists of a set of three files each containing information about the genotyping data and the samples included in the dataset. A brief description of each is provided below. More information on file formats can be found on the PLINK website

### .bed files

The binary .bed file contains the genotype calls for each individual in the dataset. As a binary file, data is encoded as bytes, and not easily readable except through programs such as PLINK.

### .bim files
These text files contain information about each variant in the dataset. The file consists of one line per variant, with the following columns:

1. Chromosome name
2. Variant identifier
3. Genomic position in morgans or centimorgans
4. Base-pair position (1-based)
5. Allele 1 (usually the minor allele)
6. Allele 2 (usually the major allele)

:::tip Note
PLINK currently does not handle multi-alellic SNPs (those with more than one alternate allele)

It also has a bad habit of 'flipping' data so the first allele is the minor allele (in the data). If you want to avoid
that, you can run all the commands with the `--keep-allele-order` option, but we've skipped that in this tutorial.

:::

### .fam files
These contain information about each sample in the dataset. The file consists of one line per sample, with the following columns:

1. Family ID
2. Within-family ID (Individual ID)
3. Paternal ID (or "0" if not in dataset)
4. Maternal ID (or "0" if not in dataset)
5. Sex ("1" = male, "2" = female, "0" = unknown)
6. Phenotype value ("-9" = missing; in this data, phenotypes are provided in a separate file)


### .qassoc files

These contain the summary statistics for each SNP included in the association analysis. The file has a header line followed by a set of statistics for each SNP. The column names and contents are as follows:

| column | description |
| ------ | ----------- |
| `CHR` | Chromosome code |
| `SNP` | Variant identifier |
| `BP` | Base-pair coordinate |
| `NMISS` | Number of nonmissing genotype calls |
| `BETA` | Regression coefficient |
| `SE` | Standard error |
| `R2` | Regression r-squared |
| `T` | Wald test (based on t-distribution) |
| `P` | Wald test asymptotic p-value |



