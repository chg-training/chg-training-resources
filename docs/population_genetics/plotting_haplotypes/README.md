---
sidebar_position: 0.5
---

# Visualising haplotypes in R

In this page you will load up some real haplotype data (from the 1000 Genomes Project) and plot it in R.

Start by downloading the file `GWD_30x_calls.filtered.tsv.gz` from [this folder](https://www.chg.ox.ac.uk/bioinformatics/training/gms/data/) and loading into R:
```r
gwd = readr::read_tsv( "https://www.chg.ox.ac.uk/bioinformatics/training/gms/data/GWD_30x_calls.filtered.tsv.gz" )

print(gwd)
```

Have a look at the data.  The data consists of genotype calls for 112 'Gambian from the Western Division' individuals
from the recent high-coverage sequencing of [1000 Genomes Project](https://www.internationalgenome.org) samples.

It has data for >30,000 biallelic SNPs (in rows) and the samples in columns.

:::tip Note

If you want to see how this data was generated - follow the [Variant calling and imputation practical](/sequence_data_analysis/variant_calling_and_imputation/README.md).

This data comes from the region of the gene *FUT2*.

:::

## Plotting the haplotypes

Let's plot this data now.  To start, let's turn the genotypes themselves into a matrix.
If you look at the data you'll see the first five columns are variant metadata, so let's get the rest:
```r
GT = as.matrix( gwd[,5:ncol(gwd)])
```

A simple way to plot is to use `image()`.  First we'll throw out monomorphic and rare variants:

```r
frequencies = rowSums(GT) / ncol(GT)
w = which( frequencies > 0 & frequencies < 1 )
GT = GT[w,]
metadata = gwd[w,1:4]
```

Let's first get the number of SNPs and haplotypes in the data:
```r
L = nrow(GT) # number of SNPs
N = ncol(GT) # number of haplotypes
```
and plot:
```r
image(
	GT,
	x = 1:L,
	y = 1:N,
	xlab = "SNPs",
	ylab = "Chromosomes"
)
```

![img](images/haplotypes.png)

Cool!  

But there are three ways we could improve it - we'll try two of these.

First, we could order the haplotypes (i.e. grouping similar haplotypes) which will help to bring out the 'haplotype structure'.  (We'll do this in a moment.)

Second, instead of plotting reference and non-reference alleles, it would be nice to plot ancestral and non-ancestral (i.e. 'derived') alleles.  Then we'd be looking at mutations directly.  (We'll skip this for now.)

## Plotting genes

The third thing it would be nice to do is plot genes on there... let's try this now.  First load the genes.

:::caution Note
The data above is in **build 37** coordinates.  So you will need to get the [build 37 version](https://www.gencodegenes.org/human/release_47lift37.html) of the gencode files for this.
:::

```r
genes = gmsgff::read_gff( "/path/to/gencode_b37.gff3.gz", extra_attributes = c( "gene_name", "gene_type" ) )
```

:::tip Note
To have this code, you have to have installed the `gmsgff` package or [written your own](https://chg-training.github.io/chg-training-resources/bioinformatics/programming_with_gene_annotations3/).  To install it now, try:
```
install.packages(
    "https://www.chg.ox.ac.uk/bioinformatics/training/gms/code/R/gmsgff.tgz",
    repos = NULL,
    type = "source"
)
```
:::

You can get a function to plot genes from [this file](./code/plot_gff.R).

This uses base R so I'm going to make a layout for the plot - with the genes below the sequences.
This will be a multi-panel plot, which takes a bit of care.
I've found the best way to do this is to

1. get rid of R's built-in plot margins, and
2. Instead control the margins as rows in the layout matrix.

For this plot we'll want

- a panel showing the haplotypes
- a panel showing **linking lines** that show the physical location of each SNP
- and a panel showing the genes.

And in between each we will want a small margin line.  Let's try now:

```
# Remove R's built-in plot margins
par( mar = c( 0, 0, 0, 0 ))
# Generate a multi-panel layout
layout(
	matrix(
		c(
			0, 0, 0, # top margin
			0, 1, 0, # haplotypes
			0, 0, 0,
			0, 2, 0, # linking lines
			0, 0, 0,
			0, 3, 0, # genes
			0, 0, 0  # bottom margin
		),
		byrow = T,
		ncol = 3
	),
	widths = c( 0.1, 1, 0.1 ),
	heights = c( 0.1, 1, 0.1, 0.5, 0.1 )
)
```
Now we plot the panels in order:

```
# Plot the haplotypes
image(
	GT,
	x = 1:L,
	y = 1:N,
	xlab = "SNPs",
	ylab = "Chromosomes"
)
```

For the middle panel, let's make a blank plot, and then put some line segments on.
I like three-segmented line segments here, so that's what I'll do!

```
xlim = range( metadata$position )
blank.plot( xlim = xlim, ylim = c( 0, 1 ), xaxs = 'i' )
xs = seq( from = xlim[1], to = xlim[2], length = nrow( metadata ))
ys = c( 0, 0.25, 0.75, 1 )
segments(
	x0 = metadata$position, x1 = metadata$position,
	y0 = ys[1], y1 = ys[2]
)
segments(
	x0 = metadata$position, x1 = xs,
	y0 = ys[2], y1 = ys[3]
)
segments(
	x0 = xs, x1 = xs,
	y0 = ys[3], y1 = ys[4]
)
```

Finally for the last panel we'll plot the genes:
```
plot_gff(
	genes %>% filter( end >= xlim[1] & start <= xlim[2] & type %in% c( "gene", "transcript", "exon", "CDS" ))
)
```

Let's put that all together into a function and try it:
```
plot_haplotypes <- function(
	haplotypes,
	metadata,
	genes,
	region,
	verbose = FALSE
) {
	# Remove R's built-in plot margins
	par( mar = c( 0, 0, 0, 0 ))
	# Generate a multi-panel layout
	layout(
		matrix(
			c(
				0, 0, 0, # top margin
				0, 1, 0, # haplotypes
				0, 0, 0,
				0, 2, 0, # linking lines
				0, 0, 0,
				0, 3, 0, # genes
				0, 0, 0  # bottom margin
			),
			byrow = T,
			ncol = 3
		),
		widths = c( 0.1, 1, 0.1 ),
		heights = c( 0.1, 1, 0.01, 0.2, 0.01, 0.4, 0.1 )
	)


	w = which( metadata$position >= region$start & metadata$position <= region$end )
	haplotypes = haplotypes[w,]
	metadata = metadata[w,]
	L = nrow(haplotypes) # number of SNPs
	N = ncol(haplotypes) # number of haplotypes
	# Plot the haplotypes
	image(
		haplotypes,
		x = 1:L,
		y = 1:N,
		xlab = "SNPs",
		ylab = "Chromosomes",
		xaxt = 'n',
		bty = 'n'
	)

	# Plot the joining segments
	xlim = range( metadata$position )
	blank.plot( xlim = xlim, ylim = c( 0, 1 ), xaxs = 'i' )

	xs = seq( from = xlim[1], to = xlim[2], length = nrow( metadata ))
	ys = c( 0, 0.25, 0.75, 1 )

	# In case there are too many SNPs, let's just take a subset.
	by = 10^(floor( log10( nrow( metadata )))-2)
	indices = (1:nrow(metadata))[seq( from = 1, to = nrow(metadata), by = by )]
	segments(
		x0 = metadata$position[indices], x1 = metadata$position[indices],
		y0 = ys[1], y1 = ys[2],
		col = rgb( 0, 0, 0, 0.2 )
	)
	segments(
		x0 = metadata$position[indices], x1 = xs[indices],
		y0 = ys[2], y1 = ys[3],
		col = rgb( 0, 0, 0, 0.2 )
	)
	segments(
		x0 = xs[indices], x1 = xs[indices],
		y0 = ys[3], y1 = ys[4],
		col = rgb( 0, 0, 0, 0.2 )
	)
	genes = (
		genes
		%>% filter(
			seqid == 'chr19'
			& end >= region$start
			& start <= region$end
			& type %in% c( "gene", "transcript", "exon", "CDS" )
		)
	)

	if( verbose ) {
		print( genes )
	}
	plot_gff(
		genes,
		region = region,
		name = "gene_name",
		verbose = verbose
	)
}
```

...and try it:
```
region = list(
	chromosome = 'chr19',
	start = 48146028,
	end = 49255722
)
plot_haplotypes(
	GT,
	metadata,
	genes,
	region = region
)
```

Let's also zoom in a bit to see the haplotypes around FUT2:
```
FUT2.region = list(
	chromosome = 'chr19',
	start = 48641760,
	end = 48760090
)
plot_haplotypes(
	GT,
	metadata,
	genes,
	region = FUT2.region
)
```

## Ordering the haplotypes

Let's use a simple approach to order the haplotypes in the region - [hierarchical
clustering](https://en.wikipedia.org/wiki/Hierarchical_clustering).

In R we can do this by first constructing a **distance matrix** and then using `hclust()` to cluster it.  Let's try now:


```r
distance = dist(
	t(GT),
	method = "manhattan"
)
```

Here we've used 'manhattan' distance, that is, the distance between two haplotypes is the number of mutational
differences between them.

:::tip Note

The `t()` part is needed around GT, otherwise we will be clustering SNPs instead of samples.  (You'll know if you got
this wrong because the output will be enormous below.

:::

You can see what the distance matrix looks like by converting to a matrix:
```r
as.matrix(distance)[1:10,1:10]
```

You should see something like this:
```
             HG02461_hap1 HG02461_hap2 HG02462_hap1 HG02462_hap2 HG02464_hap1 HG02464_hap2 HG02465_hap1 HG02465_hap2 HG02561_hap1 HG02561_hap2
HG02461_hap1            0         1360         1894         1832         1775         1466         1977         1648         1797         2120
HG02461_hap2         1360            0         2062         1542         1753         1464         1729         1972         1765         1878
HG02462_hap1         1894         2062            0         1668         1599         1886         1615         1878         1737         1872
HG02462_hap2         1832         1542         1668            0         2003         1956         1785         1742         1717         2012
HG02464_hap1         1775         1753         1599         2003            0         1883         1876         1791         1946         2055
HG02464_hap2         1466         1464         1886         1956         1883            0         1895         1788         1679         1656
HG02465_hap1         1977         1729         1615         1785         1876         1895            0         2137         1838         1845
HG02465_hap2         1648         1972         1878         1742         1791         1788         2137            0         1725         2126
HG02561_hap1         1797         1765         1737         1717         1946         1679         1838         1725            0         1935
HG02561_hap2         2120         1878         1872         2012         2055         1656         1845         2126         1935            0
```

Now let's cluster and order them using `hclust()`:
```r
sample_order = hclust( distance )$order
```

Let's plot again - this time ordering the columns (haplotypes) in the data:
```r
plot_haplotypes(
	GT[,sample_order],
	metadata,
	genes,
	region = region
)

plot_haplotypes(
	GT[,sample_order],
	metadata,
	genes,
	region = FUT2.region
)
```

## The frequency of variants

How much variation is there?  Here are a few ways to look at it.

First we could look at the frequencies of all the variants in the data:

```r
par( mfrow = c( 1, 1 ), mar = c( 4.1, 4.1, 4.1, 4.1 ))
frequencies = rowSums( GT ) / ncol( GT )
hist(
	frequencies,
	breaks = 25,
	xlab = "Alt allele frequency",
	ylab = "Count",
	main = "Site frequency spectrum"
)
```

![img](images/sfs.png)

This picture is typical - **most variant alleles are rare**, and only a few are common.

:::tip Note

These are the frequencies at **variable sites** only.  If we computed at every site, there would be an even bigger spike
at zero - counting all the sites that are not variable between people in our data. (How many of these are there in this
region?)

:::

This picture is for *alternate* alleles (versus reference alleles).  A better plot would show the frequencies of
 **derived** alleles (i.e. those that have arisen trhough mutation compared to the common ancestor).  To do that, we
 would need a call of the ancestral allele - which we haven't loaded right now.  So instead let's plot hte **folded site frequency spectrum**:

```r
hist(
	pmin( frequencies, 1 - frequencies ),
	breaks = 25,
	xlab = "Minor allele frequency",
	ylab = "Count",
	main = "Folded site frequency spectrum"
)

```

![img](images/folded_sfs.png)


## Computing diversity

Another natural metric is to measure 'how much variation' there is by computing the average evolutionary distances between haplotypes. The simplest way is just to count the number of mutations that differ between each pair of haplotypes, on average across pairs.

The idea is that (ignoring recombination for a moment) - mutations that seperate two samples represent those that have occurred since their most recent common ancestor.  Roughtly speaking the number of mutations 'counts' the evolutionary distance between the haplotypes.  A natural metric is thus **number of pairwise differences** between the two haplotypes.

Let's see how distantly related the haplotypes are on average, by computing the  **average number of pairwise
differences** between different haplotypes - also known as **nucleotide diversity** - now. To do this we'll write a
function which loops over all pairs of haplotypes in the data.

:::tip Note

How many pairs of distinct haplotypes are there?  The answer is of course the number of ways of drawing two things from $N$ things - known as '$N$ choose 2':

$$
N\quad\text{choose}\quad2 = \frac{N\cdot(N-1)}{2} \\

$$

...also known as the 2nd diagonal in pascal's triangle:
```
N
0           1
1         1   1   ↙
2       1   2   1
3     1   3   3   1
4   1   4   6   4   1
          etc.
```

In R, you can  compute this using the `choose()` function - or just do `N*(N-1)/2` as above, which is what I've done in
the function below.

:::

and so on.  

```r
average_number_of_pairwise_differences = function(
	haplotypes
) {
	N = ncol(haplotypes)
	total = 0
	# Sum over all pairs
	# There are of course much faster ways to do this!
	for( i in 1:(N-1) ) {
		for( j in (i+1):N ) {
			a = haplotypes[,i]
			b = haplotypes[,j]
			total = total + sum( a != b )
		}
	}
	# Divide by the total number of pairs
	return( total / (N*(N-1)/2))
}

average_number_of_pairwise_differences( GT )
```

```
1811.239
```

So haplotypes differ by about 1800 mutations on average, across this 1.1Mb region - or about 1.6 mutations per kilobase.

## Challenge questions

Here are some challenges:

:::tip Challenge 1

The *FUT2* gene is in this data around positions 48,695,971 - 48,705,951.

Can you make a version of the haplotype plot that shows all haplotypes as before, but the ordering is based only on the
SNPs in *FUT2* or a small region around it?

:::

:::tip Challenge 2

Do haplotypes carrying the alternate allele at the SNP `rs601338` (at `chr19:49206674`), which determines secretor status, look different from those that don't?  Try plotting just the haplotypes carrying each allele.

:::

::: Challenge 3

Similarly, if you've done the [genome-wide association study practical](../../genome_wide_association_studies/genome_wide_association_analysis/README.md) you found an association in the *FUT2* gene. Can you make a two-panel version of the haplotype plot, with the top panel being haplotypes that carry the alternate allele of this associated SNP, and the lower panel being haplotypes that don't?

**Hints**:

* You can look up the position of the lead GWAS SNPs in the `metadata` variable.  (Both datasets are in GRCh37 'build 37' coords.)

* You can get the genotypes for the SNP (of course) out of the `GT` matrix.

* Use `layout()` in R to make a two-panel plot, e.g.:
```r
layout( matrix( 1:2, ncol = 1 ))
```
and then plot the panels in order.

:::

Good luck!
