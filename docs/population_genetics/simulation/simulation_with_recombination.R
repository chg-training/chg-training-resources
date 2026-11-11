# before running, define:
# N = 250
# G = 1000
# L = 5000
# H = 10
# mutation_rate_per_locus = 0.05
# recombination_rate      = 0.05

l_haplotypes       = matrix( NA, nrow = H + 25000, ncol = L/2 )
l_haplotypes[1:H,] = rbinom( n = H*L/2, size = 1, prob = 0.01 )
l_highest = H
r_haplotypes       = matrix( NA, nrow = H + 25000, ncol = L/2 )
r_haplotypes[1:H,] = rbinom( n = H*L/2, size = 1, prob = 0.01 )
r_highest = H

# Which haplotype does each individual carry on the left and right of the hotspot?
l_population = matrix( NA, nrow = G, ncol = N )
r_population = matrix( NA, nrow = G, ncol = N )

# Initialise the population
l_population[1,] = sample( 1:l_highest, N, replace = T )
r_population[1,] = sample( 1:r_highest, N, replace = T )

echo = function( message, ... ) {
  cat( sprintf( message, ... ))
}

plot.haplotypes <- function(
    haplotypes,
    sort = FALSE,
    number_to_plot = N
) {
  # We just plot the first n
  n = min(number_to_plot, nrow(haplotypes))
  haplotypes = haplotypes[1:n,]
  if( sort ) {
	# We use 'hierarchical clustering' to order the haplotypes
	# We are here using 'manhattan' distance, i.e. the sum of differences
	# between pairs of haplotypes
    order = hclust(
		dist( haplotypes, method = "manhattan" )
	)$order
  } else {
    order = 1:nrow(haplotypes)
  }
  image(
    t(haplotypes[order,]),
    x = 1:ncol(haplotypes),
    y = 1:nrow(haplotypes),
    xlab = "variant",
    ylab = "haplotype"
  )
}

compute.ld <- function( haplotypes ) {
  cor( haplotypes )
}

plot.ld <- function( haplotypes ) {
  # By default `image()` chooses its own colour set, but we'll
  # specify a fixed set using the breaks` and `col` arguments
  breaks = c( -0.01, seq( from = 0.1, to = 1, by = 0.1 ))
  ld.colours = c( 'grey95', rev( heat.colors( length(breaks)-2 )))
  r = compute.ld( haplotypes )
  image(
    r^2,
    col = ld.colours,
    breaks = breaks
  )
}

mutate_lr <- function( l_haplotype, r_haplotype ) {
  # Take an existing haplotype...
  old_l_haplotype = l_haplotypes[l_haplotype,]
  old_r_haplotype = r_haplotypes[r_haplotype,]
  # mutate it at a single site, either on the left or right.
  L = ncol( l_haplotypes ) + ncol( r_haplotypes )
  which_site = sample( 1:L, 1 )
  result = list( l = l_haplotype, r = r_haplotype )
  if( which_site <= ncol( l_haplotypes )) {
	# mutate the inherited haplotype on the left of the hotspot!
	new_haplotype = old_l_haplotype
	new_haplotype[which_site] = 2
	l_highest                <<- l_highest + 1
	l_haplotypes[l_highest,] <<- new_haplotype
	result$l = l_highest
  } else {
	new_haplotype = old_r_haplotype
	# mutate the inherited haplotype on the right of the hotspot!
	new_haplotype[which_site - ncol(l_haplotypes)] = 2
	r_highest                <<- r_highest + 1
	r_haplotypes[r_highest,] <<- new_haplotype
	result$r = r_highest
  }
  return( result )
}

evolve_lr <- function(
	l_current,
	r_current,
	mutation_rate_per_locus = 0.05,
	recombination_rate      = 0.05
) {
  # Inherit from parents, as before
  N = length( l_current )
  l_parents = sample( 1:N, size = N, replace = TRUE )

  # by default parents on right are the same as on left...
  r_parents = l_parents

  # ...but not if we recombine!
  # Then recombinants get different parents on right side!
  who_should_recombine = rbinom( N, size = 1, prob = recombination_rate )
  r_parents[ who_should_recombine == 1 ] = sample( 1:N, size = sum( who_should_recombine ), replace = TRUE )

  # set this up as before:
  l_new = l_current[l_parents]
  r_new = r_current[r_parents]

  # Now decide if any haplotypes should mutate
  # First randomly pick samples to mutate...
  who.mutates = which(rbinom( N, size = 1, prob = mutation_rate_per_locus ) == 1 )
  # ...and mutate them:
  for( i in who.mutates ) {
    mutated = mutate_lr( l_new[i], r_new[i] )
	l_new[i] = mutated$l
	r_new[i] = mutated$r
  }

  return( list( l = l_new, r = r_new ))
}


image_dir = sprintf( "simulation/N=%d,L=%d,mu=%.3f,rho=%.3f", N, L, mutation_rate_per_locus, recombination_rate )

dir.create( image_dir, recursive = TRUE,  showWarnings = FALSE )
dir.create( sprintf( "%s/haplotypes", image_dir), recursive = TRUE,  showWarnings = FALSE )

# Evolve population!
for( generation in 2:G ) {
	echo( "++ generation %d of %d...\n", generation, G )

	# Evolve the population, now with mutations
	new = evolve_lr(
		l_population[generation-1,],
		r_population[generation-1,],
		mutation_rate_per_locus,
		recombination_rate
	)
	l_population[generation,] = new$l
	r_population[generation,] = new$r

	# Let's just plot every 5th generation to avoid too many plots!
	if( generation %% 5 == 1 ) {
	filename = sprintf( "%s/haplotypes/generation_%04d.png", image_dir, generation )
	echo( "++ Plotting generation %d to \"%s\"...\n", generation, filename )
	echo(
		"   (%d / %d different haplotypes seen so far, %d / %d still present.)\n",
		l_highest, r_highest,
		length( unique( l_population[generation, ])),
		length( unique( r_population[generation, ]))
	)
	png( file = filename, width = 1000, height = 400 )
	par( mfrow = c( 1, 2 ))
	par( mar = c( 4, 1, 1, 0.5 ))
	plot.haplotypes( l_haplotypes[l_population[generation,],], sort = TRUE )
	par( mar = c( 4, 0.5, 1, 1 ))
	plot.haplotypes( r_haplotypes[r_population[generation,],], sort = TRUE )
	dev.off()
	
	# !! IMPORTANT!! Use gc() to return memory to operating system!
	# Without this you may use up all your RAM
	gc()
	}

	if( l_highest > nrow( l_haplotypes ) | r_highest > nrow( r_haplotypes )) {
	echo( "++ Uh-oh!  I ran out of haplotype storage.  Quitting the simulation." )
	break ;
	}
}
