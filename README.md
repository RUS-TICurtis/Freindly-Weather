# Weather App 🌤️

A modern, mobile-optimized weather application built with Node.js 24.x, featuring real-time weather updates, 7-day forecasts, and PWA capabilities.

## Features

- ✅ Real-time weather data
- ✅ 7-day weather forecast
- ✅ Hourly forecast (24 hours)
- ✅ Geolocation support
- ✅ Mobile-optimized responsive design
- ✅ PWA (Progressive Web App) support
- ✅ Offline functionality with Service Worker
- ✅ Dark theme optimized for mobile devices

## Tech Stack

- **Runtime**: Node.js 24.x
- **Backend**: Express.js 5.x
- **HTTP Client**: Axios
- **Environment**: dotenv
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Icons**: Font Awesome

## Prerequisites

- Node.js >= 24.0.0 (< 25.0.0)
- npm >= 10.0.0
- OpenWeatherMap API Key

## Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Weather-App
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   API_KEY=your_openweathermap_api_key_here
   PORT=3000
   ```

4. **Run the application**
   ```bash
   npm start
   ```

   For development:
   ```bash
   npm run dev
   ```

5. **Access the app**
   
   Open your browser and navigate to `http://localhost:3000`

## Deployment

### Deploying to Vercel

1. **Install Vercel CLI** (optional)
   ```bash
   npm install -g vercel
   ```

2. **Deploy via Vercel Dashboard**
   - Push your code to GitHub
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variable: `API_KEY` with your OpenWeatherMap API key
   - Deploy!

3. **Deploy via CLI**
   ```bash
   vercel
   ```

   Set environment variables:
   ```bash
   vercel env add API_KEY
   ```

**Note**: The `vercel.json` configuration is already set up for Node.js 24.x compatibility.

### Deploying to Render

1. **Via Render Dashboard**
   - Go to [render.com](https://render.com)
   - Create a new Web Service
   - Connect your GitHub repository
   - Render will automatically detect the `render.yaml` configuration
   - Add environment variable: `API_KEY` with your OpenWeatherMap API key
   - Deploy!

2. **Via render.yaml** (Automatic)
   - The `render.yaml` file is already configured
   - Simply connect your repository to Render
   - Environment variables can be set in the Render dashboard

**Note**: The `render.yaml` specifies Node.js 24.x automatically.

## Mobile Optimization

This app is fully optimized for mobile devices with:

- **Responsive Design**: Adapts to all screen sizes
- **Touch-Friendly**: Large touch targets and intuitive gestures
- **PWA Support**: Install on home screen for app-like experience
- **Offline Mode**: Service Worker caching for offline functionality
- **Fast Loading**: Optimized assets and lazy loading
- **Mobile Viewport**: Proper viewport meta tags
- **iOS Support**: Apple-specific meta tags and icons

### Installing as PWA on Mobile

**iOS (Safari)**:
1. Open the app in Safari
2. Tap the Share button
3. Tap "Add to Home Screen"
4. Tap "Add"

**Android (Chrome)**:
1. Open the app in Chrome
2. Tap the menu (three dots)
3. Tap "Add to Home screen"
4. Tap "Add"

## Project Structure

```
Weather-App/
├── .nvmrc                 # Node version specification
├── .node-version          # Alternative Node version file
├── vercel.json           # Vercel deployment config
├── render.yaml           # Render deployment config
├── manifest.json         # PWA manifest
├── sw.js                 # Service Worker
├── package.json          # Dependencies and scripts
├── server.js             # Express server entry point
├── index.html            # Main HTML file
├── style.css             # Styles
├── script.js             # Client-side JavaScript
├── .env                  # Environment variables (not in git)
├── js/
│   ├── server/           # Server-side modules
│   └── client/           # Client-side modules (if modularized)
├── images/               # Image assets
├── fontawesome/          # Font Awesome icons
└── public/               # Static assets
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `API_KEY` | OpenWeatherMap API Key | Yes |
| `PORT` | Server port (default: 3000) | No |
| `NODE_ENV` | Environment (production/development) | No |

## API Reference

This app uses the [OpenWeatherMap API](https://openweathermap.org/api):
- Current Weather Data
- 5 Day / 3 Hour Forecast
- Geocoding API

Get your free API key at: https://openweathermap.org/api

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- **Lighthouse Score**: Optimized for 90+ scores
- **Mobile-First**: Designed with mobile performance in mind
- **Caching**: Service Worker caching for faster loads
- **Compression**: Gzip/Brotli ready

## Troubleshooting

### Node.js Version Issues

If you encounter Node.js version issues:

```bash
# Using nvm (Node Version Manager)
nvm install 24
nvm use 24

# Verify version
node --version  # Should show v24.x.x
```

### API Key Issues

If weather data isn't loading:
1. Verify your API key is correct in `.env`
2. Check that the API key is active on OpenWeatherMap
3. Ensure environment variables are set on your deployment platform

### Deployment Issues

**Vercel**:
- Ensure `vercel.json` is in the root directory
- Check that environment variables are set in Vercel dashboard
- Verify Node.js version in project settings

**Render**:
- Ensure `render.yaml` is in the root directory
- Check environment variables in Render dashboard
- Verify build and start commands

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC

## Author

Your Name

---

**Built with ❤️ for mobile-first weather tracking**