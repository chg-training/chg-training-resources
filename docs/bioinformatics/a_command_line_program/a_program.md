---
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# A command-line program

We'll write a program called `gff_to_sqlite.R` (for the R version) or `gff_to_sqlite.py` (for the python version).

Ultimately we are aiming to use the file like this (from the command-line):

<Tabs groupId="language">
<TabItem value="R" label="In R">

```sh
Rscript --vanilla gff_to_sqlite.R --input my_file.gff --output genes.sqlite
```

Here `Rscript --vanilla` is the R way of running a script on the command line, `gff_to_sqlite.R` is our program,
and the other parts are the command-line options.

To get started, create a new R file named `gff_to_sqlite.R` in your editor now.

</TabItem>
<TabItem value="python" label="In python">

```
python gff_to_sqlite.py --input my_file.gff --output genes.sqlite
```

Here `python` is the python interpreter, `gff_to_sqlite.py` is the program we'll write,
and the other parts are the command-line options.

:::tip Note
Depending on your system, you may need to type `python3` instead of `python`.
:::

To get started, create a new file named `gff_to_sqlite.py` in your editor now.

</TabItem>
</Tabs>

## Implementing the program

In the next few sections we'll walk through several bits that we will need to add to make our program work well:

- parsing the command-line arguments
- loading the data
- saving the data again
- and we'll add some code that prints nice messages to the users.

:::caution Note

Remember, on this page we are writing a command-line program, so to make it work you should use a text editor to add the code to the `gff_to_sqlite.R` or `gff_to_sqlite.py` file, save it, and then run it from the command-line. It won't work the same way if you try to run it in an interactive session or from Jupyterlab.

:::

Let's get started!

### Importing our code

The first thing we'll need to do is import the libraries we need - including our **gmsgff** library.  This is easy:

<Tabs groupId="language">
<TabItem value="R" label="In R">

```r
library( tidyverse )
library( RSQLite )
library( gmsgff )
```

</TabItem>
<TabItem value="python" label="In python">

```python
import os
import sqlite3
import gmsgff
```

</TabItem>
</Tabs>

### Adding command-line arguments

