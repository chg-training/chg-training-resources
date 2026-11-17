---
sidebar_position: 3
---

# 3. Encode the genotypes

But there's another problem!  What's all that `rs8176719-/C` and `rs8176719C/C` in the output?

If you want control over your regression, you must **think carefully** about how your variables are encoded.  In particular you should decide on what 'baseline' level you want to use, against which the other levelswill be compared.

For an autosomal genetic variant like `rs8176719`, some useful approaches are as follows:

First, you could encode it as $0$, $1$, or $2$ copies of the O blood group deletion - which we'll call an 'additive' encoding:
```r
abo_data = (
	abo_data
	%>% mutate(
		rs8176719_additive = c( 'C/C' = 0, 'C/-' = 1, '-/C' = 1, '-/-' = 2 )[ rs8176719 ]
	)
)

```

On the other hand, for a person to be 'O blood type' they will need to have two copies of this variant.  So that's suggests encoding it with a recessive model:
```r
abo_data = (
	abo_data
	%>% mutate(
		rs8176719_additive  = c( 'C/C' = 0, 'C/-' = 1, '-/C' = 1, '-/-' = 2 )[ rs8176719 ],
		rs8176719_recessive = c( 'C/C' = 0, 'C/-' = 0, '-/C' = 0, '-/-' = 1 )[ rs8176719 ]
	)
)
```

Or, you could decide that you're interested in estimating association with both heterozygous and homozygous versions at
the same time - we could call that a 'general' encoding.  A factor is useful in that case:
```r
abo_data = (
	abo_data
	%>% mutate(
		rs8176719_additive  = c( 'C/C' = 0, '-/C' = 1, '-/-' = 2 )[ rs8176719 ],
		rs8176719_recessive = c( 'C/C' = 0, '-/C' = 0, '-/-' = 1 )[ rs8176719 ],
		rs8176719_general   = factor( rs8176719, levels = c( 'C/C', '-/C', '-/-' ) )
	)
)
```

All of these encodings are reasonable - which one do you want to use?

:::warning Warning

The above code could create new missing data, if there were any genotypes in `rs8176719` variable that I didn't capture above.
Are there any?  **You should check**.

:::
