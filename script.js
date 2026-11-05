// Get HTML Elements
let loginSection = document.getElementById("loginSection");
let bookingSection = document.getElementById("bookingSection");
let username = document.getElementById("username")
let loginBtn = document.getElementById("loginBtn");
let bookingType = document.getElementById("bookingType");
let quantity = document.getElementById("quantity");
let total = document.getElementById("total");
let bookBtn = document.getElementById("bookBtn");
let logoutBtn = document.getElementById("logoutBtn");
let history = document.getElementById("history");
let dayPrice = 2000;
let hourPrice = 300;

// Current logged-in user
let currentUser = localStorage.getItem("loggedInUser");
function checkLogin() {

    if (currentUser) {
        loginSection.style.display = "none";
        bookingSection.style.display = "block";

        showHistory();
    }
}
checkLogin();


// Login Function
loginBtn.addEventListener("click", function () {

    if (username.value.trim() === "") {
        alert("Please enter username");
        return;
    }

    currentUser = username.value.trim();

    localStorage.setItem("loggedInUser", currentUser);

    loginSection.style.display = "none";
    bookingSection.style.display = "block";
    showHistory();

});


// Calculate Total Automatically
function calculateTotal() {

    let type = bookingType.value;
    let qty = quantity.value;

    let price;

    if (type === "day") {
        price = dayPrice;
    } else {
        price = hourPrice;
    }
    let amount = price * qty;
    // Apply 10% discount
    if (amount > 4000) {
        amount = amount - (amount * 0.10);
    }

    total.textContent = amount

    return amount;
}
bookingType.addEventListener("change", calculateTotal);
quantity.addEventListener("input", calculateTotal);


// Book Room
bookBtn.addEventListener("click", function () {

    // Check login
    if (!currentUser) {
        alert("Please login first");
        return;
    }

    let qty = Number(quantity.value);
    let type = bookingType.value;
    let amount = calculateTotal();

    let booking = {
        type: type,
        quantity: qty,
        totalCost: amount,
        date: new Date().toLocaleString()
    };

    // Get all bookings
    let allBookings = JSON.parse(
        localStorage.getItem("bookings")
    )

    // Create user history if not available
    if (!allBookings[currentUser]) {
        allBookings[currentUser] = [];
    }

    // Add new booking
    allBookings[currentUser].push(booking);

    // Save in Local Storage
    localStorage.setItem(
        "bookings",
        JSON.stringify(allBookings)
    );

    alert("Room booked successfully!");

    quantity.value = "";
    total.textContent = "0";

    showHistory();

});


// Display Booking History
function showHistory() {

    let allBookings = JSON.parse(
        localStorage.getItem("bookings")
    );
    let userBookings = allBookings[currentUser];
    history.innerHTML = "";

    if (userBookings.length === 0) {
        history.innerHTML = "<p>No booking history found.</p>";
        return;
    }

    userBookings.forEach(function (booking, index) {

        history.innerHTML = `
            <div>
                <h4>Booking ${index + 1}</h4>
                <p>Booking Type: ${booking.type}</p>
                <p>Quantity: ${booking.quantity}</p>
                <p>Total Cost: ₹${booking.totalCost}</p>
                <p>Date: ${booking.date}</p>
            </div>
        `;
    });
}


// Logout
logoutBtn.addEventListener("click", function () {
    localStorage.removeItem("loggedInUser");
    currentUser = null
    bookingSection.style.display = "none";
    loginSection.style.display = "block";

});