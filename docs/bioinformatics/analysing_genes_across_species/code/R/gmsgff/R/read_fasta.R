read_fasta <- function( filename ) {
	echo = function( message, ... ) {
		cat( sprintf( message, ... ))
	}
	echo( "++read_fasta: loading FASTA file from \"%s\"...\n", filename )
	if( stringr::str_ends( filename, "[.]gz" )) {
		input_file = gzfile(filename)
		data = readLines( input_file )
		close(input_file)
	} else {
		input_file = file(filename)
		data = readLines( input_file )
		close(input_file)
	}
	echo( "++read_fasta: finding contigs...\n" )
	contig_starts = grep( "^>", data )
	# Compute the contig names by stripping out '>':
	contig_names = gsub(
		'^>', '',
		data[contig_starts]
	)
	contig_names = gsub(
		' .*$', '',
		contig_names
	)
	echo( "++read_fasta: ok, %d sequences found.\n", length(contig_names))
	echo( "++read_fasta: finding sequences...\n" )
	# For each contig, find the range of sequence lines corresponding
	# to that contig
	sequence_line_ranges = purrr::map(
		1:length(contig_starts),
		function(i) {
			c(
				contig_starts[i]+1,
				c(contig_starts,length(data)+1)[i+1]-1 )
		}
	)
	echo( "++read_fasta: ok, concatenating sequence...\n" )
	# Now use `paste()` to stick together the sequences for each contig
	sequences = purrr::map(
		sequence_line_ranges,
		function(range) {
			strsplit( paste( data[range[1]:range[2]], collapse = "" ), split = "", fixed = T )
		}
	)
	result = tibble::tibble(
		id = contig_names,
		sequence = unlist(sequences)
	)
	return( result )
}
