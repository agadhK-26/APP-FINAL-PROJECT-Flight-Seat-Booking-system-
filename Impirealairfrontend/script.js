// Modal functionality
const modal = document.getElementById('signInModal');
const openBtn = document.getElementById('openSignIn');
const closeBtn = document.getElementById('closeSignIn');
const signInForm = document.querySelector('#signInModal form');

// Open modal when the button is clicked
openBtn.onclick = () => { 
    modal.classList.remove('hidden'); 
};

// Close modal when the close button is clicked
closeBtn.onclick = () => { 
    modal.classList.add('hidden'); 
};

// Close modal when the user clicks outside the modal
modal.onclick = (e) => {
    if (e.target === modal) {
        modal.classList.add('hidden');
    }
};

// Simple form submission logic to proceed to the next page
signInForm.onsubmit = (e) => {
    e.preventDefault();
    // Simulate successful sign-in
    alert("Sign-in successful! Proceeding to flight route.");
    window.location.href = "./public/flightRoute.html";
};