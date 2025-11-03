import qrcode
import os
from datetime import datetime

def generate_qr(short_url: str, filename: str = None):
    if filename is None:
        filename = f"qr_{int(datetime.now().timestamp())}.png"

    folder = os.path.join("static", "qrcodes")
    os.makedirs(folder, exist_ok=True)

    path = os.path.join(folder, filename)

    img = qrcode.make(short_url)
    img.save(path)

    return path