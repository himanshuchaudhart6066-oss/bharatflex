# 🚀 BharatFlex V3 - Expo Go & EAS Build Complete Guide

**Everything You Need to Deploy BharatFlex to Your Phone and Friends! 📱**

---

## 📋 Table of Contents

1. [Quick Start with Expo Go](#quick-start-with-expo-go)
2. [Step-by-Step Testing on Your Phone](#step-by-step-testing-on-your-phone)
3. [Generate APK via EAS Build](#generate-apk-via-eas-build)
4. [Share APK with Friends](#share-apk-with-friends)
5. [Deploy to Google Play & App Store](#deploy-to-google-play--app-store)
6. [Troubleshooting](#troubleshooting)

---

## 🟢 Quick Start with Expo Go

### What is Expo Go?

Expo Go is a **free app** for testing React Native apps on your phone in real-time. Perfect for development! ✨

### Step 1: Install Expo Go on Your Phone

**For Android:**
1. Open Google Play Store on your phone
2. Search for **"Expo Go"**
3. Install it
4. Keep it installed - you'll need it!

**For iPhone:**
1. Open App Store on your phone
2. Search for **"Expo Go"**
3. Install it

---

## 📱 Step-by-Step Testing on Your Phone

### Part A: Start the Development Server

On your **computer terminal**:

```bash
# Navigate to BharatFlex directory
cd c:\BharatFlex

# Start Expo development server
npm start
```

You'll see output like:
```
Starting Metro Bundler
Press 'a' for Android
Press 'i' for iOS
Press 'w' for web
Press 'r' to reload
Press 'q' to quit
```

### Part B: Connect Your Phone to the Server

**Keep the terminal open!** (This is important - it stays running)

#### Option 1: Using QR Code (EASIEST ✨)

1. Make sure your phone is on the **same WiFi network** as your computer
2. In your terminal where Metro is running, you'll see a **QR code**
3. Open **Expo Go app** on your phone
4. Tap the **"Scan QR code"** button
5. Point your phone camera at the QR code on your screen
6. The app will load within seconds!

**That's it!** 🎉 BharatFlex is now running on your phone!

#### Option 2: Using Tunnel (Works Even on Different Networks)

If QR code doesn't work (different WiFi):

1. In terminal with Metro running, press `w` then `w` again
2. Or run:
```bash
npx expo@latest start --tunnel
```

3. Then scan the new QR code with Expo Go
4. App loads anywhere - even on 4G!

---

## 📝 Testing Features on Your Phone

Once the app is running in Expo Go:

### 1. **Test Google Sign-In** ✅
- Tap **"Google से साइन इन करें"** button
- Sign in with your Google account
- Verify you see your profile

### 2. **Test Video Upload** 🎬
- Tap **➕ डालें** tab
- Enter title: "Test Video"
- Tap "Upload Video" and watch progress bar
- Verify it completes successfully

### 3. **Test WhatsApp Share** 💬
- Tap **🏠 होम** tab
- Scroll and find any video
- Tap **🔗 शेयर करें** button
- WhatsApp should open with pre-filled message
- Verify message contains video info

### 4. **Test Admin Dashboard** 👑
- Tap **👑** tab (last one)
- See **Total Installs, Videos, Watch Time, Earnings**
- Verify video list shows uploaded videos
- Tap 🗑️ on any video to test delete (will ask for confirmation)

### 5. **Test Data Saver Mode** 📊
- Tap **⚡ शॉर्ट्स** tab
- Look for "📊 डेटा बचाएं" toggle on HomeScreen
- Toggle it on/off
- Should change video quality settings

---

## 🔧 Helpful Expo Go Commands

While Metro is running, you can press:

| Key | Action |
|-----|--------|
| `a` | Build and run on Android emulator |
| `i` | Build and run on iOS simulator |
| `w` | Open in web browser |
| `r` | Reload app (when you make code changes) |
| `s` | Switch to production mode |
| `q` | Quit Metro bundler |

---

## 📦 Stop Development & Clean Up

To stop the development server:

```bash
# Press Ctrl+C in terminal
# Or just close the terminal window
```

To clear cache before rebuilding:
```bash
npm start -- --reset-cache
```

---

## 🚀 Generate APK via EAS Build

**What is EAS Build?**

EAS Build is **Expo's cloud service** that compiles your app into a **real APK** that can be:
- ✅ Installed directly on any Android phone
- ✅ Shared with friends without Expo Go
- ✅ Uploaded to Google Play Store
- ✅ Works **offline** (no Expo Go needed!)

### Step 1: Create an Expo Account

1. Go to https://expo.dev/signup
2. Sign up with email (or GitHub account)
3. Verify your email
4. **Keep this account handy!**

### Step 2: Install EAS CLI

In your terminal:

```bash
# Install EAS Command Line Tool
npm install -g eas-cli

# Verify installation
eas --version
# Should output: eas-cli/X.X.X (or similar)
```

### Step 3: Initialize EAS Project

```bash
# In your BharatFlex directory
cd c:\BharatFlex

# Initialize EAS for this project
eas init
```

**What happens:**
- You'll be asked to **sign in** with your Expo account
- Enter your credentials (same as expo.dev signup)
- EAS creates a **project ID** and updates `app.json`
- You'll see: ✅ "Project created successfully"

### Step 4: Configure app.json (If Not Done)

The app.json should already have your Project ID. To verify:

```bash
# Check if app.json has eas.projectId
# Look for: "projectId": "your-project-id-here"
```

If empty, run:
```bash
eas init --force
```

### Step 5: Build APK for Android

```bash
# Start building APK in cloud
eas build --platform android

# Choose build type:
# - "APK" ← Select this for direct phone installation
# - "App Bundle" (for Google Play Store)
```

**What happens next:**
```
Building for Android...
Build queue: Started
Build ID: xxxxxxxxxxxxxxxx
```

- EAS uploads your code to cloud
- Compiles it into an APK
- You'll get a **build ID** (save this!)
- Takes ~5-10 minutes
- Terminal shows when it's done

**Important:** Keep your terminal open! Don't close it until build completes.

---

## 📥 Download Your APK

Once the build finishes, you'll see:

```
✅ Build finished!
📥 Download APK: https://u.expo.dev/downloads/xxxxxxxx
```

### Option A: Download on Computer

1. Copy the URL from terminal
2. Open it in your browser
3. Click **"Download"**
4. APK downloads to your Downloads folder
5. File name: `bharatflex-3.0.0.apk`

### Option B: Check Build Status Online

1. Go to https://expo.dev/
2. Sign in with your Expo account
3. Click on **BharatFlex project**
4. Click **"Builds"** tab
5. Find your build in the list
6. Click **"Download"** button
7. Choose **APK** download

---

## 💬 Share APK with Friends

### Method 1: **Direct Link** (Easiest!)

```
https://u.expo.dev/downloads/xxxxxxxx
```

Send this link to friends via:
- ✅ WhatsApp
- ✅ Email
- ✅ Telegram
- ✅ Google Drive
- ✅ Social media

Friends can click and install directly!

### Method 2: **Google Drive**

1. Download APK to your computer
2. Upload to Google Drive
3. Right-click → **Shared link**
4. Copy and send to friends

### Method 3: **GitHub Releases**

```bash
# Create a GitHub repo
# Upload APK as Release
# Share release download link
```

### Installation Instructions for Friends

Send your friends this:

```
🇮🇳 BharatFlex V3 - Download Instructions

1. Download APK: [Your Link Here]
2. On Android phone, tap the APK file
3. Allow installation of "Unknown Apps" if prompted
4. Tap "Install" and wait ~30 seconds
5. Tap "Open" to launch BharatFlex
6. Google Sign-In with any Google account
7. Enjoy! 🎉

Need help? Reply to this message!
```

---

## 🔄 Update Your App & Rebuild

**Made changes to code?**

1. Save your files in VS Code
2. In terminal where Metro was running, press `r` to reload
3. App reloads in Expo Go automatically! ✨

**Ready to build new APK version?**

```bash
# Update version number in app.json
# Change: "version": "3.0.1"

# Then build again
eas build --platform android

# New APK will be generated
```

---

## 📤 Deploy to Google Play Store

**To distribute officially on Google Play:**

### Prerequisites

1. **Google Play Developer Account** ($25 one-time fee)
   - Go to: https://play.google.com/apps/publish/
   - Sign in with Google account
   - Create developer account

2. **App Signing Key**
   - Already configured in EAS ✅
   - EAS handles this automatically

### Build App Bundle (Required for Play Store)

```bash
# Build App Bundle instead of APK
eas build --platform android
# Select "App Bundle" option
```

### Upload to Play Store

1. Go to Google Play Console
2. Create new application
3. Fill in:
   - App name: "BharatFlex"
   - App category: "Social"
   - Pricing: Free
4. Upload your App Bundle
5. Add screenshots (5-8 Hindi UI screenshots)
6. Add description in Hindi and English
7. Submit for review

**Typical review time:** 2-4 hours

---

## 🍎 Deploy to Apple App Store (iOS)

### Prerequisites

1. **Apple Developer Account** ($99 per year)
   - Go to: https://developer.apple.com/
   - Enroll in Apple Developer Program

2. **Generate Certificates**
   - Use EAS to manage certificates:
   ```bash
   eas credentials
   ```

### Build for iOS

```bash
# Build iOS app
eas build --platform ios

# EAS will generate certificates automatically for you
```

### Upload to App Store

1. Go to App Store Connect
2. Create new app
3. Upload TestFlight build
4. Add metadata (description, screenshots)
5. Submit for review

**Review time:** 24-48 hours typically

---

## 🆘 Troubleshooting

### Problem 1: QR Code Not Scanning

**Solution:**
```bash
# Use tunnel instead (works anywhere)
npm start -- --tunnel

# Then scan the new QR code
```

### Problem 2: "Cannot Connect to Metro"

**Solution:**
1. Make sure phone and computer are on **same WiFi**
2. Check firewall isn't blocking port 19000, 19001, 19002
3. Turn off VPN on computer
4. Restart Metro: Press `Ctrl+C` then run `npm start` again

### Problem 3: "Google Sign-In Not Working"

**Solution:**
1. Check `.env` file has correct `REACT_APP_GOOGLE_WEB_CLIENT_ID`
2. Must be **Web Client ID**, not Android Client ID
3. Restart expo: Press `r` in terminal
4. Try signing in again

### Problem 4: "Cannot Upload Video"

**Solution:**
1. Verify `.env` has correct Mux credentials
2. Check `REACT_APP_MUX_TOKEN_ID` and `REACT_APP_MUX_API_KEY`
3. Make sure Internet is working
4. Restart app by pressing `r`

### Problem 5: "EAS Build Failed"

**Solution:**
```bash
# Check build logs
eas build:list

# See detailed error
eas build --platform android --log

# Common fixes:
# 1. Clear node_modules:
rm -rf node_modules
npm install

# 2. Update EAS CLI:
npm install -g eas-cli@latest

# 3. Try build again:
eas build --platform android
```

### Problem 6: "Firebase Connection Error"

**Solution:**
1. Verify all Firebase credentials in `.env` file
2. Check `.env` file is **NOT** empty
3. Grant **Read/Write permissions** in Firebase Console:
   - Go to Firebase → Firestore → Rules
   - Set to allow read/write for authenticated users

### Problem 7: "Admin Dashboard Shows No Videos"

**Solution:**
1. Make sure to **upload at least one video** first
2. Wait a few seconds for Firestore to sync
3. Pull down to refresh (swipe down) on admin dashboard
4. Check that user is logged in (should see profile)

---

## 📊 Verifying Everything Works

Before sharing with friends, **test all features:**

- [ ] **Splash Screen** - Saffron B logo appears for 1.5s
- [ ] **Auth** - Google Sign-In works
- [ ] **Home** - Videos load from Firestore
- [ ] **Shorts** - 2-column grid appears
- [ ] **Upload** - Can upload video (progress bar works)
- [ ] **Analytics** - Watch time and earnings show
- [ ] **Admin** - Can see videos and delete them
- [ ] **WhatsApp** - Share button opens WhatsApp with message
- [ ] **Data Saver** - Toggle works (text changes)

---

## 📱 Device Recommendations for Testing

**Minimum Requirements:**
- Android 8.0 or higher
- 50MB free space
- 2GB RAM

**Best Experience:**
- Android 12 or higher
- 100MB+ free space
- 4GB+ RAM

---

## 🎯 Next Steps

1. ✅ **Complete this guide** (you are reading it!)
2. ✅ **Test in Expo Go** on your phone (step-by-step section)
3. ✅ **Build APK via EAS** (10 minutes)
4. ✅ **Share APK link** with friends
5. 📅 **Later:** Deploy to Google Play Store

---

## 💡 Pro Tips

### Tip 1: Keep Development Terminal Open

Always keep your `npm start` terminal open while developing. Press `r` to reload when you make code changes!

### Tip 2: Use Tunnel for Mobile Hotspot Testing

If you're using phone hotspot, use tunnel mode:
```bash
npm start -- --tunnel
```

### Tip 3: Monitor APK Size

If APK becomes too large:
```bash
# Bundle size analysis
npm run build
```

### Tip 4: Beta Testing Before Full Release

- Share APK with 5-10 friends first
- Get feedback on bugs/UI
- Fix issues
- Build new APK version
- Then submit to Google Play

### Tip 5: Add Custom Icon & Splash

Replace these files with your designs:
- `assets/icon.png` (512x512)
- `assets/splash.png` (1242x2436 for iOS)
- `assets/adaptive-icon.png` (1080x1080 for Android)

Then rebuild!

---

## 🚀 Command Reference

```bash
# Development
npm start                              # Start dev server
npm start -- --tunnel                  # Start with tunnel (works anywhere)

# Testing
npm run android                        # Run on Android emulator
npm run ios                            # Run on iOS simulator

# Building
eas build --platform android           # Build APK
eas build --platform ios               # Build for iPhone
eas build --platform all               # Build both

# Deployment
eas submit --platform android          # Submit to Play Store
eas submit --platform ios              # Submit to App Store

# Credentials
eas credentials                        # Manage certificates

# Cleanup
npm start -- --reset-cache             # Clear bundler cache
rm -rf node_modules && npm install     # Fresh install
```

---

## 📞 Getting Help

### If Something Goes Wrong:

1. **Read Terminal Error** - Often tells you exactly what's wrong
2. **Check This Guide's Troubleshooting** - Solutions above
3. **Check Environment Variables** - See ENVIRONMENT_SETUP.md
4. **Check Firebase Settings** - Go to console.firebase.google.com
5. **Check Mux Settings** - Go to dashboard.mux.com

### Useful Links:

- 📚 Expo Documentation: https://docs.expo.dev/
- 🚀 EAS Build Guide: https://docs.expo.dev/build/introduction/
- 🔥 Firebase Docs: https://firebase.google.com/docs
- 🎥 Mux Docs: https://docs.mux.com/

---

## 🎉 Final Checklist

Before sharing BharatFlex with the world:

- [ ] `.env` file populated with real credentials
- [ ] App tested in Expo Go on physical phone
- [ ] Google Sign-In working
- [ ] Video upload working
- [ ] WhatsApp share working
- [ ] Admin dashboard working
- [ ] app.json has correct version number
- [ ] APK generated via EAS Build
- [ ] APK downloaded and tested on phone
- [ ] Install works on friend's phone
- [ ] All features work after installation

---

**🇮🇳 BharatFlex V3 is Ready to Launch! 🚀**

**Congratulations on building an awesome Desi Video Platform!**

Send your friends the APK link and start building your community! 💪

---

**Last Updated**: 2024
**Status**: ✅ Complete Guide for Production Deployment
**Questions?** Check ENVIRONMENT_SETUP.md, SECURITY_CHECKLIST.md, or BHARATFLEX_V2.md
