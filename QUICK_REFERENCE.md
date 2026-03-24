# ⚡ BharatFlex V3 - Quick Command Reference

**One-page guide for all commands you need! 📝**

---

## 🚀 DEPLOY TODAY - 3 Simple Commands

### Step 1: Start the App on Your Phone
```bash
cd c:\BharatFlex
npm start
```

Then in Expo Go app:
- Scan the **QR code** that appears
- App loads on your phone! ✨

**Test all features:** Google Login ✅ | Upload Video ✅ | WhatsApp Share ✅ | Admin Dashboard ✅

---

### Step 2: Create Expo Account (1 time only)
```bash
npm install -g eas-cli
eas init
```

Sign in with your Google account. Done! ✅

---

### Step 3: Generate APK & Share with Friends
```bash
eas build --platform android
# Choose: APK
# Wait 5-10 minutes for build to complete
```

You get a **download link** to share! 📎

---

## 📱 Day-to-Day Commands

| What You Want | Command |
|---|---|
| Start dev server | `npm start` |
| Reload app (after code changes) | Press `r` in terminal |
| Stop development | `Ctrl+C` in terminal |
| Clear cache (if app breaks) | `npm start -- --reset-cache` |
| Run on Android emulator | `npm run android` |
| Run on iOS simulator | `npm run ios` |

---

## 🎯 Building & Deployment

| Goal | Command | Time | Result |
|---|---|---|---|
| **Test on phone** | `npm start` then scan QR | Instant | Real-time testing |
| **Build APK** | `eas build --platform android` | 5-10 min | Download APK to share |
| **Deploy to Play Store** | `eas submit --platform android` | 2-4 hrs | Official app store |
| **Deploy to App Store** | `eas build --platform ios` + submit | 24-48 hrs | iPhone availability |

---

## 🔑 Environment Variables (.env)

**Required before app works:**

```env
# Firebase (from console.firebase.google.com)
REACT_APP_FIREBASE_API_KEY=YOUR_KEY
REACT_APP_FIREBASE_AUTH_DOMAIN=YOUR_DOMAIN
REACT_APP_FIREBASE_PROJECT_ID=YOUR_ID
REACT_APP_FIREBASE_STORAGE_BUCKET=YOUR_BUCKET
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=YOUR_ID
REACT_APP_FIREBASE_APP_ID=YOUR_ID

# Google OAuth (from console.cloud.google.com)
REACT_APP_GOOGLE_WEB_CLIENT_ID=YOUR_CLIENT_ID.apps.googleusercontent.com

# Mux (from dashboard.mux.com)
REACT_APP_MUX_TOKEN_ID=YOUR_TOKEN
REACT_APP_MUX_API_KEY=YOUR_KEY
```

**❌ DON'T:** Commit .env to git (already in .gitignore)

---

## 📂 Project Structure

```
c:\BharatFlex/
├── App.tsx                    ← Main app navigation
├── app.json                   ← Expo configuration
├── .env                       ← Your credentials (NOT in git)
├── .env.example               ← Template
├── package.json               ← Dependencies
├── src/
│   ├── screens/
│   │   ├── AuthScreen.tsx     ← Google Sign-In
│   │   ├── HomeScreen.tsx     ← Video feed
│   │   ├── UploadScreen.tsx   ← Mux video upload
│   │   ├── AdminScreen.tsx    ← NEW: Admin dashboard
│   │   ├── ShortsScreen.tsx   ← 2-column grid
│   │   ├── AnalyticsScreen.tsx← Watch time & earnings
│   │   ├── YouScreen.tsx      ← User profile
│   │   └── VideoPlayerScreen.tsx ← Video playback + WhatsApp share
│   ├── components/
│   │   ├── SplashScreen.tsx   ← Splash animation
│   │   └── AshokaChakraLoader.tsx ← Loading spinner
│   ├── config/
│   │   ├── firebase.ts        ← Firebase + Analytics
│   │   ├── googleSignIn.ts    ← Google OAuth
│   │   ├── env.ts             ← Environment validation
│   │   └── theme.ts           ← Colors, fonts, Hindi labels
│   └── utils/
│       ├── muxVideo.ts        ← Mux upload, streaming
│       └── whatsappShare.ts   ← WhatsApp integration
└── assets/
    ├── icon.png               ← App icon (512x512) - NEED TO ADD
    ├── splash.png             ← Splash screen - NEED TO ADD
    └── adaptive-icon.png      ← Android icon - NEED TO ADD
```

---

## ✨ Features Included in V3

| Feature | Status | File |
|---|---|---|
| 🔐 Google Sign-In | ✅ Complete | AuthScreen.tsx |
| 🎬 Video Upload (Mux) | ✅ Complete | UploadScreen.tsx |
| 💬 WhatsApp Share | ✅ Complete | VideoPlayerScreen.tsx |
| 📊 Admin Dashboard | ✅ **NEW!** | AdminScreen.tsx |
| 📧 Firebase Analytics | ✅ **NEW!** | firebase.ts |
| 🎯 Total Installs Tracking | ✅ **NEW!** | AdminScreen.tsx |
| 📹 Video List + Delete | ✅ **NEW!** | AdminScreen.tsx |
| 💰 Watch Time & Earnings | ✅ **NEW!** | AdminScreen.tsx |
| 🌍 Hindi Localization | ✅ Complete | theme.ts |
| 📱 Data Saver Mode | ✅ Complete | HomeScreen.tsx |
| ✨ Ashoka Chakra Loading | ✅ Complete | AshokaChakraLoader.tsx |
| 🎨 Saffron/Navy Theme | ✅ Complete | theme.ts |

