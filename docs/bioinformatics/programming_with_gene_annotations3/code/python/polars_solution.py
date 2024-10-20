# Contributed by Barnay Ronay
import polars as pl

def read_gff(filename):
    df = pl.scan_csv(
        filename,
        separator='\t',
        has_header=False,
        comment_prefix='#',
        new_columns=['seqid', 'source', 'type', 'start', 'end', 'score', 'strand', 'phase', 'attributes'],
        null_values=['.'],
        schema_overrides={
            'seqid': pl.Utf8,
            'source': pl.Utf8,
            'type': pl.Utf8,
            'start': pl.Int64,
            'end': pl.Int64,
            'score': pl.Float64,
            'strand': pl.Utf8,
            'phase': pl.Utf8,
            'attributes': pl.Utf8
        }
    )
 
    df = df.with_columns([
        pl.col('attributes').str.extract(r'ID=([^;]+)').alias('ID'),
        pl.col('attributes').str.extract(r'Parent=([^;]+)').alias('Parent')
    ])
    
    return df.collect() 
