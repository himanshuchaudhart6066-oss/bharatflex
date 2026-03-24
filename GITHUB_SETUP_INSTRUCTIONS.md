# GitHub Actions Automated Build Setup - Complete Instructions

## 🎯 What You're Setting Up
Automated Android APK builds via GitHub Actions, bypassing Windows permission issues.

## Step-by-Step Setup

### Step 1: Create GitHub Repository (5 minutes)

1. Go to https://github.com/new
2. Repository name: `bharatflex` (or any name you prefer)
3. Description: "BharatFlex - Indian Video Streaming App"
4. Select **Private** (to protect your credentials)
5. **DO NOT** initialize with README, .gitignore, or license (you already have these)
6. Click **Create repository**

### Step 2: Connect Your Local Repository to GitHub (2 minutes)

Replace `YOUR_USERNAME` and `your-repo-name` in the command below:

```powershell
git remote add origin https://github.com/YOUR_USERNAME/your-repo-name.git
git branch -M main
git push -u origin main
```

**Complete example:**
```powershell
git remote add origin https://github.com/john_doe/bharatflex.git
git branch -M main
git push -u origin main
```

When prompted for authentication, use one of these:
- **Personal Access Token** (Recommended - more secure)
  - Create one at https://github.com/settings/tokens
  - Use token as password when prompted
- **GitHub Password** (Less secure, but simpler)
  - Just use your GitHub account password

**Expected output:**
```
branch 'master' set up to track 'origin/main'
```

### Step 3: Add EAS Credentials to GitHub Secrets (3 minutes)

1. Go to your GitHub repository → **Settings**
2. Left sidebar → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add:

**Add First Secret:**
- Name: `EAS_USERNAME`
- Value: Your Expo/EAS username (login name, not email)
  - Find it at https://expo.dev/settings/profile

**Add Second Secret:**
- Name: `EAS_PASSWORD`
- Value: Your Expo/EAS account password

Click **Add secret** after each one.

### Step 4: Verify Setup (1 minute)

1. Go to **Actions** tab in your GitHub repository
2. You should see **"EAS Build APK"** in the left sidebar
3. If you don't see it, wait 30 seconds and refresh

## 🚀 Running Your First Automated Build

### Method 1: Manual Trigger (Recommended for Testing)

1. Go to **Actions** tab
2. Click **"EAS Build APK"** from the left sidebar
3. Click **Run workflow** button
4. Select profile: **preview** (for testing) or **production** (for release)
5. Click **Run workflow** (green button)
6. Watch the build progress in real-time!

### Method 2: Automatic on Push (Optional)

To automatically build on every push to main:

Edit `.github/workflows/eas-build.yml` and change the trigger from:
```yaml
on:
  workflow_dispatch:
```

To:
```yaml
on:
  push:
    branches:
      - main
  workflow_dispatch:
```

Then every push to main will trigger a build automatically.

## 📊 Monitoring Your Build

### In GitHub Actions:
1. **Actions** tab → See live build logs
2. Shows each step as it completes
3. If build fails, full error messages appear

### In EAS Dashboard:
1. Visit https://expo.dev/accounts/@YOUR_EAS_USERNAME/projects/bharatflex
2. See all builds (from GitHub Actions and manual)
3. Download APK directly from there

## 🔍 Build Log Indicators

During the workflow, you'll see:
- ✅ **"Check out repository"** - Code is being fetched
- ✅ **"Set up Node.js"** - Node environment ready
- ✅ **"Install dependencies"** - npm packages installing
- ✅ **"Authenticate with EAS"** - Logging into your EAS account
- ✅ **"Build Android APK with EAS"** - Building on EAS servers (5-15 min)
- ✅ **Success** - Build complete!

## ⚠️ Troubleshooting

### Build Fails with "Invalid credentials"
- Check `EAS_USERNAME` and `EAS_PASSWORD` in GitHub Secrets
- Verify credentials work by logging in at https://expo.dev

### Build Fails with "Project not found"
- The project ID in eas.json might not match your EAS account
- Tell your EAS team and they'll link it properly

### Can't push to GitHub
- Use Personal Access Token instead of password: https://github.com/settings/tokens
- Ensure you have write access to the repository

## 💡 Next Steps

1. ✅ Create GitHub repo
2. ✅ Push your local code
3. ✅ Add GitHub Secrets (EAS_USERNAME, EAS_PASSWORD)
4. ✅ Test with one manual build
5. ✅ (Optional) Enable automatic builds on push

You're done! From now on, just go to Actions and click "Run workflow" to build.

## 🎁 Bonus: Download the APK

After a successful build:
1. Go to https://expo.dev/accounts/@your_username/projects/bharatflex
2. Find your latest build
3. Click to download the APK file
4. Install on your Android device!

---

**Questions?** Check the full guide at: `GITHUB_ACTIONS_BUILD_SETUP.md`
