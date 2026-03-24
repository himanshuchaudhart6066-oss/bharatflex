# Environment Setup Guide for BharatFlex

This guide explains how to properly configure environment variables for the BharatFlex app.

## Overview

BharatFlex uses environment variables to securely manage API credentials and configuration. **Never hardcode sensitive credentials in your source code.**

## Quick Start

### 1. Create .env File

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

### 2. Populate with Real Credentials

Edit `.env` and replace placeholder values with your actual credentials from:

- **Firebase** (console.firebase.google.com)
- **Google OAuth** (console.cloud.google.com)
- **Mux** (dashboard.mux.com)

Example `.env` file:

```env
# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=1:123456789:android:abcdef1234567890

# Google OAuth
REACT_APP_GOOGLE_WEB_CLIENT_ID=your_web_client_id.apps.googleusercontent.com

# Mux Video
REACT_APP_MUX_TOKEN_ID=your_mux_token_id
REACT_APP_MUX_API_KEY=your_mux_api_key
```

### 3. Rebuild the App

After updating `.env`, rebuild the app for changes to take effect:

```bash
# For Android
npm run android -- --reset-cache

# For iOS
npm run ios -- --reset-cache
```

### 4. Verify Setup

The app includes built-in validation. If any required variables are missing:

- **Development**: Shows warning logs but continues
- **Production**: Should fail fast to prevent broken deployments

Check logs for warnings like:
```
⚠️ Missing environment variables: REACT_APP_FIREBASE_API_KEY, ...
📋 Please create a .env file based on .env.example and add your credentials.
```

## Where to Get Credentials

### Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project or select existing one
3. Add an Android app:
   - Package name: `com.bharatflex`
   - Download `google-services.json`
4. In Project Settings → Your Apps, copy:
   - API Key → `REACT_APP_FIREBASE_API_KEY`
   - Auth Domain → `REACT_APP_FIREBASE_AUTH_DOMAIN`
   - Project ID → `REACT_APP_FIREBASE_PROJECT_ID`
   - Storage Bucket → `REACT_APP_FIREBASE_STORAGE_BUCKET`
   - Messaging Sender ID → `REACT_APP_FIREBASE_MESSAGING_SENDER_ID`
   - App ID → `REACT_APP_FIREBASE_APP_ID`

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Enable Google+ API
3. Go to Credentials → Create OAuth 2.0 Client ID
4. Select "Web application"
5. Copy the Client ID → `REACT_APP_GOOGLE_WEB_CLIENT_ID`

**Important**: The Client ID must be for "Web application" type, not Android/iOS

### Mux Setup

1. Go to [Mux Dashboard](https://dashboard.mux.com)
2. Settings → Access Tokens
3. Create new token (or use existing)
4. Copy:
   - Token ID → `REACT_APP_MUX_TOKEN_ID`
   - Secret Key → `REACT_APP_MUX_API_KEY`

## Security Best Practices

### ✅ DO

- ✅ Store `.env` securely on your machine (never commit to git)
- ✅ Use `.gitignore` to exclude `.env` from version control
- ✅ Rotate API keys periodically
- ✅ Use different credentials for dev/staging/production
- ✅ Create separate Firebase projects for prod vs. dev

### ❌ DON'T

- ❌ Hardcode credentials in source files (even as comments)
- ❌ Commit `.env` to git or share publicly
- ❌ Share credentials in Slack, email, or chat
- ❌ Use production credentials in development
- ❌ Publish app keys to public GitHub repos

## Environment Configuration Helper

BharatFlex includes a helper module (`src/config/env.ts`) for managing environment variables:

```typescript
import {
  validateEnvironmentVariables,
  getEnvVar,
  isDevelopment,
  isProduction,
} from '@/config/env';

// Validate all required variables are set
if (!validateEnvironmentVariables()) {
  console.error('Missing critical env vars!');
}

// Get a specific variable
const apiUrl = getEnvVar('REACT_APP_API_URL', 'https://api.default.com');

// Check environment
if (isDevelopment()) {
  console.log('Running in development mode');
}
```

## Troubleshooting

### "Cannot find module" or undefined credentials

**Issue**: App crashes because `process.env.REACT_APP_*` is undefined

**Solutions**:
1. Verify `.env` file exists in project root: `c:\BharatFlex\.env`
2. Verify all values are filled in (no empty variables)
3. Restart Metro bundler: `npm start -- --reset-cache`
4. Clear build cache: `rm -rf node_modules/.cache`

### Firebase authentication fails

**Issue**: Google Sign-In or Firebase calls fail

**Solutions**:
1. Verify `REACT_APP_FIREBASE_API_KEY` is correct (from Firebase Console)
2. Verify `REACT_APP_GOOGLE_WEB_CLIENT_ID` is **Web Client ID**, not Android Client ID
3. Check Firebase Security Rules allow development testing
4. Confirm Firebase Android app is registered with correct package name

### Mux upload fails

**Issue**: Video upload endpoint returns 401 Unauthorized

**Solutions**:
1. Verify `REACT_APP_MUX_TOKEN_ID` and `REACT_APP_MUX_API_KEY` match
2. Hard refresh cache: `npm start -- --reset-cache`
3. Check Mux dashboard for API key validity
4. Confirm token has "Video" API permissions enabled

## Advanced Configuration

### Multiple Environments

Create environment-specific files:

```
.env.local          (development, local machine)
.env.staging        (staging server)
.env.production     (production server)
```

Load the appropriate file based on deployment:

```bash
# Development
npm run dev

# Staging
REACT_APP_ENV=staging npm run staging

# Production
REACT_APP_ENV=production npm run build
```

### CI/CD Integration

For GitHub Actions or similar:

```yaml
env:
  REACT_APP_FIREBASE_API_KEY: ${{ secrets.FIREBASE_API_KEY }}
  REACT_APP_FIREBASE_PROJECT_ID: ${{ secrets.FIREBASE_PROJECT_ID }}
  REACT_APP_GOOGLE_WEB_CLIENT_ID: ${{ secrets.GOOGLE_WEB_CLIENT_ID }}
  REACT_APP_MUX_TOKEN_ID: ${{ secrets.MUX_TOKEN_ID }}
  REACT_APP_MUX_API_KEY: ${{ secrets.MUX_API_KEY }}
```

Store secrets in your CI/CD platform's secret manager, never in code.

## Documentation

- 📄 [QUICKSTART.md](./QUICKSTART.md) - Full installation guide
- 📄 [BHARATFLEX_V2.md](./BHARATFLEX_V2.md) - Feature documentation
- 📄 [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) - Technical architecture
- 📄 [.env.example](./.env.example) - Environment variable template

## Questions?

For Firebase issues: https://firebase.google.com/docs/auth/get-started
For Google OAuth: https://developers.google.com/identity/protocols/oauth2
For Mux video: https://docs.mux.com/guides/video/upload-files

---

**Last Updated**: 2024
**Status**: ✅ All credentials using environment variables
