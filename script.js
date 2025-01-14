let deferredPrompt; // Variable to store the prompt event
const installButton = document.getElementById('installButton'); // The install button

// Check if service workers are supported
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then((registration) => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch((error) => {
                console.log('Service Worker registration failed:', error);
            });
    });
}

// Listen for the 'beforeinstallprompt' event
window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the default install prompt
    e.preventDefault();
    deferredPrompt = e; // Save the event to trigger it later
    
    // Show the install button to the user
    installButton.style.display = 'block';

    // When the button is clicked, show the install prompt
    installButton.addEventListener('click', () => {
        // Show the install prompt
        deferredPrompt.prompt();

        // Wait for the user's response
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }
            deferredPrompt = null; // Reset the deferred prompt
        });
    });
});
