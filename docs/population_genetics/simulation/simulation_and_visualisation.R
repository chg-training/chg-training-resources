simulatePopulation <- function(
  L,       # number of bi-allelic variants
  N,       # population size
  G,       # number of generations
  H = 10,  # starting number of haplotypes
  initial.frequency = 0.2 # initial variant frequency
) {
  result = list(
    L = L, H = H, N = N, G = G,
    haplotypes = NA,
    population = NA
  )
  haplotypes = matrix( NA, nrow = H, ncol = L )
  haplotypes[,] = rbinom( n = H*L, size = 1, prob = initial.frequency )
  population = matrix(
    NA, nrow = G, ncol = N,
    dimnames = list(
      sprintf( "generation=%d", 1:G ),
      sprintf( "individual=%d", 1:N )
    )
  )
  population[1,] = sample( 1:H, size = N, replace = TRUE )
  
  evolve <- function( currentGeneration ) {
    parents = sample( 1:N, size = N, replace = TRUE )
    return( currentGeneration[parents] )
  }
  
  for( generation in 2:G ) {
    population[generation,] = evolve( population[generation-1,] )
  }
  result$haplotypes = haplotypes
  result$population = population
  
  return(result)
}

blank.plot <- function( xlim = c( 0, 1 ), ylim = c( 0, 1 ), xlab = "", ylab = "" ) {
  # this function plots a blank canvas
  plot(
    0, 0,
    col = 'white', # draw points white
    bty = 'n',     # no border
    xaxt = 'n',    # no x axis
    yaxt = 'n',    # no y axis
    xlab = xlab,   # no x axis label
    ylab = ylab,   # no x axis label
    xlim = xlim,
    ylim = ylim
  )
}

compute.ld <- function( haplotypes ) {
  cor( haplotypes )
}

compute.haplotype.frequencies <- function( sim ) {
  # We compute the frequency of each variant at each generation
  result = matrix(
    nrow = sim$G,
    ncol = sim$H,
    dimnames = list(
      sprintf( "generation=%d", 1:sim$G ),
      sprintf( "haplotype=%d", 1:sim$H )
    )
  )
  for( i in 1:sim$G ) {
    currentGeneration = sim$population[i,]
    result[i,] = sapply( 1:sim$H, function(h) { length( which( currentGeneration == h )) } ) / sim$N
  }
  return( result )
}

compute.variant.frequencies <- function( sim ) {
  # We compute the frequency of each variant at each generation
  result = matrix(
    nrow = sim$G,
    ncol = sim$L,
    dimnames = list(
      sprintf( "generation=%d", 1:sim$G ),
      sprintf( "variant=%d", 1:sim$L )
    )
  )
  for( i in 1:sim$G ) {
    currentGeneration = sim$haplotypes[sim$population[i,],]
    result[i,] = colSums( currentGeneration ) / sim$N
  }
  return( result )
}

plot.haplotypes <- function( haplotypes ) {
  image(
    t(haplotypes),
    x = 1:ncol(haplotypes),
    y = 1:nrow(haplotypes),
    xlab = "variant",
    ylab = "haplotype",
	breaks = c( -0.01, 0.5, 1 ),
	col = c( "#FFFFC8", "#7D0025" )
#	col = c( "#4B0055", "#FDE333" )
  )
}

