---
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# The read_gff() function

Before starting make sure you have a working `read_gff()` function.
If you don't have it - here is the code:

:::tip Note

<Tabs groupId="solutions">
<TabItem value="teaser" label="Your code">

Use your own code, if it works, or see the tabs for my version.

**Note** in my version I've implemented the [challenge questions about extra attributes](../programming_with_gene_annotations3/b_more_attributes.md), which are kindof useful to have!

</TabItem>

<TabItem value="R" label="R solution">

```
read_gff = function( filename, extra_attributes = c() ) {
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

	# Let's put ID and Parent at the start.
	result = tibble::add_column(result, ID = NA, .before = 1)
    result = tibble::add_column(result, Parent = NA, .before = 2)

	# Now extract all the attributes
	for( attribute in c( "ID", "Parent", extra_attributes )) {
		# Create the appropriate regex using `sprintf()`
		regex = sprintf("%s=([^;]+)[;|$]", attribute)
		# Extract the attribute...
		result[[attribute]] = stringr::str_extract(result[["attributes"]], regex, group = TRUE)
		# ...and remove it from the attributes column.
		result[["attributes"]] = stringr::str_remove(result[["attributes"]], regex)
	}
	return( result )
}
```
</TabItem>
<TabItem value="python" label="Python solution">

```
def read_gff( file, extra_attributes = [] ):
	import pandas
	result = pandas.read_table(
		file,
		comment = '#',
		names = [ 'seqid', 'source', 'type', 'start', 'end', 'score', 'strand', 'phase', 'attributes' ],
		na_values = '.',
		dtype = {
			'seqid': str,
			'source': str,
			'type': str,
			'start': int,
			'end': int,
			'score': float,
			'strand': str,
			'phase': str,
			'attributes': str
		}
	)
	result.insert( loc = 0, column = 'ID', value = None )
	result.insert( loc = 1, column = 'Parent', value = None )
	for attribute in [ 'ID', 'Parent' ] + extra_attributes:
		regexp = '%s=([^;]+)[;|$]' % attribute
		result[attribute] = result.attributes.str.extract( regexp )
		result["attributes"] = result["attributes"].str.replace( regexp, "" )
	return result
```
</TabItem>
</Tabs>
:::
