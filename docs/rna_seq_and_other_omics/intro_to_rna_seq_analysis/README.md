---
sidebar_position: 1
---

# RNA-Seq data analysis

In this tutorial we will demonstrate how to analyse RNA-Seq data using a published dataset (https://pmc.ncbi.nlm.nih.gov/articles/PMC10050925/), which investigated the transcriptional effects of cell starvation in HeLa cells. Twelve samples were profiled and we will generate a list of differentially expressed (DE) genes between the high-nutrient and starvation conditions. 

The data is deposited in the Gene Expression Omnibus (GEO) and you can view it here:
https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE211066

The files we need for this tutorial are already prepared for downloading - see below.

## Getting setup

To get set up for this practical:

1. Create a new folder for today's workshop on your computer

2. Open a new R session by launching RStudio

3. Set the working directory in RStudio to match the location of the your new folder 

This can be done via the RStudio main menu toolbar at the top: `Session > Set working directory > Choose working directory...`

Navigate through your filesystem to the correct directory and click OK. You can confirm the correct setting of the
working directory with the `getwd` command:

```r
getwd()
```

To get started, download the data files that we will be using by running the following two commands:

```r

download.file("https://www.well.ox.ac.uk/bioinformatics/training/msc_gm/2024/data/rnaseq/GSE211066_Autophagy_RNA-seq_counts.txt", "./GSE211066_raw_count_table.txt")

download.file("https://www.well.ox.ac.uk/bioinformatics/training/msc_gm/2024/data/rnaseq/GSE211066_sample_info.txt", "./GSE211066_sample_info.txt")
```

Load the libraries that we will need for this analysis: `tidyverse` and `edgeR`. 
You may already have these installed but if not, run the relevant code to download and install the packages.

:::tip Note

In case you don't have these, install tidyverse like this:

```r
install.packages("tidyverse")
```

And then install `edgeR` package using Bioconductor:
```
if (!require("BiocManager", quietly = TRUE))
    install.packages("BiocManager")

BiocManager::install("edgeR")
```
:::

Now load the libraries into your R session (note you will need to run the following 2 commands even if the packages were already installed to access them in your current R session).
```r
library(tidyverse)
library(edgeR)
```

## Background - performing differential expression analysis with edgeR

The edgeR package was developed by Gordon K Smyth and colleagues at the Walter and Eliza Hall Institute in Melbourne
around 15 years ago and has been extended and improved ever since. The same group previously developed the widely-used
'limma' framework for microarray data and many of the concepts were applied to RNA-Seq data. edgeR implements
statistical models suitable for count data, namely the negative binomial model, in a generalized linear model (glm)
framework. It performs the computations very efficiently and can handle complex experimental designs or additional
explanatory variables. It also performs a normalisation step that accounts for differences in sequencing depth between
samples and the behaviour of RNA-seq in specific situations, such as when a subset of genes is highly expressed in one
of the experimental conditions but not another; this can lead to over-sampling of the highly-expressed genes in one
condition leaving other genes relatively under-sampled. If this is not corrected for in the normalisation step, many of
those other genes could appear down-regulated in the condition with the highly-expressed genes but this would be an
artefact rather than biological changes. 

Loading the edgeR package in the current R session gives us access to all the required functionality. R/Bioconductor
packages wrap the detailed steps of their methods into individual functions, which will be available to R once the
package has been loaded into the current session. From the user's perspective, the analysis is then performed by running
a series of functions (steps) tailored to your particular dataset. All packages have documentation for their usage, and
the edgeR package is particuarly well-documented with a detailed User Guide, which includes a number of case-study
examples. 

As with all R packages, care must be taken to run all the steps in the right order and ensure any parts requiring manual
set up are correct. In the context of gene expression analysis, a particularly important part to get right is the design
matrix and ensuring the coefficient or contrast for the comparison(s) of interest are correctly extracted afterwards.
For now, we will prepare our data for analysis. 

[Continue the practical](Data_preprocessing.md)

