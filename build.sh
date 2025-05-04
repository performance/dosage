#!/bin/bash

# DomainIntel Build Script

echo "Building DomainIntel for production..."

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

# Build for production
if command -v yarn &> /dev/null; then
    echo "Building with yarn..."
    yarn build
else
    echo "Building with npm..."
    npm run build
fi

echo "Build complete! The production files are in the 'build' directory."
echo "You can serve the production build with a static server:"
echo "  npx serve -s build"
