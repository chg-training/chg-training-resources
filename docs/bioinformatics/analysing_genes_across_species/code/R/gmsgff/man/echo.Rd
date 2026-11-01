\name{echo}
\alias{echo}
\title{
Print a message from an sprintf-style format string and formatted arguments.
}
\description{
Print a message from an sprintf-style format string and formatted arguments.
}
\usage{
echo( message, ... )
}
\value{
The formatted message
}
\author{
Gavin Band
}

\examples{
	echo( "This is a number %d and this is a string: \"%s\".\n", 1, "A string" )
}
