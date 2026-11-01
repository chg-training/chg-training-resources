# summarise_gff.R
# This script will read a gff file in the Ensembl format, and output
# a summary of various properties.

library( dplyr )

# Oh dear, at the moment you have to type in the URL and so on here!

#args = list(
#   genome_name  = "e_coli",
#   input        = "data/e_coli.gff3.gz",
#   output       = "results/summaries/e_coli-summary.tsv"
#)

print( snakemake )
args = list(
   genome_name  = snakemake@wildcards$genome_name,
   input        = snakemake@input$gff,
   output       = snakemake@output$tsv
)

# But we'll fix it to use snakemake!

############################################################
# We'll need some functions
# Define them here for simplicity:


echo <- function( message, ... ) {
   cat( sprintf( message, ... ))
}

read_gff = function( filename, extra_attributes = c() ) {
   cat( sprintf( "++ Loading GFF data from \"%s\"...\n", filename ))
   result = readr::read_tsv(
      filename,
      comment = '#',
      na = ".",
      col_names = c( 'seqid', 'source', 'type', 'start', 'end', 'score', 'strand', 'phase', 'attributes' ),
      col_types = readr::cols(
         readr::col_character(),
         readr::col_character(),
         readr::col_character(),
         readr::col_integer(),
         readr::col_double(),
         readr::col_double(),
         readr::col_character(),
         readr::col_integer(),
         readr::col_character()
      )
   )

	echo( "  ... Ok, %d records loaded.\n", nrow( result ))

   # Let's put ID and Parent at the start.
   result = tibble::add_column(result, ID = NA, .before = 1)
   result = tibble::add_column(result, Parent = NA, .before = 2)

   # Now extract all the attributes
   for( attribute in c( "ID", "Parent", extra_attributes )) {
      cat( sprintf( "  ... Extracting %s attribute...\n", attribute ))
      # Create the appropriate regex using `sprintf()`
      regex = sprintf("%s=([^;]+)(;|$)", attribute)
      # Extract the attribute...
      result[[attribute]] = stringr::str_extract(result[["attributes"]], regex, group = TRUE)
      # ...and remove it from the attributes column.
      result[["attributes"]] = stringr::str_remove(result[["attributes"]], regex)
   }
   cat( sprintf( "++ Done.\n" ))
   return( result )
}

# merge_overlapping_regions()
# This function reads in a data frame of regions with seqid, start, and end columns.
# It outputs a data frame after merging overlapping regions.
merge_overlapping_regions = function( input_regions ) {
   # Catch the case where there's only one or no regions
   # There's nothing to do in this case, may as well just return the input regions:
   if( nrow( input_regions ) < 2 ) {
      return( input_regions ) ;
   }

   # Otherwise:
   # Sort regions by position
   regions = input_regions %>% select( seqid, start, end ) %>% unique() %>% arrange( seqid, start, end ) %>% mutate( index = 1:n())
   echo( "%d ", nrow( regions ))

   while( 1 ) {
      echo( "." )
      # Find overlapping pairs of regions
      overlaps = (
         regions
         %>% left_join(
            regions %>% select( index2 = index, seqid, start2 = start, end2 = end ),
            by = join_by(
               seqid,
               dplyr::overlaps( start, end, start2, end2 )
            )
         )
         %>% filter( index2 > index )
      )
      if( nrow( overlaps ) == 0 ) {
         break ;
      }
      regions = regions %>% filter( !index %in% overlaps$index2 )
      overlaps = unique( overlaps %>% select( index, seqid, start, overlap_end = end2 ))
      regions = (
         regions
         %>% left_join( overlaps %>% select( index, overlap_end ), by = "index" )
         %>% mutate( end = pmax( end, overlap_end, na.rm = T ))
         %>% select( seqid, start, end )
         %>% arrange( seqid, start, end )
         %>% mutate( index = 1:n() )
      )
   }
	echo( " to %d.\n", nrow( regions ))
   return( regions %>% select( seqid, start, end ) )
}

