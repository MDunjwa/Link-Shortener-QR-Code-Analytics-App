"""
This will be where my main Flask app code resides
"""
import firebase_admin
from firebase_admin import credentials, firestore

from flask import Flask

# Creating an instance of my web app
app = Flask(__name__)

# Initialising Firebase
try:
    fb_credentials = credentials.Certificate('firebase-credentials.json')
    firebase_admin.initialize_app(fb_credentials)
    db = firestore.client()
    print("Connected")
except Exception as e:
    print("Failed")
    db = None

# Test route for the home page
@app.route('/')
def index():
    return "Hello! Flask is running."

if __name__ == '__main__':
    app.run(debug=True, port=5000)