plotSimulation <- function(
	sim,
	G = NULL # specify generation to plot up to - if NULL, use final generation
) {
  layout(
    matrix(
      c( 1, 1,
         2, 4,
         3, 5,
         6, 7
      ),
      byrow = T,
      nrow = 4
    ),
    heights = c( 1/10, 2/5, 2/5, 2/5 )
  )
  par( mar = c( 1, 3, 1, 1 ))

  if( is.null(G) ) {
      G = sim$G
  }

  # First let's write a legend
  blank.plot()
  legend(
    "center",
    legend = c(
      sprintf( "number of variants (L) = %d", sim$L ),
      sprintf( "number of haplotypes (H) = %d", sim$H ),
      sprintf( "number of individuals (N) = %d", sim$N ),
      sprintf( "number of generations (G) = %d", sim$G ),
      sprintf( "plotting to generation %d", G )
    ),
    bty = 'n',
    xpd = NA,
    ncol = 2
  )

  par( mar = c( 3, 3, 3, 1 ))
  # Plot starting and ending haplotypes
  plot.haplotypes( sim$haplotypes[sim$population[1,],] )
  mtext( "Variants", 1, line = 2, cex = 0.5 )
  mtext( "Haplotypes", 2, line = 2, cex = 0.5 )
  mtext(
    sprintf(
      "1st generation (%d segregating haplotypes)",
      length( unique( sim$population[1,] ))
    ),
    3,
    line = 1
  )
  plot.haplotypes( sim$haplotypes[sim$population[G,],] )
  mtext( "Variants", 1, line = 2, cex = 0.5 )
  mtext( "Haplotypes", 2, line = 2, cex = 0.5 )
  mtext(
    sprintf(
      "Generation %d (%d segregating haplotypes)",
      G,
      length( unique( sim$population[G,] ))
    ),
    3,
    line = 1
  )

  # Frequencies
  haplotype.frequencies = compute.haplotype.frequencies( sim )
  variant.frequencies   = compute.variant.frequencies( sim )

  plot.haplotype.frequencies <- function( frequencies ) {
    blank.plot( xlim = c( 1, G*1.1 ), ylim = c( 0, 1 ), xlab = "Generations", ylab = "Haplotype frequencies")
    palette = rainbow( H )
    for( i in 1:H ) {
      points( 1:G, frequencies[,i], col = palette[i], type = 'l' )
      if( frequencies[G,i] > 0 ) {
        text( G*1.02, frequencies[G,i], sprintf( "Hap %d", i ), adj = c( 0, 1 ), xpd = NA, col = palette[i] )
      }
    }
    grid()
    axis(1)
    axis(2)
  }

  plot.haplotype.frequencies( haplotype.frequencies )
  mtext( "Haplotype frequencies", 2, line = 2, cex = 0.5 )
  mtext( "Generations", 1, line = 2, cex = 0.5 )
  mtext( "Haplotype frequency evolution", 3, line = 1 )
  grid()

  plot.variant.frequencies <- function( frequencies ) {
    blank.plot( xlim = c( 1, G*1.1 ), ylim = c( 0, 1 ), xlab = "Generations", ylab = "Variant frequencies")
    palette = rainbow( sim$L )
    for( i in 1:sim$L ) {
      points( 1:G, frequencies[1:G,i], col = palette[i], type = 'l' )
      if( frequencies[G,i] >= 0.01 & frequencies[G,i] <= 0.99 ) {
        text( G*1.02, frequencies[G,i], sprintf( "Pos %d", i ), adj = c( 0, 1 ), xpd = NA, col = palette[i] )
      }
    }
    axis( 2 )
    axis( 1 )
  }

  plot.variant.frequencies( variant.frequencies )
  mtext( "Variant frequencies", 2, line = 2, cex = 0.5 )
  mtext( "Generations", 1, line = 2, cex = 0.5 )
  mtext( "Variant frequency evolution", 3, line = 1 )

  # LD matrices
  breaks = c( -0.01, seq( from = 0.1, to = 1, by = 0.1 ))
  ld.colours = c( 'grey95', rev( heat.colors( length(breaks)-2 )))

  starting.ld = compute.ld( sim$haplotypes[sim$population[1,],] )^2
  ending.ld = compute.ld( sim$haplotypes[sim$population[G,],] )^2
  image( t( starting.ld ), breaks = breaks, col = ld.colours, x = 1:sim$L, y = 1:sim$L )
  mtext( "LD (r2) at starting generation", 3, line = 1 )
  image( t( ending.ld ), breaks = breaks, col = ld.colours, x = 1:sim$L, y = 1:sim$L )
  mtext( sprintf( "LD (r2) at generation %d", G ), 3, line = 1 )
  
  legend(
    "topleft",
    pt.bg = ld.colours[c(2,4,6,8,10)],
    legend = sprintf( "≤%.1f", breaks[c(3,5,7,9,11)]),
    pch = 22,
    text.col = 'white',
  #  bty = 'n',
    bg = rgb( 0.2, 0.2, 0.2, 0.5 )
  )
}


surviving_lineages = function(nodes, edges) {
    # return an array denoting the nodes that are ancestral
    # to those in the last generation
    use = nodes[, "time"] == max(nodes[, "time"])

    for (j in rev(seq_len(nrow(edges)))) {
        if (use[edges[j, "child"]])
            use[edges[j, "parent"]] = TRUE
    }
    use
}

