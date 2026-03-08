#!/bin/bash
set -e
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$PROJECT_DIR"
echo "Setting up project.."
echo "Setting up frontend folder.."
cd frontend && npm install
echo "Setting up backend.."
cd ../backend && npm install && touch .env
echo "Setup complete! Make sure to fill out the .env!"