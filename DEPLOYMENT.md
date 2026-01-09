# Deployment Quick Reference

## Node.js Version
This project requires **Node.js 24.x**

## Quick Deploy Commands

### Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Set environment variable
vercel env add API_KEY
# Then paste your OpenWeatherMap API key
```

### Render
1. Connect your GitHub repo to Render
2. Render will auto-detect `render.yaml`
3. Add `API_KEY` environment variable in dashboard
4. Deploy automatically

## Environment Variables Required
- `API_KEY`: Your OpenWeatherMap API key

## Files for Deployment
- ✅ `.nvmrc` - Node version for nvm
- ✅ `.node-version` - Node version for other tools
- ✅ `vercel.json` - Vercel configuration
- ✅ `render.yaml` - Render configuration
- ✅ `package.json` - Updated with engines field
- ✅ `manifest.json` - PWA manifest
- ✅ `sw.js` - Service Worker

## Mobile Compatibility
- ✅ Responsive viewport settings
- ✅ PWA manifest for installability
- ✅ Service Worker for offline support
- ✅ Touch-optimized UI
- ✅ iOS-specific meta tags
- ✅ Mobile theme colors

## Testing Locally
```bash
# Install dependencies
npm install

# Run server
npm start

# Access at http://localhost:3000
```

## Post-Deployment Checklist
- [ ] Verify API_KEY is set in platform dashboard
- [ ] Test on mobile device
- [ ] Test PWA installation
- [ ] Check service worker registration
- [ ] Verify all assets load correctly
- [ ] Test geolocation feature
