#!/bin/sh
set -eu

cd "$(dirname "$0")/.."

# Use the same esbuild version as the development server in go.mod.
esbuild() {
  npx --yes --package=esbuild@0.16.3 -- esbuild "$@"
}

rm -rf dist
mkdir -p dist/build dist/js

esbuild src/js/main.js --bundle --minify --define:ENV='"PRODUCTION"' \
  --loader:.js=jsx --loader:.ttf=base64 --external:node:fs --external:node:path \
  --outfile=dist/build/out.js
esbuild src/css/main.css --bundle --minify --loader:.svg=base64 \
  --loader:.ttf=base64 --outfile=dist/build/style.css

cp src/index.html dist/index.html
cp src/assets/favicon.ico dist/favicon.ico
cp -R src/assets src/fonts dist/
cp -R src/js/vendor src/js/snippets dist/js/

for js in dist/js/vendor/*.js dist/js/snippets/*.js; do
  esbuild "$js" --minify --outfile="$js" --allow-overwrite
done
