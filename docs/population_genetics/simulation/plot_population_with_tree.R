plot.population.with.tree = function(
  population,
  parents
) {
  # Figure out the order for nodes:
  ordering = matrix( NA, nrow = G, ncol = N )
  ordering[1,] = 1:N
  for( j in 2:G ) {
    parent_order = ordering[j-1, parents[j,] ]
    ordering[j,order(ordering[j-1,parents[j,]])] = 1:N
  }

  # Convert the data to 'long' form for plotting
  long_form = cbind(
    expand.grid( generation = 1:G, individual = 1:N ),
    haplotype  = as.vector( population ),
    ordering   = as.vector( ordering ),
    parent     = as.vector( parents )
  )

  # Connect each individual to its parent
  connections = (
    %>% left_join(
      long_form %>% filter( generation < G )
      %>% mutate( next_generation = generation + 1 )
      %>% select( parent = individual, parent_generation = generation, next_generation, parent_ordering = ordering ),
      by = c( "parent", generation = "next_generation" )
      %>% mutate(
        # 
        y_position = case_when(
          is.na(parent_ordering) ~ ordering,
          .default = (clustering * parent_ordering) + (( 1 - clustering ) * ordering )
      )
    )
  )

  # Plot the dots
  palette = rainbow( H )
  plot(
    connections$generation,
    connections$y_position,
    xlim = c ( 1, G*1.1 ),                 # to match haplotype
    bg = palette[ long_form$haplotype ],  # fill colour
    pch = 21,                              # filled circles
    cex = 0.5,                             # small size
    col = NA,                              # no outline on shapes
    xlab = "Generations",
    ylab = "Individual",
    bty = 'n'                              # no border
  )

  # Plot the segments
  segments(
    x0 = connections$parent_generation,
    x1 = connections$generation,
    y0 = connections$parent_ordering,
    y1 = connections$ordering,
    col = 'black',
    lwd = 1
  )
}
