---
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Testing it out

Hopefully you have now got a working function, `read_gff()` and got the extremely rewarding message:
```
++ test_read_gff(): Congratulations,all tests passed!
```

In addition it will be useful for your function to *also* extract the 'gene_type' and 'gene_name' attributes, because these are useful in the gencode files.

If you haven't reached this point, don't worry!  Here is my solution:

:::tip Solution

<Tabs groupId="solutions">
<TabItem value="teaser" label="Your solution">

Please feel free to use your solution, if it's working.  If not, see the tabs for my solutions.

</TabItem>

<TabItem value="R" label="R solution, simpler version">

```r
read_gff = function(
	filename
) {
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
	result[['ID']] = stringr::str_extract( result[['attributes']], 'ID=([^;]+)', group = TRUE )
	result[['Parent']] = stringr::str_extract( result[['attributes']], 'Parent=([^;]+)', group = TRUE )
	result[['gene_type']] = stringr::str_extract( result[['attributes']], 'gene_type=([^;]+)', group = TRUE )
	result[['gene_name']] = stringr::str_extract( result[['attributes']], 'gene_name=([^;]+)', group = TRUE )
	return( result )
```
</TabItem>

<TabItem value="python" label="python solution, simpler version">

```python
def read_gff( file ):
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
	result['ID'] = result.attributes.str.extract( 'ID=([^;]+)' )
	result['Parent'] = result.attributes.str.extract( 'Parent=([^;]+)
	result['gene_type'] = result.attributes.str.extract( 'gene_type=([^;]+)' )
	result['gene_name'] = result.attributes.str.extract( 'gene_name=([^;]+)
	return result
```
</TabItem>

<TabItem value="R2" label="R solution, post-challenge version">

```r
read_gff = function(
	filename,
	extra_attributes = c( "gene_type", "gene_name" )
) {
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

	# Put ID and Parent at the start.
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
<TabItem value="python2" label="python solution, post-challenge version">

```python
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

## Trying some real data

Let's use this to do some work on some real data now.  Load up the gencode data:

```
gencode = read_gff( "gencode.v41.annotation.gff3.gz" )
```

Use your R skills [from the Introduction to R tutorial](/bioinformatics/introduction_to_R/working_with_data.md) or python
skills to view these files and explore a bit - for example pulling out all gene records, or records pertaining to
specific genes.  (For example you could look at *FUT2*.)

### The data 'verbs'

Now is a good point to introduce in a bit more detail a set of *data manipulation verbs* that make working with data
frames easy.  You've already been working with several of these - `filter`, `group by`, `summarise`, and `arrange`.
We'll describe a couple more 'verbs' - 'join' and 'select' - below.  

We'll calling them data 'verbs' because they *do* things to dataframes.  For example

| Operation | Description | R/dplyr function | pandas/polars function |
| --------- | ----------- | ---------------- | - |
| `select` | selects (and optionally renames) **columns** | `select()` | ? |
| `mutate` | adds columns | `mutate()` | ? |
| `filter` | filters rows based on column values | `filter()` | ? |
| `arrange` or sort | orders rows | `arrange()` | ? |
| `group by` | groups rows based on column values | `group_by()` | ? |
| `summarise` | computes summary values over the rows | `summarise()` | ? |
| `join` | joins two dataframes together, based on shared values. | `inner_join`, `outer_join`, etc. | ? |

You can build these into pipelines you can conduct complex data manipulation tasks in a highly expressive way.

For example, here's a simple way to use `filter()`:

```r
filter( X, ID == `ENSG00000176920.13` )
```

If we also wanted to filter out

:::tip Note

<Tabs groupId="language">
<TabItem value="R" label="In R">

For example, here's a cool way to filter the dataframe - using a kind of 'pipe', just like the one in bash.
Instead of using `filter()` like this:
```
filter( gencode, ID == `ENSG00000176920.13` )
```
you can write

```
X %>% filter( ID == `ENSG00000176920.13` )
```

Here `%>%` plays the same role as `|` does in bash - it *pipes* the output of one command into the input of the next.
The advantage is that you can put multiple things in the same pipeline.  For example let's find all the *FUT2* transcripts
that start before `chr19:48,696,000`:
```
(
	gencode
	%>% filter( Parent == 'ENSG00000176920.13' )
	%>% filter( start < 48696000 )
)

```

So, just like in the command-line, you can build up *pipelines* of commands to get the data you want.  This filtering
syntax is a feature of [dplyr](https://dplyr.tidyverse.org), which is part of [tidyverse](https://www.tidyverse.org).

</TabItem>
<TabItem value="python" label="In python">

Here's a cool way to filter the data frame by rows in python - use
[`query()`](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.query.html).  This takes a string as an
expression, for example:
```
gencode.query( "ID == 'ENSG00000176920.13'" )
```

The `query()` function is actually part of the dataframe object (it's a 'method' of the dataframe), which is why you can
call it in the style '`object.method()`'.

This also makes it easy to chain multiple filtering criteria together. For example, let's find all the *FUT2*
transcripts that start before `chr19:48,696,000`:
```python
(
	gencode
	.query( "Parent == 'ENSG00000176920.13'" )
	.query( "start < 48696000" )
)
```

This dataframe and filtering syntax is part of [pandas](https://pandas.pydata.org).

</TabItem>
</Tabs>

:::

If it's working, well done!

:::tip Note

Another great thing to do is *group* and *count* the data - much like the [pipeline using `uniq -c` in
BASH](/bioinformatics/exploring_gene_annotations_in_bash/counting.md).  For example let's make a count of record
types:

<Tabs groupId="language">
<TabItem value="R" label="In R">

```r
(
	gencode
	%>% group_by( type )
	%>% summarise( count = n() )
)
```

**Note**. Another way to do this is R's built-in function `table()`:

```
table( gencode$type )
```

</TabItem>
<TabItem value="python" label="In python">

```python
(
	gencode
	.groupby( "type" )
	.agg({ "ID": 'count' })
)
```

This works, but I personally find this piece of code and its output harder to understand than the R / dplyr version.
Another way to do this in pandas is to use the simpler `value_counts()`:
```python
gencode['type'].value_counts()
```

...although that returns something called a 'Series', as opposed to a data frame.

</TabItem>
</Tabs>
:::

:::caution Warning

As you start to play around with loading multiple files, keep an eye on the memory usage of your process.  (You can do
this in your system monitor, or by opening a terminal and running:
* `top -u <username> -o '%MEM'` on linux or Ubuntu for Windows; or
* `top -U gav -o MEM` in Mac OS

:::

## Next steps

A better way to solve the memory issue to store the data in a database and only load what's needed into memory - we'll
see a way to do that [later](./008_Converting_gff_to_sqlite.md).  But first let's [package up the
code](./007_making_a_module.md).

