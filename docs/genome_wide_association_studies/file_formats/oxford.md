---
sidebar_position: 3
---

# 'Oxford' file formats format

### .gen file

The GEN file format is designed to hold either directly-typed or imputed genotype data.
To handle this it stores probabilities of each genotype for each sample, rather than a hard-called genotype.

The file consists of one line per SNP, with the following columns:

| column | description |
| ------ | ----------- |
| `chromosome` | The chromosome identifier. **Note.** this column is optional - not all GEN files have it. |
| `SNPID` | An ID for the SNP |
| `rsid` | Another ID for the SNP |
| `position` | Position |
| `Allele A` | The first allele in the data |
| `Allele B` | The second allele in the data |

The remaining columns are in sets of 3 containing genotype probabilities for genotypes `AA`, `AB`, and `BB` for each sample.

:::tip Note

See also the [BGEN format](https://www.bgenformat.org) which is widely used for imputed genotype data.

:::


### .sample file

The sample file has three parts
* a header line detailing the names of the columns in the file
* a line detailing the types of variables stored in each column - this is either '0' (for identifier), 'D' (discrete variable), 'B' for a binary phenotype, or 'C' or 'P' for continuous variables.
* a line for each individual detailing the information for that individual

Here's an example of a `.sample` file:

```
ID pheno sex cov1 cov2
0 B D D C
sample_1 1 male british 2.5
sample_2 0 female british 12.2
sample_2 0 female french 12.2
...
```

### .info file
This file consists of one line per SNP and a single header line at the beginning. This file always contains the following columns (header tags shown in parentheses):

* SNP identifier from -g file (snp_id)
* rsID (rs_id)
* base pair position (position)
* expected frequency of allele coded '1' in the -o file (exp_freq_a1)
* measure of the observed statistical information associated with the allele frequency estimate (info)
* average certainty of best-guess genotypes (certainty)
* internal "type" assigned to SNP (type)
