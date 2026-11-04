library( dplyr )
library( ggplot2 )

mytheme = function( fontsize = 16 ) {
	(
		theme_minimal( fontsize )
		+ theme(
			axis.title.y = element_text( angle = 0, hjust = 1, vjust = 0.5 )
		)
	)
}

ggplot2::set_theme( mytheme() )

simulate_two_dice <- function( n, probabilities = rep( 1/6, 6 ) ) {
	outcomes = 1:6
	(
		sample( outcomes, size = n, replace = T, prob = probabilities )
		+ sample( outcomes, size = n, replace = T, prob = probabilities )
	)
}

likelihood <- function( observed, probabilities = rep( 1/6, 6 ) ) {
	dice1 = tibble::tibble( dice1 = 1:6, dice1_probability = probabilities )
	dice2 = tibble::tibble( dice2 = 1:6, dice2_probability = probabilities )
	probabilities = (
		dice1
		%>% cross_join( dice2 )
		%>% mutate(
			sum_of_dice = dice1 + dice2,
			probability = dice1_probability * dice2_probability
		)
		%>% group_by( sum_of_dice )
		%>% summarise(
			number_of_ways = n(),
			probability = sum( probability )
		)
	)

	return(
		tibble::tibble( sum_of_dice = observed )
		%>% left_join( probabilities, by = "sum_of_dice" )
	)
}

total_loglikelihood = function( observed, probabilities = rep( 1/6, 6 ) ) {
	sum( log( likelihood( observed, probabilities = probabilities )$probability ))
}


ggplot( data = likelihood( 2:12 ) ) + geom_col( aes( x = sum_of_dice, y = probability )) + scale_x_continuous( breaks = 2:12 )
ggplot( data = likelihood( 2:12, c( 0.2, 0.2, 0, 0.2, 0.2, 0.2 ) ) ) + geom_col( aes( x = sum_of_dice, y = probability )) + scale_x_continuous( breaks = 2:12 )

data = bind_rows(
#	readr::read_tsv( "dice_data1.tsv" ),
	readr::read_tsv( "dice_data2.tsv" ),
#	readr::read_tsv( "dice_data3.tsv" ),
)

ggplot( data = data ) + geom_histogram( aes( x = sum_of_dice ), breaks = 2:13 - 0.5 ) + scale_x_continuous( breaks = 2:12 )

best_fit_data1 = find_maximum_likelihood( data$sum_of_dice )

loglikelihoods = tibble::tribble(
	~model, ~loglikelihood,
	"Normal dice",        total_loglikelihood( data$sum_of_dice, rep( 1/6, 6 ) ),
	"Omit 1",             total_loglikelihood( data$sum_of_dice, c(  0.0,  0.2,  0.2,  0.2,  0.2,  0.2 ) ),
	"Omit 2",             total_loglikelihood( data$sum_of_dice, c(  0.2,  0.0,  0.2,  0.2,  0.2,  0.2 ) ),
	"Omit 3",             total_loglikelihood( data$sum_of_dice, c(  0.2,  0.2,  0.0,  0.2,  0.2,  0.2 ) ),
	"Omit 4",             total_loglikelihood( data$sum_of_dice, c(  0.2,  0.2,  0.2,  0.0,  0.2,  0.2 ) ),
	"Omit 5",             total_loglikelihood( data$sum_of_dice, c(  0.2,  0.2,  0.2,  0.2,  0.0,  0.2 ) ),
	"Omit 6",             total_loglikelihood( data$sum_of_dice, c(  0.2,  0.2,  0.2,  0.2,  0.2,  0.0 ) ),
	"Maximum likelihood", total_loglikelihood( data$sum_of_dice, c( 0.263, 0.174, 0,  0.14781019,  0.19853376,  0.27899738 ))
) %>% mutate(
	likelihood = exp( loglikelihood ),
	posterior  = likelihood / sum( likelihood )
)

