# snakemake practical folder

This folder contains a completed pipeline that

* downloads GFF files from Ensembl (or elsewhere) based on the URLs in config/genomes.tsv
* decompresses them and summarises them using rules/scripts/summarise_gff.R
* combines the summaries into a single file

As an exercise the students are asked to add a plot to the pipeline.
