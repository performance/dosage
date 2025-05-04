#!/bin/bash

# DomainIntel Cleanup Script

echo "Cleaning up DomainIntel project..."

# Remove build artifacts
if [ -d "build" ]; then
    echo "Removing build directory..."
    rm -rf build
fi

# Remove node_modules
if [ -d "node_modules" ]; then
    echo "Removing node_modules directory..."
    rm -rf node_modules
fi

# Remove yarn cache
if [ -d ".yarn/cache" ]; then
    echo "Removing yarn cache..."
    rm -rf .yarn/cache
fi

# Remove yarn unplugged
if [ -d ".yarn/unplugged" ]; then
    echo "Removing yarn unplugged..."
    rm -rf .yarn/unplugged
fi

# Remove yarn install state
if [ -f ".yarn/install-state.gz" ]; then
    echo "Removing yarn install state..."
    rm -f .yarn/install-state.gz
fi

# Remove npm logs
if [ -f "npm-debug.log" ]; then
    echo "Removing npm debug log..."
    rm -f npm-debug.log
fi

# Remove yarn logs
if [ -f "yarn-debug.log" ]; then
    echo "Removing yarn debug log..."
    rm -f yarn-debug.log
fi

if [ -f "yarn-error.log" ]; then
    echo "Removing yarn error log..."
    rm -f yarn-error.log
fi

# Remove coverage directory
if [ -d "coverage" ]; then
    echo "Removing coverage directory..."
    rm -rf coverage
fi

echo "Cleanup complete!"
