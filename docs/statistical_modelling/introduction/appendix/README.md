# Appendix: solutions

Here is a solution to the [forest plot question](../allele_frequencies_2.md).

```r
compute_posterior_summary = function(
	nA, nB,
	prior = c( nA = 0, nB = 0 )
) {
	return(
		data.frame(
			posterior_mean = (nB+prior['nB'])/(nA+prior['nA']+nB+prior['nB']),
			q2.5 = qbeta( p = 0.025, shape1 = nB+prior['nB']+1, shape2 = nA+prior['nB']+1 ),
			q97.5 = qbeta( p = 0.975, shape1 = nB+prior['nB']+1, shape2 = nA+prior['nB']+1 )
		)
	)
}


posterior_summary = rbind(
	data
	%>%	mutate(
		nA = ( `C/C` + `-/C` ),
		nB = ( `-/-` )
	)
	%>% group_by( population )
	%>% summarise( compute_posterior_summary( nA, nB, prior = c( nA = 0, nB = 0 )))
	%>% mutate( prior = "none" ),
		data
	%>%	mutate(
		nA = ( `C/C` + `-/C` ),
		nB = ( `-/-` )
	)
	%>% group_by( population )
	%>% summarise( compute_posterior_summary( nA, nB, prior = c( nA = 5, nB = 5 )))
	%>% mutate( prior = "5,5" )
)

p = (
	ggplot( data = posterior_summary )
	+ geom_point( aes( x = posterior_mean, y = population ))
	+ geom_segment( aes( x = q2.5, xend = q97.5, y = population, yend = population ))
	# Always make your plot have good axis labels!
	+ xlab( "Posterior mean and 95% CI" )
	+ ylab( "Population" )
	# A clean, large-font theme:
	+ theme_minimal(16)
	# Rotate y axis label so it's not at 90 degrees:
	+ theme( axis.title.y = element_text( angle = 0, vjust = 0.5 ))
	+ facet_grid( . ~ prior)
)
print(p)
```