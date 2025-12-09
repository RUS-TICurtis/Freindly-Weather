// --- Configuration ---
const RENDER_BACKEND_URL = 'https://weather-app-qquf.onrender.com';
const LOCAL_BACKEND_URL = 'http://localhost:3015';

// Automatically determine the backend URL based on the hostname.
// This allows the app to work both locally and when deployed.
const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const BACKEND_URL = isLocal ? LOCAL_BACKEND_URL : RENDER_BACKEND_URL;
console.log(`Backend URL set to: ${BACKEND_URL}`);

// --- DOM Element References ---
const weatherDiv = document.querySelector('.weather');
const errorDiv = document.getElementById('error');
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherIconEl = document.getElementById('weatherIcon');
const cityEl = document.getElementById('cityName');
const tempEl = document.getElementById('temp');
const humidityEl = document.getElementById('humidity');
const windEl = document.getElementById('wind');
const weatherDescEl = document.getElementById('weatherDesc');

// This function updates the DOM with weather data
function updateWeatherDisplay(data) {
    // 1. Update City and Temp
    cityEl.innerText = data.name;
    tempEl.innerText = Math.round(data.main.temp) + '°';

    // 2. Update Description
    const description = data.weather[0].description;
    weatherDescEl.innerText = description; 
    
    // 3. Update Weather Icon
    const iconCode = data.weather[0].icon;
    weatherIconEl.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    weatherIconEl.alt = description;

    // 4. Update Details
    humidityEl.innerText = data.main.humidity + '%';
    
    // Wind speed conversion for display
    const windSpeed = data.wind.speed !== undefined ? data.wind.speed : 0;
    const windSpeedKmH = Math.round(windSpeed * 3.6);
    windEl.innerText = windSpeedKmH + ' Km/h'; 

    showWeather();
}

// --- UI State Management Functions ---
function showLoading(message = 'Loading...') {
    weatherDiv.classList.add('hidden');
    errorDiv.classList.add('hidden');
    // You could add a dedicated loading spinner element here for a better UX
    console.log(message); // Placeholder for a real loading indicator
}

function showWeather() {
    errorDiv.classList.add('hidden');
    weatherDiv.classList.remove('hidden');
}

function showError(message) {
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
    weatherDiv.classList.add('hidden');
}

function hideAll() {
    weatherDiv.classList.add('hidden');
    errorDiv.classList.add('hidden');
}


// Function to fetch weather using city name (called when user searches)
async function getWeather() {
    const city = cityInput.value.trim();
    
    hideAll();

    if (!city) {
        showError('Please enter a city name.');
        return;
    }

    try {
        const response = await fetch(`${BACKEND_URL}/weather?city=${city}`);
        
        if (!response.ok) {
            const errorData = await response.json();
            // Throw an error with the message from the server
            throw new Error(errorData.error || 'An unknown error occurred.');
        }

        const data = await response.json();
        updateWeatherDisplay(data);

    } catch (err) {
        console.error("Weather fetching error (client-side):", err.message);
        const finalMessage = err.message.includes('City not found')
            ? 'City not found. Please check the spelling.'
            : err.message;
        showError(finalMessage);
    }
}

// NEW: Function to fetch weather using coordinates (called on load)
async function getWeatherByCoordinates(lat, lon) {
    console.log(`Fetching weather for coordinates: Lat=${lat}, Lon=${lon}`);
    showLoading('Fetching weather for your location...');

    try {
        // The script fetches data from YOUR Node server's new '/weather-coords' endpoint
        const response = await fetch(`${BACKEND_URL}/weather-coords?lat=${lat}&lon=${lon}`);
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to fetch weather for your location.');
        }

        const data = await response.json();
        updateWeatherDisplay(data);
        
        // Optional: Populate the search bar with the detected city name
        cityInput.value = data.name;

    } catch (err) {
        console.error("Coordinate weather fetching error (client-side):", err);
        // Display the actual error from the server or a fallback message.
        showError(err.message || `Could not get weather for your location. Please use the search bar.`);
    }
}

// NEW: Main Geolocation Initialization
function initGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            // Success handler
            (position) => {
                // If successful, fetch weather using the coordinates
                getWeatherByCoordinates(position.coords.latitude, position.coords.longitude);
            },
            // Error handler
            (error) => {
                console.warn(`Geolocation error (${error.code}): ${error.message}`);
                // If user denies or it fails, hide all sections and show an informative message.
                hideAll();
                showError('Location access denied. Please search for a city to begin.');
            },
            // Options (optional)
            { timeout: 10000, enableHighAccuracy: true }
        );
    } else {
        // Geolocation not supported by browser
        console.log("Geolocation is not supported by this browser.");
        showError('Geolocation is not supported. Please search for a city.');
    }
}


// Event listeners for search
document.addEventListener('DOMContentLoaded', () => {
    // Run geolocation logic immediately on page load
    initGeolocation();

    // Handle Enter key press
    if (cityInput) {
        cityInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                getWeather();
            }
        });
    }
    
    // Handle button click
    if (searchBtn) {
        searchBtn.addEventListener('click', getWeather);
    }
});