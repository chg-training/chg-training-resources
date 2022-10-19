# gff.py
# This file implements the function parse_gff3_to_dataframe()
# and a number of helper functions.
# This is the 'refactored' version in which the main function is only 3 lines long.

import pandas, re

def parse_gff3_to_dataframe(
	file,
	attributes_to_extract = [ 'ID', 'Parent' ]
):
	"""Read GFF3-formatted data in the specified file (or file-like object)
	Return a pandas dataframe with seqid, source, type, start, end, score, strand, phase, and attributes columns.
	Additinally, the listed attributes are removed from the attributes column and placed in seperate
	columns at the start of the result dataframe."""
	result = read_gff3_using_pandas( file )
	extract_attributes_as_columns( result, attributes_to_extract )
	return result

def read_gff3_using_pandas( file ):
	"""Helper function to read the given GFF3 file into a dataframe, without any postprocessing."""
	import pandas
	result = pandas.read_table(
		file,
		comment = '#',
		names = [ 'seqid', 'source', 'type', 'start', 'end', 'score', 'strand', 'phase', 'attributes' ],
		na_values = ".",
		dtype = {
			'seqid': "string",
			'source': "string",
			'type': "string",
			'start': "Int32",
			'end': "Int32",
			'score': "float",
			'strand': "string",
			'phase': "string",
			'attributes': "string"
		}
	)
	return result

def extract_attributes_as_columns( data, attributes_to_extract ):
	column_index = 0
	for attribute_name in attributes_to_extract:
		# Put a placeholder column in
		data.insert( column_index, attribute_name, None )
		extract_attribute_as_column( data, column_index, attribute_name )
		column_index += 1

def extract_attribute_as_column( data, column_index, attribute_name ):
	# A regular expression that matches everything *before* and *after* the
	# attribute of interest, and the attribute itself.
	regexp = re.compile( '(.*)%s=([^;]+)(.*)' % attribute_name )
	for chunk_start in range( 0, data.shape[0], 10000 ):
		chunk_end = min( chunk_start + 10000, data.shape[0] )
		# Warning: it's easy to get pandas to write to a copy (rather than a 'view')
		# of the data.  If this happens, the code looks right but the real dataframe
		# is never updated.  To this end this code is quite careful about how it
		# refers to  the chunks of data.
		# See https://pandas.pydata.org/pandas-docs/stable/user_guide/indexing.html#returning-a-view-versus-a-copy
		chunk = data.loc[ chunk_start:chunk_end, 'attributes']
		matched_parts = chunk.str.extract( regexp )
		# matched_parts has three columns: the bit before, the value itself, and the
		# bit after. First let's set the attribute column itself.
		# Note: I had to use a list() here to avoid an erroneous pandas
		# 'FutureWarning'. Also it's important to use .loc[rows, columns] here
		# rather to make sure we set a view, not a copy of the data.
		data.loc[chunk_start:chunk_end,attribute_name] = list( matched_parts[1] )
		# Now let's reconstruct the remainder by pasting together the parts
		joined = matched_parts[0] + matched_parts[2]
		# If the attribute didn't match, both parts will be NA.
		# To deal with this we skip these rows
		unmatched_rows = ( matched_parts.isnull().all( axis = 1 ))
		joined.loc[unmatched_rows] = chunk.loc[unmatched_rows]
		# ...and put back in the result, fixing the semicolons:
		# Note: for unknown reasons, data.attributes.loc works best here
		# to avoid warnings.
		data.attributes.loc[ chunk_start:chunk_end ] = joined.apply( fix_semicolons )

def fix_semicolons( a ):	   # A helper function
	if len(a) == 0:
		return a
	if a[0] == ';':
		a = a[1:]
	if a[-1] == ';':		   # -1 means last character in the string
		a = a[0:-1]
	a = a.replace( ';;', ';' )
	return a
