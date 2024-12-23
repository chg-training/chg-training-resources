import io, pandas
import unittest
import gff

class TestGff(unittest.TestCase):
	test_data = '\n'.join([  # join lines with newline character
		'##gff-version 3',
		'#description: test data',
		'chr1\tme\tgene\t1\t1000\t.\t+\t.\tID=gene1;other_data=stuff',
		'chr1\tme\texon\t10\t900\t.\t+\t.\tID=gene1.1;Parent=gene1'
	])
	
    # The main test from the introduction
	def test_read_gff( self ): 
		data = gff.read_gff( io.StringIO( self.test_data ))
		assert data['seqid'][0] == 'chr1'
		assert data['strand'][0] == '+'
		assert data['attributes'][0] == 'ID=gene1;other_data=stuff'
		assert data['seqid'][1] == 'chr1'
		assert data['strand'][1] == '+'
		assert data['attributes'][1] == 'ID=gene1.1;Parent=gene1'
		assert data['start'][0] == 1
		assert data['end'][0] == 1000
		assert data['start'][1] == 10
		assert data['end'][1] == 900
		from math import isnan
		assert isnan( data['score'][1] )
        # or written another way:
		assert data['score'].isnull()[1]
		assert data['ID'][0] == 'gene1'
		assert data['ID'][1] == 'gene1.1'
		assert data['Parent'].isnull()[0]
		assert data['Parent'][1] == 'gene1'

# Make sure to run the tests.
unittest.main()
