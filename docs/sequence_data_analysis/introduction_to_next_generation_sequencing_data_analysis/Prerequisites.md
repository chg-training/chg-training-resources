---
sidebar_position: 1
---
# Getting the software

To run this tutorial you will need some software.  This page will get you set up.

You need a version of the following tools:

* [samtools](http://samtools.github.io), a program for manipulating next-generation sequencing data reads
* [fastqc](https://www.bioinformatics.babraham.ac.uk/projects/fastqc/), a program for performing quality control fo sequence data
* [bwa](https://github.com/lh3/bwa), a program for aligning reads to a reference sequence
* [jellyfish 2](https://github.com/zippav/Jellyfish-2), a program for counting k-mers (short sequences of fixed length k) in sequence data reads.
* And it is also useful to install the [Integrated Genomics Viewer](https://igv.org).

You can get this software in a few different ways:

* If you are working on a JupyterHub instance we have setup, these tools should be installed
  already.
* If you have set up a [conda installation as described here](prerequiesites/README.md) (including the bioconda and conda-forge channels),
  you should be able to install everything except IGV with the command

```sh
conda install samtools fastqc bwa jellyfish
```

or if mamba isn't working,
```sh
mamba install samtools fastqc bwa jellyfish
```

run in your [UNIX terminal](/prerequisites/UNIX.md).

The IGV desktop application has to be downloaded and installed seperately - see [the IGV website](https://igv.org).

If neither of these work, you may be able to install using your system's package manager (such as `apt` on Ubuntu) or by
building from source. Doing this is out of scope of this tutorial but if you know what you're doing, feel free to try
this.

**Testing it.** To check that you have the right software, open a bash terminal and try getting
them to print their version information.  You should see something like:

    $ jellyfish --version
    jellyfish 2.3.0
    
    $ fastqc --version
    FastQC v0.11.9
    
    $ samtools --version
    samtools 1.8
    Using htslib 1.8
    Copyright (C) 2018 Genome Research Ltd.
    
    $ bwa
    
    Program: bwa (alignment via Burrows-Wheeler transformation)
    Version: 0.7.17-r1188
    Contact: Heng Li <lh3@sanger.ac.uk>
    
    Usage:   bwa <command> [options]
    
    [...]

(Don't type the dollar signs, those are just there to indicate the command prompt.)

When you've got the software [get the data](getting_the_data.md).
