#!/usr/bin/env bash
set -euo pipefail

echo "⚽ World Cup 2026 App — Environment Setup"
echo "========================================"

if ! command -v node >/dev/null 2>&1; then
  echo ""
  echo "Node.js is not installed."
  echo "Install it from: https://nodejs.org (choose LTS)"
  echo "Then run this script again."
  exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
  echo ""
  echo "npm is not installed. Install Node.js from https://nodejs.org"
  exit 1
fi

echo ""
echo "Node: $(node -v)"
echo "npm:  $(npm -v)"
echo ""

echo "→ Installing dependencies..."
npm install

echo ""
echo "→ Building app..."
npm run build

echo ""
echo "✅ Setup complete!"
echo ""
echo "Choose how to use it on your iPhone:"
echo ""
echo "OPTION 1 — Best (online, works anywhere)"
echo "  1. Deploy to Vercel: https://vercel.com/new/clone?repository-url=https://github.com/WyMa2025/buildApp"
echo "  2. Open the Vercel URL in iPhone Safari"
echo "  3. Share → Add to Home Screen"
echo ""
echo "OPTION 2 — Same Wi-Fi (local test)"
echo "  1. Run: npm run iphone"
echo "  2. Open Safari on iPhone: http://YOUR-COMPUTER-IP:3000"
echo "  3. Share → Add to Home Screen"
echo ""
