"""
Takes in a decimal format number (e.g 999) and encodes it to form part of the short URL

Arguments: decimal (int) the autoincrement ID value of the URL being encoded

Returns: hash_string (string) the short URL
"""
def to_base_62(decimal: int):
    if decimal==0:
        return '0'

    characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    hash_string = ''
    while decimal > 0:
        hash_string = characters[decimal % 62] + hash_string
        decimal //= 62
    return hash_string