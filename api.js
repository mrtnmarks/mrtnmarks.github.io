const API_KEY = "pk_live_f37bd47395d3dc70b785d7eced42affa";
const CHARITY_API_URL = `https://partners.every.org/v0.2/search?apiKey=${API_KEY}`;

async function fetchCharities() {
    const charityList = document.getElementById("charity-list");
    const errorMessage = document.getElementById("error-message");

    try {
        // Fetch data from the API
        const response = await fetch(CHARITY_API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        displayCharities(data.nonprofits); // Every.org API returns `nonprofits` array
    } catch (error) {
        // Display error message on failure
        errorMessage.textContent =
            "Sorry, we couldn't fetch charity data at this time. Please try again later.";
        console.error("Fetch error:", error);
    }
}

function displayCharities(charities) {
    const charityList = document.getElementById("charity-list");
    charityList.innerHTML = ""; // Clear previous data

    charities.forEach((charity) => {
        const card = document.createElement("div");
        card.classList.add("charity-card");
        card.innerHTML = `
            <h3>${charity.name}</h3>
            <p>${charity.mission ? charity.mission : "No mission statement available."}</p>
            <a href="${charity.profileUrl}" target="_blank">Visit Website</a>
        `;
        charityList.appendChild(card);
    });
}

// Fetch charities on page load
fetchCharities();

