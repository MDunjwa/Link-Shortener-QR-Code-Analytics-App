import qrcode

# For saving qr codes as base64 strings instead of images
import io
import base64

"""
Takes in a URL and generates a QR code that leads to it

Arguments: url (string) the URL being shared

Returns: base64_string (str) the base64_string version of the qr code image created, which our HTML will display
"""
def generate_qr_code(url: str, filename: str = None):   
    img = qrcode.make(url)
    buffer_file = io.BytesIO() # I'm creating file in memory instead now
    img.save(buffer_file, format='PNG')
    
    image_bytes = buffer_file.getvalue() # I'm getting the raw image data from the buffer file in memory
    base64_string = base64.b64encode(image_bytes).decode() # I'm putting the bytes in base64 format then converting them to a regular string for json

    return base64_string