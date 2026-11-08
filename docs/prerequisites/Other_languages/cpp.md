---
sidebar_position: 2
---

# C++

`C++` is a bit different from the other languages here because it is entirely compiled (so you can't really run it in an
interactive prompt.). It is known as being 'bare metal' in the sense that it gives you complete control over what your program is doing - down to the individual bytes and bits of memory - but at the same time is less high-level or easy-to-use than some of the other languages here.

:::note Note

All the languages here have some level of 'compilation' going on.  ([Julia](../julia.md) is a particular example that compiles your code the first time it is run.)

For the most part, though, you can work with the other languages as if they were interactive without a compilation step.  In C++, you instead write a programe, compile it through the C++ compiler, and then run it.
:::

Here's a minimal example - you will need [`g++`](https://gcc.gnu.org) installed to compile this:
```c++
# Save this in my_program.cpp
#include <iostream>

int main() {
	std::cout << "Hello!  This is a first C++ program!\n" ;
	return 0 ;
}

```

To compile it:
```
g++ -o my_program my_program.cpp
```

And run it:
```
./my_program
```

Exciting stuff!  Learning C++ is currently well beyond the scope of this website, but you'll find lots of resources
online.
