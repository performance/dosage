#!/bin/bash

# DomainIntel Test Script

echo "Running tests for DomainIntel..."

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

# Run tests
if command -v yarn &> /dev/null; then
    echo "Running tests with yarn..."
    yarn test
else
    echo "Running tests with npm..."
    npm test
fi
