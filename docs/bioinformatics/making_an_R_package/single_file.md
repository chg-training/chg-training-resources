---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Taking the easy way

The simplest way to make a 'package' is to just put our function into a single file, like this:

<Tabs groupId="language">
<TabItem value="R" label="In R">

Copy and paste the function and paste it into a new file, called `gff.R`, in the current directory.
(For good measure, paste the test function as well.)

To load this into your R session, you can use the `source()` function:
```r
source( 'gff.R' )
X = read_gff( "gencode.v41.annotation.head.gff" )
```

</TabItem>
<TabItem value="python" label="In python">

Making a python module is easy:

* Copy your code into a new file, named `gmsgff.py` using a [text editor](/prerequisites/editor.md). (This file
  should go in your current directory i.e. the one you started python / jupyterhub from.)

* Congratulations!  You have now written your first python module.

To use your python module, simply import it and use like this:

```python
import gmsgff
X = gmsgff.read_gff( 'gencode.v41.annotation.head.gff' )
```
or 
```python
X = gmsgff.read_gff( 'gencode.v41.annotation.head.gff', extra_attributes = [ 'gene_type', 'gene_name' ] )
```

or if you don't want to type the "`gmsgff.`" before the function name:
```python
from gmsgff import read_gff
X = read_gff( 'gencode.v41.annotation.head.gff' )
```

Cool!

</TabItem>
</Tabs>

For python this is it!

However, if you're working in R, this isn't a fully-fledged package yet.  For that, go here:

