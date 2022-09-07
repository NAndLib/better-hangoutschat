#!/bin/bash
OUT_DIR="./out/ghctheme/firefox"
FF_SECRET="~/.secrets/firefox_addon_JWT"
web-ext build "$OUT_DIR"
web-ext sign --api-key $(head -1 "$FF_SECRET") --api-secret $(tail -f "$FF_SECRET")