Our program will take an *input* argument telling it where to find the input GFF file, and and *output* argument telling
it where to put the output.  To get these into our program we'll use the **argparse** library. I find the [argparse
documentation](https://docs.python.org/3/library/argparse.html) a bit confusing, so here is a quick head start:

<Tabs groupId="language">
<TabItem value="R" label="In R">

```r

library( tidyverse )
library( RSQLite )
library( gmsgff )

parse_arguments = function() {
    library( argparse )
    parser = ArgumentParser(
        description = "Convert a GFF3 file to sqlite3 format. The result will be a table with the GFF3 fields, and with ID and Parent fields in columns."
    )
    parser$add_argument(
        '--input',
        type = "character",
        help = "The path of a GFF3-formatted file to work with",
        required = TRUE
    )
    # add other needed arguments here
    return( parser$parse_args() )
}

args = parse_arguments()
```

</TabItem>
<TabItem value="python" label="In python">

```python

import os
import sqlite3
import gmsgff

def parse_arguments():
    import argparse
    parser = argparse.ArgumentParser(
        description = """Convert a GFF3 file to sqlite3 format.
        The result will be a table with the GFF3 fields, and with ID and Parent fields in columns.
        """
    )
    parser.add_argument(
        '--input',
        help ='The path of a GFF3-formatted file to work with',
        required = True
    )
    # add other needed arguments here
    return parser.parse_args()

args = parse_arguments()
```

</TabItem>
</Tabs>

### Running it

Your program is already runnable! Try it from a command-line:

<Tabs groupId="language">
<TabItem value="R" label="In R">

```sh
Rscript --vanilla gff_to_sqlite.R
```

If all goes well you will see something like this:

```
usage: ./gff_to_sqlite.R [-h] --input INPUT
./gff_to_sqlite.R: error: the following arguments are required: --input
Execution halted
```

**Note.** you may have to install the argparse and RSQLite packages first.

</TabItem>
<TabItem value="python" label="In python">

```sh
python gff_to_sqlite.py
```

If all goes well you will see something like this:

    $ python3 gff_to_sqlite.py 
    usage: gff_to_sqlite.py [-h] --input INPUT
    gff_to_sqlite.py: error: the following arguments are required: --input

**Note.** you may have to install the argparse package first.

</TabItem>
</Tabs>

So it works!  And it correctly tells us that we haven't specified any command line- arguments. 

:::tip Note

You can also try running the program with the `--help` option:

<Tabs groupId="language">
<TabItem value="R" label="In R">

```sh
Rscript --vanilla gff_to_sqlite.R --help
```

</TabItem>
<TabItem value="python" label="In python">

```sh
python gff_to_sqlite.py --help
```

</TabItem>
</Tabs>

You should see that it gives you a nice message and shows you the options.

:::

Our program, of course, also needs somewhere to put the output

:::tip Challenge

Add an `--output` option to `parse_arguments()`, to tell the program where to store the output.

:::

## Implementing the main function

Our program runs, but doesn't do anything.  To make it do something let's write a `process()` function that does the
main work.

Implementing this function will actually be pretty easy. We need to read in the data using our module, and write it out
to the database using the dataframe library.  Then there are a couple of tweaks we should make including

- adding a column to tell us where the data came from
- adding some database indexes (optional, but sensible).

Let's do this now by writing a function called `process()` which takes in the arguments and does the work:

<Tabs groupId="language">
<TabItem value="R" label="In R">

```r
process = function( args ) {
    # (parse the data and write the output here)
}
```
</TabItem>
<TabItem value="python" label="In python">

```
def process( args ):
    # (parse the data and write the output here)
```

</TabItem>
</Tabs>

Let's write `process()` now.  Add the following pieces of code into the function body:

### Parsing the data

This is easy right?  Use your function to do it.  The correct filename is the one we read in from the command-line arguments.

<Tabs groupId="language">
<TabItem value="R" label="In R">

```r
data = gmsgff::read_gff( args$input )
```

</TabItem>
<TabItem value="python" label="In python">

```python
data = gmsgff.read_gff( args.input )
```

</TabItem>
</Tabs>


### Adding the dataset name

Let's add the input filename, suitably processed, as a column called `dataset`, so we can remember where it came
from. Because this involves a few steps, let's put it in a seperate function:

<Tabs groupId="language">
<TabItem value="R" label="In R">


```r
get_dataset_name = function( filename ) {
    # Get the input name without directories
    result = basename( filename )
    # Get rid of the .gff suffix using a 'regular expression'
    # [.] matches a dot
    # [^.]* matches any number of things that are NOT dots
    # $ matches the end of the string
    result = gsub( "[.][^.]*$", "", result )
    return( result )
}
```

</TabItem>
<TabItem value="python" label="In python">

```python

def get_dataset_name( filename ):
    # Get the input name without directories
    result = os.path.basename( args.input )
    # Get rid of the .gff suffix
    # python has a function for this
    result = os.path.splitext( result )[0]
    return( result )
```

</TabItem>
</Tabs>

And now inside `process()` let's add it as a column:

<Tabs groupId="language">
<TabItem value="R" label="In R">

```r
add_column(
    data,
    dataset = get_dataset_name( args.input ),
    .before = 1
)
```
</TabItem>
<TabItem value="python" label="In python">

```python
data.insert(
    loc = 0,
    column = 'name',
    value = get_dataset_name( args.input )
)
```
</TabItem>
</Tabs>

:::tip Note

This is the same syntax we used to add columns on the [earlier page](./004_extracting_attributes.md) page.

:::

### Outputting to sqlite

This turns out to be very easy too.  You have to open the database, then write a table to it:

<Tabs groupId="language">
<TabItem value="R" label="In R">

```r
# Write the data to the database in a table called "gff"
db = DBI::dbConnect(RSQLite::SQLite(), args$output )
dbWriteTable(
    db,
    "gff",
    data,
    row.names = FALSE
)

```

We will also add an `append = TRUE` argument to the above, so that more than one file can be added to the same database.

</TabItem>
<TabItem value="python" label="In python">

Pandas dataframes have a [`.to_sql()`
function](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.to_sql.html) that does this for
you. To make this work, you open the database and then run it:

```python
db = sqlite3.connect( args.output )
data.to_sql( "gff", db, index = False )
```

We will also add the `if_exists = "append"` argument to the above, so that more than one file can be added to the same database.


</TabItem>
</Tabs>

### Adding an index

To maximise the benefit of sqlite it's best to add **indexes** on the table (this lets it look up genes quickly by `ID`
or `Parent` fields).  Let's do this now by running a SQL command:

