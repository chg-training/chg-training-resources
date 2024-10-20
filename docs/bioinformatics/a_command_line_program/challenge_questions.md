---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Challenge questions

The `read_gff()` function has an extra argument, `extra_attributes`, that allows it to extract more attributes than just 'ID' and 'Parent'.

Shouldn't we make our command-line program support this too?

:::tip Challenge

Give the `gff_to_sqlite` program an extra **optional** argument called 'extra_attributes'.  It should be used like this:

<Tabs groupId="language">
<TabItem value="R" label="In R">

```sh
Rscript --vanilla gff_to_sqlite.R \
--input my_file.gff \
--output genes.sqlite \
--extra_attributes gene_type gene_name
```

</TabItem>
<TabItem value="python" label="In python">

```
python gff_to_sqlite.py \
--input my_file.gff \
--output genes.sqlite \
--extra_attributes gene_type gene_name
```

</TabItem>
</Tabs>

Connect up this argument so that the attributes appear in the output as well!

**Hint**. the `nargs='+'` option to `parser$add_argument()` can be used to tell `argparse` that the option should taae one or more values.  The values supplied come back as a 'character vector' in R, or 

:::

:::warning Warning

If you've already created a `genes.sqlite` database, and you try to re-run the program adding extra columns - it will fail.
This is because it's trying to put new columns like `gene_type` into a table that doesn't have them.
Use a new database file or delete the old one instead.

:::
