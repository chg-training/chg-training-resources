---
sidebar_position: 4
---

# Tips and tricks

Here is some guidance to help you write your pipeline. Click the links to jump to the relevant
section.

* [Wait, what?  How should I start?](./#getting-started)
* [Give me a first rule hint?](#give-me-a-first-rule-hint)
* [How should I get sample information in?](./#how-should-i-get-sample-information-in)
* [How should I run snakemake?](./#how-should-i-run-snakemake)
* [...a second rule hint?](#a-second-rule-hint)
* [...and what about the other rules?](#what-about-the-other-rules)
* [Keeping a fast iteration time during development](#keeping-a-fast-iteration-time-during-development).
* [My snakefiles are getting too big!](#my-snakefiles-are-getting-too-big)
* [Dealing with intermediate files](#dealing-with-intermediate-files).
* [But I want to run the yellow bits too!](#but-I-want-to-run-the-yellow-bits-too)
* [Read groups what now?](#read-groups-what-now)
* [What's in the fastq header?](#whats-in-the-fastq-header)
* [Getting variant-calling rules working](#getting-variant-calling-rules-working)
* [I can't install Octopus!](#i-cant-install-octopus)
* [Octopus is taking too long!](#octopus-is-taking-too-long)
* [What ploidy?](#what-ploidy)
* [Tools that use temporary directories](#tools-that-use-temporary-directories)
* [Tips on using `bwa mem`](#tips-on-using-bwa-mem).
* [Tips on using `samtools`](#tips-on-using-samtools).
* Or see a [complete solution](#solutions).

### Getting started

You should create: a folder called `data` with the data in, a folder called `results` to put
results in, and a folder called `pipelines` to put snakemake pipelines in. So your folder will look
something like this:

    this_folder/
      data/
        # reads and reference sequence here
      pipelines/
        # snakefiles go here
      results/
        # results files go here
        ...
  

Of course you should already have `data` and snakemake will create the `results` folder as you go.
So to get started, all you have to do is write a snakefile in `pipelines/`.

Maybe you want to make an empty snakefile to get started?
```
touch pipelines/analysis.snakefile
```

And run it:
```
snakemake -s pipelines/analysis.snakefile -n
```
Congratulations!  You've started your pipeline.

To really get started, you will need some [rules in there](#give-me-a-first-rule-hint) and will also
need a **config file** as outlined [below](#how-should-i-put-sample-information-in) - it can go in
`pipelines` or in the top-level folder, whichever you prefer.

[Go back to the list of tips and tricks](#tips-and-tricks).

### Give me a first rule hint?

There are two sensible things you could do at the start of the pipeline.

First, you could start at the top-left of the [pipeline](./pipeline.md#the-pipeline), and write a
rule that indexes the reference file:

```snakemake
rule index_reference_assembly:
	output:
		index = "data/reference/Pf3D7_v3.fa.gz.bwt"
	input:
		fasta = "data/reference/Pf3D7_v3.fa.gz"
	shell: """
		bwa index {input.fasta}
	"""
```

:::tip Top tip

Notice that I wrote the **output** files first.  You don't have to do this, but it makes huge sense for snakemake, which works
backwards from outputs to figure out what inputs it needs.

:::

If you run snakemake now:
```
snakemake -s pipelines/analysis.snakefile --cores 1
```

You will probably see it indexing the reference assembly.  Well done!

:::tip input and wildcards

The `{input.fasta}` is of course one of snakemake's cool features.  You don't have to write the whole filename out again, just use
this form to refer to the filename from the `input:` section.

:::

### How should I get sample information in?

Your pipeline is going to need the sample information in.

Although you can add sample information into the top of the snakefile, say:
```
samples = [ 'QG0033-C', 'QG0041-C', and so on ]
```

...that's not very flexible.  A better way is to put this information about the samples, and any
other needed data in through a **config file**.

This is a file called (say) `config.json` that you pass in using the `--configfile` argument. For
example, for this project you could use a `config.json` that looks like this:

```json config.json
{
	"reference": "data/reference/Pf3D7_v3.fa.gz",
	"fastq_filename_template": "data/reads/{ID}_{read}.fastq.gz",
	"samples": {
		"QG0033-C": { "accession": "ERR377582" },
		"QG0041-C": { "accession": "ERR377591" },
		"QG0049-C": { "accession": "ERR417627" },
		"QG0056-C": { "accession": "ERR417621" },
		"QG0088-C": { "accession": "ERR377629" }
	}
}
```

(This contains information copied from `samples.tsv`.) And then you would run snakemake like this:

```
snakemake -s pipelines/analysis.snakefile --configfile config.json
```

The point of this is that it makes it easy to run the pipeline on different sets of data - such as
[a test data for pipeline testing](#keeping-a-fast-iteration-time-during-development) - you just
swap out the config file for a different one.

:::tip Note
In a real pipeline there are likely to be many samples, so it might be better to reference the sample
sheet in the config file:

```json config.json
{
	"reference": "data/reference/Pf3D7_v3.fa.gz",
	"fastq_filename_template": "data/reads/{ID}_{read}.fastq.gz",
	"samples": "samples.tsv"
}
```

and then have your snakefile load the samples using (for example)
[pandas](/prerequisites/pandas.md):

```
import pandas
config['samples'] = pandas.read_table( "samples.tsv" )
```

:::

[Go back to the list of tips and tricks](#tips-and-tricks).

### How should I run snakemake?

Let's say your snakefile is `pipelines/analysis.snakefile`.  I find the best way to run snakemake is to *always run it
from the top-level folder.*  That is, as above, you would run:

```sh
snakemake -s pipelines/analysis.snakefile -configfile config.json [other options...]
```

Doing this means that in your snakefile you can use relative pathnames. So for example if the input
file is one of the data files, you can write:
```python
rule something
	input:
		"data/reads/{ID}.fastq.gz"`
	output:
		"results/qc/{ID}.aligned.bam"
	(etc.)
```

and so on. This is great because you don't need absolute paths; it makes the snakefiles shorter and
it makes it is easy to copy the code around, or to share the pipeline via github, and so on.

**Note.** The snakemake documentation suggests a [similar, but slightly different
layout](https://snakemake.readthedocs.io/en/stable/snakefiles/deployment.html).

[Go back to the list of tips and tricks](#tips-and-tricks).

### ...a second rule hint?

Well, the second step (top right of [the pipeline](./pipeline.md#the-pipeline)) is to run fastqc.  A rule to do that is pretty easy,
right?  Something like:

```python
rule run_fastqc:
	output:
		html1 = "results/qc/{ID}_1_fastqc.html",
		html2 = "results/qc/{ID}_2_fastqc.html"
	input:
		fq1 = "data/reads/{ID}_1.fq.gz",
		fq2 = "data/reads/{ID}_2.fq.gz"
	params:
		outputdir = "results/qc/"
	shell: """
		fastqc -q -o {params.outputdir} {input.fq1} {input.fq2}
	"""
```

You can see this rule contains the `{ID}` which is a snakemake **wildcard**.  If snakemake thinks it needs to make (for example) the file `results/qc/A_1_fastqc.html`, it will run this rule with `ID="A"`.

But there are two problems.

**Problem 1**. If you add this and run snakemake, it won't do anything!

**Solution**: remember the first rule in the snakefile declares the main files it will try to create.  If you want it to
create these fastqc output files, you had better add them there.  The convention is to add a rule called 'all' at the
top which lists what you want, something like:
```python
rule all:
	input:
		fastqc = expand(
			"results/qc/{ID}_{read_id}_fastqc.html",
			name = config['samples'].keys(),
			read_id = [ '1', '2' ]
		)
```

:::tip Note

The `expand()` function is used there to replace all the `ID` and `read_id` with all the combinations of the arguments.

:::

But there's another, harder problem too!  (This one is actually the trickiest problem in the whole pipeline.)

**Problem 2**.  
The [requirements](./pipeline.md#overview) say that we are supposed to name the output files by the sample ID (like "QG0033-C").
But the fastq files are named a different way (for these files, it's for the accessions, like "ERR377582".)
So this means is that **the above rule won't fully solve the problem**. 

**Solution** For fastqc, this is slightly annoying to solve because it [doesn't have a way to rename output
files](https://github.com/s-andrews/FastQC/issues/9).  The easiest way to solve this is first create a re-named copy of
the input files.  Let's do that now - what we need is a rule like this:

```python
rule make_renamed_fastqs:
	output:
		fq1 = "results/renamed_reads/{ID}_1.fastq.gz",
		fq2 = "results/renamed_reads/{ID}_2.fastq.gz"
	input:
		fq1 = "data/reads/{accession}_1.fq.gz",
		fq2 = "data/reads/{accession}_2.fq.gz"
	shell: """
	cp {input.fq1} {output.fq1}
	cp {input.fq2} {output.fq2}
	"""
```

But how do you get snakemake to compute the accessions in there?

The trick here is remember the golden rule: snakemake works **from outputs to inputs**.  What you need is a function
that converts the desired output sample ID (e.g. `QG0033-C`) into the correct input filename (e.g.
`data/reads/ERR377582_1.fastq.gz`).  Luckily, if you followed the [suggestion above](#how-should-i-get-sample-information-in)
you'll have put this information into the config file - so you could get it out using a function like this:

```python
def get_accession( sample ):
	return config['samples'][sample]['accession']
```

To plumb this into snakemake, write functions that read in the rule's wildcards and outputs the fastq filename:
```python
def get_fq1_filename( wildcards ):
	return "data/reads/{accession}_1.fastq.gz".format(
		accession = get_accession( wildcards.ID )
	)
def get_fq2_filename( wildcards ):
	return "data/reads/{accession}_2.fastq.gz".format(
		accession = get_accession( wildcards.ID )
	)
```

...at which point you can use the function in place of the input filename in the rule:

```python
rule make_renamed_fastqs:
	output:
		fq1 = "results/renamed_reads/{ID}_1.fastq.gz",
		fq2 = "results/renamed_reads/{ID}_2.fastq.gz"
	input:
		fq1 = get_fq1_filename,
		fq2 = get_fq2_filename
	shell: """
	cp {input.fq1} {output.fq1}
	cp {input.fq2} {output.fq2}
	"""
```

:::caution Tip

Since the data is large and there might be lots of samples, it's actually better to use **symbolic links** here instead of copies. 
(A synbolic link is a bit like a shortcut - a small file that points at the other, larger file.)

To use symbolic links instead of copies, use `ln -s` instead of `cp` in the above commands, like this:
```
ln -s ../../{input.fq1} {output.fq1}
```

(The `../..` is needed to get the right path of the linked file relative to the folder where the output is.)

:::

**Finally** update the `run_fastqc` rule to use these files instead:
```python
rule run_fastqc:
	output:
		html1 = "results/qc/{ID}_1_fastqc.html",
		html2 = "results/qc/{ID}_2_fastqc.html"
	input:
		fq1 = "results/renamed_reads/{ID}_1.fastq.gz",
		fq2 = "results/renamed_reads/{ID}_2.fastq.gz"
	etc.
```

**Phew!**

If all this seemed like a lot of work - it was.

(But note it has made the rest of the pipeline easier because you can use the re-named fastq files as input to other
rules, too - such as the step that aligns reads.)

[Go back to the list of tips and tricks](#tips-and-tricks).

### ...what about the other rules?

You have to write these yourself!

However you should

* Look at the [pipeline steps](./pipeline.md#the-pipeline) to see what steps are needed...

* ...and look at the [sequence data pipeline tutorial](../introduction_to_next_generation_sequencing_data_analysis/Aligning_reads.md) to see what the needed
  commands are.

* And perhaps look back at the [first rule hint](#give-me-a-first-rule-hint) and the [second rule hint](#a-second-rule-hint) to figure out how to write them.

* To make life easier you might want to use the renamed input fastq files [described above](#a-second-rule-hint) as
inputs. That way you should just be able to use '{ID}' as the wildcard throughout the pipeline, i.e. like this:

```
output: "results/somewhere/output_file_{ID}.txt"
input: "somewhere_else/input_file_{ID}.txt"
```

and snakemake will figure out the correct input file from the output file.

Good luck!

[Go back to the list of tips and tricks](#tips-and-tricks).

### Keeping a fast iteration time during development.

The data from this pipeline are pretty large, and it will take a while for the pipeline to run.
That's no good for pipeline development as you'll want to know pretty quickly whether it works or doesn't work.
(After all you don't want to wait two hours only to discover that it failed.)

A good idea would therefore be to start by creating smaller, sub-sampled version of the
datasets (whichever of the above raw data you use). For example, you could run:

```
gunzip -c filename.fastq.gz | head -n 4000 | gzip -c > filename.subsampled.fastq
```

to take the first few reads from each file.

:::tip Question
The above command specifies a multiple of 4 lines. Why? How many reads does the above
command extract?
:::

If you set your config files the way I [suggested above](#how-should-i-get-sample-information-in) then you can have one
config file for the smaller test dataset (giving them new IDs, such as `QG0033-c-subsampled`, to avoid conflicts). Then,
once it is all working, you can rerun using the real config file specifying the full dataset.

:::warning Note

Of course, for this to work you'll have to **make sure your rules find the fastq files using the paths from the config
file** rather than hard-coding them. I called that `fastq_filename_template` in the [suggested config
file](#how-should-i-get-sample-information-in).

:::

[Go back to the list of tips and tricks](#Tips-and-tricks).

### My snakefiles are getting too big!

After a while you'll find your pipelines have loads of rules and can become hard to understand.

To fix this, I often use the snakemake
[`include` feature](https://snakemake.readthedocs.io/en/stable/snakefiles/modularization.html) to split up the
file into components of related rules. For example, in our pipeline there are a bunch of rules for
read qc, some for alignment and post-processing, a bunch for variant calling, and a bunch for
computing coverage and so on. So for the whole pipeline above I might end up with this structure:

    analysis folder/
        pipelines/
            master.snakmake
            functions.snakemake
            qc.snakemake
            alignment.snakemake
            variants.snakemake
            coverage.snakemake

And the first few lines of `master.snakemake` would be:

```
include: "functions.snakemake"
include: "qc.snakemake"
include: "alignment.snakemake"
include: "variants.snakemake"
include: "coverage.snakemake"
```

Now you can write one 'module' of the pipeline in each file, keeping related rules together without
them becoming too big and unweildy.

:::tip Note
You'll notice I included a `functions.snakemake` above. This is where I tend to put helper
functions, like the `get_fq1_filename()` function mentioned above.
:::

[Go back to the list of tips and tricks](#Tips-and-tricks).

### Dealing with intermediate files

The alignment steps in [our pipeline](pipeline.svg) in particular are notorious for generating intermediate files.  Indeed:

* the alignment step outputs a SAM file...
* which is converted to a BAM file...
* which you then have to sort by position...
* in which you then have to mark the duplicates...
* which are then indexed.

That's at least 3 intermediate files along the way. We don't want to keep these, they were just needed during the pipeline.

There are a few different ways to deal with this. One way is just to use unix pipes to pipe command together within rules - as in

```sh
bwa mem reference.fa read1.fq read2.fq | samtools view -b -o aligned.bam
```

However, I find that this makes the pipeline hard to debug (which command failed? you can't tell.)

Instead, I typically go for temp files and use the snakemake `temp()` function to tell snakemake files are temporary. So I might write the alignment rule as:

```
rule align_reads:
  output:
    sam = temp( "results/alignment/{ID}.sam" )
  input:
    fq1 = something,
    fq2 = something
  shell: "bwa mem ..."
```

As you can see, I tend to also put temporary files into their own `tmp/` folder as well - this
avoids cluttering up the results folder when jobs fail.

Second, rules can refer to other rule outputs, so the next step in the pipeline can be written:
```
rule fix_matepair_information_and_convert_to_bam:
  output:
    bam = temp( "results/alignment/tmp/{ID}.bam" )
  input:
    sam = rules.align_reads.output.sam
  shell: "samtools fixmate -m {input.sam} {output.bam}"
```
and so on down the pipeline.

Third - `snakemake` actually has a [named pipe
output](https://snakemake.readthedocs.io/en/stable/snakefiles/rules.html#piped-output) feature, so you can get the
benefit of the UNIX pipe with the same syntax as above - just replace `temp()` with `pipe()` and it should automatically
work. (I've never actually used this feature but it's a nice idea for this step, because the SAM file output by `bwa`
might be huge when applied to real data.)

[Go back to the list of tips and tricks](#Tips-and-tricks).

### But I want to run the yellow bits too!

Be my guest! Running variant annotation in particular would be a good thing to do, as would looking
at post-alignment QC metrics.

### Read groups what now?

Some programs require reads to have 'read groups'. What are they and how do you get them in there?

BAM files can easily be post-processed and merged. Read groups are a way to put information in that
records the original sample and the sequencing run, so that downstream programs can distinguish
these. The read groups are encoded in the `@RG` header field of the BAM file (which you can see
using `samtools view -h`), and in the `RG` tag for each alignment. A good document on read groups
is [this one on the GATK
website](https://gatk.broadinstitute.org/hc/en-us/articles/360035890671-Read-groups).

In our pipeline these don't seem that important (we have one alignment file per input fastq file
pair), but in other pipelines the same sample might have been sequenced many times and the results
merged. So for sensible downstream analysis it would be important to keep track of the originating
samples. In particular, variant callers like `octopus` require you to have read groups in the BAM
file.

The simplest way to put read groups into the BAM file is to have `bwa` put them in at the alignment
step. For our experiment this can be done using the `-R` option - e.g. for sample `QC0033-C` this
would look like this:

```
bwa mem -R "@RG\tID:ERR377582\tSM:QG0033-C\tPL:ILLUMINA" [other arguments]
```

You can put other stuff into a read group (see below), but the run ID, the sample name, and the
platform are all that we need just now.

Of course you have to be able to generate this for each sample. With the layout described above, I
wrote the following code (which I put, of course, in `pipelines/functions.snakemake`) to do it:

```
def get_read_group_line( name ):
	sample = find_sample_with_name( name )
	return "@RG\\tID:{ID}\\tSM:{sample}\\tPL:ILLUMINA".format(
		ID = sample['ID'],
		sample = sample['name']
    )
```

The alignment step could then be updated to use this function:
```
rule align_reads:
  input:
    fq1 = something,
    fq2 = something
  output:
    sam = temp( "results/alignment/{ID}.sam" )
  params:
    read_group_spec = lambda wildcards: get_read_group_line( wildcards.name )
  shell: """
    bwa mem -R {params.read_group_spec} ...
  """
```

If you look at the resulting files, they have an `@RG` header record and `RG` tags for each read -
octopus will then accept these files.

What else can go in a read group? As the [GATK documentation
indicates](https://gatk.broadinstitute.org/hc/en-us/articles/360035890671-Read-groups) the read
group can also contain information about the sequencing flowcell, lane, and sample barcode, and an
identifier for the library itself. Unfortunately some of this information can be hard to come by
depending on where your reads come from. As we describe below, some of it can be obtained from the
read names in the fastq files. For the data in this practical, some parts such as the library
identifier can be found on the [ENA website](ERR377582). But in general it's a bit hard to put it
all together. (Luckily just the sample name and identifier are enough for our analysis.)

[Go back to the list of tips and tricks](#Tips-and-tricks).

### What's in the fastq header?

If you look at the header / read name rows of a fastq file you'll see they actually contain a bunch
of information - like this:

```
@ERR377582.7615542 HS23_10792:2:2307:6524:31920#15/1
```

This row tells us the sample ID (`ERR377582`) and the read identifier (`7615542`). And this is
followed by information identifying the instrument that generated the reads (`HS23_10792`), the
flowcell lane and tile number in the lane (`2:2307`), the coordinates of the
[cluster](https://www.broadinstitute.org/files/shared/illuminavids/clusterGenSlides.pdf) within the
tile (`6524`, `31920`), a number identifying the index of the sample within a multiplexed set of
samples (i.e. all run at the same time; `#15`), and whether it's read 1 or 2.

Some of this info can be put in the read group as well.

**Note.** The format of this information is not standard across platforms, and it changes depending
on your data provider. Some other examples can be found [on
wikipedia](https://en.wikipedia.org/wiki/FASTQ_format#Illumina_sequence_identifiers) or on the
[GATK read groups page](https://gatk.broadinstitute.org/hc/en-us/articles/360035890671-Read-groups).

[Go back to the list of tips and tricks](#Tips-and-tricks).

### Getting variant-calling rules working

The variant calling rule will be slightly different because it will call across all samples at once.
So it has multiple input files, and only one output file.

This turns out to be easy in snakemake.  Instead of making a single filename input:

```
rule my_rule:
	output: "results/variants.vcf.gz"
	input: "results/alignment/{ID}.bam"
```

...you make the input a list of files:
```
rule my_rule:
	output:
		vcf = "results/variants.vcf.gz"
	input:
		bams = [
			"results/alignment/Sample_1.bam",
			"results/alignment/Sample_2.bam",
			etc.
		]
	shell: """
		octopus -i {input.alignments} (other arguments...)
	"""
```

:::tip Note

In the shell command, the multiple files are just pasted next to each other, so the command ends up looking like:
```
octopus -i "results/alignment/Sample_1.bam" "results/alignment/Sample_2.bam" (other arguments...)
```
:::

That works just fine... but is a bit annoying as you'd have to hard-code all those sample IDs again.

Luckily snakemake provides a short-hand for this, in the form of the `expand()` function:

```
rule my_rule:
	output:
		vcf = "results/variants.vcf.gz"
	input:
		bams = expand(
			"results/alignment/{ID}.bam",
			config['samples'].keys()
		)
	(etc.)
```

So now your rule will take multiple outputs and produce one input.

[Go back to the list of tips and tricks](#Tips-and-tricks).

### I can't install Octopus!

On my system I have the problem that conda won't install Octopus for me.
(This is because there's no [conda package available on bioconda for my mac](https://anaconda.org/bioconda/octopus).)

If you run into this, you have three options:

1. Give up and don't bother with variant calls.  (Have you really had enough of this pipelining challenge?)
2. Install octopus yourself [from github](https://github.com/luntergroup/octopus).  See the 'Quick start' instructions there.
3. Or switch to another variant caller.

The simplest variant caller you could use is actually `bcftools` (which conda probably will install for you.)  

There's a worked example of using `bcftools` on [this page](../variant_calling_and_imputation/Variant_calling.md), but
here's a quick guide.  

:::tip Calling with bcftools 

Calling variants using bcftools takes two steps:

1. Run `bcftools mpileup` to summarise the data in the reads at each position - something like:
```
bcftools mpileup \
--output-type z \
-f [reference fasta filename] \
-o results/variants/mpileup.vcf.gz \
sample1.bam sample2.bam ...
```

The `--output-type z` part of the above command tells `bcftools` to output a [**(b)gzipped VCF
file**](https://samtools.github.io/hts-specs/VCFv4.2.pdf), which is a standard way of encoding genetic variation data.

(The backslash characters here (`\`) are 'line continuation' characters - they just tell bash to treat the above as one command.)

2. The output file of the `mpileup` step has information for all samples at every site in the reference genome (so
something like 23 million rows).  What we want is just to find the sites where there's genetic variation and compute
their genotypes - that's what `bcftools call` does.  Run it something like this:

```
bcftools call \
--output-type z \
--multiallelic-caller \
--variants-only \
 -o results/variants/calls.vcf.gz \
results/variants/mpileup.vcf.gz
```

If you look at the output file, you should see it has rows for only a subset of positions in the genome - the sites
where `bcftools` thinks there are genetic variants.

:::

If you don't fancy `bcftools` or `octopus`, the [pipeline](./pipeline.md#the-pipeline) also has a list of other variant
callers you could attempt. They will all give similar, but slightly different output (it'd be interesting to compare...)

[Go back to the list of tips and tricks](#Tips-and-tricks).

### Octopus is taking too long!

The [Octopus variant caller](https://github.com/luntergroup/octopus) can take a long time to do its
work - hopefully reflecting that it is trying its best to make high-quality variant calls. This
might take too long to run on your laptop. If so, here are some options for speeding it up:

* If you have a multi-core CPU, you can use more threads (`--threads` argument).

* Restrict to a set of regions. You can add the `--regions` option to tell Octopus to only work on specified regions. For this
  tutorial, please include these regions: `--regions Pf3D7_02_v3:616190-656190 Pf3D7_02_v3:779288-859288
  Pf3D7_11_v3:1023035-1081305`. (This brought the calling down to about half and hour when I tried it.)

* You could also try the Octopus 'fast' or 'very fast' modes - though I haven't tried this.

See `octopus --help` for a full list of options.

(In general this might be less of a problem for real work as you might run it a compute cluster.)

Another option is to try a different variant caller - [`GATK HaplotypeCaller`](https://gatk.broadinstitute.org/hc/en-us),
[`DeepVariant`](https://www.nature.com/articles/nbt.4235) or [`freebayes`](https://github.com/freebayes/freebayes) might be
possibilities. For a simple approach you could also use [`bcftools mpileup` and `bcftools
call`](https://samtools.github.io/bcftools/bcftools.html) (this is likely to be substantially faster as it relies on the input
alignments does not try to reconstruct local haplotypes near each variant.). 

[Go back to the list of tips and tricks](#Tips-and-tricks).

### What ploidy?

Blood-stage malaria parasites are [haploid](https://www.cdc.gov/malaria/about/biology/index.html).
So set octopus `--organism-ploidy 1`.

On the other hand, [mixed infections are common](https://doi.org/10.7554/eLife.40845.001), and to
handle this most projects actually treat samples as if they were diploid - they then treat
heterozygote calls as 'mixed' calls. This is *ad hoc* but works ok. So you could set
`--organism-ploidy 2`.

For the purposes of this tutorial you could do either - or both so we can see the difference?

[Go back to the list of tips and tricks](#Tips-and-tricks).

### Tools that use temporary directories

Some tools have that bad habit of leaving 'stuff' in the directory you run them in. This is really
annoying for pipelines because you don't want that - you want to put the temp stuff away somewhere
out of the way. `octopus` is one of these tools: if you run it you'll see it outputs a directory
called `octopus-temp`.

Really the only way to deal with this is use the program help to find the option that renames the
temp dir - then send it somewhere different. For example:

```
octopus [other options] --temp-directory-prefix results/variants/tmp/octopus/
```

This will probably work here. (In general you may need to use snakemake wildcards etc. to name this
temp directory so it doesn't clash if the same rule runs multiple jobs in parallel.)s

### Tips on using `bwa mem`

Here are a few options you can use to `bwa mem` which you might want to consider using.

* Run `bwa mem` for a list of options.

* The basic usage is `bwa mem -o output.sam [path to indexed fasta file] read1.fq.gz read2.fq.gz`

* The `-t` option tells `bwa` to use more than one thread.  (If doing this, make sure to also [tell snakemake the number of threads it will use](https://snakemake.readthedocs.io/en/stable/snakefiles/rules.html#threads).)

* The `-R` option specifies that `bwa` should include a read group header line and read groups tags in the output - this is [described above](#read-groups-what-now).

* By default, `bwa` will output only the best alignment for each read.  However, if you specify the `-a` option then `bwa` will output multiple possible alignments for each read, but all except one will be marked as 'not a primary alignment' (using the [`SAM flags`](https://broadinstitute.github.io/picard/explain-flags.html)).  This can be useful in cases when you want to consider possible alternate alignments.

There are also other aligners out there. [`minimap2`](https://github.com/lh3/minimap2) is another
good choice. Nevertheless the field typically currently uses `bwa mem` for Illumina short-read NGS
data.

### Tips on using `samtools`

Here are some tips on using `samtools`:

* Run `samtools` for a list of commands, and `samtools [command]` for a list of options for each command.

* Some commands, like `samtools markdup`, take the output filename as a seperate argument.  But others, such as `samtools view` or `samtools sort`, want you to use the `-o` option to specify the output file (otherwise they output to standard output).

* `multiqc` can read `samtools stats` output, useful for post-alignment QC.

### Solutions

A complete solution to this tutorial can be found
[in this folder](https://github.com/chg-training/chg-training-resources/tree/main/docs/sequence_data_analysis/building_an_ngs_pipeline/solutions).

Warning: this is a full solution!

(As mentioned above, I used a rename-files-at-the end strategy so this might look a bit different to yours.)

## Good luck!

