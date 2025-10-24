// UPDATED SCRIPT: Saves both the fare and the airline name upon click
document.querySelectorAll('.airline-card').forEach(card => {
    card.addEventListener('click', (e) => {
        // Prevent default navigation to handle logic first
        // Note: The click listener on 'a' tag runs *before* the navigation
        // If we prevent default, we must navigate manually (window.location.href = e.currentTarget.href;)
        // For simplicity, let the browser handle navigation after saving data.
        
        // 1. Determine base fare from the URL
        const href = e.currentTarget.href;
        const fare = href.includes('fare') ? 
                     href.split('fare=')[1].split('&')[0] : 
                     '3950'; // Default fare if URL parameter is missing

        // 2. CRUCIAL: Get the airline name from the data-airline attribute
        const airlineName = e.currentTarget.getAttribute('data-airline'); 
        
        // 3. Save the data to localStorage
        localStorage.setItem('baseFare', fare);
        localStorage.setItem('airlineName', airlineName); 
    });
});