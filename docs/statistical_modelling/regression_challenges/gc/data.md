---
sidebar_position: 1
---

# Loading and inspecting the data

The data can be found
[here](https://users.ox.ac.uk/~whgu0376/training/msc_gm/2026/data/organism_chromosome_summary.tsv).  To load
into R, right-click and choose 'copy link' and then load in R using the `read_tsv()` function as follows:

```r
library( tidyverse )
data = readr::read_tsv( "https://users.ox.ac.uk/~whgu0376/training/msc_gm/2026/data/organism_chromosome_summary.tsv" )
```

Print out the data frame to see what variables it holds.  You should see several columns reflecting the organism,
chromosome, chromosome length, and gc percent.  There are also columns representing the number of genes, and how much of
the chromosome is covered by genes, or by coding sequence and so on.

:::tip Question

Use `table()` to see what values the `organism` column holds.  What organisms are in there?

:::

Before going further let's plot the data.  First, here's a useful theme function to make our plots nicer:

```r
mytheme <- function( font_size = 12 ) {
	(
		# Make y axis titles read horizontally, because I like that!
		theme_minimal( base_size = font_size )
		+ theme(
			# Make y axis titles read horizontally, because I like that!
			axis.title.y = element_text( angle = 0, hjust = 1, vjust = 0.5 )
		)
	)
}
```

Let's plot chromosome length against GC content:

```r
p = (
	ggplot( data = gc_data )
	+ geom_point( aes( x = chromosome_length, y = gc_percent ))
	+ facet_grid( organism ~ . )
	+ mytheme()
	+ xlab( "Chromosome length" )
	+ ylab( "GC %" )
)
print(p)
```

Hmm!  

:::tip Inspect the data!

The data holds other columns as well - such as the numbers of genes and the numbers (and proportions) of bases in genes
in each chromosome.

Look at these now - plot them against each other as well.  Are there any obvious relationships?

:::
