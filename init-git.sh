#!/bin/bash

# Initialize Git repository for DomainIntel

echo "Initializing Git repository for DomainIntel..."

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "Git is not installed. Please install Git before continuing."
    exit 1
fi

# Check if .git directory already exists
if [ -d ".git" ]; then
    echo "Git repository already initialized."
else
    # Initialize git repository
    git init
    echo "Git repository initialized."
fi

# Add all files
git add .

# Initial commit
git commit -m "Initial commit: DomainIntel project setup with Landing Page Generator feature"

echo "Git repository initialized with initial commit."
echo "You can now add a remote repository with:"
echo "  git remote add origin <your-repository-url>"
echo "And push your changes with:"
echo "  git push -u origin main"
