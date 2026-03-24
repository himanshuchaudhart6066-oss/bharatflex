# BharatFlex: GitHub Upload & APK Release Guide

## Step 1: Push Code to GitHub

Run these exact commands in your PowerShell terminal from the `C:\BharatFlex` directory:

```powershell
cd C:\BharatFlex

# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial BharatFlex V3 commit - Admin Dashboard, Firebase, Google Login"

# Rename branch to main
git branch -M main

# Add your GitHub repository as remote
git remote add origin https://github.com/himanshuchaudhart6066-oss/bharatflex.git

# Push to GitHub
git push -u origin main
```

**Before running the push command**, you need to:
1. Create a new repository on GitHub: https://github.com/new
   - Repository name: `bharatflex` (lowercase)
   - Description: "BharatFlex - Video streaming app with admin dashboard"
   - Visibility: Public (if you want to share)
   - DO NOT initialize with README/gitignore (you already have them)

2. Generate a GitHub Personal Access Token:
   - Go to: https://github.com/settings/tokens
   - Click "Generate new token (classic)"
   - Scopes: Select `repo` (full control)
   - Copy the token (you'll use it as password)

3. When `git push` asks for credentials:
   - Username: `himanshuchaudhart6066-oss`
   - Password: Paste your Personal Access Token

---

## Step 2: Generate Release APK

You have **two options** for building the APK:

### **Option A: EAS Build (Cloud - Recommended for Testing)**
This uses Expo's servers to build. We've had Windows permission issues, but let's try once more:

```powershell
$env:EAS_NO_VCS=1; npx eas-cli build --platform android --profile preview --wait
```

**If Windows locks occur again:** Use WSL2 instead
```bash
wsl
cd /mnt/c/BharatFlex
npx eas-cli build --platform android --wait
```

### **Option B: Local Gradle Build (Requires Android SDK)**
If you have Android SDK installed:

```powershell
cd android
./gradlew assembleRelease
```

The APK will be at: `android/app/build/outputs/apk/release/app-release.apk`

**Recommended: Use Option A (EAS Build)** - It handles signing and optimization automatically.

---

## Step 3: Download APK & Upload to GitHub Releases

### **After EAS Build Completes:**

1. **Download from EAS Dashboard:**
   - Visit: https://expo.dev/accounts/@himanshuchaudhart6066-oss/projects/bharatflex
   - Find your latest build
   - Click "Download" → Save `app-release.apk`

2. **Create GitHub Release:**
   - Go to: https://github.com/himanshuchaudhart6066-oss/bharatflex
   - Click **"Releases"** tab (right side)
   - Click **"Create a new release"**
   - Fill in:
     - Tag version: `v1.0.0` (or `v3.0.0`)
     - Release title: `BharatFlex v1.0.0 - Release for Testing`
     - Description:
       ```
       # BharatFlex v1.0.0
       
       ## Features:
       ✅ Admin Dashboard with analytics
       ✅ Google Login & Sign Out
       ✅ Video Upload with Mux streaming
       ✅ WhatsApp Share integration
       ✅ Video browsing & playback
       ✅ User profiles & subscriptions
       
       ## Installation:
       1. Download `com.bharatflex.app-release.apk`
       2. On your Android phone: Settings → Security → Allow installation from unknown sources
       3. Open the APK file and install
       4. Sign in with your Google account
       
       ## Testing:
       - Use test credentials from `.env.example`
       - Admin dashboard available under "You" tab → 👑 Admin
       ```

3. **Attach APK File:**
   - Drag & drop `app-release.apk` into the release assets section
   - OR click "Attach binaries by dropping them here"

4. **Publish Release:**
   - Click **"Publish Release"**

5. **Share Download Link:**
   ```
   https://github.com/himanshuchaudhart6066-oss/bharatflex/releases/tag/v1.0.0
   ```

---

## Quick Command Summary (Copy & Paste Ready)

```powershell
# Step 1: Push to GitHub
cd C:\BharatFlex
git init
git add .
git commit -m "Initial BharatFlex V3 commit - Admin Dashboard, Firebase, Google Login"
git branch -M main
git remote add origin https://github.com/himanshuchaudhart6066-oss/bharatflex.git
git push -u origin main

# Step 2: Build APK (Option A - EAS Build)
$env:EAS_NO_VCS=1; npx eas-cli build --platform android --profile preview --wait
```

---

## Troubleshooting

**Issue: Git command not found**
- Install Git: https://git-scm.com/download/win
- Restart PowerShell after installation

**Issue: EAS Build still fails on Windows**
- Use WSL2: Open PowerShell and run `wsl` to enter Linux mode
- Then cd to `/mnt/c/BharatFlex` and run the build command

**Issue: GitHub says "repository already exists"**
- You may have already created it; just use: `git push -u origin main` without `git remote add`

**Issue: Personal Access Token expired**
- Generate a new one at https://github.com/settings/tokens

---

## What Friends Will Download

Your friends will get a proper Android APK that:
- ✅ Installs on any Android phone (5.0+)
- ✅ Includes all features (Google Login, Video Upload, Admin Dashboard)
- ✅ Connects to your Firebase project
- ✅ Streams videos from Mux
- ✅ Shares to WhatsApp
- ✅ Requires sign-in before use (Firebase auth)

**Share with friends:**
```
Hey! Test my app BharatFlex! Download from:
https://github.com/himanshuchaudhart6066-oss/bharatflex/releases

Features:
📱 Video streaming platform
👑 Admin dashboard (email: admin@bharatflex.app)
🔐 Google Sign-in
📤 Upload videos
💬 Share on WhatsApp
```

---

## Next Steps

1. Create GitHub repository: https://github.com/new
2. Generate Personal Access Token: https://github.com/settings/tokens
3. Run the git push commands above
4. Run EAS Build command
5. Download APK and create GitHub Release
6. Share the release link with friends

**Ready?** Let me know if you hit any issues or need clarification on any step!
