---
sidebar_position: 6
---
# Vectors
Vectors are an important object type and many computations in R are highly efficient because they operate on the whole vector at once, rather than element by element.
Vectors are one-dimensional objects and we can find their **length** using a function called `length`. 
Let's create a simple vector storing the numbers 1 to 10:
```
> x <- 1:10
> length(x)
[1] 10
```
If we change what is assigned to x, the length of the vector is automatically adjusted:
```
> x <- 1:20
> length(x)
[1] 20
```

Vectors can contain numeric or character data (or both). Let's create a new vector, y, containing the letters 'a', 'b', and 'c'.
```
> y <- c("a", "b", "c")

```

If you are using RStudio, notice how x and y are displayed in the 'Environment' panel. Can you work out what information is given?
We can also use the `class` function to see how R has stored these variables:

```
> class(x)
[1] "integer"
> class(y)
[1] "character"
```
R will automatically decide how to most appropriately handle and store data that we give it. This is unlike other programming languages where this has to be explicitly defined by the programmer. Usually R does sensible things when storing data, but it's important to be aware of what it is doing as some functions will behave differently depending on the class or data type. RStudio and the `tidyverse` are good for keeping track of this.  You can also use the family of functions `as.integer`, `as.character` and so on to convert from one class to another.

:::tip Question

Create a vector called `z` containing numeric values that are a mixture of integer and decimal numbers. How does R store this data? 

Now try running the following command:
y <- c(a, b, c)

This will produce an error message. What do you think R has tried to do here and what does the error message mean? 
:::

# Accessing elements of a vector

Square brackets, [ ], are used to access specific elements or subsets of a vector, factor, matrix or data frame. Let's create a new vector as an example:
```
> x <- c(1:5, 10:14)

# we can extract the 3rd element:
> x[3]
# or extract alternate elements:
> x[c(1, 3, 5, 7, 9)]
# or extract a subset of elements:
> x[3:6]
```
The second and third examples show how R can work efficiently with vectors. Instead of having to use square brackets to extract each element of the vector, and then using c to combine them into a new vector, we use a vector inside the square brackets and R interprets that as an instruction to return a vector of those elements of x.

:::tip Question

How would you return the elements of x in reverse order? How would you extract the elements of x where the index is a square number?

Can you predict what R will do in each of these cases: 
x[11]

x[-3]

:::


R will decide the most appropriate way to store the data it is provided with, including when you mix different classes in a single vector. To give more examples of how data is interpreted by R, run the following and note the results.

```
> vec1 <- c(1:5, 6.5)
> class(vec1)
[1] "numeric"
> print(vec1)

> vec2 <- c(1:5, 6.5, "a", "b", "c")
> class(vec2)
[1] "character"
> print(vec2)
```

This gives some idea of R's internal rules. Because the way data is being handled by R is important for both performing computations correctly and the source of many error messages, it is useful to be familiar with the common data types. Some functions, such as computing a mean for example, require numeric data objects to operate on. What happens when you try to find the mean of `vec1` and `vec2`?
```
> mean(vec1)
> mean(vec2)
```

# Some other data types

Strings and numbers are just two of the data types R can work with.  What else?  Well, there are
**lists**:

```
> list( "This", "list", "has", 5, "entries" )
```

As you can see, a `list` is just a list of things, and the things can be of different types.

There are also *vector types*, which we've seen already - they are a kind of list where all the
entries have the same type.  The `c()` (for 'concatenate') function can be used to stick things
together into a vector:

```
> c( "This", "vector", "has", "5", "entries" )
```

You can also create **matrixes**:
```
> matrix( 1:6, nrow = 2 )
```

:::tip Question
Did this matrix get filled *row-wise* (along rows) or *column-wise* with the numbers 1 to 6?
:::

And multidimensional arrays - for example here's a `25 x 2 x 2` array:
```
> array( 1:40, dim = c( 10, 2, 2 ))
```

There's also another very useful data type called a **data frame**, which is often used to store scientific
data.  We'll come back to it a bit later.

