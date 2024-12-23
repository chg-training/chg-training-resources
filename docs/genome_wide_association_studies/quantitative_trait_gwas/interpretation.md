---
sidebar_position: 10
---

# Part 6: Interpreting GWAS signals

## Locating significant signals and defining regions of interest

How do we know if the signals in our scans are worth looking at?  That is, how low does a P-value need to be for us to
be excited by it?

This question is a bit subtle - it really involves thinking about our prior on how *many* associations we think there
might be, and the *statistical power* of the study, as well as the P-values themselves.  (This reasoning is described in the 'Box' in the [Wellcome Trust Case-Control Consortium paper](https://doi.org/10.1038/nature05911), as well as on the page [about interpreting P-values](../../statistical_modelling/regression_modelling/interpreting_p_values.md)).

Luckily however, there are some well-accepted rules of thumb to use. The value $5\times 10^-8$ is often used to identify
signals that have *strong evidence* from a GWAS discovery analysis like this. A less stringent value, such as $1\times 10^{-5}$ could be used to identify signals that have *some evidence*.

:::tip Note

The $5\times 10^{-8}$ threshold is sometimes referred to as 'genome-wide significance'.
However, this isn't a particularly helpful term so we'll avoid using it here.

It is, however, a reasonably stringent threshold for most purposes so we'll use it here.

:::

:::caution Important warning

However, you shouldn't imagine that just having

$P < 5\times 10^{-8}$

is enough to be convinced by a signal!  **More work** is needed to really make this convincing.

The **gold standard** for a GWAS study is that it

* Has compelling evidence in a discovery analysis (often taken as something like $P < 5\times 10^-5$)
* Has consistent evidence in at least one **replication analysis** (that is, an analysis of the same pohenotype in an independent cohort).  An often-used rule is to require 'nominal significance' e.g. $P<0.05$ with an effect in the same direction as the discovery analysis.
* And very strong **combined evidence** of (at least) $P < 5\times 10^{-8}$ across both discovery and replication arms.
* **And** it isn't obviously caused by any genotyping artifacts like cluster plot issues, or obvious confounding.

**Example**: the [WTCCC2 GWAS of Multiple Sclerosis](https://www.chg.ox.ac.uk/wtccc2/md) used the following scheme to declare its list of associations: they required:

* $P_{discovery} < 10^{-4.5}$
* one-sided $P_{\text{replication}} < 0.05$
* and a combined $P < 5\times 10^{-8}$.

(A lower threshold of $P < 5\times 10^{-7}$ was also used and referred to as 'strong evidence' - 5 regions were in this category.)

Moreover if you look in the supplementary information of that paper you'll see just how much work was done to check the quality of the genotyping - it's extensive.

:::

You should be able to see a single large peak at about 49,000,000 on chromosome 19. You may also have noticed that there
are a number of points (SNPs) that have P-values around or smaller than $5\times 10^{-8}$ (i.e. are higher than this on
the log10 scale).  While the large peak suggests a strong signal of association, the others are more difficult to
distinguish from artefacts due to population sampling or other confounders we have not accounted for in the analysis.

While there is no fixed rule on what constitutes a likely signal, a good rule of thumb is to check the significance of
other SNPs that are linked with the significant SNPs, and carry forward only those signals where we see multiple SNPs
that are potentially significant ($p < 1x10^{-5}$). 

We can make use of linkage disequilibrium to define both significant signals, and potential genomic regions of interest.
For this tutorial, we define linked SNPs as those with an $R^2 \geq 0.2$. `plink` offers a `--clump` utility which can be
used to group SNPs in this way based on a PLINK summary statistics file:

```sh
./plink \
--bfile Genotype_data/AMR_genotypes.filtered \
--clump output/AMR_genotypes.qassoc \
--clump-r2 0.2 \
--clump-p1 5e-8 \
--clump-p2 1e-5 \
--clump-verbose \
--out output/AMR_genotypes
```

This will produce output similar to that shown below, saved to a `.clumped` file.
```
CHR    F                       SNP         BP          P    TOTAL   NSIG    S05    S01   S001  S0001
 19    1    rs2548459:49209339:T:C   49209339   1.84e-12       21      0      0      2      0     19

                                           KB      RSQ  ALLELES    F            P
 (INDEX)    rs2548459:49209339:T:C          0    1.000        C    1     1.84e-12

             rs374886:49117247:A:G      -92.1    0.437    CA/TG    1     9.55e-07
            rs8111874:49168942:G:A      -40.4    0.578    CA/TG    1     2.51e-06
           rs35106244:49203829:C:T      -5.51    0.665    CT/TC    1     8.44e-09
             rs281377:49206603:C:T      -2.74    0.481    CC/TT    1     4.99e-09
             rs507855:49208501:A:G     -0.838    0.989    CG/TA    1     2.37e-12
             rs632111:49208978:A:G     -0.361    0.997    CG/TA    1     2.43e-12
             rs281380:49214470:T:C       5.13    0.317    CT/TC    1     4.63e-07
            rs4002471:49215095:C:T       5.76    0.642    CT/TC    1     1.36e-08
             rs281386:49217305:A:G       7.97     0.27    CA/TG    1     1.48e-06
             rs629504:49223633:C:G       14.3    0.603    CG/TC    1     8.15e-09
            rs2287921:49228272:T:C       18.9    0.616    CC/TT    1     2.35e-08
             rs479486:49229323:G:A         20    0.659    CA/TG    1     3.99e-10
             rs838147:49246866:A:G       37.5    0.509    CA/TG    1     2.83e-07
            rs8111399:49247963:G:T       38.6    0.271    CG/TT    1     3.06e-06
           rs56098615:49247999:T:A       38.7    0.271    CT/TA    1     3.06e-06
            rs8111208:49248022:A:C       38.7    0.271    CA/TC    1     3.06e-06
             rs838146:49248052:C:T       38.7    0.528    CC/TT    1     1.02e-06
           rs12611211:49248331:G:A         39    0.271    CG/TA    1     3.06e-06
            rs8103840:49254955:C:T       45.6    0.462    CC/TT    1     7.83e-06

         RANGE: chr19:49117247..49254955
          SPAN: 137kb
```

As you can see, many of the SNPs within the large peak are in LD with the most significant SNP in that region. Taking the coordinates of those SNPs, we can define the outer bounds of a region of interest. 

:::tip Question

Repeat this now for the imputed association files generated by PLINK as well.

Is the region of association consistent between imputed and genotyped data?

Does the index (most significant) SNP change when using imputed data? Why might this happen?

:::

## Identifying associated genomic features

Once we have these regions and the SNPs present within them, we can use reference annotations to determine what genes or
genomic elements are present in that part of the genome. We will use the human assembly GRCh37 as the reference genome
for this analysis. To locate potential genes of interest, we can search the reference assembly [in
Ensembl](http://www.ensembl.org/index.html) or [UCSC genome browser](https://genome.ucsc.edu) using our genomic
coordinates in the form `chromosome:start-end`.

:::caution Warning

Our data is in `GRCh37` or 'hg19' coordinates - **not** `GRCh38`.  Make sure you select the relevant genome in the
browsers for this.

:::

Looking in the browsers will give us an idea of the genes that are in the region and other regulatory elements that
might be annotated. Another useful database to check is [dbSNP](https://www.ncbi.nlm.nih.gov/snp/), and the [Ensembl
Variant Effect Predictor](https://www.ensembl.org/info/docs/tools/vep/index.html) is a useful tool to investigate
potential effects of significant SNPs. 

Yet another place to look is [Open Targets](https://genetics.opentargets.org/), which amalgamates many functional
datasets that can shed light on an association.