# We only count exons etc. that are in protein coding genes.
# To do this, we need to link the exon IDs back to the relevant protein-coding ones using this function:
limit_to_protein_coding <- function( data, transcripts, protein_coding_genes ) {
	(
		data
		%>% left_join(
			transcripts %>% select( ID, gene_id = Parent ),
			by = c( Parent = "ID" )
		)
		%>% filter( gene_id %in% protein_coding_genes$ID )
	)
}

############################################################

# Main part of the program:

echo( "++ Loading data for %s...\n", args$genome_name )
data = read_gff(
	args$input,
	extra_attributes = "biotype" # needed for the Ensembl files
)

echo( "++ Ok, %d records loaded.\n\n", nrow( data ))

chromosomes           = data %>% filter( type == 'chromosome' )
genes                 = data %>% filter( type == 'gene' )
protein_coding_genes  = data %>% filter( type == 'gene' & biotype == 'protein_coding' )
transcripts           = data %>% filter( type == 'mRNA' )
exons                 = data %>% filter( type == 'exon' )
cds                   = data %>% filter( type == 'CDS' )
utr                   = data %>% filter( type %in% c( 'five_prime_UTR', 'three_prime_UTR' ) )

echo( "++ Restricting to protein-coding records...\n" )
exons = limit_to_protein_coding( exons, transcripts, protein_coding_genes )
cds   = limit_to_protein_coding( cds,   transcripts, protein_coding_genes )
utr   = limit_to_protein_coding( utr,   transcripts, protein_coding_genes )

echo( "++ Merging regions for size calculations...\n" )
echo( "  ...genes:\n" )
gene_regions                = merge_overlapping_regions( genes )
echo( "  ...protein coding genes: " )
protein_coding_gene_regions = merge_overlapping_regions( genes %>% filter( biotype == 'protein_coding' ))
echo( "  ...exons:\n" )
exon_regions                = merge_overlapping_regions( exons )
echo( "  ...cds:\n" )
cds_regions                 = merge_overlapping_regions( cds )
echo( "  ...utr:\n" )
utr_regions                 = merge_overlapping_regions( utr )

echo( "++ Summarising...\n" )

summary = (
	tibble::tibble(
		genome_name                     = args$genome_name,
		number_of_chromosomes           = nrow( chromosomes ),
		bases_in_chromosomes            = ( chromosomes %>% mutate( length = end - start + 1 ) %>% summarise( total = sum( length )) )[['total']],
		number_of_genes                 = nrow( genes ),
		number_of_protein_coding_genes  = nrow( genes %>% filter( biotype == 'protein_coding' )),
		bases_in_genes                  = ( gene_regions                %>% mutate( length = end - start + 1 ) %>% summarise( total = sum( length )) )[['total']],
		bases_in_protein_coding_genes   = ( protein_coding_gene_regions %>% mutate( length = end - start + 1 ) %>% summarise( total = sum( length )) )[['total']],
		bases_in_exons                  = ( exon_regions                %>% mutate( length = end - start + 1 ) %>% summarise( total = sum( length )) )[['total']],
		bases_in_cds                    = ( cds_regions                 %>% mutate( length = end - start + 1 ) %>% summarise( total = sum( length )) )[['total']],
		bases_in_utr                    = ( utr_regions                 %>% mutate( length = end - start + 1 ) %>% summarise( total = sum( length )) )[['total']]
	) %>% mutate(
		propn_in_genes                     = ( 100 * bases_in_genes / bases_in_chromosomes ),
		propn_in_protein_coding_genes      = ( 100 * bases_in_protein_coding_genes / bases_in_chromosomes ),
		propn_in_exons                     = ( 100 * bases_in_exons / bases_in_chromosomes ),
		propn_in_cds                       = ( 100 * bases_in_cds   / bases_in_chromosomes ),
		propn_in_utr                       = ( 100 * bases_in_utr   / bases_in_chromosomes )
	)
)

echo( "++ Writing summary to %s...\n", args$output )

readr::write_tsv( summary, file = args$output )

#echo( "++ Success!  Thanks for using summarise_gff.R!\n" )
