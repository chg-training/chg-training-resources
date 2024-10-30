---
sidebar_position: 4
---

# Viewing reads

You should now have load some data into IGV (if not, go and [do that now](./README.md#loading-data).)
You'll probably see something like this:


To see the reads you will need to zoom into a location on the genome. For example, let's zoom into the gene that
harbours the famous chloroquine resistance mutation, [Chloroquine resistance transporter
(*CRT*)](https://plasmodb.org/plasmo/app/record/gene/PF3D7_0709000). To search for it you will need its ID, which is
`PF3D7_0709000`. Voila! Some reads.

:::tip IGV hints

This is a good point to try a few options to get used to IGV.

* For paired-end data, try the 'view as pairs' option. It can be found in the context menu, obtained by right-clicking
  anywhere on the track.

* If you don't like how reads are displayed, try 'collapsed', 'expanded', or 'squished' from the context menu.  Which one do you like best?

* Try clicking on a read.  What is all that info?  Where does it come from?  What does it mean?

* Try moving around and zooming in/out.  

* There's also a `genes` track - it can be annoying when it is squished.  Try right-clicking and choose 'expanded' to see the
  genes.

:::

## Basics

Scroll around a bit to look at the reads.

Can you find:

- a sequencing error?
- a SNP?
- an insertion / deletion variant?

What makes you think so?

:::

:::tip Note

By default you are looking at all reads (including those that didn't map very well.)  There's an option hidden away
under `Preferences` -> `Alignment` that lets you set a mapping quality threshold.  A good default value to put here is
20 (but remember that by doing this you are filtering some reads!)

:::


## Looking at SNPs

Let's try looking some SNPs

The mutation that causes [chloroquine resistance](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2954758/) is `CRT
K76>T`, at `Pf3D7_07_v3:403,625`. (It actually involves a small haplotype including other nearby mutations).

:::tip SNP hunting

* Can you find these mutations?

* Parasites with the non-reference allele are resistant to chloroquine - are your parasites resistant or susceptible?  (NB. all these samples come from [Democratic Republic of The Congo](https://www.google.com/maps/place/Democratic+Republic+of+the+Congo/@-3.9835365,12.6862829,5z/data=!3m1!4b1!4m5!3m4!1s0x1979facf9a7546bd:0x4c63e5eac93f141!8m2!3d-4.038333!4d21.758664)).

* Zoom into this location to look at the sequence.  Can you figure out the amino acid change(s)?

* How many reads support this in each sample?  What alleles do they carry?  What are their IDs?  Are they well mapped?
  Are they properly paired?  Where is their pair?

**Note.** 'properly paired' means that the two reads in the pair align to the same region in the right orientation, and roughly fall within the distribution of insert sizes inferred from all the read pairs in the data.  The aligner (`bwa` in this case) sets a flag in the BAM file to reflect this.

:::

## Looking at insertions and deletions

**Question.** The variants above are single nucleotide polymorphisms (SNPs) - or rather multiple nucleotide
polymorphisms (MNPs) since several come together.  What about other types of variation?  Scroll around a bit and see if
you can find a deletion.  

If stuck, try looking around the gene [`PF3D7_0215300`](https://plasmodb.org/plasmo/app/search?q=PF3D7_0220300).  What
read evidence supports this deletion?

Or look around the gene *PF3D7_0304600* - can you see anything odd here?

**Note.** There might also be insertions, which are sometimes denoted by a purple bar across a read in IGV.  Can you
find any of these?

## The trouble with mapping is...

**Question.** If you scroll around a bit, after a while you'll come across regions where no reads (or very few reads)
seem to align.  Can you find one?  What could cause this? 

:::tip Hint

If you can't find any, try the ends of chromosomes, or the gene `PF3D7_0223500` (which encodes one of the highly
polymorphic / duplicated 'var' genes.)

:::


**Hint.** You could also try searching for the relevant piece of genome sequence using [NCBI
BLAST](https://blast.ncbi.nlm.nih.gov/Blast.cgi).  For example, I tried this for one such location:

```
$ samtools faidx data/reference/Pf3D7_v3.fa.gz Pf3D7_07_v3:343,180-343,380
>Pf3D7_07_v3:343,180-343,380
tatatatatatatatatatatatatatatatatatatataaatatatatatatgtatgta
tgtatgtaatattttagtgcaaaaaaaaaaaaaaaaaaaaaaaaaaagtatataatgaaa
aattattatatatatatatattatatatatatatatatatatatatatatatatatatat
atatatatatatatatatata
```
and then pasted the above into the [Nucleotide BLAST page](https://blast.ncbi.nlm.nih.gov/Blast.cgi).  (Another version of this can be found [on PlasmoDB](https://plasmodb.org/plasmo/app/search/transcript/UnifiedBlast).  **Note.** you may need to turn off the 'low complexity region' filter to get useful results.

## Examining larger structural variants

Let's have a look at a larger structural variant.  Zoom your IGV to the region around the gene [`Pf3D7_1127000`](https://plasmodb.org/plasmo/app/record/gene/PF3D7_1127000).  And zoom out a bit so you can see the whole region including the two flanking genes.

The samples from this tutorial were chosen because some of them contain a large structural variant in this region. 

**Challenge.** Can you find this structural variant in one or more of the samples you've loaded?

**Hints.**

* One way to find structural variants is by looking at their effects on copy number (i.e. on read coverage.)  Do any samples have unusual copy number profiles?  (NB. this is generally easier in human sequence data because in P.falciparum the coverage varies a lot anyway due to varying AT content.)

* Your reads are paired-end reads.  If the genome has a different structure to the reference, then these might not align close together in the right orientation or insert size.  Can you find reads like this?  (Hint: the 'view as pairs', 'group by' and/or 'color by' options are very useful here.)  What is their orientation - are the read pairs the 'right' way round or the 'wrong' way round?  What does this mean?  Are these single reads or are they supported by others?

## Examining structural variant breakpoints

By a 'breakpoint' we mean the points where the segments of the sequenced genome are connected together in a different way to the reference genome.  The long, wrongly oriented / wrong insert size reads above potentially span these breakpoints.

A good way to look at this is as follows.  First zoom into one of the reads in the pair. Now right-click on a read and choose 'View mate region in split screen'.  Voila!  You are now looking at both ends of the same read pair.

To take this further there is an additional option.  If the read in the pair actually crosses a structural variant breakpoint, it could be that the end of the read does not align well.  If so it will typically be 'soft-clipped' by the aligner.  (The [`CIGAR string`](https://sites.google.com/site/bioinformaticsremarks/bioinfo/sam-bam-format/what-is-a-cigar) for the alignment will have a sequence of 'S's at the end).  Under `Preferences` -> `Alignments` there is an option 'Show soft-clipped bases' to visualise these.  Go and turn this on.  Does this help figure out the basepair location of the possible breakpoint?

**NB.** In the current data this works best for the reads at `Pf3D7_11_v3:1,058,745-1,058,915` - if you processed the full coverage data then it might work at all the breakpoints.

## Figuring out the structural variant structure

::tip Extra hard challenge

Figure out the structure of the structural variant genomes from these reads.

**Note.** Good luck!  This really is difficult.

If you want some inspiration, see Figure 6 of [this paper on the Dantu blood group](https://doi.org/10.1126/science.aam6393) to see a similar process applied to a human structural variant.

:::


:::tip (Slightly) easier challenge?

What's going on around `Pf3D7_03_v3:222,013-222,565`?  Any idea?

**tip** Try turning on the viewing of soft-clipped bases as described [above](#examining-structural-variant-breakpoints).

:::


## Summary

Congratulations!  You are now an IGV expert!
