document.addEventListener('DOMContentLoaded', function() {

    const form = document.getElementById('shortening-form');
    form.addEventListener('submit', handleFormSubmit);
});

async function handleFormSubmit(event) {
    event.preventDefault();
    
    // TODO: Get the URL from input
    // TODO: Send to backend
    // TODO: Display results
}

/* 
Notes
DOMContentLoaded is a browser event that waits for the HTML to be successfully parsed. 
Submit is also a browser event
event.preventDefault() prevents the web page from reloading and my user losing state
*/