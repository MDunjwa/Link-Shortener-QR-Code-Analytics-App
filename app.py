"""
This will be where my main Flask app code resides
"""
import firebase_admin
from firebase_admin import credentials, firestore

import validators # Helps me check if URLs are valid
from utils.qr_generator import generate_qr_code
from utils.url_generator import to_base_62

from flask import Flask, request, jsonify, redirect
import random

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

# Shorten route
@app.route('/shorten', methods=['POST'])
def shorten_url():
    data = request.get_json()
    original_url = data.get("url")

    if not original_url or not validators.url(original_url): # If my URL is null or not valid return a bad request response
        return jsonify({'error': 'Invalid URL'}), 400

    random_number = random.getrandbits(32)  # Generate a random number from 4 billion possibilities
    short_id = to_base_62(random_number) # Shorten that number
    
    doc_ref = db.collection('urls').document(short_id) # I'm creating a document reference in the URLs collection in Firebase

    # Saving it in Firestore
    doc_ref.set({
        "original_url": original_url,
        "short_id": short_id,
        "clicks": 0,
        "created_at": firestore.SERVER_TIMESTAMP
    })

    # shortened_url = request.host_url + short_id
    shortened_url = f"http://localhost:5000/{short_id}" # Hardcoded for now for testing
    qr_code = generate_qr_code(shortened_url)

    return jsonify({
        "short_url": shortened_url,
        "short_id": short_id,
        "qr_code": qr_code
    }), 201

# Redirect route
@app.route('/<short_id>')
def redirect_url(short_id):
    result = db.collection('urls').where('short_id', '==', short_id).get() 

    if not result: 
        return jsonify({"error": "Short URL not found"}), 404
    
    doc = result[0]
    data = doc.to_dict()
    original_url = data.get("original_url")

    # Incrementing click counter when I find a matching url
    db.collection('urls').document(doc.id).update({
        "clicks": firestore.Increment(1)
    })

    return redirect(original_url)


if __name__ == '__main__':
    app.run(debug=True, port=5000)

"""
What db.collection looks like Collection: urls
Document ID: AbC123xyZ
Fields:
    original_url: "https://google.com"
    short_id: "g1Aa"
    clicks: 2
    created_at: <timestamp>
"""