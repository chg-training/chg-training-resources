blank.plot = function( xlab = '', xlim = c( 0, 1 ), ylab = '', ylim = c( 0, 1 ), ... ) {
	plot(
		0, 0,
		col = 'white',
		xlab = xlab, xlim = xlim,
		ylab = ylab, ylim = ylim,
		xaxt = 'n', yaxt = 'n',
		bty = 'n',
		...
	)
}

# This function takes some intervals expressed as start and end coordinates
# and computes a level for each interval, such that intervals on the same level
# do not overlap, taking into account an additional spacer if desired.
layout.intervals <- function(
	intervals,
	spacer = c( start = 0, end = 0 ),
	columns = c( "start" = "start", "end" = "end" )
) {
	if( nrow( intervals ) == 0 ) {
		return( integer(0) )
	}
	intervals = intervals[ order( intervals[[ columns['start'] ]] ), ]
	level = rep( NA, nrow( intervals ))
	level[1] = 1
	level.endpoints = ( intervals[1, columns['end']] + spacer['end'] )
	for( i in 2:nrow(intervals)) {
		region = intervals[i,]
		end_with_spacer = region[[ columns['end'] ]] + spacer['end'] ;
		# Try to put gene in an existing level
		for( l in 1:length(level.endpoints) ) {
			if( (region[[ columns['start'] ]] - spacer['start']) > level.endpoints[l] ) {
				level[i] = l ;
				level.endpoints[l] = end_with_spacer
				break ;
			}
		}
	
		# Otherwise add a new level
		if( is.na( level[i] )) {
			level.endpoints = c( level.endpoints, end_with_spacer )
			level[i] = length( level.endpoints ) ;
		}
	}
	return( level ) ;
}

plot_gff = function(
	genes,
	region,
	ylim = NULL,
	aesthetic = list(
		heights = c(
			gene = 0.4,
			exon = 0.15,
			cds = 0.3,
			arrow = 0.35,
			label = 1
		),
		colour = c(
			gene = 'black',
			exon = 'grey',
			cds = 'grey',
			arrow = 'black'
		)
	),
	verbose = FALSE,
	name_column = "ID"
) {
	default.aesthetic = list(
		heights = c(
			gene = 0.4,
			exon = 0.15,
			cds = 0.3,
			arrow = 0.35,
			label = 1
		),
		colour = c(
			gene = 'black',
			exon = 'grey',
			cds = 'grey',
			arrow = 'black'
		)
	)
	for( name in names(aesthetic) ) {
		for( name2 in names(aesthetic[[name]] )) {
			default.aesthetic[[name]][name2] = aesthetic[[name]][name2]
		}
	}
	aesthetic = default.aesthetic
	wGeneInRegion = which( genes$seqid == region$chromosome & genes$end >= region$start & genes$start <= region$end )
	genes = genes[wGeneInRegion,]
	genes$layout_level = NA
	genes = genes[ order( genes$start ), ]
	wGene = which( genes$type %in% c( 'gene', 'protein_coding_gene' ) )
	wExon = which( genes$type == 'exon' )
	wTranscript = which( genes$type %in% c( 'mRNA', 'transcript' ))
	wCDS = which( genes$type == 'CDS' )
	genes$layout_level[ wGene ] =  layout.intervals(
		genes[ wGene, ],
		spacer = c(
			start = (region$end - region$start) / 10,
			end = (region$end - region$start) / 10
		)
	)
	genes$layout_level[ wTranscript ] = genes[match(genes$Parent[wTranscript], genes$ID),]$layout_level
	genes$layout_level[ wExon ] = genes[match(genes$Parent[wExon], genes$ID),]$layout_level
	genes$layout_level[ wCDS ] = genes[match(genes$Parent[wCDS], genes$ID),]$layout_level

	print( genes )


	if( verbose ) {
		cat( "GENES:\n" )
		print( genes[wGene,] )
		cat( "EXONS:\n" )
		print( genes[wExon,] )
		cat( "CDS:\n" )
		print( genes[wCDS,] )
	}
	print( region )
	if( is.null( ylim )) {
		ylim = c( -0.1, max( max( genes$layout_level[wGene] ) + 1.1, 2.5 ) )
	}
	xlim = c( region$start, region$end )
	blank.plot(
		xlim = xlim,
		ylim = ylim,
		xlab = sprintf( "Position on chromosome %s", region$chromosome ),
		xaxs = 'i'
	)
	# plot vertical guides
	by = 10^(floor( log10( region$end - region$start))-1)
	guide = seq(
		from = ceiling( region$start/by ) * by,
		to = floor( region$end/by) * by,
		by = by
	)
	segments(
		x0 = guide, x1 = guide,
		y0 = ylim[1],
		y1 = ylim[2],
		lty = 2,
		col = 'grey'
	)
	w2 = seq(from = 1, to = length( guide ), by = 2 )
	text(
		x = guide[w2],
		y = ylim[1] - 0,
		format( as.integer(guide[w2]), big.mark = "," ),
		cex = 0.75,
		adj = 0.5,
		xpd = NA
	)
	if(0) {
		text(
			x = guide[w2],
			y = ylim[2] + 0.25,
			format( as.integer(guide[w2]), big.mark = "," ),
			cex = 0.75,
			adj = c( 0.5, 0.5 ),
			xpd = NA
		)
	}
	# plot a line for the gene
	segments(
		x0 = pmax( genes$start[wGene], region$start ),
		x1 = pmin( genes$end[wGene], region$end ),
		y0 = genes$layout_level[wGene],
		y1 = genes$layout_level[wGene]
	)
	rect(
		xleft = pmax( genes$start[wExon], region$start ),
		xright = pmin( genes$end[wExon], region$end ),
		ybottom = genes$layout_level[wExon] - aesthetic$height['exon']/2,
		ytop = genes$layout_level[wExon] + aesthetic$height['exon']/2,
		col = aesthetic$colour['exon'],
		border = NA,
		xpd = NA
	)
	rect(
		xleft = pmax( genes$start[wCDS], region$start ),
		xright = pmin( genes$end[wCDS], region$end ),
		ybottom = genes$layout_level[wCDS] - aesthetic$height['cds']/2,
		ytop = genes$layout_level[wCDS] + aesthetic$height['cds']/2,
		col = aesthetic$colour['cds'],
		border = NA,
		xpd = NA
	)

	plot.arrows <- function( genes, region, arrow.length ) {
		if( nrow(genes) == 0 ) {
			return ;
		}
		pos = genes$start
		pos[ genes$strand == "-" ] = genes$end[ genes$strand == "-" ]
		sign = rep( 1, nrow( genes ))
		sign[ genes$strand == "-" ] = -1
		w = which( pos >= region$start & pos <= region$end )
		if( length(w) == 0 ) {
			return ;
		}
		pos = pos[w]
		sign = sign[w]
		layout_level = genes$layout_level
		segments(
			x0 = c( pos, pos, pos + sign * ( arrow.length - min.size/4), pos + sign * ( arrow.length - min.size/4)),
			x1 = c( pos, pos + sign * arrow.length, pos + sign * arrow.length, pos + sign * arrow.length ),
			y0 = c(
				layout_level[w] - aesthetic$height['arrow'],
				layout_level[w] + aesthetic$height['arrow'],
				layout_level[w] + aesthetic$height['arrow'] - 0.1,
				layout_level[w] + aesthetic$height['arrow'] + 0.1
			),
			y1 = rep( layout_level[w] + aesthetic$height['arrow'], 4 ),
			col = aesthetic$colour['arrow'],
			xpd = NA
		)
		pos = genes$end
		pos[ genes$strand == "-" ] = genes$start[ genes$strand == "-" ]
		segments(
			x0 = pos, x1 = pos,
			y0 = layout_level - aesthetic$height['cds'],
			y1 = layout_level + aesthetic$height['cds']
		)
	}
	min.size = (region$end - region$start) / 100
	plot.arrows( genes[wGene,], region, min.size )

	if( 'symbol' %in% colnames( genes )) {
		display = genes$symbol
	} else {
		display = rep( NA, nrow(genes))
	}
	display[ is.na( display )] = genes[[name_column]][is.na( display )]
	text(
		genes$end[wGene] + min.size,
		genes$layout_level[wGene],
		display[wGene],
		font = 3,
		adj = c( 0, 0.5 ),
		cex = min( 10 * aesthetic$height['label'] / max( genes$layout_level ), 1 )
	)
	return(
		list(
			xlim = xlim,
			ylim = ylim
		)
	)
}

