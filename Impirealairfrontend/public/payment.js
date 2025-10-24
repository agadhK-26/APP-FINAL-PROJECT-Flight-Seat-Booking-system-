// --- JS for Fare Display and Payment ---
        
// 1. Retrieve the final TOTAL amounts saved by the seat.html page.
// We are now only retrieving the total, calculated correctly on the previous page.
const totalFare = parseFloat(localStorage.getItem('totalFare')) || 0;
const totalBaseFare = parseFloat(localStorage.getItem('finalBaseFare')) || 0;
const seatPremium = parseFloat(localStorage.getItem('seatPremium')) || 0;
const totalTaxesAndFees = parseFloat(localStorage.getItem('finalTaxesAndFees')) || 0;

// 2. Update the display elements
document.getElementById('displayBaseFare').textContent = `₹${totalBaseFare.toLocaleString('en-IN')}`;
document.getElementById('displaySeatPremium').textContent = `₹${seatPremium.toLocaleString('en-IN')}`;
document.getElementById('displayTaxesAndFees').textContent = `₹${totalTaxesAndFees.toLocaleString('en-IN')}`;
document.getElementById('displayTotalFare').textContent = `₹${totalFare.toLocaleString('en-IN')}`;

// --- Payment Simulation (Removed Spring Boot Code) ---
document.getElementById('paymentForm').onsubmit = (e) => {
    e.preventDefault();
    
    const payButton = document.getElementById('payNowButton');
    payButton.textContent = 'Processing...';
    payButton.disabled = true;

    setTimeout(() => {
        // Simulate success and redirect
        alert(`Payment of ₹${totalFare.toLocaleString('en-IN')} successful!`);
        window.location.href = 'booking_confirmed.html';
    }, 1500); // 1.5 second delay
};