#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# --- Prerequisites ---
# 1. Node.js and npm/yarn installed.
# 2. Java Development Kit (JDK) installed in WSL (check with 'java --version').
# 3. Capacitor project initialized and Android platform added in 'client' dir previously.
# --------------------

echo "STEP 1: Navigating to client directory..."
# Use '|| exit 1' to ensure the script stops if cd fails
cd client || exit 1

echo "STEP 2: Building React app + Service Worker..."
# This includes your 'react-scripts build' and 'workbox injectManifest'
npm run build

echo "STEP 3: Syncing web assets with native Android platform..."
# Explicitly sync android, updates native project files based on web build
npx cap sync android

echo "STEP 4: Navigating into Android project directory..."
cd android || exit 1

echo "STEP 5: Ensuring Gradle wrapper is executable..."
# The gradlew script handles downloading/using the correct Gradle version
chmod +x ./gradlew

echo "STEP 6: Building the Android Debug APK using Gradle..."
echo "(This might take a while, especially the first time it downloads dependencies)"
# This command tells Gradle to assemble the debug version of your app
./gradlew clean assembleDebug

# --- Build Finished ---

echo "STEP 7: Build complete!"
# Define the expected APK path clearly relative to the 'client/android' directory
APK_PATH="app/build/outputs/apk/debug/app-debug.apk"
echo "Debug APK should be located at: client/android/${APK_PATH}"

# --- Optional: Copy APK to a more accessible location ---
# Uncomment the next two lines if you want the APK copied to your project root
# echo "STEP 7b: Copying APK to project root..."
# cp "${APK_PATH}" ../../app-debug.apk # Copy from client/android/app/... to project root

echo "STEP 8: Returning to project root directory..."
# We are currently in client/android, so go up two levels
cd ../..

echo "Script finished successfully. APK generated."