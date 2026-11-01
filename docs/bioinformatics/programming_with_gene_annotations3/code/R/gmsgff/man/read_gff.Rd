\name{read_gff}
\alias{read_gff}
\title{
Parse a gff file to a tidyverse dataframe
}
\description{
Parse a gff file to a tidyverse dataframe
}
\usage{
read_gff(filename)
}
\value{
A dataframe with the nine GFF columns, and ID and Parent fields
}
\author{
Gavin Band
}

\examples{
gencode = gmsgff::read_gff( "##gff-version 3
#description: test data
chr1\tme\tgene\t1\t1000\t.\t+\t.\tID=gene1;other_data=stuff
chr1\tme\texon\t10\t900\t.\t+\t.\tID=gene1.1;Parent=gene1
" )
}
