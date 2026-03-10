#!/bin/bash
# FIVERR BOT SETUP
# Run this once to install dependencies and prepare the bot

echo "[*] Fiverr Bot Setup"
echo "[*] Installing dependencies..."

npm install playwright

echo "[*] Installing Playwright browsers..."
npx playwright install chromium

echo "[*] Creating directories..."
mkdir -p logs
mkdir -p uploads
mkdir -p completed

echo "[*] Setup complete!"
echo ""
echo "NEXT STEPS:"
echo "1. Run the bot: node fiverr-bot.js --action post"
echo "2. Check status: node fiverr-bot.js --action status"
echo "3. Monitor orders: node fiverr-bot.js --action monitor"
echo ""
echo "Logs stored at: fiverr-bot.log"
