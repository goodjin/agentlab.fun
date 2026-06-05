#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BASE_URL="https://agentlab.fun"
PROJECT_NAME="agentlab-fun"

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

echo ""
echo "Deploying www/ to Cloudflare Pages project $PROJECT_NAME..."
npx wrangler pages deploy "$ROOT_DIR/www" --project-name "$PROJECT_NAME"

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
