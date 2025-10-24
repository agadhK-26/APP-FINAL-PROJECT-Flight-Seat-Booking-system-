// Retrieve the saved airline name, defaulting to 'SpiceJet' if none is found.
const airline = localStorage.getItem('airlineName') || 'SpiceJet';
// Display the retrieved airline name
document.getElementById('confAirline').textContent = airline;

// Display fare from localStorage
// Note: 'totalFare' should be calculated in payment.html and saved.
document.getElementById('confFare').textContent = `₹${localStorage.getItem('totalFare') || '4430'}`;

// Display seats from localStorage
const seats = JSON.parse(localStorage.getItem('selectedSeats') || '["7D"]');
document.getElementById('confSeats').textContent = seats.join(', ');

// Generate and save a simple PNR for the boarding pass
const generatePNR = () => Math.random().toString(36).substring(2, 8).toUpperCase();
localStorage.setItem('pnr', generatePNR());

// Save airline name again specifically for boarding pass
localStorage.setItem('bpAirline', airline);