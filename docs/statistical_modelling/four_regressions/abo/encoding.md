---
sidebar_position: 2
---

# 2. Encode the outcome

You could dive right in and fit a regression model.  E.g. if you focus on the O blood group variant `rs8176719`:

```r
broom::tidy( glm( status ~ rs8176719, family = "binomial", data = abo_data ))
```

But you'll probably find this fails with a message about the $y$ values.

Of course!  For logistic regression, the $Y$ values shoudl be $0$ or $1$, whereas in our data they are strings.

To fix this let's encode $Y$ as a number instead.  We'll map cases to $1$ and controls to $0$.  A simple way is to convert `status` to a factor:

There are lots of ways to do this but here's a fairly readable one:

```r
abo_data = abo_data %>% mutate( status = factor( status, levels = c( "CONTROL", "CASE" )) )
```

(Equivalently, you could replace `status` with a new variable equal to $0$ or $1$.)

You should now be able to run the above regression and get some results.

