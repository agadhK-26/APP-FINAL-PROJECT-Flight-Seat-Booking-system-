const map = document.getElementById('seatMap');
const BUSINESS_PREMIUM = 1000;
let selectedSeats = [];

// --- CORE FIX: Reading and using the correct passenger count ---
let numPassengers;
const storedCount = localStorage.getItem('passengerCount') || localStorage.getItem('numTravelers');
numPassengers = parseInt(storedCount) || 1; // Default to 1 if not found or invalid

// --- CORE FIX: Reading the base fare from the URL and calculating total base fare ---
const urlParams = new URLSearchParams(window.location.search);
const perPersonBaseFare = parseInt(urlParams.get('fare')) || 3950; // Read from URL or default

// Calculate the TOTAL base fare for ALL passengers
const totalBaseFare = perPersonBaseFare * numPassengers;

// --- FIXED TAXES & FEES ---
// Assuming a fixed per-person tax/fee of ₹480
const taxesAndFeesPerPerson = 480;
const totalTaxesAndFees = taxesAndFeesPerPerson * numPassengers;
// -------------------------

const seatData = [];

// Rows 1-5: Business
for(let i=1;i<=5;i++){
    seatData.push({row:i,type:'business',seats:['A','B','C','D','E','F','G','H']});
}
// Rows 6-20: Economy
for(let i=6;i<=20;i++){
    seatData.push({row:i,type:'economy',seats:['A','B','C','D','E','F','G','H']});
}

function renderSeatMap(){
    seatData.forEach(rowInfo=>{
        const rowDiv=document.createElement('div');
        rowDiv.className='flex items-center my-2';

        const rowNum=document.createElement('div');
        rowNum.textContent=rowInfo.row;
        rowNum.className='w-6 text-right font-bold text-sm mr-2';
        rowDiv.appendChild(rowNum);

        // Left 4 seats
        for(let i=0;i<4;i++){
            const seatDiv=createSeatDiv(rowInfo,rowInfo.seats[i]);
            rowDiv.appendChild(seatDiv);
        }

        // Aisle
        const aisle=document.createElement('div');
        aisle.className='aisle';
        rowDiv.appendChild(aisle);

        // Right 4 seats
        for(let i=4;i<8;i++){
            const seatDiv=createSeatDiv(rowInfo,rowInfo.seats[i]);
            rowDiv.appendChild(seatDiv);
        }

        map.appendChild(rowDiv);
    });
}

function createSeatDiv(rowInfo,seatLetter){
    const seatId=`${rowInfo.row}${seatLetter}`;
    const seatDiv=document.createElement('div');
    seatDiv.textContent=seatId;
    seatDiv.classList.add('seat');

    const isBusiness=rowInfo.type==='business';
    seatDiv.classList.add(isBusiness?'business':'available');
    seatDiv.setAttribute('data-id',seatId);
    seatDiv.setAttribute('data-business',isBusiness);

    // Example booked seats for realism
    const bookedSeats = ['1B','2D','5F','7C','8A','10H','12C','15F','18G','20B'];
    if(bookedSeats.includes(seatId)){
        seatDiv.classList.remove('available','business');
        seatDiv.classList.add('booked');
    }else{
        seatDiv.onclick=()=>toggleSeat(seatDiv,seatId,isBusiness);
    }

    return seatDiv;
}

function toggleSeat(seatElement,seatId,isBusiness){
    if(seatElement.classList.contains('selected')){
        seatElement.classList.remove('selected');
        selectedSeats=selectedSeats.filter(s=>s.id!==seatId);
    }else{
        if(selectedSeats.length>=numPassengers){
            alert(`You can only select ${numPassengers} seat(s) for your party.`);
            return;
        }
        seatElement.classList.add('selected');
        selectedSeats.push({id:seatId,business:isBusiness});
    }
}

document.getElementById('confirmSeat').onclick=()=>{
    if(selectedSeats.length!==numPassengers){
        alert(`Please select exactly ${numPassengers} seat(s) to continue.`);
        return;
    }
    let businessCount=selectedSeats.filter(s=>s.business).length;
    let totalPremium=businessCount*BUSINESS_PREMIUM;
    
    // Calculate the FINAL total fare
    const finalTotalFare = totalBaseFare + totalTaxesAndFees + totalPremium;

    // Save the TOTAL amounts to localStorage for the payment page
    localStorage.setItem('selectedSeats',JSON.stringify(selectedSeats.map(s=>s.id)));
    localStorage.setItem('totalFare', finalTotalFare);
    localStorage.setItem('seatPremium', totalPremium);
    localStorage.setItem('finalBaseFare', totalBaseFare); // Storing the Total Base Fare
    localStorage.setItem('finalTaxesAndFees', totalTaxesAndFees); // Storing Total Taxes for display

    window.location.href='payment.html';
};

window.onload=renderSeatMap;