<Tabs groupId="language">
<TabItem value="R" label="In R">

```r
dbGetQuery( db, "CREATE INDEX IF NOT EXISTS gff_id_index ON gff( ID )" )
dbGetQuery( db, "CREATE INDEX IF NOT EXISTS gff_parent_index ON gff( Parent )" )
```

</TabItem>
<TabItem value="python" label="In python">

```python
db.execute( "CREATE INDEX IF NOT EXISTS gff_id_index ON gff( ID )" )
db.execute( "CREATE INDEX IF NOT EXISTS gff_parent_index ON gff( Parent )" )
```

</TabItem>
</Tabs>

### Closing the connection

We're also meant to close the connection at the end:

<Tabs groupId="language">
<TabItem value="R" label="In R">

```r
dbDisconnect( db )
```

</TabItem>
<TabItem value="python" label="In python">

```
db.close()
```

</TabItem>
</Tabs>

Put that all into your `process()` function (**Note**: remember to keep the correct indent in python, and remember the closing brace for the function in R!)

### Running `process()`

Finally, since all the above wasq inside the `process()` function, don't forget to call process:

```r
process( args )
```

## The whole program

If you've followed so far, you should have a file `gff_to_sqlite.R` or `gff_to_sqlite.py` that looks something like this:

<Tabs groupId="language">
<TabItem value="R" label="In R">

```r
library( tidyverse )
library( RSQLite )
library( gmsgff )

parse_arguments = function() {
    library( argparse )
    parser = ArgumentParser(
        description = "Convert a GFF3 file to sqlite3 format. The result will be a table with the GFF3 fields, and with ID and Parent fields in columns."
    )
    parser$add_argument(
        '--input',
        type = "character",
        help = "The path of a GFF3-formatted file to work with",
        required = TRUE
    )
    parser$add_argument(
        '--output',
        type = "character",
        help = "The path to the output file.",
        required = TRUE
    )
    return( parser$parse_args() )
}

get_dataset_name = function( filename ) {
    # Get the input name without directories
    result = basename( filename )
    # Get rid of the .gff suffix using a 'regular expression'
    # [.] matches a dot
    # [^.]* matches any number of things that are NOT dots
    # $ matches the end of the string
    result = gsub( "[.][^.]*$", "", result )
    return( result )
}

process = function( args ) {
    data = gmsgff::read_gff( args$input )

    # Add the dataset name as a column
    data = add_column(
        data,
        dataset = get_dataset_name( args$input ),
        .before = 1
    )

    # Write the data to the database
    db = DBI::dbConnect(RSQLite::SQLite(), args$output )
    dbWriteTable(
        db,
        "gff",
        data,
        row.names = FALSE,
        append = TRUE
    )

    # Create the indexes
    dbGetQuery( db, "CREATE INDEX IF NOT EXISTS gff_id_index ON gff( ID ))" )
    dbGetQuery( db, "CREATE INDEX IF NOT EXISTS gff_parent_index ON gff( Parent ))" )

    # close the connection
    dbDisconnect( db )
}

args = parse_arguments()
process( args )

```

</TabItem>
<TabItem value="python" label="In python">

