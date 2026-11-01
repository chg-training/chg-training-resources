rule decompress_gff:
	output:
		gff = temp( "data/{genome_name}.gff3" )
	input:
		gff = "data/{genome_name}.gff3.gz"
	shell: """
	gunzip -c {input.gff} > {output.gff}
"""
