---
sidebar_position: 1.5
---
# Getting the data

You'll also need some data - to get this,  download the tarball from [this
folder](https://www.chg.ox.ac.uk/~gav/projects/chg-training-resources/data/sequence_data_analysis/introduction_to_next_generation_sequencing_data_analysis/)

For example using `curl`:
```sh
curl -O https://www.chg.ox.ac.uk/~gav/projects/chg-training-resources/data/sequence_data_analysis/introduction_to_next_generation_sequencing_data_analysis/sequence_data_analysis.tgz
```

This will take a minute or so to download.  Extract it :

```
tar -xzf sequence_data_analysis.tgz
```

You should now have a folder called `sequence_data_analysis`. For the tutorial, delete the tarball
and then change into that directory:

```
rm sequence_data_analysis.tgz
cd sequence_data_analysis
```

Now you're [ready to start](Pipeline_outline.md).
