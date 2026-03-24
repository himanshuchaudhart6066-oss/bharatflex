# 🔒 Security Checklist - BharatFlex

This checklist ensures your BharatFlex app is properly secured before deployment.

## ✅ Completed Tasks

### Environment Variable Security
- [x] Created `.env` file (not committed to git)
- [x] Created `.env.example` as template with documentation
- [x] Updated `.gitignore` to exclude all `.env*` files
- [x] Removed hardcoded credentials from source:
  - ✅ `src/config/firebase.ts` - Uses `process.env.REACT_APP_FIREBASE_*`
  - ✅ `src/config/googleSignIn.ts` - Uses `process.env.REACT_APP_GOOGLE_WEB_CLIENT_ID`
  - ✅ `src/utils/muxVideo.ts` - Uses `process.env.REACT_APP_MUX_TOKEN_ID` and `process.env.REACT_APP_MUX_API_KEY`
- [x] Created `src/config/env.ts` - Helper module for environment variable management
- [x] Added validation to `App.tsx` - Checks all required env vars on startup
- [x] Created `ENVIRONMENT_SETUP.md` - Comprehensive setup guide

## 🔄 In Progress - User Action Required

### 1. Populate `.env` File
**Status**: ⏳ Awaiting user action

Your credentials are currently in placeholder form. Fill them in now:

```bash
# 1. Navigate to project root
cd c:\BharatFlex

# 2. Open .env file
# Windows:
notepad .env
# Mac/Linux:
nano .env

# 3. Replace these values with your ACTUAL credentials:
```

