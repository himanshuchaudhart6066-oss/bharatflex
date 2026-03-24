# GitHub Actions EAS Build Setup Guide

This guide will help you set up automated APK building via GitHub Actions, avoiding local Windows permission issues.

## Prerequisites

1. **GitHub Account** - Free or paid (workflow runs are free for public repos, limited for private)
2. **Expo/EAS Account** - You already have one (`dffbd260-642a-4ec5-a8a9-cc49ae692fd4`)
3. **EAS Credentials** - Username and password OR API token

## Step 1: Push Code to GitHub

If you haven't already, create a GitHub repository and push your BharatFlex code:

```bash
cd C:\BharatFlex
git init
git add .
git commit -m "Initial BharatFlex V3 commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/bharatflex.git
git push -u origin main
```

## Step 2: Set Up GitHub Secrets

GitHub Actions needs your EAS credentials to authenticate. You'll store these securely as "Secrets".

### Option A: Using EAS Username & Password (Simpler)

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add these TWO secrets:

   **Secret 1:**
   - Name: `EAS_USERNAME`
   - Value: Your Expo/EAS username (the one you use to log in)

   **Secret 2:**
   - Name: `EAS_PASSWORD`
   - Value: Your Expo/EAS account password

### Option B: Using EAS API Token (More Secure - Recommended)

If you prefer not to store your password, you can use an API token instead:

1. Visit https://expo.dev/settings/tokens
2. Create a new token with name "GitHub Actions Build"
3. Go to your GitHub repository
4. Click **Settings** → **Secrets and variables** → **Actions**
5. Click **New repository secret**:
   - Name: `EAS_TOKEN`
   - Value: Paste the token you created

Then update the workflow file to use the token instead (see alternative at bottom).

## Step 3: Run the Build Workflow

### Method 1: Manual Trigger (Recommended)

1. Go to your GitHub repository
2. Click **Actions** tab
3. Select **"EAS Build APK"** workflow from the left sidebar
4. Click **Run workflow** dropdown button
5. Select your build profile:
   - **preview** - Development build (faster, includes debug features)
   - **production** - Production build (optimized, signed)
6. Click **Run workflow** (green button)

### Method 2: Automatic Trigger on Push

To automatically build on every push to main branch, modify the workflow trigger at the top of `.github/workflows/eas-build.yml`:

```yaml
on:
  push:
    branches:
      - main
  workflow_dispatch:
    # ... rest of config
```

## Step 4: Monitor the Build

1. Go to **Actions** tab in your repository
2. Click on the running workflow
3. Watch the build progress in real-time
4. Once complete, the APK will be available:
   - In EAS Build dashboard: https://expo.dev/accounts/@YOUR_USERNAME/projects/bharatflex
   - Download directly from the EAS website
   - In GitHub Actions artifacts (if configured)

## Monitoring Build Status

The workflow logs show:
- ✅ When dependencies are installed
- ✅ When EAS authenticates
- ✅ Build progression on EAS servers
- ✅ Any build errors (will be displayed clearly)

## Troubleshooting

### Build Fails with "Invalid Credentials"
- Double-check that `EAS_USERNAME` and `EAS_PASSWORD` are set correctly
- Make sure there are no extra spaces before/after the values
- Test logging in locally: `eas login --username "your_username"`

### Build Times Out
- EAS builds typically take 5-10 minutes on Linux
- GitHub Actions has a 6-hour timeout for workflows
- Your build will complete long before that

### APK Not Found
- Check the EAS Build dashboard: https://expo.dev/accounts/@YOUR_USERNAME/projects/bharatflex
- APK downloads are available from there
- You can also submit directly to Play Store from EAS dashboard

## Advantages of This Approach

✅ **No Windows permission issues** - Runs on Linux servers  
✅ **No local resource consumption** - Build happens in the cloud  
✅ **Automated & reproducible** - Same build every time  
✅ **Easy to share** - Share build link or APK download  
✅ **History tracking** - See all previous builds in Actions tab  
✅ **Free for public repositories** - GitHub provides free Linux runners  

## Next Steps

1. **Commit the workflow file**: Your `.github/workflows/eas-build.yml` is already created
2. **Push to GitHub**: `git add . && git commit -m "Add GitHub Actions build workflow" && git push`
3. **Set GitHub Secrets**: Follow Step 2 above
4. **Run your first build**: Follow Step 3 above
5. **Download APK**: Get it from EAS dashboard or GitHub Actions artifacts

## Questions?

- EAS Build docs: https://docs.expo.dev/build/introduction/
- GitHub Actions docs: https://docs.github.com/en/actions
- EAS Dashboard: https://expo.dev/accounts
