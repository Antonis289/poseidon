# One-time setup for GitHub Actions builds

## 1. Create an Expo account & project

```bash
# Install EAS CLI globally
npm install -g eas-cli

# Log in
eas login

# Inside the mobile/ directory — links the app to your Expo account
cd mobile
eas init
```

`eas init` writes your real `projectId` into `app.json` and `eas.json`.
Commit the updated `app.json`.

## 2. Add your EXPO_TOKEN to GitHub Secrets

1. Go to **expo.dev → Account Settings → Access Tokens** → create a token
2. In this GitHub repo go to **Settings → Secrets and variables → Actions**
3. Click **New repository secret**
   - Name: `EXPO_TOKEN`
   - Value: the token you just created

## 3. Trigger a build

### Option A — push a version tag (recommended)
```bash
git tag v1.0.0
git push origin v1.0.0
```
GitHub Actions builds the APK and creates a Release with the `.apk` attached.

### Option B — manual trigger
GitHub repo → **Actions** → **Build & Release APK** → **Run workflow**
Fill in a version tag and release notes.

---

## How OTA updates work

Any push to `main` that touches `mobile/src/**` or `mobile/App.js` triggers the
**OTA Update** workflow automatically. Installed apps check for updates silently
on each launch and reload if one is available — no reinstall needed.

For changes that touch native code (new Expo plugins, new permissions, etc.)
you need a full APK rebuild via the **Build & Release APK** workflow.

## Install the APK on Android

1. Open the GitHub Release page for this repo
2. Download `007-mode.apk`
3. On your phone: **Settings → Security → Install unknown apps** → allow your browser
4. Tap the downloaded file to install
