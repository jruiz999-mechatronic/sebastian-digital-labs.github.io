// Function to load external HTML content into a div
function loadHTML(elementId, filePath) {
    console.log("Current URL:", window.location.href);
    fetch('footer.html')
        .then(r => r.text())
        .then(html => {
            // Parsea el HTML para extraer únicamente el <footer>
            const parser = new DOMParser();
            const doc    = parser.parseFromString(html, 'text/html');
            const footer = doc.querySelector('footer');
            document.getElementById('footer').replaceWith(footer);
        })
        .catch(console.error);
}

// Load footer from the respective HTML file
loadHTML('footer', 'footer.html');
loadHTML('header2', 'header.html');
