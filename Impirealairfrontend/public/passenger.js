// --- References ---
const form = document.getElementById('passengerForm');
const container = document.getElementById('passengerFormsContainer');
const numInput = document.getElementById('numPassengers');
const mobileInput = document.getElementById('mobileNumber');
const idContainer = document.getElementById('idInputContainer');


// --- Functions ---

function generatePassengerForms(num) {
    container.innerHTML = ''; // Clear previous forms
    
    // Re-save the count to localStorage every time the forms are generated
    localStorage.setItem('passengerCount', num); 

    for (let i = 1; i <= num; i++) {
        const genderId = `p${i}_gender`;
        const ageId = `p${i}_age`;

        const formHtml = `
            <div class="p-4 mb-4 bg-white/10 rounded-lg" data-passenger-id="${i}">
                <h3 class="text-lg font-bold mb-2">Passenger ${i}</h3>
                <input type="text" placeholder="Name" class="w-full p-2 mb-2 rounded bg-white/20 backdrop-blur-sm text-white focus:outline-none passenger-name" name="p${i}_name" required autocomplete="off">
                <div class="flex space-x-4">
                    <select name="p${i}_gender" id="${genderId}" class="w-1/3 p-2 rounded bg-white/20 backdrop-blur-sm text-white focus:outline-none appearance-none passenger-gender" required autocomplete="off">
                        <option value="" disabled selected>Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    <input type="number" placeholder="Age" min="1" max="120" id="${ageId}" class="w-2/3 p-2 rounded bg-white/20 backdrop-blur-sm text-white focus:outline-none passenger-age" name="p${i}_age" required autocomplete="off">
                </div>
            </div>
        `;
        container.innerHTML += formHtml;
    }
}

function toggleIdInput(type) {
    idContainer.innerHTML = ''; // Clear previous

    if (type === 'national') {
        idContainer.innerHTML = `
            <input type="text" placeholder="Aadhaar ID (e.g., XXXX XXXX XXXX)" class="w-full p-3 mb-4 rounded bg-white/20 backdrop-blur-sm placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-blue-400" required autocomplete="off">
        `;
    } else if (type === 'international') {
        idContainer.innerHTML = `
            <input type="text" placeholder="Passport ID" class="w-full p-3 mb-4 rounded bg-white/20 backdrop-blur-sm placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-blue-400" required autocomplete="off">
        `;
    }
}


// --- Event Listeners ---

// Listener for passenger count change
numInput.addEventListener('change', (e) => {
    const num = parseInt(e.target.value);
    if (num > 0 && num <= 5) {
        generatePassengerForms(num);
    }
});

// CRITICAL FIX: Save data to localStorage on form submission
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Stop the default form submission for now

    const passengerNames = [];
    const nameInputs = document.querySelectorAll('.passenger-name');
    const num = parseInt(numInput.value);

    // 1. Store the final passenger count
    localStorage.setItem('passengerCount', num); 

    // 2. Store passenger names 
    nameInputs.forEach(input => {
        if (input.value.trim() !== "") {
            passengerNames.push(input.value.trim());
        }
    });
    
    // Basic validation check
    if (passengerNames.length !== num) {
         alert("Please fill out all passenger name fields.");
         return;
    }

    localStorage.setItem('passengerNames', JSON.stringify(passengerNames));
    localStorage.setItem('numTravelers', num); 
    
    // 3. CRITICAL: Collect and store Primary Passenger (P1) details
    const primaryPassengerData = {
        // We use the unique IDs assigned to the first passenger's fields
        age: document.getElementById('p1_age').value,
        gender: document.getElementById('p1_gender').value,
        mobileNumber: mobileInput.value, // Mobile is common to all
        name: passengerNames[0] // Add P1's name for redundancy/clarity
    };

    // This is the key boarding_pass.html uses for single-column DB data
    localStorage.setItem('primaryPassengerDetails', JSON.stringify(primaryPassengerData));


    // 4. Navigate to the next page
    window.location.href = form.action; 
});


// --- Initialization ---
window.onload = () => {
    // Check if passenger count is already in localStorage (e.g., back button used)
    const initialCount = localStorage.getItem('passengerCount') || numInput.value;
    numInput.value = initialCount;
    
    generatePassengerForms(parseInt(initialCount));
    
    // Check which travel type should be selected and toggle the corresponding ID input
    const travelType = document.querySelector('input[name="travelType"]:checked').value || 'national';
    toggleIdInput(travelType);

    // Optional: Populate mobile field if it was previously saved (for back button navigation)
    const savedMobile = localStorage.getItem('primaryPassengerDetails');
    if (savedMobile) {
        try {
            mobileInput.value = JSON.parse(savedMobile).mobileNumber || '';
        } catch (e) {
            console.error("Error parsing saved primaryPassengerDetails:", e);
        }
    }
};