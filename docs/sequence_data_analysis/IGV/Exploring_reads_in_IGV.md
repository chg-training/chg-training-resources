---
sidebar_position: 4
---

# Viewing reads - the basics

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

What makes you sure that's what these are?

:::tip Note

By default you are looking at all reads (including those that didn't map very well.)  There's an option hidden away
under `Preferences` -> `Alignment` that lets you set a mapping quality threshold.  A good default value to put here is
20 (but remember that by doing this you are filtering out some reads!)

:::

