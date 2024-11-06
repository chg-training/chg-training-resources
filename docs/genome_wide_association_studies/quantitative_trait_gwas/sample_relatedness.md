---
sidebar_position: 6
---

# Aside: excluding related samples

**Note.** This section is **optional**. We won't actually use it in the [assocation test](./testing_for_association.md) for this tutorial.

In most GWAS studies, the samples are supposed to be collected without any close relationships - so finding closely
related samples could be a sign of sampling biases.  Closely related samples might also share phenotypes for non-genetic
reasons (they might be more likely to share environmental exposures than unrelated people, for example if they live in
the same families).  For both these reasons it is normal to try to remove close relationships from the data before
running a GWAS.

:::tip Note

As we are using data simulated from a small region of the genome in this practical, it is not possible to calculate realistic
relatedness between individuals in these data.  However, as an example we'll show how this can be done below.

(You *can* compute relatedness in the samples from the [case-control GWAS practical](../genome_wide_association_analysis/README.md) if you like.  See the [PCA practical](../../population_genetics/principal_components_analysis/README.md) for more on this.)

For our purposes we have provided code below for you to try this, but we won't actually use this filter to carrying out
the regression analyses in this tutorial.

:::

## Finding samples to exclude

`plink` does not directly allow us to filter samples by relatedness. Instead, we will write a small script to make a
list of samples to exclude - and then use that file to filter them out in `plink`.

For most of this course we've used R to do our scripting - so let's try something else instead.  We'll try out python
instead!  Open a new file, called (say) `exclude_high_ibd.py` and let's add some code. 

First, add a function to load the missingness file into a python `dict` structure (which is a 'hash map' i.e. mapping from keys to
values):

```python
def load_missingness( filename ):
	"""Load the .imiss file into a python dictionary (as a key to value mapping)"""
	result = {}
	with open(filename, "r") as missfile:
		missfile.readline()
		for line in missfile:
			fid, iid, pheno_miss, num_miss, num_geno, fmiss = line.strip().split()
			# Python dicts can have keys that are tuples!
			# Here we use the pair (fid,iid) as the key
			result[(fid,iid)] = float(fmiss)
	return result
```

Next, add a function to read the `.genome` file and find high-ibd sample pairs:

```python
def load_high_ibd_pairs( filename, cutoff = 0.185 ):
	"""Load the .genome file and return pairs of IDs with PI_HAT bigger than the cutoff"""
	result = set()
	with open(filename, "r") as ibdfile:
		ibdfile.readline()
		for line in ibdfile:
			fid1, iid1, fid2, iid2, rt, ex, z0, z1, z2, pihat, phe, dst, ppc, ratio = line.strip().split()
			sid1 = fid1 + "_" + iid1
			sid2 = fid2 + "_" + iid2
			if float(pihat) > float(cutoff):
				result.add(( (fid1,iid1), (fid2,iid2)) )
	return result
```

Finally let's use that to remove, for each high IBD pair, the sample with the most missingness:

```python
import sys
# Read the filenames from the command line arguments
missingness_file = sys.argv[1]
ibd_file = sys.argv[2]
output_file = sys.argv[3]

print( "++ Loading missingness data from %s...", missingness_file )
missingness = load_missingness( missingness_file )
print( "++ Loading high-IBD pairs from %s...",ibd_file )
high_ibd = load_high_ibd_pairs( ibd_file, cutoff = 0.185 )

print( "++ Computing exclusions..." )
ids_to_exclude = dict()
for pair in ibd:
	# Exclude the sample with greater missingness
	if missingness[ pair[0] ] > missingness[ pair[1] ]:
		ids_to_exclude.add( pair[0] )
	else:
		ids_to_exclude.add( pair[1] )

print( "++ Writing exclusions to %s...", output_file )
with open( output_file, "w" ) as outfile:
	fid, iid in ids:
		outfile.write( fid + "\t" + iid + "\n" )

print( "++ Thank you for using exclude_high_ibd.py" )
```

Put all the above code, with the functions, into a file called `exclude_high_ibd.py` now.

:::caution Warning

In python you have to be **really careful about indentation**.

Unlike R, javascript, C++, Rust, or Ruby, which all use `{}` braces - and unlike julia which uses `begin` and `end` -
python uses indentation to define blocks of code.  If something is not working it may well be that a line of code has
the wrong indentation, relative to those around it.

In particular, you must make sure you are either using tabs to indent, or using spaces to indent the above code - mixing the
two will lead to all sorts of problems!  (The snippets above use tabs.)

If you need a full version of this file, see here.

:::

## Removing the samples from the dataset

Now let's use that to generate a list of samples to exclude:

```python
python exclude_missing.py output/AMR_genotypes.imiss output/AMR_genotypes.genome output/AMR_genotypes.relatedness.remove
```

:::tip Note on python versions
On a mac, you may find you need to use `python3` to run python, instead of `python`.
:::

You should now have an output file called `output/AMR_genotypes.relatedness.remove` containing the IDs of samples to remove.

Now we've generated a list of samples to remove, we can actually remove them like this:

```
./plink \
--bfile Genotype_data/AMR_genotypes.filtered \
--remove output/AMR_genotypes.relatedness.remove \
--make-bed \
--out Genotype_data/AMR_genotypes.filtered.ibd
```

:::tip Note on improving the algorithm

If you look at the above code, you'll see it is pretty simple.  For every pair of samples with high IBD, it selects the sample
with the highest missingness, and writes it to the exclusion file.

It's actually easy to do better than this in many cases. A better algorithm finds the sample with the most relationships
$> \text{the cutoff}$ and removes it.  And then repeats this process with the remaining samples until there aren't any
high IBD pairs left.  This algorithm typically excludes fewer samples while still leaving no high IBD pairs.

This is of course important because the sample size is a key factor in determining the **power** of a GWAS!  Remember,
all else being equal, the regression standard error scales like

$$
\text{se} \propto \frac{1}{\sqrt{N}}
$$

with the sample size $N$ of the study.

We **really** don't want to lose samples, unless we have to!

:::
