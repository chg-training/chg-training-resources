---
sidebar_position: 8
---

# 8. Analyse A/B or A/B/O blood group

If you got this far you will probably be pretty convinced that 'O' blood group is associated with a reduced risk of
severe malaria - at least in these populations.  In short, the estimates seem reasonably strong (about 30% protection),
not plausibly due to chance (small P-values), reasonably consistent across populations (as shown in the forest plot) and
not explained by ethnicity or sex.

Ok - but what about A/B blood type?

**Your challenge**. Analyse A/B blood group now.  What is your overall conclusion?

Here are some hints to get started.  Three possible lines of attack are:

1. Encode `rs8176746` appropriately and try it on its own, just as you did for `rs8176719`.  Is it associated?
2. Try it included in the model **alongside rs8176719**.  Does this make a difference?
3. Or, you could try encoding it together with the O blood type mutation to create a combined call of 'blood type' for each individual (see below for more on this).

Whatever you do you should of course start by encoding the genotype in a sensible way (or sensible ways).

:::tip Encoding A/B blood type

A/B blood type is primarily encoded by `rs8176746`, which a single nucleotide change in the ABO coding sequence.  The
correspondence is:

| allele | encoded blood type (if non-O) |
| ------ | ----------------------------- |
| `G`    | A blood type (if non-O)       |
| `T`    | B blood type (if non-O)       |

For more information, you can look this up e.g. on [UCSC Genome Browser](https://genome.ucsc.edu/cgi-bin/hgTracks?db=hg38&position=chr9%3A133255835%2D133256035), [Ensembl](https://www.ensembl.org/feature-explorer/GCA_000001405.29/variant:9:133255935:rs8176746) or [gnomad](https://gnomad.broadinstitute.org/variant/9-133255935-G-T?dataset=gnomad_r4).

:::

## A combined A/B/O call

You might want to try making a combined A/B/O call for this.  Here's a tip on doing that:

The overall ABO blood type of a person is generally determined by both these variants (plus other, rarer variants that
we're not considering) on both copies of chromosome 9 in the genome.  So you could try to make a call of this like this:

| rs8176719 | rs8176746 | Predicted blood group phenotype |
| --------- | --------- | ------------------------------- |
| C/C       | G/G       |  A                              |
| C/C       | G/T       |  AB                             |
| C/C       | T/T       |  B                              |
| -/C       | G/G       |  A                              |
| -/C       | G/T       |  B or A? (*)                    |
| -/C       | T/T       |  B                              |
| -/-       | G/G       |  O                              |
| -/-       | G/T       |  O                              |

Unfortunately those **double heterozygotes** (marked *) above make it tricky.  If a person is heterozygous at both
variants, how do you know which rs8176746 allele associates with which rs8176719 allele?

**Fortunately** there's a way to implement a crude form of phasing.  Because, if you table the genotypes at the two
variants, you'll see something interesting:

```
table( data$rs8176719, data$rs8176746 )
```

          G/G  G/T  T/T
     -/- 4621  264    7
     -/C 2331 2244   60
     C/C  331  510  287

If you look at homozygotes in the above table you'll see that the **O blood group deletion almost always lies on the A
blood type background**.

For example in that first row - in individuals homozygous for O blood type, it works out 9,770 of 9,784 haplotypes (i.e.
99.9%) carry the rs8176746 'G' allele - that is, they are on the A blood group background.

For a crude attempt I therefore suggest you throw caution to the wind and **resolve those double heterozygotes** by assuming they are made up of two haplotypes: `- G` and `C T`.  (A person with this genotype would therefore be B blood type.)

:::tip Quick encoding 

A basic way to encode these in R would be something like:
```r
abo_data$abo_type = factor( NA, levels = c( "A", "B", "AB", "O" ))
abo_data$abo_type[ abo_data$rs8176719 == 'C/C' & abo_data$rs8176746 == 'G/G' ] = 'A'
abo_data$abo_type[ abo_data$rs8176719 == 'C/C' & abo_data$rs8176746 == 'G/T' ] = 'AB'
...etc.
```

...but gosh, that's a lot of typing.

As usual there's a slightly slicker way using [dplyr](https://dplyr.tidyverse.org) - namely the `case_when()` command:
```r
abo_data = (
	abo_data
	%>% mutate(
		abo_type = case_when(
			(rs8176719 == 'C/C' & rs8176746 == 'G/G')   ~ 'A',
			(rs8176719 == 'C/C' & rs8176746 == 'G/T')   ~ 'AB',
			(rs8176719 == 'C/C' & rs8176746 == 'T/T')   ~ 'B',
			(rs8176719 == '-/C' & rs8176746 == 'G/G')   ~ 'A',
			(rs8176719 == '-/C' & rs8176746 == 'G/T')   ~ 'B', # !! Assume non-O copy is on the B background !!
			(rs8176719 == '-/C' & rs8176746 == 'T/T')   ~ 'B',
			(rs8176719 == '-/-' )                       ~ 'O',
			.default = NA
		)
	)
	# For regression it's always good to insist on a particular order:
	%>% mutate(
		abo_type = factor( abo_type, levels = c( "A", "AB", "B", "O" ))
	)
)
```

:::

You could now use this as a predictor in the regression instead of the individual variables.

:::warning Question

Is there any difference between doing this and just including the two variants seperately?

Which do you find easire to interpret?  Do they give the same overall conclusions?

:::


Good luck!  Some [worked solutions](./solutions/README.md) are also available if you get stuck.