**Firebase Setup** (from https://console.firebase.google.com):
- [ ] `REACT_APP_FIREBASE_API_KEY`
- [ ] `REACT_APP_FIREBASE_AUTH_DOMAIN`
- [ ] `REACT_APP_FIREBASE_PROJECT_ID`
- [ ] `REACT_APP_FIREBASE_STORAGE_BUCKET`
- [ ] `REACT_APP_FIREBASE_MESSAGING_SENDER_ID`
- [ ] `REACT_APP_FIREBASE_APP_ID`

**Google OAuth** (from https://console.cloud.google.com):
- [ ] `REACT_APP_GOOGLE_WEB_CLIENT_ID` (must be **Web** client ID, not Android/iOS)

**Mux Video** (from https://dashboard.mux.com):
- [ ] `REACT_APP_MUX_TOKEN_ID`
- [ ] `REACT_APP_MUX_API_KEY`

### 2. Rebuild the App
**Status**: ⏳ Awaiting step 1 completion

After populating `.env`, rebuild to load new environment variables:

```bash
# Windows / All platforms
npm start -- --reset-cache

# In a separate terminal:
npm run android      # For Android device/emulator
# OR
npm run ios          # For iOS simulator/device
```

### 3. Test API Integrations
**Status**: ⏳ Post-rebuild verification

Once app rebuilds, verify these work:

- [ ] App starts without env var warnings
- [ ] AuthScreen loads
- [ ] "Google से साइन इन करें" button responds
- [ ] Google Sign-In flow completes
- [ ] User profile syncs to Firestore
- [ ] HomeScreen fetches videos
- [ ] Upload button responds
- [ ] Video progress bar animates

## ⏳ Pending Tasks - After App is Working

### 4. Firebase Security Rules
**Status**: 📋 Todo

Set production-safe Firestore rules in [Firebase Console](https://console.firebase.google.com):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    match /videos/{videoId} {
      allow read: if true;  // Anyone can view videos
      allow create: if request.auth != null;  // Only authenticated users can upload
      allow update, delete: if request.auth.uid == resource.data.userId;  // Only creator can edit
    }
    match /analytics/{userId} {
      allow read: if request.auth.uid == userId;
      allow write: if request.auth.uid == userId;
    }
  }
}
```

### 5. Create App Icons
**Status**: 📋 Todo

Create Saffron/Navy B logo in multiple sizes:

```
android/app/src/main/res/
├── mipmap-mdpi/ic_launcher.png (48x48)
├── mipmap-hdpi/ic_launcher.png (72x72)
├── mipmap-xhdpi/ic_launcher.png (96x96)
├── mipmap-xxhdpi/ic_launcher.png (144x144)
└── mipmap-xxxhdpi/ic_launcher.png (192x192)

ios/BharatFlex/Images.xcassets/AppIcon.appiconset/
└── [Multiple icon sizes from 20x20 to 1024x1024]
```

**Tools**: 
- https://appicon.co/ (auto-generate multiple sizes)
- https://www.favicon-generator.org/
- Adobe XD, Figma, or design software

### 6. Generate Signing Keys
**Status**: 📋 Todo

**For Android** (required for Google Play):

```bash
keytool -genkey -v -keystore c:\BharatFlex\android\app\bharatflex-key.jks \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias bharatflex-key \
  -storepass YOUR_KEYSTORE_PASSWORD \
  -keypass YOUR_KEY_PASSWORD \
  -dname "CN=Roasting Baba, O=BharatFlex, L=India, C=IN"
```

> ⚠️ **IMPORTANT**: Back up your keystore file and passwords securely!

**For iOS** (required for App Store):
- Use Xcode: Preferences → Accounts → Manage Certificates
- Request certificates from Apple Developer Program
- Store in keychain securely

### 7. Update App Metadata
**Status**: 📋 Todo

Update [app.json](./app.json):

```json
{
  "name": "BharatFlex",
  "displayName": "BharatFlex",
  "version": "1.0.0",
  "description": "Desi Video Platform with True Indian Soul 🇮🇳",
  "privacy": {
    "url": "https://bharatflex.com/privacy"
  },
  "terms": {
    "url": "https://bharatflex.com/terms"
  }
}
```

### 8. Prepare for Distribution
**Status**: 📋 Todo preparation

- [ ] Create Google Play Developer Account
- [ ] Create Apple Developer Account  
- [ ] Write compelling app description
- [ ] Create 5-8 screenshots of Hindi UI
- [ ] Write privacy policy
- [ ] Write terms of service
- [ ] Set up app website/landing page

## 🔐 Security Best Practices

### Code Review Before Commit

Before committing ANY code:
```bash
# Check no credentials are being committed
git diff --cached | grep -E "REACT_APP_|api[_-]key|secret|password|token"

# Should return NOTHING if secure

# Check .gitignore is working
git check-ignore .env .env.local .env.production .gitignore -v
```

### Secret Rotation Schedule

- [ ] Firebase API keys every 3 months
- [ ] Mux API tokens every 6 months
- [ ] Google OAuth credentials after any security incident

### Never Ever

❌ **DO NOT**:
- Hardcode credentials in source files (even as fallbacks)
- Commit `.env` to git repository
- Share credentials in email, chat, or documentation
- Use production credentials in development
- Expose credentials in error messages or logs
- Push to public GitHub without .gitignore configured

### Monitoring & Alerts

After deployment:
- [ ] Enable Firebase Console security alerts
- [ ] Monitor Mux API usage for unusual activity
- [ ] Set up Google Cloud alerts for excessive API calls
- [ ] Review Firebase security rules quarterly
- [ ] Monitor app crash reports (Firebase Crashlytics)

## 📚 Documentation References

- **ENVIRONMENT_SETUP.md** - How to configure environment variables
- **BHARATFLEX_V2.md** - Feature documentation
- **QUICKSTART.md** - Installation & deployment
- **IMPLEMENTATION_SUMMARY.md** - Technical architecture

## 🚀 Quick Start Summary

```bash
# 1. Fill in .env file with credentials
# 2. Rebuild app to load environment variables
npm start -- --reset-cache && npm run android

# 3. Test authentication and APIs work
# 4. Once verified, follow "Pending Tasks" above
```

## ⚠️ Common Issues

| Issue | Solution |
|-------|----------|
| "Cannot find env var" | Restart Metro: `npm start -- --reset-cache` |
| "Firebase credentials fail" | Verify all 6 Firebase values are v filled in .env |
| "Google Sign-In fails" | Ensure Web Client ID (not Android/iOS Client ID) |
| "Mux upload 401 error" | Check Token ID and API Key match exactly |
| ".env being committed" | Run `git rm --cached .env` and commit |

## Status Dashboard

```
Security Hardening:  ████████░░ 80% Complete
  ✅ Code security (no hardcoded credentials)
  ✅ Environment variables configured
  ✅ Git safety (.gitignore updated)
  🔄 User credential population (in progress)
  ⏳ App rebuild (waiting for .env)
  ⏳ API integration testing (post-rebuild)
  ⏳ Firebase rules (todo)
  ⏳ Production assets (todo)
```

---

**Last Updated**: 2024
**Next Step**: 👉 Fill in .env file with your actual API credentials, then rebuild the app
