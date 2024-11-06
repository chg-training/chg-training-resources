---
sidebar_position: 100
---


# Appendix: File formats

Below are brief descriptions of the file formats that you will encounter in this tutorial

## PLINK files

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

## GCTA Files

### .mlma file

This file contains the summary statistics of the linear mixed-model association tests. Similar to the PLINK .qassoc files, the file has a header line followed by a set of statistics for each SNP

| column | description |
| ------ | ----------- |
| `Chr` | Chromosome code |
| `SNP` | Variant identifier |
| `bp` | Base-pair coordinate |
| `A1` | A1 allele from the PLINK `.bim` file |
| `A2` | A2 allele from the PLINK `.bim` file |
| `Freq` | Frequency of the A1 allele |
| `b` | Regression coefficient or SNP effect |
| `se` | standard error of the regession coefficient |
| `p` | p-value |


## Oxford format

### .gen file

This file contains the genotype data for the dataset. The file consists of one line per SNP, with the following columns:
| column | description |
| ------ | ----------- |
| SNP ID | An ID for the SNP |
| rs ID | Another ID for the SNP |
| base-pair position | Position |
| Allele A | The first allele in the data |
| Allele B | The second allele in the data |

The remaining columns are in sets of 3 containing genotype probabilities for genotypes `AA`, `AB`, and `BB` for each sample.

:::tip Note

See also the [BGEN format](https://www.bgenformat.org) which is widely used for imputed genotype data.
:::


### .sample file
The sample file has three parts
* a header line detailing the names of the columns in the file
* a line detailing the types of variables stored in each column
* a line for each individual detailing the information for that individual

### .info file
This file consists of one line per SNP and a single header line at the beginning. This file always contains the following columns (header tags shown in parentheses):

* SNP identifier from -g file (snp_id)
* rsID (rs_id)
* base pair position (position)
* expected frequency of allele coded '1' in the -o file (exp_freq_a1)
* measure of the observed statistical information associated with the allele frequency estimate (info)
* average certainty of best-guess genotypes (certainty)
* internal "type" assigned to SNP (type)
