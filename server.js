// Import necessary modules
const express = require('express');
const axios = require('axios');
require('dotenv').config(); // Loads environment variables from .env file
const path = require('path');

const app = express();
const PORT = 3015;

// --- CONFIGURATION ---
// IMPORTANT: On Render/Vercel, the API key is loaded from the Environment Variables set in the dashboard.
const API_KEY = process.env.WEATHER_API_KEY;
const WEATHER_API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Middleware to serve static files from the ROOT directory
// This allows index.html, style.css, and script.js (and images/) to be loaded
// when they are in the same folder as server.js.
app.use(express.static(path.join(__dirname)));

// --- API Route to Fetch Weather Data by City Name ---
// Endpoint: /weather?city=<CITY_NAME>
app.get('/weather', async (req, res) => {
    // 1. Check for API Key
    if (!API_KEY) {
        console.error("DEBUG: ERROR: WEATHER_API_KEY is missing.");
        return res.status(500).json({ error: "Server configuration error: API Key is missing. Check Render/Vercel Environment Variables." });
    }

    const city = req.query.city;
    if (!city) {
        return res.status(400).json({ error: "Missing city query parameter." });
    }

    console.log(`DEBUG: Server received request for city: ${city}`);
    
    try {
        // Construct the full API request URL
        const apiUrl = `${WEATHER_API_BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`;
        const response = await axios.get(apiUrl);
        
        console.log("DEBUG: Successfully received data from OpenWeatherMap.");

        // Send the API response back to the client (browser)
        res.json(response.data);

    } catch (error) {
        // Handle API errors
        if (error.response) {
            console.error(`DEBUG: ERROR 4xx/5xx from API. Status: ${error.response.status}`);
            if (error.response.status === 401) {
                return res.status(401).json({ error: "Invalid API Key." });
            }
            if (error.response.status === 404) {
                return res.status(404).json({ error: "City not found." });
            }
        } else {
            console.error(`DEBUG: Network or unexpected error: ${error.message}`);
        }
        
        res.status(500).json({ error: "Failed to retrieve data from external weather service." });
    }
});

// --- NEW API Route to Fetch Weather Data by Coordinates (Latitude/Longitude) ---
// Endpoint: /weather-coords?lat=<LAT>&lon=<LON>
app.get('/weather-coords', async (req, res) => {
    // 1. Check for API Key
    if (!API_KEY) {
        console.error("DEBUG: ERROR: WEATHER_API_KEY is missing.");
        return res.status(500).json({ error: "Server configuration error: API Key is missing. Check Render/Vercel Environment Variables." });
    }

    const { lat, lon } = req.query;
    if (!lat || !lon) {
        return res.status(400).json({ error: "Missing latitude or longitude query parameter." });
    }

    console.log(`DEBUG: Server received request for coordinates: Lat=${lat}, Lon=${lon}`);
    
    try {
        // Construct the full API request URL using lat and lon parameters
        const apiUrl = `${WEATHER_API_BASE_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
        const response = await axios.get(apiUrl);
        
        console.log("DEBUG: Successfully received data from OpenWeatherMap using coordinates.");

        // Send the API response back to the client (browser)
        res.json(response.data);

    } catch (error) {
        // Handle API errors
        if (error.response) {
            console.error(`DEBUG: ERROR 4xx/5xx from API. Status: ${error.response.status}`);
            if (error.response.status === 401) {
                return res.status(401).json({ error: "Invalid API Key." });
            }
            // The API doesn't return 404 for invalid coordinates, but we keep this for consistency
            if (error.response.status === 404) {
                return res.status(404).json({ error: "Location data not found for the given coordinates." });
            }
        } else {
            console.error(`DEBUG: Network or unexpected error: ${error.message}`);
        }
        
        res.status(500).json({ error: "Failed to retrieve coordinate data from external weather service." });
    }
});

// --- Start the Server ---
app.listen(PORT, () => {
    console.log(`\n--- SERVER STARTUP ---`);
    console.log(`Server is running at http://localhost:${PORT}`);
    
    if (!API_KEY) {
        console.log("!!! WARNING: API Key is missing. The app will fail to fetch weather data until the key is set on the hosting platform (Render/Vercel).");
    }
    console.log(`----------------------\n`);
});