```python
import os
import sqlite3
import gmsgff

def parse_arguments():
    import argparse
    parser = argparse.ArgumentParser(
        description = """Convert a GFF3 file to sqlite3 format.
        The result will be a table with the GFF3 fields, and with ID and Parent fields in columns.
        """
    )
    parser.add_argument(
        '--input',
        help ='The path of a GFF3-formatted file to work with',
        required = True
    )
    parser.add_argument(
        '--output',
        help = "The path to the output file",
        required = True
    )
    return parser.parse_args()

def get_dataset_name( filename ):
    # Get the input name without directories
    result = os.path.basename( args.input )
    # Get rid of the .gff suffix - python has a function for this
    result = os.path.splitext( result )[0]
    return( result )

def process( args ):
    data = gmsgff.read_gff( args.input )

    # Add the source as a column
    data.insert( loc = 0, column = 'dataset', value = get_dataset_name( args.input ) )

    # Write the data to the database
    db = sqlite3.connect( args.output )
    data.to_sql( "gff", db, index = False, if_exists = "append" )

    # Create the indexes
    db.execute( "CREATE INDEX IF NOT EXISTS gff_id_index ON gff( ID )" )
    db.execute( "CREATE INDEX IF NOT EXISTS gff_parent_index ON gff( Parent )" )

    # close the database
    db.close()

args = parse_arguments()
process( args )

```

</TabItem>
</Tabs>

Congratulations!

Test it out in your shell again without any arguments, to see what happens.

### Trying it out for real

Now try running it on some real data:

<Tabs groupId="language">
<TabItem value="R" label="In R">

```r
Rscript --vanilla ./gff_to_sqlite.py --input gencode.v41.annotation.gff3 --output genes.sqlite
```

</TabItem>
<TabItem value="python" label="In python">

```python
python ./gff_to_sqlite.py --input gencode.v41.annotation.gff3.gz --analysis_name Pf3D7 --output genes.sqlite
```

</TabItem>
</Tabs>

Does it work?

:::caution Note
If it didn't work, look carefully back at the error message and/or go back and check the code carefully.

In python, remember you **must be consistent about indenting the code** - use either spaces or tabs and stick to it throughout.
:::


Check how big the sqlite file is.  Is it larger or smaller than the input file?
(What about if you uncompress the input file first?)

### Making it better for the user

Is this good enough?  No!  Your program runs, but it's not very nice to the user. In fact in the version above we put in
all those comments - it's much nicer to turn these into messages for the user instead.

:::tip Challenge

Make your program print out useful information to the user as it runs.  For example, it should tell the user what it's doing and tell it if it succeeded and so on.

<Tabs groupId="language">
<TabItem value="R" label="In R">

In R a useful function is this one which works a bit like 'echo' in BASH:
```r
echo = function( message, ... ) {
    cat( sprintf( message, ... ))
}
```

You can use it to print out messages, for example:
```r
echo( "Welcome to gff_to_sqlite.R\n" )
```

Or messages with values, for example:
```r
echo( "Successfully loaded data from '%s'\n", args$input )
echo( "Data had %d rows and %d columns.\n", nrow( data ), nrow( data ))
```

(The `\n`s are needed at the end of each row here to make sure they end in a newline character.)

(To print out data itself, use `print()`.)

</TabItem>
<TabItem value="python" label="In python">

In python the `print()` function is good for printing out messages, as in:
```python
print( "Welcome to gff_to_sqlite.R" )
```
Or messages with values, for example:
```python
print( "Successfully loaded data from '%s'" % args$input )
print( "Data had %d rows and %d columns." % ( nrow( data ), nrow( data )))
```
print( )
</TabItem>
</Tabs>

