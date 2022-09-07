#!/bin/bash
OUT_DIR="./out/ghctheme/firefox"
FF_SECRET="$HOME/.secrets/firefox_addon_JWT"

./generate_patch.sh

pushd "$OUT_DIR"
web-ext build --overwrite-dest
web-ext sign --api-key $(head -1 "$FF_SECRET") --api-secret $(tail -1 "$FF_SECRET")
popd
