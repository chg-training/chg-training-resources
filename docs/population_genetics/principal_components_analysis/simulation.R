
L = 1000 # number of SNPs

clamp = function( x, lower = -Inf, upper = Inf ) {
	pmax( pmin( x, upper ), lower )
}

# Sample some ancestral allele frequnecies
ancestral.f = clamp( rbeta( L, shape1 = 1.5, shape2 = 5 ), 0.01, 0.99 )

drift = c( 0.02, 0.025, 0.01 ) # "genetic drift time" - larger in smaller populations
Npops = length(drift)

frequencies = matrix(
	nrow = L,
	ncol = length( drift ),
	dimnames = list(
		sprintf( "SNP_%d", 1:L ),
		sprintf( "population_%d", 1:Npops )
	)
)
for( i in 1:Npops ) {
	frequencies[,i] = clamp(
		rnorm( n = L, mean = ancestral.f, sd = sqrt( ancestral.f * ( 1 - ancestral.f ) * drift[i] )),
		lower = 0.01,
		upper = 0.99
	)
}

# Sample sizes
sample.sizes = c( 100, 500, 300 )
N = sum( sample.sizes )
sample.pops = c( rep( 1, 100), rep( 2, 500 ), rep( 3, 300 ))

pop = rep( 1, sample.sizes[1] )
genotypes = matrix(
	nrow = L,
	ncol = N,
	dimnames = list(
		sprintf( "SNP_%d", 1:L ),
		sprintf( "individual_%d", 1:N )
	)
)

for( i in 1:N ) {
	genotypes[,i] = rbinom(
		size = 2,
		n = L,
		prob = frequencies[,sample.pops[i]]
	)
}

# ------------------------------
# note let's compute PCA


compute.PCA <- function( genotypes, normalise.genotypes = TRUE ) {
	X = genotypes
	if( normalise.genotypes ) {
		for( i in 1:L ) {
			X[i,] = (X[i,] - mean(X[i,])) / sd(X[i,] )
		}
	} else {
		for( i in 1:L ) {
			X[i,] = (X[i,] - mean(X[i,]))
		}
	}

	# compute relatedness matrix:
	R = (1/L) * t(X) %*% X

	# eigendecompse
	E = eigen(R)
	loadings = X %*% E$vectors
	return(
		list(
			eigenvalues = E$values,
			eigenvectors = E$vectors,
			loadings = loadings
		)
	)
}
