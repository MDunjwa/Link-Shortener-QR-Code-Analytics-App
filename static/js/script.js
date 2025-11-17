document.addEventListener('DOMContentLoaded', function() {

    const form = document.getElementById('shortening-form');
    form.addEventListener('submit', handleFormSubmit);
});

async function handleFormSubmit(event) {
    event.preventDefault();
    
    // Getting the url
    const urlInput = document.getElementById('long-url-input');
    const url = urlInput.value.trim();
    
    // Validating if a url was entered
    if (!url) {
        alert('Please enter a URL');
        return;
    }
    
    // Show loading state (we'll add visual feedback later)
    console.log('Shortening URL:', url);
    
    try {
        // Sending a POST request to my shorten route 
        const response = await fetch('/shorten', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: url })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Something went wrong');
        }
        
        // Data contains the url, the shortened url, and the qr code
        displayResults(data);
        
    } catch (error) {
        console.error('Error:', error);
        alert('Error: ' + error.message);
    }
}

function displayResults(data) {
    
    // Get QR image element
    const qrImage = document.querySelector('.qr-placeholder img');
    
    // Updating my default QR code image
    qrImage.src = 'data:image/png;base64,' + data.qr_code;
    qrImage.classList.add('active'); // Changing to full opacity
    
    // Logging success
    console.log('Short URL:', data.short_url);
    console.log('Short ID:', data.short_id);
}
    
    // TODO: Get the URL from input
    // TODO: Send to backend
    // TODO: Display results


/* 
Notes
DOMContentLoaded is a browser event that waits for the HTML to be successfully parsed. 
Submit is also a browser event
event.preventDefault() prevents the web page from reloading and my user losing state
*/