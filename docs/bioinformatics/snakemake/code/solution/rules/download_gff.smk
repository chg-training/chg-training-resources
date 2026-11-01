rule download_gff:
	output:
		gff = "data/{genome_name}.gff3.gz"
	params:
		# Use snakemake 'lookup' helper function to look up the URL of the genome:
		url = lookup(
			query     = "genome_name == '{genome_name}'",
			within    = my_genomes,
			cols      = 'url'
		)
	# instead of script, use shell for bash scripts:
	shell: "curl -o {output.gff} {params.url}"

