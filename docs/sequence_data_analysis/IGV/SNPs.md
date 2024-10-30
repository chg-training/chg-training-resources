---
sidebar_position: 2
---

# Looking at SNPs

Let's try looking some SNPs.

The mutation that causes [chloroquine resistance](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2954758/) is in the *PfCRT* ('chloroquine resistance transporter)` gene, at `Pf3D7_07_v3:403,625`. (It actually involves a small haplotype including other nearby mutations).

:::tip SNP hunting

* Can you find these mutations?

* Parasites with the non-reference allele are resistant to chloroquine - are your parasites resistant or susceptible?  (NB. all these samples come from [Democratic Republic of The Congo](https://www.google.com/maps/place/Democratic+Republic+of+the+Congo/@-3.9835365,12.6862829,5z/data=!3m1!4b1!4m5!3m4!1s0x1979facf9a7546bd:0x4c63e5eac93f141!8m2!3d-4.038333!4d21.758664)).

* Zoom into this location to look at the sequence.  Can you figure out the amino acid change(s)?

* How many reads support this in each sample?  What alleles do they carry?  What are their IDs?  Are they well mapped?
  Are they properly paired?  Where is their pair?

**Note.** 'properly paired' means that the two reads in the pair align to the same region in the right orientation, and roughly fall within the distribution of insert sizes inferred from all the read pairs in the data.  The aligner (`bwa` in this case) sets a flag in the BAM file to reflect this.

:::

Another gene of interest is *PfCSP* - this is the liver-stage antigen-encoding gene that recently-approved malaria vaccines target.  Can you see any SNPs there?

