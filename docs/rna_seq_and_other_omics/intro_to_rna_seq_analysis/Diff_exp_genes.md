---
sidebar_position: 3
---

# Identifying differentially expressed genes

First, we need to create a "design matrix" capturing the experimental design - this has one row per sample and experimental groups coded as 0 or 1 in the columns. We can add covariates if needed but for now we will do a simple comparison of the nutrient-rich vs starved conditions (n=6 in each group). We make use of the `conds` factor that we created earlier. 

```r
design <- model.matrix( ~ conds )
design
```
By default, the levels of a factor are alphabetical and this in turn affects how the design matrix is created (look at the name of column 2). In this design matrix, nutrient-rich group is the first group or 'reference group' and the analysis will be performed as `starved vs nutrient-rich`. We might find it more intuitive to compare nutrient-rich to starved condition so that positive (log2) fold-changes correspond to genes with increased expression in the nutrient-rich conditions, so let's re-order the levels of the original factor:
```r
conds <- factor( conds, levels = c( "starved", "nutrient_rich" ))
```

Inspect the conds factor by printing the object and make sure you can see how the order of the levels was swapped.

Now we need to recreate the design matrix to update it:
```r
design <- model.matrix( ~ conds )
design
colnames(design) <- gsub( "conds", "", colnames(design) ) # removing 'conds' string from the column names
head(design)
```

We can see that each sample has a row in the design matrix, and column 2 indicates which samples belong to each experimental group: 1 when the sample belongs to that group, 0 otherwise. 

**Important!** You can see now that the rows of the design matrix are assumed by R to correspond to the order of columns in the `counts` table. 
Because our `conds` factor was created from the `sample info` file, we needed to ensure that both our starting files - the `counts` table and the `sample info` file have the samples in the same order. 
**Otherwise we would run the analysis with samples incorectly assigned to their respective group and this would render it meaningless!**

### Estimating gene dispersions 

The variability of a gene across samples is a crucial factor in determining the significance of a change in gene expression. `edgeR` computes a common dispersion estimate for all genes, a trended estimate by mean expression, and individual dispersion estimates for each gene. By default, `edgeR` will make use of the gene-specific estimates, which are now thought to be the most appropriate choice for assessing differential expression. They are also adjusted to make them more robust to the typically small sample size in gene expression studies. With small samples, the estimates of mean and variance are generally poorer and can, for example, lead to false positive results if the variance is under-estimated. Built into `limma` and `edgeR` is a procedure to 'borrow' information between genes and improve the robustness of the variance estimates by squeezing them towards a common value, according to how other genes with similar expression levels behave.

```r
y <- estimateGLMCommonDisp(y, design, verbose=T) 
y <- estimateGLMTrendedDisp(y, design)
y <- estimateGLMTagwiseDisp(y, design)
```

These estimates represent the biological variability in each gene. By default, the `tagwise` (individual gene estimates) are used in the analysis. The following plot visualises the dispersion estimates for all genes, with the common dispersion value indicated by the horizontal red line, the trended fit shown with the blue line, and the individual gene estimates are shown as black points.  
```r
plotBCV(y)
```

### Fitting the model
```r
fit <- glmFit(y, design)
res <- glmLRT(fit)
```

Inspect results ordered on p-value column:
```r
head(res$table[order(res$table$PValue),])
```

Finally, we can use `decideTests.DGELRT` to summarise the results:
By default, this  summarises results at 5% FDR and tells us how many significantly up- and down-regulated genes there are. We can adjust the FDR level by adding the p.value argument.
(It is a bit confusing when raw p-value or FDR values are being shown - you might need to dig into the documentation and help files. 
`res$table` has raw, unadjusted p-values while the argument to `decideTests` is p.value but is actually FDR!).  

```r
de <- decideTests.DGELRT(res)

summary(de <- decideTests.DGELRT(res))
summary(de <- decideTests.DGELRT(res, p.value=0.01))

```

Congratulations! We have analysed some RNA-Seq data to find differentially expressed genes. Now you can explore the results a bit.

## Challenge
Add a column with adjusted p-values to the res$table output

Check the paper to see how they defined differentially expressed genes and add a logFC threshold to decideTestsDGE. Do you find a similar number of DE genes? More? Fewer? 

Make a volcano plot of the results (a plot with the log2 fold-change on the x-axis against the -log10 (adjusted) p-value on the y-axis). Significant genes can be highlighted in a different colour e.g. red for up-regulated genes and blue for down-regulated genes. 

