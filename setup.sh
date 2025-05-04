#!/bin/bash

# DomainIntel Setup Script

echo "Setting up DomainIntel project..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install Node.js before continuing."
    exit 1
fi

# Check if yarn is installed
if command -v yarn &> /dev/null; then
    echo "Using yarn for package management..."
    yarn install
    echo "Starting development server..."
    yarn start
else
    echo "Yarn not found, using npm instead..."
    npm install
    echo "Starting development server..."
    npm start
fi

echo "Setup complete! If the browser doesn't open automatically, visit http://localhost:3000"
