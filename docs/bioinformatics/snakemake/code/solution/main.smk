import pandas
my_genomes = pandas.read_csv( "pipelines/config/genomes.tsv", sep = "\t" )

include: "rules/download_gff.smk"
include: "rules/decompress_gff.smk"
include: "rules/summarise_gff.smk"
include: "rules/combine_summaries.smk"

rule all:
	input:
		tsv = "results/combined-summary.tsv"
