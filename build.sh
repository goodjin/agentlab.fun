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
npx @11ty/eleventy

echo ""
echo "Build complete! Output in www/"
echo ""
echo "To preview locally:"
echo "  npx @11ty/eleventy --serve"