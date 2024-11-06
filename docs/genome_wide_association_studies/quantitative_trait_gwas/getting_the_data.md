---
sidebar_position: 1
---

# Getting the data

You will be using four sets of files for this exercise. It is recommended that you download these files to your working directory prior to starting the exercise Genotype data files.  To get started, make a new directory to run the tutorial in and `cd` into it:
```sh
mkdir gwas_tutorial
cd gwas_tutorial
```

Now download the data...
```sh
curl -O https://www.chg.ox.ac.uk/bioinformatics/training/gms/data/gwas/quantitative_trait_gwas.tgz
```
...and unpack it:
```sh
tar -xzf quantitative_trait_gwas.tgz
```

Once the data is unpacked, you can safely delete the `quantitative_trait_gwas.tgz` file to save space, if you like.

Finally, to get started, we'll assume you are working within the `gwas_tutorial` folder:
```
cd gwas_tutorial
```

## What's in the data?

You should now have four folders which have this structure:
```
gwas_tutorial/
	Genotype_data/
		AMR_genotypes.bed
		...
	Imputed_data/
		AMR_imputed.gen.gz
		...
	Phenotype_data/
		AMR_phenotype.txt
		...
	Example_scripts/
		...
```

The data is as follows:

* The `Genotype_data/` folder contains **sample genotypes**, as typed on a [DNA microarray](https://en.wikipedia.org/wiki/DNA_microarray).  Take a look - you should see three files - a `.bed` file, a `.bim` file, and ` .fam` file.  (These are in [plink binary format](https://www.cog-genomics.org/plink/1.9/input#bed), which is a commonly-used file format for GWAS data.)

* The `Imputed_data` folder contains **imputed genotype files**, which is the same data 'imputed' up to the full 1000 Genomes Phase 3 reference panel.  These are like the array genotype files but at a much higher resolution (more genetic variants), having been filled in using [genotype imputation](https://doi.org/10.1038/s10038-023-01213-6).

* The `Phenotype_data` folder contains (guess what?) **phenotype information**.  There are two files: one reports the measured norovirus antibody response for each sample, and the other reflects the **secretor status**.

* There are also some example scripts are in the `Example_scripts` directory.

## Next steps

As with all GWAS, the first place to start is to summarise and perform [quality control of the data](./qc_genotypes.md).
