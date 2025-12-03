---
sidebar_position: 2
---

# Data preprocessing

We start from the raw count table, which holds the number of reads aligning to each gene in each sample. 

```r
counts <- read.table("GSE211066_raw_count_table.txt", header=T, row.names=1)
head(counts)
dim(counts)
```
This shows that there are 15771 rows (genes). We have put the Ensembl gene IDs as the row names, and there is a column for gene symbol followed by 12 columns for the samples. To keep the count table only holding read counts (easier for analysis setup), let's remove the gene symbol column (and check that it has done the right thing):

```r
counts <- counts[, -1]
dim(counts)
head(counts)
```

Next, read in the sample information file:

```r
s.info <- read_table("GSE211066_sample_info.txt")
s.info
```


check samples are in same order
```r
colnames(counts)
[1] "set1_nutrient_rich_1"  "set2_nutrient_rich_2" 
 [3] "set1_starved_3"        "set2_starved_4"       
 [5] "set1_nutrient_rich_5"  "set2_nutrient_rich_6" 
 [7] "set1_starved_7"        "set2_starved_8"       
 [9] "set1_nutrient_rich_9"  "set2_nutrient_rich_10"
[11] "set1_starved_11"       "set2_starved_12"

s.info$Sample_title

[1] "set1_nutrient_rich_1"  "set1_nutrient_rich_5" 
 [3] "set1_nutrient_rich_9"  "set1_starved_11"      
 [5] "set1_starved_3"        "set1_starved_7"       
 [7] "set2_nutrient_rich_10" "set2_nutrient_rich_2" 
 [9] "set2_nutrient_rich_6"  "set2_starved_12"      
[11] "set2_starved_4"        "set2_starved_8"

match(colnames(counts), s.info$Sample_title)
 [1]  1  8  5 11  2  9  6 12  3  7  4 10
```

The `match` command output returns the position of the column names in count table in the Sample_title column of s.info. The first thing we notice is that this i not order 1-12, indicating the order of samples is different between the 2 objects (this will become a problem later if not fixed, as the sample information would be linked to the wrong column of count data). The reason is that the sample information file we used was ordered by a different sample ID, the GEO sample accession ID, which is in column 1 of s.info. 

Let's re-order the sample information file before proceeding any further:
```r
s.info <- s.info[match(colnames(counts), s.info$Sample_title), ]
```

We can also check the sequencing depth (number of millions of reads) for each sample.
```r
read.depth <- apply(counts, 2, sum)/1000000 
summary(read.depth)
barplot(read.depth, las=2, cex.names=0.5)
```

Now, we create a factor to store the information about the experimental conditions and also 'batch' as this experiment involved 2 sets of samples being processed independently.
```r
conds <- factor(s.info$Expt_condition)
batch <- factor(s.info$Expt_batch)
```

```r
y <- DGEList(counts=counts, genes=row.names(counts))
names(y)
head(y$counts)
```


The counts per million (cpm) values have been computed and stored as well:
```r
head(cpm(y))
```

The DGEList object (y) is a specific data structure used by edgeR to store relevant information including counts, sample IDs, gene IDs etc. It is added to with normalised counts and analysis output values as we progress through the analysis steps. 

### Filtering out low expressed genes

A common step in gene expression data analysis is to remove genes with zero or very low read counts. In a typical RNA-Seq dataset, many genes - typically up to half of them - have zero counts in all samples and these cannot be analysed at all. They represent genes either unexpressed in the particular cell type and condition under study, or at such low levels such that they are not sampled in the sequencing process. If there are only a handful of reads for a given gene, it is also difficult to make any statistical inference about differential expression and so a threshold of >10 reads might be applied. 

```r
keep <- filterByExpr(y, group=conds, min.count=10)
```

Inspect the contents of `keep` - how is information returned from the `filterByExpr` command?
You can check with the following commands:
```r
head(keep)
table(keep)
```

Subset the data object `y` to contain only genes that passed the filtering step:
```r
y <- y[keep,]
dim(y) 
```

We can now proceed to normalising the data using edgeR's bespoke method, TMM, the *trimmed mean of M-values*. (M-values are otherwise known as the fold-changes, with the terminology originally coming from microarray data). The normalisation procedure finds a set of scaling factors that minimizes the logFCs between the samples for most genes - it assumes the majority of genes are not likely to be differentially expressed, which is reasonable for most studies.

Calculate normalisation factors
```r
y <- calcNormFactors(y)

names(y)
head(y$samples) # sample details including library size i.e. total reads or depth and the normalisation factors
```


A useful plot to look at how the samples cluster is the MDS plot (multi-dimensional scaling) - we can plot with different labels to understand how the data behaves and what the primary sources of variation are. 
```r
plotMDS(y)
plotMDS(y, labels=conds, cex=0.6)
plotMDS(y, labels=s.info$Expt_batch, cex=0.6)
plotMDS(y, labels=s.info$Sample_title, cex=0.6)
```

From this point, we are ready to [design and run our analysis](Diff_exp_genes.md) 

