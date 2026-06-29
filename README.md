# World Cup 2026 — iPhone App

Mobile app for **FIFA World Cup 2026** live scores, group standings, knockout results, and schedule.

Built for iPhone. Install it to your home screen like a native app.

---

## Quick start on iPhone (recommended)

1. Deploy free on Vercel:  
   **https://vercel.com/new/clone?repository-url=https://github.com/WyMa2025/buildApp**
2. Open the deployed URL in **iPhone Safari**
3. Tap **Share → Add to Home Screen**

Full step-by-step guide: **[IPHONE-SETUP.md](./IPHONE-SETUP.md)**

---

## Install environment (Mac / PC)

```bash
git clone https://github.com/WyMa2025/buildApp.git
cd buildApp
npm run setup
```

This installs dependencies and verifies the build.

---

## Run locally (same Wi‑Fi as iPhone)

```bash
npm run iphone
```

Then on your iPhone (Safari): `http://YOUR-COMPUTER-IP:3000`

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run setup` | Install deps + build |
| `npm run dev` | Start dev server (computer only) |
| `npm run iphone` | Start server reachable on your Wi‑Fi |
| `npm run build` | Production build |
| `npm run start` | Run production server |

---

## Features

- Live scores with auto-refresh (15s live / 60s otherwise)
- Group standings (12 groups)
- Knockout bracket
- Match schedule
- PWA support for iPhone home screen

---

## Tech

- Next.js 16
- Live data from World Cup 2026 API (with offline fallback)
