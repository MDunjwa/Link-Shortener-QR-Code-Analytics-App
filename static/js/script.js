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

    // Hiding previous results and showing loading
    const outputSection = document.getElementById('output-section');
    const loadingState = document.getElementById('loading-state');
    
    outputSection.classList.add('hidden');
    loadingState.classList.remove('hidden');
    
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

        // Hiding loading, showing results
        loadingState.classList.add('hidden');
        
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

    // Making the output seciton visible
    const outputSection = document.getElementById('output-section');
    const shortUrlDisplay = document.getElementById('short-url-display');
    const statsLink = document.getElementById('stats-link');

    shortUrlDisplay.value = data.short_url;
    statsLink.href = `/stats/${data.short_id}`;
    
    outputSection.classList.remove('hidden');
    
    // Logging success
    console.log('Short URL:', data.short_url);
    console.log('Short ID:', data.short_id);
}

function copyShortUrl() {
    const shortUrlDisplay = document.getElementById('short-url-display');
    
    // Select and copy
    shortUrlDisplay.select();
    document.execCommand('copy');
    
    // Visual feedback
    const button = event.target;
    const originalText = button.textContent;
    button.textContent = 'Copied!';
    button.style.backgroundColor = '#218838';
    
    // Reset after 2 seconds
    setTimeout(() => {
        button.textContent = originalText;
        button.style.backgroundColor = '';
    }, 2000);
}

function downloadQrCode() {
    const qrImage = document.querySelector('.qr-placeholder img');
    
    // Checking if QR code has been generated
    if (!qrImage.src || qrImage.src.includes('sample_qr.png')) {
        alert('Please generate a short URL first!');
        return;
    }
    
    // Get the base64 data
    const base64Data = qrImage.src;
    
    // Create a temporary download link
    const link = document.createElement('a');
    link.href = base64Data;
    link.download = 'qr-code.png';
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}



/* 
Notes
DOMContentLoaded is a browser event that waits for the HTML to be successfully parsed. 
Submit is also a browser event
event.preventDefault() prevents the web page from reloading and my user losing state
*/