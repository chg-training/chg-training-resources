plot.population.with.tree = function(
  population,
  parents,
  clustering.parameter = 0
) {
  library( dplyr )
  # Figure out the order for nodes:
  ordering = matrix( NA, nrow = G, ncol = N )
  ordering[1,] = 1:N
  for( j in 2:G ) {
    parent_order = ordering[j-1, parents[j,] ]
    ordering[j,order(ordering[j-1,parents[j,]])] = 1:N
  }

  # Convert the data to 'long' form for plotting
  long_form = (
    cbind(
      expand.grid( generation = 1:G, individual = 1:N ),
      haplotype  = as.vector( population ),
      ordering   = as.vector( ordering ),
      parent     = as.vector( parents )
    )
    %>% group_by( parent )
    %>% mutate(
      y = ordering,
      y = ( clustering.parameter * mean(y) ) + ( 1 - clustering.parameter ) * y
    )
  )
  # Connect each individual to its parent
  connections = (
    long_form
    %>% left_join(
      (
        long_form
        %>% filter( generation < G )
        %>% mutate( next_generation = generation + 1 )
        %>% select(
          parent            = individual,
          parent_generation = generation,
          next_generation,
          parent_ordering   = ordering,
          parent_y          = y
        )
      ),
      by = c( "parent", generation = "next_generation" )
    )
  )

  # Plot the dots
  palette = rainbow( H )
  plot(
    connections$generation,
    connections$y,
    xlim = c ( 1, G*1.1 ),                 # to match haplotype
    bg = palette[ long_form$haplotype ],  # fill colour
    pch = 21,                              # filled circles
    cex = 0.75,                             # small size
    col = rgb( 0, 0, 0, 0.5 ),                         # no outline on shapes
    xlab = "Generations",
    ylab = "Individual",
    bty = 'n'                              # no border
  )

  # Plot the segments
  segments(
    x0 = connections$parent_generation + 0.2,
    x1 = connections$generation - 0.2 ,
    y0 = connections$parent_y,
    y1 = connections$y,
    col = rgb( 0, 0, 0, 0.8 ),
    lwd = 1
  )
}
