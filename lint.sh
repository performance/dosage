#!/bin/bash

# DomainIntel Lint Script

echo "Linting DomainIntel codebase..."

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

# Run linting
if command -v yarn &> /dev/null; then
    echo "Linting with yarn..."
    yarn lint || echo "Lint script not found in package.json. Adding it now..."
    
    # If lint script doesn't exist, add it
    if ! grep -q "\"lint\":" package.json; then
        # Use temporary file for sed on macOS
        sed -i.bak 's/"scripts": {/"scripts": {\n    "lint": "eslint src --ext .js,.jsx",/' package.json
        rm package.json.bak
        echo "Lint script added to package.json. Running lint..."
        yarn lint
    fi
else
    echo "Linting with npm..."
    npm run lint || echo "Lint script not found in package.json. Adding it now..."
    
    # If lint script doesn't exist, add it
    if ! grep -q "\"lint\":" package.json; then
        # Use temporary file for sed on macOS
        sed -i.bak 's/"scripts": {/"scripts": {\n    "lint": "eslint src --ext .js,.jsx",/' package.json
        rm package.json.bak
        echo "Lint script added to package.json. Running lint..."
        npm run lint
    fi
fi
