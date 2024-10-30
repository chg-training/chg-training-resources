---
sidebar_position: 5
---
# Examining larger structural variants

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

:::tip Extra hard challenge

Can you figure out the structure of the structural variant genomes from these reads?

**Note.** Good luck!  This really is difficult.

If you want some inspiration, see Figure 6 of [this paper on the Dantu blood group](https://doi.org/10.1126/science.aam6393) to see a similar process applied to a human structural variant.

:::

:::tip (Slightly) easier challenge?

What's going on around `Pf3D7_03_v3:222,013-222,565`?  Any idea?

**tip** Try turning on the viewing of soft-clipped bases as described [above](#examining-structural-variant-breakpoints).

:::


## Summary

Congratulations!  You are now an IGV expert!
