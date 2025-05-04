#!/bin/bash

# DomainIntel Run All Script
# This script runs all the main scripts in sequence

echo "Running all DomainIntel scripts in sequence..."

# Check if scripts are executable
if [ ! -x "./setup.sh" ] || [ ! -x "./dev.sh" ] || [ ! -x "./lint.sh" ] || [ ! -x "./test.sh" ] || [ ! -x "./build.sh" ]; then
    echo "Making all scripts executable..."
    chmod +x setup.sh dev.sh lint.sh test.sh build.sh cleanup.sh init-git.sh
fi

# Ask for confirmation
read -p "This will run setup, lint, test, and build scripts in sequence. Continue? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Operation cancelled."
    exit 1
fi

# Run setup
echo "Running setup script..."
./setup.sh

# Run lint
echo "Running lint script..."
./lint.sh

# Run tests
echo "Running test script..."
./test.sh

# Run build
echo "Running build script..."
./build.sh

echo "All scripts completed!"
echo "You can now initialize git with ./init-git.sh or clean up with ./cleanup.sh"