---

## 🔐 Admin Dashboard Features

**Access via:** Tap **👑** tab

- 📱 **Total Installs** - Count of all users
- 🎥 **Total Videos** - Number uploaded
- ⏱️ **Total Watch Time** - Hours watched (calculated)
- 💰 **Total Earnings** - Revenue estimate
- 📹 **Video List** - All uploaded videos
- 🗑️ **Delete** - Remove any video
- 🔄 **Refresh** - Swipe down to update

---

## 🧪 Testing Checklist

Before sharing with friends, test these in Expo Go:

```
☐ Splash screen (1.5s Saffron B)
☐ Google Sign-In button
☐ User profile syncs
☐ HomeScreen shows videos
☐ Shorts tab (2-column grid)
☐ Upload video (progress works)
☐ Video playback works
☐ WhatsApp share button
☐ Analytics shows data
☐ Admin dashboard loads
☐ Can delete videos
☐ Data Saver toggle works
```

---

## 🐛 If Something Breaks

```bash
# 1. Reload app (while Metro is running)
Press 'r' in terminal

# 2. Still broken? Clear cache and restart
npm start -- --reset-cache

# 3. Check .env file is filled correctly
cat .env

# 4. Check logs for errors
# Look at terminal output and Expo Go app for red error messages

# 5. Last resort: Clean reinstall
npm install  # Reinstall all packages
npm start    # Start again
```

---

## 🎉 Deployment Workflow

### **For Quick Testing** (Today!)
```bash
cd c:\BharatFlex
npm start
# Scan QR code in Expo Go
# Share feedback with team
```

### **For Friends** (5-10 minutes)
```bash
eas build --platform android
# Download APK link
# Share link via WhatsApp/Email
# Friends tap link to install
```

### **For Google Play Store** (Tomorrow)
```bash
eas build --platform android --app-bundle  # Build App Bundle
# Go to https://play.google.com/apps/publish
# Upload bundle
# Add description, screenshots
# Submit for review
```

---

## 📚 Documentation Files

| File | Purpose |
|---|---|
| **EXPO_EAS_BUILD_GUIDE.md** | Complete deployment instructions |
| **ENVIRONMENT_SETUP.md** | How to configure .env file |
| **SECURITY_CHECKLIST.md** | Security best practices |
| **BHARATFLEX_V2.md** | Feature documentation |
| **IMPLEMENTATION_SUMMARY.md** | Technical architecture |
| **QUICKSTART.md** | Installation guide |

---

## 🎨 Before Generating APK (Optional)

Replace these image files with your designs:

```bash
# 1. App Icon (512x512 PNG)
# Place in: assets/icon.png
# Recommendation: Saffron background with 'B' logo

# 2. Splash Screen (1242x2436 PNG for iOS, 1080x1920 for Android)
# Place in: assets/splash.png
# Current: Auto-generated Saffron background

# 3. Adaptive Icon (1080x1080 PNG for Android)
# Place in: assets/adaptive-icon.png
# Should match your icon design

# Then rebuild:
eas build --platform android
```

---

## 🌐 Important URLs

```
Firebase:     https://console.firebase.google.com
Google Cloud: https://console.cloud.google.com
Mux:          https://dashboard.mux.com
Expo:         https://expo.dev
Play Store:   https://play.google.com/apps/publish
App Store:    https://appstoreconnect.apple.com
```

---

## 💾 Backup Your Project

```bash
# Create backup before major changes
zip -r BharatFlex_backup_v3.zip c:\BharatFlex

# Store in cloud or external drive
# Safety first! 🛡️
```

---

## 📞 Common Issues & Quick Fixes

| Issue | Fix |
|---|---|
| "QR code not scanning" | Use `npm start -- --tunnel` |
| "Google Sign-In fails" | Check REACT_APP_GOOGLE_WEB_CLIENT_ID in .env |
| "Video upload fails" | Check REACT_APP_MUX_TOKEN_ID and REACT_APP_MUX_API_KEY |
| "Admin dashboard blank" | Upload at least one video first |
| "Firebase connection error" | Verify all 6 REACT_APP_FIREBASE_* vars in .env |
| "App crashes on startup" | Check .env is not empty |
| "Build fails on EAS" | Run `eas build --platform android --log` for details |

---

## ✅ FINAL CHECKLIST - Ready to Deploy?

- [ ] `.env` file filled with Firebase, Google, Mux credentials
- [ ] Tested in Expo Go on your phone
- [ ] All features working (Google Login, Upload, WhatsApp, Admin)
- [ ] `eas init` completed (logged into Expo)
- [ ] Created Expo account at https://expo.dev
- [ ] `eas-cli` installed globally
- [ ] Ready to run: `eas build --platform android`

---

## 🚀 DO IT NOW!

**Right now, typing into terminal:**

```bash
cd c:\BharatFlex
npm start
```

**Then scan the QR code in Expo Go app**

**Done! ✨ BharatFlex is running on your phone!**

For full instructions, see: **EXPO_EAS_BUILD_GUIDE.md**

---

**Happy Building! 🇮🇳 Desi Swag! 🎬**

*Last Updated: 2024*
*Version: 3.0.0*
