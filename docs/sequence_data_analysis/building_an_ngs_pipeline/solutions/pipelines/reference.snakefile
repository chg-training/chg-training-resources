rule index_reference_sequence:
    output:
        bwt = "data/reference/{reference}.fa.gz.bwt"
    input:
        sequence = "data/reference/{reference}.fa.gz"
    shell: """
        bwa index {input.reference}
    """
