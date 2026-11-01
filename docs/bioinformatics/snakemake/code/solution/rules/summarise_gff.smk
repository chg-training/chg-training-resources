rule summarise_gff:
	output:
		tsv = "results/summaries/{genome_name}-summary.tsv"
	input:
		gff = "data/{genome_name}.gff3"
	script: "scripts/summarise_gff.R"
