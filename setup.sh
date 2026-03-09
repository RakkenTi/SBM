#!/bin/bash
set -e
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
npm run install:all
echo "Setup complete! Make sure to fill out the .env!"