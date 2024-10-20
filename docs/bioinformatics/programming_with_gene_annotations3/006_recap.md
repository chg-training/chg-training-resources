---
sidebar_position: 6
---

# Quick recap

We followed a fairly straightforward path to write our `read_gff()` function. 

But you should note a few things that we did to make this process as easy as possible - here are a few:

1. We **kept a fast iteration time** (by using a small subset of the data to test on) - important to avoid getting bored waiting every time to change the code.
2. We **used the [specification](https://m.ensembl.org/info/website/upload/gff3.html)** to know what to aim for, and gave our function a **single well-defined thing to do**.
3. We **created test case(s)** with small datasets and used them to tell when we'd got it right.

And we also chose a pretty good name for our function - `read_gff()` makes this similar to `read_tsv()`, `read_csv()` and so on from other packages.

