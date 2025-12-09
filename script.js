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
const locationNotice = document.getElementById('locationNotice');
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const refreshBtn = document.getElementById('refreshBtn');
const weatherIconEl = document.getElementById('weatherIcon');
const cityEl = document.getElementById('cityName');
const tempEl = document.getElementById('temp');
const humidityEl = document.getElementById('humidity');
const windEl = document.getElementById('wind');
const weatherDescEl = document.getElementById('weatherDesc');

const popupModal = document.getElementById('popupModal');
const popupMessage = document.getElementById('popupMessage');
const closePopupBtn = document.getElementById('closePopupBtn');

const geoPromptModal = document.getElementById('geoPromptModal');
const enableGeoBtn = document.getElementById('enableGeoBtn');
const closeGeoBtn = document.getElementById('closeGeoBtn');

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
    errorDiv.classList.add('hidden');
    weatherDiv.classList.remove('hidden'); // Show the weather block
    weatherDiv.classList.add('loading');   // Add loading class for skeleton effect
    weatherDiv.dataset.loadingText = message; // Set the text for the CSS pseudo-element
    console.log(message); // Placeholder for a real loading indicator
}

function showWeather() {
    errorDiv.classList.add('hidden');
    weatherDiv.classList.remove('loading'); // Remove skeleton effect
    weatherDiv.classList.remove('hidden');  // Ensure it's visible
}

function showError(message) {
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
    weatherDiv.classList.add('hidden');
    weatherDiv.classList.remove('loading');
}

function hideAll() {
    weatherDiv.classList.add('hidden');
    errorDiv.classList.add('hidden');
    weatherDiv.classList.remove('loading');
}

function showLocationNotice(message) {
    if (locationNotice) {
        locationNotice.textContent = message;
        locationNotice.classList.remove('hidden');
    }
}

function hideLocationNotice() {
    if (locationNotice) {
        locationNotice.classList.add('hidden');
    }
}

// --- Geolocation Prompt Modal Functions ---
let geoPromptInterval; // Variable for the recurring prompt
let permissionStatus = null; // Variable to hold the permission status object

function showGeoPrompt() {
    if (geoPromptModal) geoPromptModal.classList.remove('hidden');
}

function hideGeoPrompt() {
    if (geoPromptModal) geoPromptModal.classList.add('hidden');
}

// --- NEW: Popup Modal Functions ---
let popupTimeout; // Variable to hold the timeout

function showPopup(message) {
    hideGeoPrompt(); // Ensure geo prompt is hidden if validation popup shows
    // Clear any existing timer to prevent premature closing
    clearTimeout(popupTimeout);

    popupMessage.textContent = message;
    popupModal.classList.remove('hidden');

    // Set a timer to automatically hide the popup after 3 seconds
    popupTimeout = setTimeout(hidePopup, 3000);
}

function hidePopup() {
    clearTimeout(popupTimeout); // Clear the timer in case it's closed manually
    popupModal.classList.add('hidden');
}


// Function to fetch weather using city name (called when user searches)
async function getWeather(cityOverride) {
    // Stop prompting for location if the user decides to search manually
    clearInterval(geoPromptInterval);

    // Only hide the location notice if this is a user-initiated search (no cityOverride) or on first load
    if (!cityOverride) {
        hideLocationNotice();
    }

    const city = cityOverride || cityInput.value.trim();
    
    // If it's a manual search (no override) and the input is empty, show popup.
    if (!city && !cityOverride) { 
        showPopup('Please enter a city name.'); // Only show popup for manual empty search
        return;
    }
    showLoading('Fetching weather...');

    // --- UI Update: Start Loading ---
    searchBtn.classList.add('loading');
    searchBtn.disabled = true;
    cityInput.disabled = true;

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
    } finally {
        // --- UI Update: End Loading ---
        searchBtn.classList.remove('loading');
        searchBtn.disabled = false;
        cityInput.disabled = false;
    }
}

// NEW: Function to fetch weather using coordinates (called on load)
async function getWeatherByCoordinates(lat, lon) {
    // Hide the default location notice if we get coordinates successfully.
    hideLocationNotice();

    console.log(`Fetching weather for coordinates: Lat=${lat}, Lon=${lon}`);
    showLoading('Fetching weather for your location...');

    // --- UI Update: Start Loading ---
    refreshBtn.classList.add('loading');
    refreshBtn.disabled = true;

    try {
        // The script fetches data from YOUR Node server's new '/weather-coords' endpoint
        const response = await fetch(`${BACKEND_URL}/weather-coords?lat=${lat}&lon=${lon}`);
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to fetch weather for your location.');
        }

        const data = await response.json();
        updateWeatherDisplay(data);
        
        // By commenting out the line below, the search bar will remain empty
        // after the initial automatic location fetch.
        // cityInput.value = data.name;

    } catch (err) {
        console.error("Coordinate weather fetching error (client-side):", err);
        // Display the actual error from the server or a fallback message.
        showError(err.message || `Could not get weather for your location. Please use the search bar.`);
    } finally {
        // --- UI Update: End Loading ---
        refreshBtn.classList.remove('loading');
        refreshBtn.disabled = false;
    }
}

