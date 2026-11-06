---
sidebar_position: 2
---

# R as a calculator

We'll assume you have started an R prompt - if not go and [start one now](README.md#getting-r).

## First steps

Let's try out R by trying a few interactive commands.  First, can R add numbers together?

```
> 5 + 10
[1] 15
```

Yes, it can!  It can also subtract them (`-`), multiply them (`*`), divide them (`/`), or exponentiate them (`^`).

:::tip Note

Start by playing around with these **arithmetic operations** now to make sure you know what they are doing. 

For example, what's $5$ to the power of $10$? Try
```
> 5^10
```
to find out.
:::

R can also manipulate other things, like strings. Strings are a data type for text or a sequence of characters, rather than numeric values. They can contain letters but also numbers, symbols and spaces, and are enclosed in quotes to identify them as strings. 

Let's try creating a string now:
```
> "This is a string"
```
:::tip Note
Strings can also be given using single quotes, as in `'This is also a string'`.
:::

```
> "Another string containing numbers 12345 and symbols!"
```

However, you can't add two strings together - try it:

```
> "This is a string" + " as well"
Error in "This is a string" + " as well" : 
  non-numeric argument to binary operator
```

This illustrates that **if you get something wrong** or try to execute an **invalid command**, R will try to tell you what it is.  Here it's telling us that the
'binary operator' (which is `+`) expects 'numeric arguments' (i.e. numbers), as opposed to the strings we gave it.

That doesn't mean you can't concatenate strings - you can.  In R, operations on strings use particular functions.  The
one we want here is `paste()`:

```
> paste( "This is a string", "as well" )
[1] This is a string as well.
```

:::tip Note

Why 'paste'?  Good question.  This illustrates one of the worst aspects of R - some of the built-in functions have
fairly cryptic names.  Later on we'll suggest some useful libraries that make this easier.

:::


### Functions

R comes with a wide variety of functions, for mathematical and statistical operations. To call an R function, you use the function name and round brackets `function_name( arg1, arg2 )`. The arguments to the function go inside the brackets, separated by commas. R functions support both **default arguments** and **named arguments**. Many of R's core functions have many, many possible arguments, and it would be impractical to have to type them all out.

An example of using an R function is:

```
> runif(1)
[1] 0.03999256
```

This has generated a random number from a uniform distribution (therefore you will see a slightly different number). Note the function name is read as 'r-unif' rather than 'run-if'. The argument 1 given inside the brackets tells it how many numbers to generate. The function has two other arguments with default arguments, for the minimum and maximum values the random number can take. We can change those from the default values by adding arguments:

```
> runif(1, 0.25, 0.5)
[1] 0.3332207
> runif(1, max=0.5, min=0.25)
[1] 0.3211315
```

Note that both of these commands are using the same uniform distribution, between 0.25 and 0.5. In the first example, we give the argument in the order the function expects. in the second, we use named arguments to set them so we don't have to worry about the correct order.

At this point, you may be wondering how you know what order the arugments need to be, or what they are named. This where the `help` function comes in.

#### The Help Function

You can use the function `help(runif)` to look at R's help file for the function we used above. This will either open the html help file in a new browser window or show the help file in a command line text viewer (depending on how you are running R).
From this, we can see the defined structure of the `runif` command is `runif(n, min = 0, max = 1)` so it has 3 specified arguments and by default 'min' is equal to 0 and 'max' is equal to 1. This is why we could run the command earlier by providing just the argument, n, for the number of observations (or values to generate). And, as we saw in the next example, we could modify the limits of the distribution by passing different values for the 'min' and 'max' arguments. 

:::tip Note

R help files are, unfortunately, something of a mixed bag. They tend to be very thorough with respect to details, but aren't so good at explaining the context a function is meant to be used in. The format they are presented in is hard to understand if you are not used to how programming functions are written 'behind the scenes'. So they can seem, ironically, quite unhelpful!  They are also not very useful when you know *what* you want to do, but you don't know where to start looking. In those cases, a web search will probably be more informative. They **are** helpful for checking how to correctly use a function or to remind yourself what arguments they take.

You can also look at the help for a function using this short-hand:

`> ?runif`

You can perform a fuzzy search using a double question mark:

`> ??runif`
:::



### Logic and If Statements

The comparison and equality operators in R do not result in number but in logical values. In R, these are represented by the special values `TRUE` and `FALSE`. They can abbreviated as `T` and `F`.

```
> 2 < 3
[1] TRUE
```

Examples of logical operators include `&` for 'and' and `|` for 'or'.

#### If Statements

As in many programming languages, you may need to write code that is only executed when certain conditions are met. The structure that R uses looks like this:

```
x <- 20
if (x > 10){ "Big" } else{ "Small" }
```

It may also be written across multiple lines for readability:

```
if(x > 10) {
  "Big"
} else {
  "Small"
}
[1] "Big"
```

Here we are taking advantage of the continuation prompt (+) to write this over multiple lines so it's easier to read. Note the last line `[1] "Big"` is the output printed by our mini `if` statement and does not need to be run. 

The keyword `if` kicks things off. Inside the round brackets there must be an expression that evaluates to a single logical value. In the next section we will discuss how to use R's vectors, but this part of an `if` statement is one place where you must have only a single value.

If that expression evaluates to `TRUE`, then the code inside the first set of curly brackets will be run. Otherwise, it will not.

The follow-up keyword `else` marks a second block, which will be run when the condition evaluates to `FALSE`. So if you edit the first line of the code snippet to make x hold a value less then 10, the second block of code will be run and produce the output "Small". Try it and see. 

Now we are ready to start using **variables** in R - a way of storing information or data such that we can do more complex and interesting tasks. 

