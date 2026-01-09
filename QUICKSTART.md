# Quick Start Guide - Weather App

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Set Up Environment
Create a `.env` file:
```env
API_KEY=your_openweathermap_api_key
PORT=3000
```

Get your free API key at: https://openweathermap.org/api

### Step 3: Run the App
```bash
npm start
```

Visit: http://localhost:3000

---

## 📱 Deploy to Production

### Option A: Vercel (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Add environment variable
vercel env add API_KEY
```

### Option B: Render
1. Go to https://render.com
2. Connect your GitHub repository
3. Add `API_KEY` environment variable
4. Deploy!

---

## ✅ Verification Checklist

After deployment, verify:
- [ ] App loads on desktop
- [ ] App loads on mobile
- [ ] Weather data displays correctly
- [ ] Geolocation works (requires HTTPS)
- [ ] 7-day forecast opens
- [ ] Hourly forecast scrolls
- [ ] PWA can be installed
- [ ] Service Worker registers

---

## 🔧 Node.js Version

This project requires **Node.js 24.x**

Check your version:
```bash
node --version
```

If you need to install Node.js 24:
```bash
# Using nvm
nvm install 24
nvm use 24
```

---

## 📖 Documentation

- **README.md** - Full documentation
- **DEPLOYMENT.md** - Deployment guide
- **MOBILE-COMPATIBILITY.md** - Mobile optimization details
- **ICONS-NEEDED.md** - PWA icon instructions

---

## 🆘 Quick Troubleshooting

**Weather data not loading?**
- Check your API key in `.env`
- Verify the API key is active on OpenWeatherMap

**Geolocation not working?**
- Ensure you're using HTTPS (required for geolocation)
- Check browser permissions

**Node.js version error?**
- Install Node.js 24.x
- Update npm: `npm install -g npm@latest`

---

**Need help?** Check the full README.md for detailed instructions.
