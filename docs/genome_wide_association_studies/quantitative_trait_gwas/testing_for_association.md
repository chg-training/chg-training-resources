---
sidebar_position: 7
---

# Part 3: Running a simple regression analysis

Now that you have a good idea of what your data looks like, we are going to run a basic linear regression using filtered
datasets and transformed phenotype data. We will first run the regression using our [filtered genotype
data](./qc_genotypes.md) and the [inverse normal transformed phenotype](./phenotype_qc.md).

## Testing for association 
To run the association analysis, you can use the `--assoc`` flag in `plink` as follows:

```sh
./plink \
--allow-no-sex \
--assoc \
--bfile Genotype_data/AMR_genotypes.filtered \
--out output/AMR_genotypes.filtered \
--pheno Phenotype_data/AMR_phenotype.INT_transformed.txt \
--pheno-name Noro_response_INT
```

:::tip Note

The flag `--pheno_name` is used to indicate a named phenotype column in the phenotype file. This means that you can
store multiple phenotypes (or different phenotype transformations) in the same file.

As a comparison, try running the same analysis with the original (untransformed) phenotype instead.  (Make sure and change the output filename!)
:::

### Association outputs

The results from the association will be saved in a `.qassoc` file.  Take a look at this now.  It should look something
like this:

> CHR                       SNP         BP    NMISS       BETA         SE         R2        T            P 
>  19   rs78961563:46700390:C:T   46700390     2000   -0.05664    0.05271  0.0005774   -1.074       0.2828 
>  19    rs4803905:46703457:G:A   46703457     2000    0.01597    0.06769  2.785e-05   0.2359       0.8135 
>  19  rs117336132:46703639:C:T   46703639     2000   -0.06151    0.06275  0.0004807  -0.9802       0.3271 
>  19    rs2079936:46708462:A:G   46708462     2000  -0.005367      0.034  1.247e-05  -0.1579       0.8746 
>  19    rs8113677:46709129:C:A   46709129     2000    0.06046    0.03214   0.001768    1.881      0.06009 
>  19   rs11881956:46712439:T:C   46712439     2000   -0.05139    0.04454   0.000666   -1.154       0.2487 
  

## Visualising results - Manhattan and Q-Q plots

There are two plots you should immediately make of your GWAS output.

First - make a **manhattan plot**, which summarises the association evidence (in the form of the $-\log_{10} \text{P-value}$) across all genomic positions in the data.  And second, make a **quantile-quantile plot**, which compares the observed P-values, to what would be expected if there were no true signals (and no confounding!).

An easy way is to use the `qqman` package in R to do this (you'll need to install this first):

```r
library(qqman)

options(scipen=999) # removes scientific notation from plot printout

# Read in summary stats from PLINK
data <- readr::read_table( "output/AMR_genotypes.filtered.qassoc" )

manhattan <- function( data ) {
	plot(
		data$BP,
		-log10( data$P ),
		pch = 19, # use filled circles
		bty = 'n',
		xlab = "Position on chromosome 19",
		ylab = ""
	)
	# This funny bit of code puts a horizontal Y axis label on
	mtext( "-log10 P", side = 2, line = 2, las = 1 )
}

qqplot <- function( observed_pvalues ) {
	observed_pvalues = sort( observed_pvalues )
	N = length(observed_pvalues)
	expected_pvalues = 1:N/(N+1)
	plot(
		pmin( -log10(expected_pvalues), 8 ),
		pmin( -log10(observed_pvalues), 8 ),
		pch = 19,  # filled circles...
		cex = 0.5, # ...but make them smaller
		xlab = "expected -log10 P",
		ylab = ""
	)
	# This funny bit of code puts a horizontal Y axis label on
	mtext( "Observed\n-log10 P", side = 2, line = 2, las = 1 )
	abline( a = 0, b = 1, col = 'red' )
}


# Set file name for plots
png( file = "output/AMR.Norovirus_response.transformed.manhattan_qq.png", width=1024, height=512 )

# Let's put both plots in one image.
# The manhattan is wider than the q-q plot, so we'll make an appropariate layout
layout(
	matrix(
		c(
			1, 1,
			2, 0
		),
		byrow =T,
		ncol = 2
	)
)
# and expand the left margin:
par( mar = c( 4.1, 7.1, 4.1, 4.1 ))

# Generate the manhattan plot
manhattan( data )
qqplot( data$P )

dev.off()

```

Hey, it looks like we have a signal!

:::tip Questions

* What does the Q-Q plot tell us about our associations?
* How might QC of our data change the observed signals?

:::
