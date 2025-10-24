// Get references to the form and inputs
const flightForm = document.getElementById('flightForm');
const departureCityInput = document.getElementById('departureCityInput');
const destinationCityInput = document.getElementById('destinationCityInput');
const departureDateInput = document.getElementById('departureDateInput');
const arrivalDateInput = document.getElementById('arrivalDateInput');

// Add event listener to intercept form submission
flightForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Stop the default HTML form submission

    // 1. Get the values from the form inputs
    // The text.split('(')[0].trim() extracts the city name (e.g., 'New Delhi' from 'New Delhi (DEL)')
    const departureCity = departureCityInput.options[departureCityInput.selectedIndex].text.split('(')[0].trim();
    const destinationCity = destinationCityInput.options[destinationCityInput.selectedIndex].text.split('(')[0].trim();
    const departureDate = departureDateInput.value;
    const arrivalDate = arrivalDateInput.value;

    // 2. Validate that departure and destination are not the same
    if (departureCity === destinationCity) {
        alert("Departure and Destination cities cannot be the same.");
        return;
    }

    // 3. Create the route object 
    const flightDetails = {
        departureCity: departureCity,
        destinationCity: destinationCity,
        departureDate: departureDate,
        arrivalDate: arrivalDate
    };

    // 4. Save the object to localStorage under the key 'flightRouteDetails'
    localStorage.setItem('flightRouteDetails', JSON.stringify(flightDetails));

    // 5. Navigate to the next page
    window.location.href = flightForm.action;
});

// Optional: Pre-populate form if data exists in localStorage (for back button use)
window.onload = () => {
    try {
        const savedRouteData = JSON.parse(localStorage.getItem('flightRouteDetails'));
        if (savedRouteData) {
            // Restore dates if they exist in localStorage
            if (savedRouteData.departureDate) {
                departureDateInput.value = savedRouteData.departureDate;
            }
            if (savedRouteData.arrivalDate) {
                arrivalDateInput.value = savedRouteData.arrivalDate;
            }
        }
    } catch (e) {
        console.error("Error loading saved route data:", e);
    }
};