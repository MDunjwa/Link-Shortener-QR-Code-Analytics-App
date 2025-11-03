import qrcode
import os
from datetime import datetime

"""
Takes in a URL and generates a QR code that leads to it

Arguments: url (string) the URL being shared
           filename (str) the optional filename we want for the qr code image

Returns: path (str) the location where the QR code image was saved
"""
def generate_qr_code(url: str, filename: str = None):
    if filename is None:
        filename = f"qr_{int(datetime.now().timestamp())}.png"

    folder = os.path.join("static", "qrcodes")
    os.makedirs(folder, exist_ok=True)

    path = os.path.join(folder, filename)

    img = qrcode.make(url)
    img.save(path)

    return path
#testing github contributions