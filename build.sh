#!/bin/bash
set -e

echo "Building site with Eleventy..."

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Clean output directory
echo "Cleaning www/..."
rm -rf www

# Build with Eleventy
echo "Running Eleventy..."
./node_modules/.bin/eleventy

echo ""
echo "Build complete! Output in www/"

# Run check script
echo ""
echo "Running site check..."
node scripts/check-site.js

echo ""
echo "To preview locally:"
echo "  npm run serve"