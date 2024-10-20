---
sidebar_position: 4.5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Extracting more attributes

If you followed the previous sections, you'll have a working `read_gff()` and you'll have run the test and seen the important message:
```
++ test_read_gff(): Congratulations, all tests passed!
```

Congratulations!

However - there's more important information in that `attributes` column which we should get.

Here are a couple of challenge questions for you to try if you feel like it:

## Challenge 1: extract more attributes

:::tip Challenge: extract more attributes (easy version)

In the GENCODE data, the `gene_type` and `gene_name` columns are useful as well.
Update your function so it extracts these attributes into new columns too.
:::
:::tip Challenge: extract more attributes (harder version)

Update your function so it takes an extra argument called `extra_attributes`, containing a
list of other attributes to extract.  You'd call it something like this:

<Tabs groupId="language">
<TabItem value="R" label="In R">

```
X = read_gff(
	"gencode.v41.annotation.head.gff3",
	extra_attributes = c( "gene_type", "gene_name" )
)
```

</TabItem>
<TabItem value="python" label="In python">

```
X = read_gff(
	"gencode.v41.annotation.head.gff3",
	extra_attributes = [ "gene_type", "gene_name" ]
)
```

</TabItem>
</Tabs>

The function should extract these extra attributes into seperate columns as well.

:::

## Challenge 2: shrink `attributes`

Currently, `read_gff()` extracts `ID` and `Parent` (and, if you do challenge 1, other attributes too).
But it also leaves these fields in the `attributes` column.  Since the files are so big, this can waste a lot of memory.

:::tip Challenge 2: shrink `attributes`

Find a way to remove the extracted fields from `attributes` when you extract them.
(Make sure to remove the semicolon too, if it's there!)

Here are some hints:

**Hint 1** In R, the [`str_remove()` function](https://stringr.tidyverse.org/reference/str_remove.html) from `stringr` can help with this - you will need to use the right regular expression.

**Hint 2** The regular expression syntax '(;|$)' will match *either* a semicolon *or* the end of the string - may be
useful.

:::

## The finished product

If you get through all (or any) of that - congratulations!

For a tutorial that uses this code - see the follow-on [Analysing genes across species
tutorial](../analysing_genes_across_species/README.md).

:::tip Note

If instead you'd like to see my version of the finished product - the R package and the command-line program with the
improvements listed here - there's also a link on the [Analysing genes across species
tutorial](../analysing_genes_across_species/README.md) page.

:::