(
	ggplot( data = loglikelihoods )
	+ geom_point( aes( x = model, y = loglikelihood ))
	+ mytheme()
)

(
	ggplot( data = loglikelihoods )
	+ geom_col( aes( x = model, y = posterior ))
	+ scale_y_continuous(
		limits = c( 0, 1 ),
		labels = scales::percent,
		breaks = seq( from = 0, to = 1, by = 0.1 )
	)
	+ mytheme()
)

total_loglikelihood( data$sum_of_dice, rep( 1/6, 6 ))
total_loglikelihood( data$sum_of_dice, c(  0.2,  0.2,  0.0,  0.2,  0.2,  0.2 ) )


# Let's compute a P-value to see 'how unlikely was this number of 4s, if we 
#total_loglikelihood( simulate( n = 311 ) ) - 

comparison = (
	data
	%>% group_by( sum_of_dice )
	%>% summarise( n = n(), proportion_of_rolls = n / nrow(data) )
	%>% mutate(
		theoretical_probability = likelihood( sum_of_dice, favourite_model )$probability
	)
)

(
	ggplot(
		data = comparison,
		mapping = aes( x = theoretical_probability, y = proportion_of_rolls ) )
	+ geom_point( )
	+ geom_text( aes( label = sum_of_dice, x = theoretical_probability + 0.01 ) )
	+ xlab( "Proportion of rolls in data")
	+ xlim( 0, 0.25 )
	+ ylim( 0, 0.25 )
	+ geom_abline( slope = 1, col = 'red' )
)

# P-value for maximum likelihood fit, vs omit 3
find_maximum_likelihood <- function( sum_of_dice ) {
	# This function optimises over all 6 probabilities to find
	# the best-fitting one for the data.
	# Rather than optimise over probabilities, it uses parameters transformed to log-odd space
	# These have the advantage that they are between -inf and inf, so don't go out of bounds.
	start = rep( 1/6, 6 )
	start = c( 0.2, 0.1, 0.1, 0.2, 0.2, 0.2 )
	start = log( start / start[6] )
	fit = (
		optim(
			par = start[-6],
			function(par) {
				par = c( par, 0 )
				probabilities = exp( par ) / sum(exp(par))
				-total_loglikelihood( sum_of_dice, probabilities )
			}
		)
	)
	result = c( fit$par, 0 )
	return( exp( result ) / sum( exp( result )))
}

# Is our model of the dice any good?
observed_best_fit = find_maximum_likelihood( data$sum_of_dice )
observed_ll_ratio = (
	total_loglikelihood( data$sum_of_dice, observed_best_fit )
	- total_loglikelihood( data$sum_of_dice, c( 0.2, 0.2, 0, 0.2, 0.2, 0.2 ))
)

# P-value for data vs omit 3
result = tibble::tibble(
	simulation = 1:1000,
	loglikelihood_ratio = NA
)
for( i in 1:nrow(result) ) {
	print( i )
	simulation = simulate_two_dice( nrow(data), c( 0.2, 0.2, 0.0, 0.2, 0.2, 0.2 ) )

	best_fit = find_maximum_likelihood( simulation )

	result$loglikelihood_ratio[i] = (
		total_loglikelihood( simulation, best_fit )
		- total_loglikelihood( simulation, c( 0.2, 0.2, 0, 0.2, 0.2, 0.2 ))
	)
}

(
	ggplot( data = result )
#	+ geom_histogram( aes( x = proportion_not_using_3 ))
	+ geom_histogram( aes( x = loglikelihood_ratio ))
	+ geom_vline(
		xintercept = observed_ll_ratio
#		xintercept = observed_proportion_not_using_3
	)
)

p_value = length( which( result$loglikelihood_ratio >= observed_ll_ratio )) / nrow( result )
p_value_wilks = pchisq( 2 * observed_ll_ratio, df = 5, lower.tail = F )

