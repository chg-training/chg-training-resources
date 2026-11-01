rule combine_summaries:
	output:
		tsv = "results/combined-summary.tsv"
	input:
		# the same as:
		# tsv = [ 'results/summaries/human-summary.tsv', 'results/summaries/e_coli-summary.tsv', ... ]
		# but comes from the my_genomes table
		tsv = expand(
			"results/summaries/{genome_name}-summary.tsv",
			genome_name = my_genomes.genome_name.tolist()
		)
	run:
		filenames = input.tsv
		first_filename  = filenames[0]
		other_filenames = filenames[1:]
		# Use snakemake 'shell' helper function to make this easy:
		print( "Doing file: %s!" % first_filename )
		shell( "cat {first_filename} > {output.tsv}" )
		for filename in other_filenames:
			print( "Doing file: %s!" % filename )
			shell( "tail -n +2 {filename} >> {output.tsv}" )

# script: "/path/to/an/R/script.R"

#shell: """ shell command inhere
#	cat {input.tsv} > {output.tsv}
#"""
