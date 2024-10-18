---
sidebar_position: 7
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Making a module

If you've got this far, you've written a function `read_gff()` that [passes the
test](./Getting_started_writing_some_code.md#test-driven-development).  And ope

That's already cool but let's go one step further - let's turn it into an R package (or python module.)

It's pretty easy.

## Taking the easy way

The simplest way is to just put it in a single file, like this:

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

or if you don't want to type the "`gmsgff.`" before the function name:
```python
from gmsgff import read_gff
X = read_gff( 'gencode.v41.annotation.head.gff' )
```

Cool!

</TabItem>
</Tabs>


## Making an R package

Making a single file like this is ok, but in R it's not a full package.  If you are working in R, let's make one now. 

Making an R package is in fact a big topic - [whole books](https://r-pkgs.org) have been written about it. If you are
wanting to build and maintain R packages more often, you should definitely read that book (and use the suggested tools).
But for now, we'll use base R approaches to get it working.  

### The skeleton

To get started, first you need to start with an empty R workspace that has **only** the functions you want in it. So,
start a new R session (quit the old one if you want) and paste in the definition of `read_gff()`.

Now, to create an R package, use `package.skeleton()`.  Let's call our package "gmsgff":

```r
package.skeleton( "gmsgff" )
```

This will create a new directory called 'gmsgff' in the working directory.  If you look inside it you will see a few
things:
```
gmsgff/
  NAMESPACE
  DESCRIPTION
  Read-and-delete-me
  man/
    gmsgff-package.Rd
    read_gff.Rd
  R/
    read_gff.R
```

Have a look at these files now using your preferred method.  They are:

* The `NAMESPACE` and `DESCRIPTION` files are package metadata - we will have to edit these to make the package work
* The `read_gff.R` file contains your function.
* The `gmsgff-package.Rd` and `read_gff.Rd` file contain the package documentation - we'll have to edit these too.

(You can read, and if you wish delete, `Read-md-and-delete-me`.)

### The package metadata

Let's go through these in order.  You can also see a completed version of the package [on
github](https://github.com/chg-training/chg-training-resources/tree/main/docs/bioinformatics/programming_with_gene_annotations3/code/R/gmsgff).

First let's edit `NAMESPACE`, which declares what the package imports (in our case, `readr` and
`stringr`), and what it "exports" (in our case, the `read_gff()` function.)  It should look like this:
```
import( readr )
import( stringr )
export("read_gff")
```

Easy enough.

Second, `DESCRIPTION`, which (you've guessed it!) describes the package.  Edit it to give relevant values, e.g. mine looks like this:
```
Package: gmsgff
Type: Package
Title: Utilities for loading gene annotation data
Version: 0.1
Date: 2023-10-13
Author: My Name
Maintainer: My Name <my.email@server.info>
Description: Provides read_gff
License: mit_license
```

:::caution Important
There is one extra line in this file you will need as well - to tell it about the dependency on the tidyverse packages :
```
Imports: stringr, readr
```

Make sure and add this to the end.
:::

### The documentation

To try to install the package, you can run `R CMD INSTALL gmsgff` from the command-line:

```
% R CMD INSTALL gmsgff
```

But you will probably see an error like:

```
Error in Rd_info(db[[i]]) : 
  missing/empty \title field in '/private/var/folders/1j/6glxfbj173d604n6mx1zh30c0000gn/T/Rtmp14vvWH/Rbuild772d141c32f6/gmsgff/man/read_gff.Rd'
Rd files must have a non-empty \title.
See chapter 'Writing R documentation' in manual 'Writing R Extensions'.
* removing ‘/private/var/folders/1j/6glxfbj173d604n6mx1zh30c0000gn/T/Rtmp14vvWH/Rinst772d4755beca/gmsgff’
      -----------------------------------
ERROR: package installation failed

```

What this means is that **R won't let us install it until we have written documentation**.  (Oh dear.)

There are in fact two documentation files to write, and if you look at them you'll see they look a bit complicated.  For
example `gmsgff/man/gmsgff-package.Rd` starts like this:

```
\name{gmsgff-package}
\alias{gmsgff-package}
\alias{gmsgff}
\docType{package}
\title{
\packageTitle{gmsgff}
}
\description{
\packageDescription{gmsgff}
}
\details{
  (etc)
```

A bit complicated!

To get this working for this tutorial I suggest just copying the files I quickly made for this:

* [gmsgff-package.Rd](https://raw.githubusercontent.com/chg-training/chg-training-resources/main/docs/bioinformatics/programming_with_gene_annotations3/code/R/gmsgff/man/gmsgff-package.Rd)
* [read_gff.Rd](https://raw.githubusercontent.com/chg-training/chg-training-resources/main/docs/bioinformatics/programming_with_gene_annotations3/code/R/gmsgff/man/read_gff.Rd)

For example you could download these files and replace your original ones.  Please have a look at them and edit anything
you want to improve.

:::tip Note

The [r-pks.org site](https://r-pkgs.org) suggests to use another package called
[roxygen](https://cran.r-project.org/web/packages/roxygen2/vignettes/roxygen2.html) to document your package instead.
This is a bit easier, because you can put documentation in the same file as your code, and it will process it into the
needed files.  But we won't do this for now.

:::

### Installing the package

Ok let's try it out!  In the command-line run:
```
% R CMD INSTALL gmsgff
```

With luck you should see a bunch of messages ending wtih
```
** testing if installed package can be loaded from temporary location
** testing if installed package can be loaded from final location
** testing if installed package keeps a record of temporary installation path
* DONE (gmsgff)
```
**Congratulations!** You've written the **gmsgff** R package.

### Taking it for a spin

Try it like this: start a new R session and type
```
library(gmsgff)
gencode = read_gff( "gencode.v41.annotation.gff3" )
```

Or like this:
```
gencode = gmsgff::read_gff( "gencode.v41.annotation.gff3" )
```

Does it work?

:::tip Note

You can also read the package help - try
```
?read_gff
```

### Adding the tests

If you look in [my
version](https://github.com/chg-training/chg-training-resources/tree/main/docs/bioinformatics/programming_with_gene_annotations3/code/R/gmsgff)
you'll see some additions I made to add the test code.  In short:
- I added the test function in `tests/test_read_gff.R`, with a little bit of boilerplate
- I added a `Suggests: unittest` line to the `DESCRIPTION` file.

It's a good idea to keep the test in the package, so go ahead and add your tests now - then use `R CMD INSTALL` to install it again.

:::tip Note

This was pretty easy, however [`r-pks.org` site](https://r-pkgs.org) advises to use another test package called
`testthat`, which is probably what you should use in real work.
:::

## Next steps

Great!  We have a fully functional, fully tested gff-loading package! Now let's use it to [write a useful command-line
program](Converting_gff_to_sqlite.md).
