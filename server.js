// Import necessary modules
require('dotenv').config(); // Loads environment variables from .env file
const createApp = require('./src/server/app');
const config = require('./src/server/config');

// Create and configure the Express app
const app = createApp();

// --- Start the Server ---
// --- Start the Server ---
if (require.main === module) {
    app.listen(config.PORT, () => {
        console.log(`\n--- SERVER STARTUP ---`);
        console.log(`Server is running at http://localhost:${config.PORT}`);

        if (!config.API_KEY) {
            console.log("!!! WARNING: API Key is missing. The app will fail to fetch weather data until the key is set on the hosting platform (Render/Vercel).");
        }
        console.log(`----------------------\n`);
    });
}

// Export the app for Vercel (serverless function support)
module.exports = app;