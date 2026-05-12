#!/bin/bash
set -e

echo "Building site..."
./build.sh

echo ""
echo "Deploying to server..."
rsync -avz -e "ssh -i ~/.ssh/tencent_01_hello" \
    www/ hello@212.64.11.60:/var/www/hello/

echo ""
echo "Deployment complete!"