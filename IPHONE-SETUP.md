# Use the World Cup App on Your iPhone

This guide is written for iPhone users. No coding experience needed.

---

## Recommended: Deploy online (works anywhere)

This is the easiest way. Your iPhone can open the app from home, work, or mobile data.

### Step 1 — Deploy for free on Vercel

1. On your iPhone or computer, open:
   **https://vercel.com/new/clone?repository-url=https://github.com/WyMa2025/buildApp**
2. Sign in with GitHub (create a free account if needed).
3. Click **Deploy** (keep the default settings).
4. Wait about 1–2 minutes until you see **Congratulations**.

### Step 2 — Open on your iPhone

1. Copy your new app link (example: `https://build-app-xyz.vercel.app`).
2. On your **iPhone**, open **Safari**.
3. Paste the link and open the app.

### Step 3 — Install to Home Screen

1. Tap the **Share** button (square with arrow at the bottom).
2. Scroll and tap **Add to Home Screen**.
3. Tap **Add**.

Done. You now have a **World Cup** icon on your iPhone.

---

## Alternative: Run on your computer (same Wi‑Fi only)

Use this only if you want to test before deploying.

### On your Mac or PC

1. Install **Node.js LTS** from https://nodejs.org
2. Open Terminal (Mac) or Command Prompt (Windows).
3. Run:

```bash
git clone https://github.com/WyMa2025/buildApp.git
cd buildApp
npm run setup
npm run iphone
```

4. Note the IP address shown in the terminal (example: `192.168.1.25`).

### On your iPhone

1. Connect to the **same Wi‑Fi** as your computer.
2. Open **Safari**.
3. Go to: `http://YOUR-COMPUTER-IP:3000`
4. **Share → Add to Home Screen**.

---

## What the app does

| Tab | What you see |
|-----|----------------|
| Results | Latest scores (updates automatically) |
| Groups | Group standings |
| Knockout | Round of 32 bracket |
| Schedule | Upcoming matches |

Live matches show a red **Live** badge with the current minute.

---

## Tips for iPhone

- Always use **Safari** for “Add to Home Screen”.
- Open the app from the **home screen icon**, not a bookmark.
- Pull down or tap **Refresh** in the app header to update scores manually.
- During live matches, scores refresh every 15 seconds.

---

## Need help?

If deployment fails, make sure the GitHub repo is public and you are signed into Vercel with the same GitHub account.
