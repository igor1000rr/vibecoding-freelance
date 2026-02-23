#!/bin/bash
set -e
cd "$(dirname "$0")"
git pull origin main
git submodule update --remote --merge
npm install
npm run build
echo "Freelance deployed at $(date)"
