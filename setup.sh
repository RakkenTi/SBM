#!/bin/bash
set -e
echo "Setting up frontend folder.."
cd frontend && npm install
echo "Setting up backend.."
cd backend && npm install && touch .env
echo "Setup complete!"