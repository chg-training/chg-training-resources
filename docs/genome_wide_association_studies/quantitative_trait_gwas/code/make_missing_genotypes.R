bed = rres::read.plink.binary( "Genotype_data/AMR_genotypes.bed" )
phenotypes = readr::read_tsv( "Phenotype_data/AMR_phenotype.txt")
M = match( bed$fam$member, phenotypes$IID )
phenotypes = phenotypes[M,]

new.genotypes = bed$genotype
N = nrow( bed$genotype )
L = ncol( bed$genotype )
sample.missingness = rbeta(
	N,
	shape1 = 1,
	shape2 = 100
)
r = which( runif(L) < 0.02 )
sample.missingness[r] = rbeta( length(r), shape1 = 2, shape2 = 25 )

hist( sample.missingness, 100 )

for( i in 1:N ) {
	w = which( runif(L) < sample.missingness[i] )
	new.genotypes[i,w] = NA
}

# SNP missingness, we'll give a low general value
# but then make one in a hundred SNPs have bigger issues
errors = tibble::tibble(
	i = 1:L,
	type = "basic",
	snp.missingness = rbeta(
		L,
		shape1 = 1,
		shape2 = 100
	)
)

r = which( runif(L) < 0.05 )
errors$snp.missingness[r] = rbeta( length(r), shape1 = 4, shape2 = 20 )
errors$type[r] = "extreme"

hist( snp.missingness, 100 )

for( i in 1:L ) {
	w = which( runif(N) < errors$snp.missingness[i] )
	new.genotypes[w,i] = NA
}

# Now make some differentially missing SNPs,
# Differentially missing for non-ref alleles
r = which( runif(L) < 0.05 )
errors$type[r] = "differential"

errors$snp.missingness[r] = (
	((phenotypes$Noro_response - 1)/22) * 0.4
	+ 0.05
)
for( i in r ) {
	w = intersect(
		which( new.genotypes[,i] > 0 ),
		which( runif(N) < errors$snp.missingness[i] )
	)
	new.genotypes[w,i] = NA
}

result = tibble::tibble()
for( i in 1:L ) {
	l = lm( phenotypes$Noro_response ~ new.genotypes[,i] )
	s = summary(l)$coeff
	if( nrow(s) == 1 ) {
		s = rbind( s, c( NA, NA, NA, NA ))
	}
	result = dplyr::bind_rows(
		result,
		tibble::tibble(
			i = i,
			f = sum(new.genotypes[,i], na.rm = T ) / (2*sum( !is.na( new.genotypes[,i] ))),
			N = sum( !is.na( new.genotypes[,i] )),
			beta = s[2,1],
			se = s[2,1],
			p = s[2,4]
		)
	)
}
errors = (errors %>% inner_join( result, by = "i" ))
errors %>% group_by( type ) %>% summarise( m = median(p, na.rm = T))

errors %>% filter( type == 'differential' ) %>% arrange(p)
errors %>% filter( type == 'basic' ) %>% arrange(p)
errors %>% filter( type == 'extreme' ) %>% arrange(p)

rbeta( length(r), shape1 = 4, shape2 = 20 )



layout( matrix( 1:2, ncol = 1 ))
hist( colSums( is.na(new.genotypes)) / N, 100, main = "SNP missingness" )
hist( rowSums( is.na(new.genotypes)) / L, 100, main = "sample missingness" )

# save genotypes as PED file.

ped.data = new.genotypes
mode(ped.data) = "character"
ped.data[ is.na(ped.data)] = '0 0'
for( i in 1:L ) {
	alleleA = bed$map$allele_1[i]
	alleleB = bed$map$allele_2[i]
	genotypes = c(
		sprintf( "%s %s", alleleA, alleleA ),
		sprintf( "%s %s", alleleA, alleleB ),
		sprintf( "%s %s", alleleB, alleleB )
	)
	ped.data[,i] = genotypes[new.genotypes[,i] + 1 ]
}

ped.data[ is.na(ped.data) ] = "0 0"
readr::write_delim(
	cbind(
		bed$fam,
		ped.data
	),
	file = "Genotype_data/AMR_genotypes_missing.ped",
	col_names = FALSE
)
