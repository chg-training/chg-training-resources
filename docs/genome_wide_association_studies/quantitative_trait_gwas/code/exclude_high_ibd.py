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
