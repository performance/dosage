#!/bin/bash

# DomainIntel Development Script

echo "Starting DomainIntel development server..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install Node.js before continuing."
    exit 1
fi

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "Dependencies not found. Installing dependencies first..."
    
    # Check if yarn is installed
    if command -v yarn &> /dev/null; then
        yarn install
    else
        npm install
    fi
fi

# Start development server
if command -v yarn &> /dev/null; then
    echo "Starting development server with yarn..."
    yarn start
else
    echo "Starting development server with npm..."
    npm start
fi