realign_nodes <- function(nodes, edges, spread = 0.1) {
    if (!is.numeric(spread) || length(spread) != 1L ||
        !is.finite(spread) || spread < 0 || spread > 1) {
        stop("spread must be a single number between 0 and 1")
    }

    gen = nodes[, "time"]
    original_align = nodes[, "align"]
    align = original_align
    live = surviving_lineages(nodes, edges)
    generations = sort(unique(gen), decreasing = TRUE)
    N = sum(gen == min(gen))

    kids = split(edges[, "child"], edges[, "parent"])

    # Move surviving ancestors toward the centre of their surviving children.
    # This changes lineage shape according to spread.
    for (g in generations[-1]) {
        ids = which(gen == g)

        for (p in ids[live[ids]]) {
            children = kids[[as.character(p)]]
            if (is.null(children)) next

            children = children[live[children]]
            if (!length(children)) next

            centre = mean(align[children])
            align[p] = (1 - spread) * centre +
                spread * original_align[p]
        }
    }

    # Place non-lineage nodes in the gaps around lineage nodes, preserving
    # the original left-to-right order within each generation.
    for (g in generations) {
        ids = which(gen == g)
        ids = ids[order(original_align[ids], ids)]

        live_ids = ids[live[ids]]
        extinct_ids = ids[!live[ids]]

        if (!length(extinct_ids)) next
        if (!length(live_ids)) {
            # No lineage nodes here; spread all nodes across 1..N.
            align[ids] = seq(1, N, length.out = length(ids))
            next
        }

        live_rank = match(live_ids, ids)
        extinct_rank = match(extinct_ids, ids)

        # Process each gap between surviving nodes, including both ends.
        boundaries = c(0L, live_rank, length(ids) + 1L)
        boundary_x = c(1, align[live_ids], N)

        for (k in seq_len(length(boundaries) - 1L)) {
            left_rank = boundaries[k]
            right_rank = boundaries[k + 1L]

            in_gap = extinct_rank > left_rank & extinct_rank < right_rank
            gap_ranks = extinct_rank[in_gap]
            if (!length(gap_ranks)) next

            left_x = boundary_x[k]
            right_x = boundary_x[k + 1L]

            # Divide the available interval evenly among nodes in this gap.
            positions = seq(
                left_x,
                right_x,
                length.out = length(gap_ranks) + 2L
            )[-c(1L, length(gap_ranks) + 2L)]

            align[ids[gap_ranks]] = positions
        }
    }

    nodes[, "align"] = align
    nodes
}

plot_nodes_and_edges <- function(nodes, edges, title=NULL, label_mrca=FALSE) {
    nodes_time = nodes[, "time"]
    nodes_align = nodes[, "align"]
    edges_parent = edges[, "parent"]
    edges_child = edges[, "child"]

    plot(nodes, type="n", ylim = c(max(nodes_time), 0), xlab="", xaxt = "n", main = title)
    segments(
        nodes_align[edges_parent], nodes_time[edges_parent],
        nodes_align[edges_child], nodes_time[edges_child],
        col = "grey85"
    )

    ancestral_nodes = surviving_lineages(nodes, edges)
    use_edge = ancestral_nodes[edges[, "child"]]
    segments(
        nodes_align[edges_parent[use_edge]], nodes_time[edges_parent[use_edge]],
        nodes_align[edges_child[use_edge]], nodes_time[edges_child[use_edge]],
        col = "blue", lwd = 2
    )
    points(nodes, pch = 16, cex=0.5)  # plot points on top

    if (label_mrca) {
        lineage_ids = which(ancestral_nodes)
        lineage_times = nodes_time[lineage_ids]
        unique_times = sort(unique(lineage_times))
        first_at_time = match(unique_times, lineage_times)
        counts = tabulate(match(lineage_times, unique_times), nbins=length(unique_times))
        singleton_times = which(counts == 1)

        if (!length(singleton_times)) {
            warning("No MRCA found: every time has multiple ancestral nodes")
        } else {
            # Match the Python function: select the singleton time whose first
            # ancestral node occurs latest in the node table.
            mrca_id = lineage_ids[max(first_at_time[singleton_times])]
            text(
                nodes_align[mrca_id], nodes_time[mrca_id],
                labels = sprintf("MRCA\nnode\n#%d", mrca_id),
                pos = 1, offset = 0.5, cex = 0.8
            )
        }
    }
}

