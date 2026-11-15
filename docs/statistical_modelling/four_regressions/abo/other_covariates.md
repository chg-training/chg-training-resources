---
sidebar_position: 7
---

# 7. Is it 'explained' by other covariates?

If the association represents a real protective effect of O blood group against malaria - it won't be 'explained' away
by other variables.

While there maybe isn't every possible variable in the dataset, there are a few others that we haven't looked at:

* The sex of the individual
* The reported ethnic group of the individual (these have been re-coded in this data but you can see the main ethnic groups in the data in [Figure 1](https://www.nature.com/articles/s41467-019-13480-z/figures/1) of the original study.)
* There are also some *population principal components* `PC_1` to `PC_5`.  These are computed from genome-wide data.

:::tip Explain away!

Try repeating your analysis - and maybe your plot - including these variables as additional covariates.

Does inclusion of these variables 'explain away' the association?

:::