**Note**. The secret to formatting with `print()` and `echo()` is to use the **format string syntax**.  A '`%d`' in the
format string indicates the value should dbe filled in from the corresponding vairable which must be an **integer
value**. A '`%s`' indicates it should instead be a **string value**.  (And a '`%f`' indicates a floating-point number, but
we didn't use one of those in the examples above.)

:::

Once you have done this your program will probably look something like this:

<Tabs groupId="language">
<TabItem value="R" label="In R">

See [the completed R program](https://github.com/chg-training/chg-training-resources/tree/main/docs/bioinformatics/programming_with_gene_annotations3/code/gff_to_sqlite.R).  
 
 </TabItem>
<TabItem value="python" label="In python">

See [the completed python program](https://github.com/chg-training/chg-training-resources/tree/main/docs/bioinformatics/programming_with_gene_annotations3/code/gff_to_sqlite.py).

</TabItem>
</Tabs>

And running it should produce nice output, something like this:

<Tabs groupId="language">
<TabItem value="R" label="In R">

```
% Rscript --vanilla ~/Projects/teaching/gms/chg-training-resources/docs/bioinformatics/programming_with_gene_annotations3/code/gff_to_sqlite.R --input gencode.v41.annotation.gff3 --output genes.sqlite
++ Welcome to gff_to_sqlite.R!
++ gff_to_sqlite.R: processing...
++ process(): loading data from 'gencode.v41.annotation.gff3'...
++ ok, loaded 3373604 rows and 11 columns of data.
first few rows are:
# A tibble: 6 × 11
  seqid source type       start   end score strand phase attributes ID    Parent
  <chr> <chr>  <chr>      <int> <dbl> <dbl> <chr>  <int> <chr>      <chr> <chr> 
1 chr1  HAVANA gene       11869 14409    NA +         NA ID=ENSG00… ENSG… NA    
2 chr1  HAVANA transcript 11869 14409    NA +         NA ID=ENST00… ENST… ENSG0…
3 chr1  HAVANA exon       11869 12227    NA +         NA ID=exon:E… exon… ENST0…
4 chr1  HAVANA exon       12613 12721    NA +         NA ID=exon:E… exon… ENST0…
5 chr1  HAVANA exon       13221 14409    NA +         NA ID=exon:E… exon… ENST0…
6 chr1  HAVANA transcript 12010 13670    NA +         NA ID=ENST00… ENST… ENSG0…
++ process(): Adding source filename as a column...
++ process(): Writing data to 'genes.sqlite', gff table...
++ process(): ok, adding indexes...
++ process(): success.
++ Success!
++ Thank you for using gff_to_sqlite.R.
```

</TabItem>
<TabItem value="python" label="In python">

```
% python3 ./gff_to_sqlite.py --input gencode.v41.annotation.gff3 --output genes.sqlite
++ Welcome to gff_to_sqlite.py!
++ gff_to_sqlite.py: processing...
++ process(): loading data from 'gencode.v41.annotation.gff3'...
++ ok, loaded 3373604 rows and 11 columns of data.
first few rows are:
                         ID             Parent seqid  source  ... score  strand  phase                                         attributes
0         ENSG00000223972.5                NaN  chr1  HAVANA  ...   NaN       +    NaN  ID=ENSG00000223972.5;gene_id=ENSG00000223972.5...
1         ENST00000456328.2  ENSG00000223972.5  chr1  HAVANA  ...   NaN       +    NaN  ID=ENST00000456328.2;Parent=ENSG00000223972.5;...
2  exon:ENST00000456328.2:1  ENST00000456328.2  chr1  HAVANA  ...   NaN       +    NaN  ID=exon:ENST00000456328.2:1;Parent=ENST0000045...
3  exon:ENST00000456328.2:2  ENST00000456328.2  chr1  HAVANA  ...   NaN       +    NaN  ID=exon:ENST00000456328.2:2;Parent=ENST0000045...
4  exon:ENST00000456328.2:3  ENST00000456328.2  chr1  HAVANA  ...   NaN       +    NaN  ID=exon:ENST00000456328.2:3;Parent=ENST0000045...

[5 rows x 11 columns]
++ process(): Adding source filename as a column...
++ process(): Writing data to 'genes_python.sqlite', gff table...
++ process(): ok, adding indexes...
++ process(): closing the database.
++ Success!
++ Thank you for using gff_to_sqlite.py!
```

</TabItem>
</Tabs>


## Using the program

**Congratulations!**  Your program can now be used to import data from a gff file or gff files - into a single database.

Because we added that `dataset` column - there's nothing to stop us loading multiple datasets into the same database
file.  Try it now - you should be able to write multiple files into the `genes.sqlite` database.

You can always get the data back out of the database again using the `sqlite3` tool on the command-line.  For example
to get just the first 10 genes:
```
sqlite3 -mode csv -header 'SELECT * FROM gff WHERE type =='gene' LIMIT 10'  genes.sqlite
```
(This should be run on the command-line, not in R/python).

You can similarly load pieces of the data into R or python, or other languages.  For more examples of this see the
[appendix](appendices/sqlite_access.md).

## Final touches

The program is already pretty useful.  But maybe it could be better?
Try some [challenge question](./challenge_questions.md) to find out.

