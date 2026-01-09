# PWA Icons Required

To complete the PWA setup, you need to add the following icon files to the `/images` directory:

## Required Icons

1. **icon-192.png** (192x192 pixels)
   - Used for Android home screen
   - Used as favicon
   - Should be a square icon with your app logo

2. **icon-512.png** (512x512 pixels)
   - Used for Android splash screen
   - Used for higher resolution displays
   - Should be a square icon with your app logo

## How to Create Icons

### Option 1: Use an existing image
If you have a logo or weather icon you want to use:
1. Resize it to 192x192 and 512x512 pixels
2. Save as PNG format
3. Name them `icon-192.png` and `icon-512.png`
4. Place in the `/images` directory

### Option 2: Use an online tool
1. Go to https://realfavicongenerator.net/ or https://www.pwabuilder.com/
2. Upload your logo/icon
3. Generate PWA icons
4. Download and place in `/images` directory

### Option 3: Create a simple icon
You can create a simple weather-themed icon:
- Use a weather symbol (sun, cloud, etc.)
- Use your app's color scheme (#101010 background)
- Make it recognizable at small sizes

## Temporary Workaround

Until you add proper icons, you can:
1. Copy one of your existing weather images
2. Resize it to 192x192 and 512x512
3. Rename to `icon-192.png` and `icon-512.png`

For example, you could use `sunny.svg` converted to PNG format.

## Icon Design Tips

- Keep it simple and recognizable
- Use high contrast colors
- Avoid text (it won't be readable at small sizes)
- Test on both light and dark backgrounds
- Make sure it looks good when rounded (Android masks icons)

## After Adding Icons

Once you've added the icons:
1. Test the PWA installation on mobile
2. Verify the icon appears correctly on the home screen
3. Check the splash screen on Android
4. Verify the favicon appears in browser tabs
