# Getting a download link — two options, pick one

---

## Option A — GitHub Pages PWA (instant, zero setup)

**What it is:** a Progressive Web App. Open the URL on your phone, tap
"Add to Home Screen", and it installs with its own icon like a native app.
Works on iOS (Safari) and Android (Chrome).

**How to enable:**
1. Go to your GitHub repo → **Settings → Pages**
2. Set **Source** to **GitHub Actions**
3. Merge this branch to `main`

The `deploy-web.yml` workflow fires automatically and your app is live at:
```
https://antonis289.github.io/poseidon/
```

From that URL on your phone: browser menu → **Add to Home Screen** → done.
Every push to `main` that touches `mobile/` redeploys silently — always up to date.

---

## Option B — Real Android APK (downloadable from Releases)

**What it is:** a native `.apk` file attached to a GitHub Release. Download it,
tap to install, works like any Android app.

**How to trigger:**

```bash
# Tag the commit and push — the workflow fires automatically
git tag v1.0.0
git push origin v1.0.0
```

Or go to **Actions → Build & Release APK → Run workflow** and fill in a version.

The build takes ~5–10 minutes on GitHub's servers (Android SDK is pre-installed
there — no setup needed). The APK appears in
[Releases](../../releases) when done.

**Install on phone:**
1. Download `007-mode.apk` from the Release
2. Phone: **Settings → Security → Install unknown apps** → allow your browser
3. Tap the file → Install

**No secrets or Expo account required for either option.**

---

## Updating the app

| Change type | What to do |
|---|---|
| Content / UI change (any file in `mobile/`) | Push to `main` → PWA updates automatically |
| New APK for Android (bug fix, new feature) | Push a new tag, e.g. `v1.0.1` |
| OTA update to installed APKs | Requires optional EAS setup (see ota-update.yml) |
