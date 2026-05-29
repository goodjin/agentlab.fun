#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REMOTE="hello@212.64.11.60"
REMOTE_DIR="/var/www/hello"
SSH_KEY="$HOME/.ssh/tencent_01_hello"
BASE_URL="https://agentlab.fun"

cd "$ROOT_DIR"

echo "Building site..."
if [[ -x "./build.sh" ]]; then
  ./build.sh
elif [[ -f "package.json" ]]; then
  npm install
  npm run build
else
  echo "No build script found; deploying static files directly."
fi

SOURCE_DIR="$ROOT_DIR"
if [[ -d "$ROOT_DIR/www" ]]; then
  SOURCE_DIR="$ROOT_DIR/www"
fi

echo ""
echo "Deploying $SOURCE_DIR to $REMOTE:$REMOTE_DIR..."
rsync -avz --delete \
  --exclude ".git/" \
  --exclude ".DS_Store" \
  --exclude "node_modules/" \
  --exclude "*.bak" \
  -e "ssh -i $SSH_KEY" \
  "$SOURCE_DIR/" "$REMOTE:$REMOTE_DIR/"

echo ""
echo "Fixing remote permissions..."
ssh -i "$SSH_KEY" "$REMOTE" \
  "find $REMOTE_DIR -type d -exec chmod 755 {} \\; && find $REMOTE_DIR -type f -exec chmod 644 {} \\;"

echo ""
echo "Verifying site URLs..."
urls=(
  "/"
  "/index.html"
  "/blog/"
  "/insights/"
  "/topics/"
  "/robots.txt"
  "/sitemap.xml"
  "/feed.xml"
  "/llms.txt"
)

failed=0
for url in "${urls[@]}"; do
  status="$(curl -L -sS -o /dev/null -w "%{http_code}" "$BASE_URL$url")"
  printf "%s %s\n" "$status" "$BASE_URL$url"
  if [[ "$status" != "200" ]]; then
    failed=1
  fi
done

if [[ "$failed" -ne 0 ]]; then
  echo "One or more site checks failed. Inspect permissions, paths, and server config." >&2
  exit 1
fi

echo ""
echo "Deployment complete."