// Function to handle the actual position request
function requestPosition() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            // Success handler
            (position) => {
                getWeatherByCoordinates(position.coords.latitude, position.coords.longitude);
                // If position is successfully obtained, stop any recurring geo prompt
                // as permission has now been granted.
                if (geoPromptInterval) {
                    clearInterval(geoPromptInterval);
                    geoPromptInterval = null; // Clear the reference
                }
                hideLocationNotice();
            },
            // Error handler
            (error) => {
                console.warn(`Geolocation error (${error.code}): ${error.message}`);
                showLocationNotice('Using default location. You can search for a city or allow location access.');
                getWeather('Accra');

                // If the geoPromptInterval was active (meaning permission wasn't granted initially),
                // ensure it continues to run after a denial of the browser's prompt.
                if (geoPromptInterval) {
                    clearInterval(geoPromptInterval); // Clear existing one to reset timer
                    geoPromptInterval = setInterval(showGeoPrompt, 20000); // Restart with the correct interval
                }

            },
            { timeout: 10000, enableHighAccuracy: true }
        );
    } else {
        console.log("Geolocation is not supported by this browser.");
        showLocationNotice('Geolocation not supported. Showing weather for default location.');
        getWeather('Accra'); // Fetch live data for Accra
    }
}

// NEW: Main Geolocation Initialization and Polling Setup
function initGeolocation() {
    if (navigator.permissions && navigator.permissions.query) {
        navigator.permissions.query({ name: 'geolocation' }).then(status => {
            permissionStatus = status; // Store the status object for later use
            if (permissionStatus.state === 'granted') {
                // 1. Permission is already granted. Fetch immediately.
                clearInterval(geoPromptInterval); // Ensure no prompt is running if permission is granted
                geoPromptInterval = null;
                requestPosition();
                // 2. Polling to refresh weather is now disabled as per user request.
                // setInterval(requestPosition, 30000);
                // The notice can be distracting, so we can keep it minimal or remove it
                // showLocationNotice('Live location is active. Weather will auto-refresh.');
            } else {
                // Permission is 'prompt' or 'denied'.
                // 1. Do a one-time request (which will show the default city).
                requestPosition();

                // 2. Set up a recurring prompt to ask for permission.
                // This will repeatedly ask the user to enable location.
                clearInterval(geoPromptInterval); // Clear any old interval
                geoPromptInterval = setInterval(() => {
                    showGeoPrompt();
                }, 20000); // Ask every 20 seconds
            }

            // Listen for changes in permission status
            permissionStatus.onchange = () => {
                console.log('Geolocation permission state changed to:', permissionStatus.state);
                // If permission is granted, immediately fetch the position
                // instead of reloading the page. This provides a seamless experience.
                if (permissionStatus.state === 'granted') {
                    // Stop the recurring prompt since we now have permission.
                    clearInterval(geoPromptInterval);
                    requestPosition();
                }
            };
        });
    } else {
        // Fallback for older browsers that don't support the Permissions API.
        // This will just do a one-time request.
        requestPosition();
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
        // Wrap getWeather in an anonymous function to prevent the event object
        // from being passed as the 'cityOverride' argument.
        searchBtn.addEventListener('click', () => getWeather());
    }

    // Handle refresh button click
    if (refreshBtn) {
        refreshBtn.addEventListener('click', initGeolocation);
    }

    // Handle clicking away from the popup to close it
    if (popupModal) {
        popupModal.addEventListener('click', (e) => {
            if (e.target === popupModal) { // Only close if the overlay itself is clicked
                hidePopup();
            }
        });
    }

    // --- Geolocation Prompt Button Handlers ---
    if (closeGeoBtn) {
        closeGeoBtn.addEventListener('click', hideGeoPrompt);
    }
    if (enableGeoBtn) {
        enableGeoBtn.addEventListener('click', () => {
            if (permissionStatus && permissionStatus.state === 'denied') {
                // If permission is denied, we cannot re-prompt.
                // Instead, we instruct the user how to unblock it manually.
                hideGeoPrompt();
                // Use the validation popup to show instructions. Don't auto-hide it.
                clearTimeout(popupTimeout); // Prevent auto-hiding
                showPopup('To enable, click the lock icon in the address bar and set Location to "Allow".');
            } else {
                // If permission is 'prompt', re-triggering the request will show
                // the browser's permission dialog again.
                hideGeoPrompt();
                requestPosition();
            }
        });
    }
});