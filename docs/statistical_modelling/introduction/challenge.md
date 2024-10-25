---
sidebar_position: 102
---

# Investigating a sickle modifier

Now load the data for **rs61028892**, a single nucleotide polymorphism which has been associated with [control of fetal
haemoglobin](https://www.medrxiv.org/content/10.1101/2023.05.16.23289851v1.full) in individuals with sickle cell
disease.

You can find [rs61028892 data here](https://raw.githubusercontent.com/chg-training/chg-training-resources/main/docs/statistical_modelling/introduction/data/1000_genomes_rs61028892_grouped.tsv).

For this variant you could compute the allele counts from the homozygote and heterozygote genotypes, something like
this:

```r
(
	data
	%>% mutate(
		nA = 2 * rs61028892_0 + rs61028892_1,
		nB = 2 * rs61028892_2 + rs61028892_1 + 
	)
)
```

:::tip Challenge

Make a forest plot across populations for rs61028892 allele frequency.  Which populations is this SNP most common in?

:::

