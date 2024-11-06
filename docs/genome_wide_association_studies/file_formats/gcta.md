---
sidebar_position: 2
---

# GCTA file formats

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
