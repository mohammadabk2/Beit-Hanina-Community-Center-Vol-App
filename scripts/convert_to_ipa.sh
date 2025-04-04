#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# --- Prerequisites ---
# 1. You MUST be on macOS.
# 2. You MUST have Xcode installed.
# 3. You MUST have run 'npx cap add ios' in the 'client' directory at least once.
# --------------------

echo "Navigating to client directory..."
cd client

echo "Building React app..."
npm run build

echo "Syncing web assets with iOS platform..."
npx cap sync ios # You can specify the platform for sync, though 'npx cap sync' usually syncs all added platforms

echo "Opening Xcode..."
npx cap open ios

echo "Returning to project root..."
cd ..

echo "iOS update script finished successfully. Build/Run/Archive from Xcode."
