const urlParams = new URLSearchParams(window.location.search);
const searchQuery = urlParams.get('q');

if (searchQuery) {
    const url = 'http://localhost:5050/api/generate';
    const data = {
        prompt: searchQuery
    };

    const loadingContainer = document.createElement('div');
    loadingContainer.textContent = 'Loading...';
    loadingContainer.style.position = 'fixed';
    loadingContainer.style.top = '50%';
    loadingContainer.style.right = '20px';
    loadingContainer.style.transform = 'translateY(-50%)';
    loadingContainer.style.padding = '10px';
    loadingContainer.style.border = '1px solid #ccc';
    loadingContainer.style.borderRadius = '5px';
    loadingContainer.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
    loadingContainer.style.maxWidth = '1000px';
    loadingContainer.style.overflowWrap = 'break-word';
    loadingContainer.style.zIndex = '9999';
    document.body.appendChild(loadingContainer);

    const formatMarkdown = (text) => { // Shoutout to ChatGPT for this
        // Replace Markdown syntax with HTML equivalents
        text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); // Bold
        text = text.replace(/\*(.*?)\*/g, '<em>$1</em>'); // Italic
        text = text.replace(/```([^`]+)```/g, '<pre><code>$1</code></pre>'); // Code block
        text = text.replace(/`([^`]+)`/g, '<code>$1</code>'); // Inline code
        text = text.replace(/\n/g, '<br>'); // New line

        return text;
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(json => {
            document.body.removeChild(loadingContainer);

            const responseContainer = document.createElement('div');
            responseContainer.innerHTML = `
                <div style="position: fixed; top: 50%; right: 20px; transform: translateY(-50%); padding: 10px; border: 1px solid #ccc; border-radius: 5px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); max-width: 1000px; overflow-wrap: break-word; z-index: 9999;">
                    <strong style="font-size: 1.2em;">Answer from Ollama:</strong>
                    <p>${formatMarkdown(json.response)}</p>
                </div>
            `;

            document.body.appendChild(responseContainer);
        })
        .catch(error => {
            document.body.removeChild(loadingContainer);

            alert('There was a problem with the fetch operation:', error);
        });

} else {
    alert("Search query not found in URL");
}
