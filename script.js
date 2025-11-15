
async function getWeather() {
    // Get city input value
    const city = document.getElementById('cityInput').value;
    
    const weatherDiv = document.querySelector('.weather');
    const errorDiv = document.getElementById('error');
    const weatherIconEl = document.getElementById('weatherIcon');
    const cityEl = document.getElementById('cityName');
    const tempEl = document.getElementById('temp');
    const humidityEl = document.getElementById('humidity');
    const windEl = document.getElementById('wind');
    const weatherDescEl = document.getElementById('weatherDesc');

    if (!city) {
        errorDiv.textContent = 'Please enter a city name.';
        errorDiv.classList.remove('hidden');
        weatherDiv.classList.add('hidden');
        return;
    }

    weatherDiv.classList.add('hidden');
    errorDiv.classList.add('hidden');

    try {
        const response = await fetch(`/weather?city=${city}`);
        
        if (!response.ok) {
            const errorData = await response.json();
            
            if (response.status === 404) {
                 throw new Error('City not found');
            }
            throw new Error(errorData.error || `Server responded with status: ${response.status}`);
        }
        const data = await response.json();

        // --- Data Extraction and Validation ---
        
        // Ensure required fields exist before accessing them to avoid crashing
        if (!data.main || !data.wind || !data.weather || data.weather.length === 0) {
             throw new Error('Incomplete weather data received.');
        }


        // 1. Update ONLINE Weather Icon (using OpenWeatherMap CDN as requested)
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
        weatherIconEl.src = iconUrl;
        
        // Use the description for the alt text only
        weatherIconEl.alt = data.weather[0].description; 
        
        // NEW: Update Text Description
        weatherDescEl.innerText = data.weather[0].description;


        // 2. Update Weather Data
        cityEl.innerText = data.name;
        // Use Math.round for clean, whole number degrees
        tempEl.innerText = Math.round(data.main.temp) + '°';
        humidityEl.innerText = data.main.humidity + '%';
        
        // Wind speed conversion for display
        // Use a defensive check to ensure wind speed is present
        const windSpeed = data.wind.speed !== undefined ? data.wind.speed : 0;
        const windSpeedKmH = Math.round(windSpeed * 3.6);
        windEl.innerText = windSpeedKmH + ' Km/h'; 

        // CRITICAL: Show Result on success
        weatherDiv.classList.remove('hidden');

    } catch (err) {
        console.error("Weather fetching error (client-side):", err);
        // Show user-friendly error message
        errorDiv.textContent = err.message.includes('City not found') ? 
            'Invalid city name. Please check and try again.' : 
            'Could not retrieve weather data. Please ensure your API key is active.';
        errorDiv.classList.remove('hidden');
        weatherDiv.classList.add('hidden');
    }
}

// Event listener for "Enter" key press on input field
document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById('cityInput');
    const searchBtn = document.getElementById('searchBtn');

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