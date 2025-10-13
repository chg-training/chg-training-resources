---
sidebar_position: 2
---

# Setting up Conda

One of the easiest ways to set up your environment that works across platforms is to use conda.
Conda creates 'virtual environments' that don't break the rest of your system, and uses a
comprehensive package manager. It has a dedicated [bioconda channel](https://bioconda.github.io)
that makes it easy to install software for biomedical research.

## Installing conda

The recommended way is to install [`miniforge`](https://conda-forge.org/) which is a minimal environment that lets you
install the packages you want.

:::warning Warning
Due to licensing changes, we now recommend using `miniforge` not `miniconda`.
:::

To get `miniforge`, visit [releases page](https://conda-forge.org/miniforge/#latest-release and choose the appropriate version:

**If you are on Mac OS X** you almost certainly want the `arm64` version.  (The exception is if you are on an older Mac that has Intel silicon, in which case choose the `x86_64` version.)

**If you are on Linux** download the linux `x86_64` version.

**If you are on Windows**, **download the linux `x86_64` version anyway**. This is because we will
install it into the Linux subsystem for Windows.

The installer is a bash (`.sh`) file which we'll have to run in the terminal to install. It will have been downloaded
into your 'Downloads' folder - let's change directory there and go and make sure it has downloaded:

* on **Mac OS X**:
```
$ cd Downloads
```
* on **Windows**:
```
$ cd /mnt/c/Users/<username>/Downloads
```
* on **Linux**: probably
```
$ cd Downloads
```

You can check what's there by running `ls Mini*` - you should see there's a file of the form
`Miniforge-<version>-<platform>.sh`.

:::tip Note

Because this is an installer downloaded from the internet, you should check it's the
real thing before installing it.  Run `sha256sum <miniconda filename>` (linux or Ubuntu for Windows) or `shasum -a 256 <miniconda filename>` (Mac OS X) as described  and compare the output to the SHA256 has in the output table. If it's different, don't install!

See [this
page](https://conda.io/projects/conda/en/latest/user-guide/install/download.html#cryptographic-hash-verification)
for more information.

:::

**To install**, make sure you have `cd` into the downloads folder as above, and then run the installer:
```
$ bash ./Miniforge3-<version>-<platform>.sh
```

(You should fill in the right filename, or use the `<tab>` key to auto-fill.)

You will be asked to accept the license and choose an install location. If in doubt, the defaults
install to a folder called `miniforge3` in your home directory, which is fine.  Say 'yes' when asked
if you want to initialise the installer.

### Activating and deactivating conda

If you read the blurb this command outputs, you'll see it says it is going to **activate the conda environment by
default on startup**. You'll know whether conda is activated because it the current conda 'environment' will show up in
your command prompt.  The default one is called 'base' so your prompt will look like this:

```
(base) <username>@<computer>:~$
```

If it doesn't look like this, try activating it by typing `conda activate` now.

You can then also **deactivate the environment** (going back to normal) with the `conda deactivate` command
```
$ conda deactivate
```

And you can reactivate it with - you guessed it!
```
$ conda activate
```

### Using conda to install software

Conda makes installing stuff easy.  The first thing it's good to have is a better (faster) version of `conda`
itself, called `mamba`:

```
$ conda install mamba
```

Type 'y' and press &lt;enter&gt; to install

(You might find that `mamba` is already installed, in which case you don't need to do anything here.)

### Creating a new environment

Before installing anything else, let's use conda to create a new 'environment' to work in.  Let's call it `gms`:
```sh
$ conda create --name gms
```

And then activate it with:
```sh
$ conda activate gms
```

:::tip Note

This is the **downside of using conda**: you have to remember what environment you're in at any one time.

The upside is that you get a flexible way to install bits of software that we'll need without affecting the rest of your
system.

:::

Let's try using `conda` / `mamba` to install [`samtools`](https://samtools.github.io), which is a workhorse tool for handling
next-generation sequencing data, into our `gms` environment. While you *can* download the source code and compile it yourself,
conda makes this easy. You'll want a fairly recent version, so let's get version `1.15` which is
available from the [bioconda](https://bioconda.github.io) channel:

```
$ mamba install -c bioconda 'samtools>=1.15'
```
or
```
$ conda install -c bioconda 'samtools>=1.15'
```

You may have noticed we added `-c bioconda` in the above command.  This is because the most up-to-date versions of
`samtools` live in the [bioconda channel](https://bioconda.github.io) (rather than in conda-forge).  If you look at
the output you'll see that this is getting `htslib` and `samtools` from bioconda, but also `libdeflate` from conda-forge
(and possibly other packages). Go ahead and install. Running samtools now gives you some output:

```
$ samtools

Program: samtools (Tools for alignments in the SAM format)
Version: 1.16.1 (using htslib 1.16)

Usage:   samtools <command> [options]
...
```

Congratulations! You've just used conda to install some software into the `gms` environment.

:::caution Remember
Remember that the newly-installed software is only present in the `gms` environment.

If your prompt doesn't say `(gms)` at the start, the environment isn't activated and you won't be able to run the software.  Try it now:
```sh
$ conda deactivate
$ samtools
command not found: samtools
```

To use this version of samtools, you must **remember to activate the environment** first:
```sh
$ conda activate gms
$ samtools
```

:::

:::tip Question
Another useful program is `bcftools`. Can you install that into your `gms` environment as well?
:::

### Adding bioconda

For biomedical work you will want to use both `bioconda` and `conda-forge` a great deal. To avoid version issues it's
therefore best to go ahead and set these channels up permanently.  The [bioconda page](https://bioconda.github.io)
explains how to do this, namely, run:
```
conda config --add channels bioconda
conda config --add channels conda-forge
conda config --set channel_priority strict
```

This bit of configuration says: "search conda-forge first, then bioconda, for packages".  This will help it find
up-to-date versions of the software we need.

## How conda works - what even is an 'environment'?

UNIX figures out how to find programs and other things using so-called 'environment variables'. You
can see them all using the `env` command:
```
$ env
```

When conda manages 'environments', all it is really doing is changing environment variables to point to its own copies
of files.

For example the `HOME` environment variable points at your home folder:
```
$ echo ${HOME}
/users/<username> (or similar)
```

Let's go there now and see what's there:
```  
$ cd ${HOME}
$ ls
```

If you've followed the above, you should see that `conda` has created a directory called `miniforge3`
in there where it puts the things it installs. For example the base environment executable programs go in `miniforge3/bin`:

```
$ ls miniforge3/bin
```

If you look there you will see (among many other things) the `mamba` executable - because we just installed it.

:::tip Note
You **won't** see the samtools command, because we installed it into the `gms` environment.  Instead, that has been
placed in a folder specific to that environment:
```sh
$ ls miniforge3/envs/gms/bin/
```

If you install anything else into that environment, that's where it will go.
:::

To make the environment work, when you activate conda it sets relevant environment variables to point to
this `gms` folder. 

In particular when you `conda activate gms`, conda adds this `bin` directory to your `PATH` environment variable.  The
terminal uses to know where to look for programs. You can see what's happened by printing out the `PATH` variable like this:

```sh
$ echo ${PATH}
```

You should see that the first entry is something like `/users/<username>/miniforge3/envs/gms/bin` (followed by some
other paths).  So if you type `samtools`, the first place the terminal looks for `samtools` is in that folder.

If you deactivate the conda environment, `PATH` changes to remove that folder and samtools will no longer work:
```
$ conda deactivate
$ samtools

Command 'samtools' not found...
```

However `samtools` is still there on your filesystem - as it happens, you *can* still run it by
specifying its full path:

```
$ ./miniforge3/envs/gms/bin/samtools
```

:::tip Summary

In other words conda isn't doing anything magical here: it's just managing your environment variables for you.  In
particular it is installing programs into a specific folder and making sure the `PATH` variable points at the right
folder.  This is basically how 'environments' work: they are systems of environment variables that tell the UNIX shell
where to look for things.

:::
