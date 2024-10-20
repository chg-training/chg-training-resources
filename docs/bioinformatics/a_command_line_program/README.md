---
sidebar_position: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Writing a command-line program

If you've followed the tutorials so far, you'll have an R or python 'gmsgff' package that can load data from GFF files (like those from [Gencode](https://www.gencodegenes.org)).

Your R package (or python module) is already useful!  To demonstrate this, let's use it to write a **command-line
utility** - a program you can run on the command-line to do something useful.

Specifically let's write a program to convert a GFF file to the [sqlite database](https://www.sqlite.org) format. 

:::tip Why sqlite?

We're using sqlite as an example here.  But there are lots of reasons why you might want to do this.  One of them is that `sqlite` will make it easy to load just the bits of data we want (such as just the gene records, say, or just the transcripts) without us having to write special code into `read_gff()` function.  If we want to analyse lots of files at once, this will help to reduce memory use. 

Another good reason is that sqlite is easilt readable from almost any language, so this will stop us having to rewrite `read_gff()` in other languages.

:::

To get started, [go here](./a_program.md).

