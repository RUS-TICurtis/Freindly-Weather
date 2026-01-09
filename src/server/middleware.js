const express = require('express');
const path = require('path');

// Middleware to serve static files from the ROOT directory
// This allows index.html, style.css, and script.js (and images/) to be loaded
// when they are in the same folder as server.js.
function setupStaticFiles(app) {
    // Serve static files from the 'public' directory
    app.use(express.static(path.join(__dirname, '../../public')));
}

module.exports = {
    setupStaticFiles
};