plot_haplotypes <- function(
	haplotypes,
	metadata,
	genes,
	region,
	verbose = FALSE
) {
	# Remove R's built-in plot margins
	par( mar = c( 0, 0, 0, 0 ))
	# Generate a multi-panel layout
	layout(
		matrix(
			c(
				0, 0, 0, # top margin
				0, 1, 0, # haplotypes
				0, 0, 0,
				0, 2, 0, # linking lines
				0, 0, 0,
				0, 3, 0, # genes
				0, 0, 0  # bottom margin
			),
			byrow = T,
			ncol = 3
		),
		widths = c( 0.1, 1, 0.1 ),
		heights = c( 0.1, 1, 0.01, 0.2, 0.01, 0.4, 0.1 )
	)


	w = which( metadata$position >= region$start & metadata$position <= region$end )
	haplotypes = haplotypes[w,]
	metadata = metadata[w,]
	L = nrow(haplotypes) # number of SNPs
	N = ncol(haplotypes) # number of haplotypes
	# Plot the haplotypes
	image(
		haplotypes,
		x = 1:L,
		y = 1:N,
		xlab = "SNPs",
		ylab = "Chromosomes",
		xaxt = 'n',
		bty = 'n'
	)

	# Plot the joining segments
	xlim = c( region$start, region$end )
	blank.plot( xlim = xlim, ylim = c( 0, 1 ), xaxs = 'i' )
	#axis(1)
	xs = seq( from = xlim[1], to = xlim[2], length = nrow( metadata ))
	ys = c( 0, 0.25, 0.75, 1 )

	# In case there are too many SNPs, let's just take a subset.
	by = 10^(floor( log10( nrow( metadata )))-2)
	indices = (1:nrow(metadata))[seq( from = 1, to = nrow(metadata), by = by )]
	segments(
		x0 = metadata$position[indices], x1 = metadata$position[indices],
		y0 = ys[1], y1 = ys[2],
		col = rgb( 0, 0, 0, 0.2 )
	)
	segments(
		x0 = metadata$position[indices], x1 = xs[indices],
		y0 = ys[2], y1 = ys[3],
		col = rgb( 0, 0, 0, 0.2 )
	)
	segments(
		x0 = xs[indices], x1 = xs[indices],
		y0 = ys[3], y1 = ys[4],
		col = rgb( 0, 0, 0, 0.2 )
	)
	genes = (
		genes
		%>% filter(
			seqid == 'chr19'
			& end >= region$start
			& start <= region$end
			& type %in% c( "gene", "transcript", "exon", "CDS" )
		)
	)

	if( verbose ) {
		print( genes )
	}
	plot_gff(
		genes,
		region = region,
		name = "gene_name",
		verbose = verbose
	)
	axis(1)
}
