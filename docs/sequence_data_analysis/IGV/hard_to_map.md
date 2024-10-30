---
sidebar_position: 4
---

# Hard-to-align regions

**Question.** If you scroll around a bit, after a while you'll come across regions where no reads (or very few reads)
seem to align.  Can you find one?  What could cause this? 

:::tip Hint

If you can't find any, try the ends of chromosomes, or the gene `PF3D7_0223500` (which encodes one of the highly
polymorphic / duplicated ['var' genes](https://pubmed.ncbi.nlm.nih.gov/14747137/).)

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

