# a script to build the full app locally whithout the need to know any thing about the frameworks
# on linux
# only double click the file and boom ,its running 

#!/bin/bash

# ==============================================================================
# React + Vite + TypeScript Project Setup Script (Linux)
# Dependencies: React, Vite, TypeScript, Radix UI, React Router DOM
#
# This script automates the installation of dependencies and starts the dev server.
# It includes detailed instructions for user interaction in case of common issues.
#
# Usage:
#   chmod +x setup-react-project.sh
#   ./setup-react-project.sh
#
# Author: [Your Name]
# Date: October 23, 2025
# ==============================================================================

set -e  # Exit immediately if a command exits with a non-zero status

# Color codes for better readability
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored messages
print_message() {
    local color=$1
    local message=$2
    echo -e "${color}${message}${NC}"
}

# Check if Node.js and npm are installed
check_node_npm() {
    print_message $BLUE "🔍 Checking for Node.js and npm..."

    if ! command -v node &> /dev/null; then
        print_message $RED "❌ Node.js is not installed."
        print_message $YELLOW "👉 Please install Node.js (v18 or higher recommended)."
        print_message $YELLOW "   You can install it via your package manager:"
        print_message $YELLOW "   - Ubuntu/Debian: sudo apt install nodejs npm"
        print_message $YELLOW "   - Fedora: sudo dnf install nodejs npm"
        print_message $YELLOW "   - Or use Node Version Manager (nvm):"
        print_message $YELLOW "     curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash"
        print_message $YELLOW "     Then: nvm install --lts && nvm use --lts"
        exit 1
    fi

    if ! command -v npm &> /dev/null; then
        print_message $RED "❌ npm is not installed."
        print_message $YELLOW "👉 npm usually comes with Node.js. If missing, reinstall Node.js."
        exit 1
    fi

    NODE_VERSION=$(node -v)
    NPM_VERSION=$(npm -v)
    print_message $GREEN "✅ Node.js version: $NODE_VERSION"
    print_message $GREEN "✅ npm version: $NPM_VERSION"
}

# Check if the current directory contains a package.json (i.e., a React project)
check_project_structure() {
    cd $(pwd)/Interface/profind
    if [ ! -f "package.json" ]; then
        print_message $RED "❌ package.json not found in the current directory."
        print_message $YELLOW "👉 Make sure you are running this script from the rightplace (before Interface/profind)."
        exit 1
    fi

    # Optional: verify it's a Vite + React + TS project
    if ! grep -q "vite" package.json || ! grep -q "react" package.json || ! grep -q "typescript" package.json; then
        print_message $YELLOW "⚠️  This doesn't look like a standard Vite + React + TypeScript project."
        print_message $YELLOW "   Please ensure your package.json includes Vite, React, and TypeScript."
    fi
}

# Install dependencies using npm
install_dependencies() {
    print_message $BLUE "📦 Installing project dependencies..."

    # If node_modules exists but package-lock.json is missing or outdated, warn user
    if [ -d "node_modules" ] && [ ! -f "package-lock.json" ]; then
        print_message $YELLOW "⚠️  node_modules exists but package-lock.json is missing."
        print_message $YELLOW "   It's recommended to delete node_modules and reinstall:"
        print_message $YELLOW "   rm -rf node_modules package-lock.json"
        print_message $YELLOW "   Then run this script again."
        read -p "Continue anyway? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    fi

    # Run npm install
    if npm install; then
        print_message $GREEN "✅ Dependencies installed successfully!"
    else
        print_message $RED "❌ Failed to install dependencies."
        print_message $YELLOW "👉 Common fixes:"
        print_message $YELLOW "   - Check your internet connection."
        print_message $YELLOW "   - Ensure you have write permissions in this directory."
        print_message $YELLOW "   - Try clearing npm cache: npm cache clean --force"
        print_message $YELLOW "   - If you're behind a proxy, configure npm accordingly."
        exit 1
    fi
}

# Verify required dependencies are present
verify_dependencies() {
    print_message $BLUE "🔍 Verifying required dependencies..."

    REQUIRED_DEPS=("react" "react-dom" "vite" "typescript" "@radix-ui/react-*" "react-router-dom")

    for dep in "${REQUIRED_DEPS[@]}"; do
        if ! grep -q "$dep" package.json; then
            # Special handling for Radix UI since it's a scoped package
            if [[ "$dep" == "@radix-ui/react-"* ]]; then
                if ! grep -q "@radix-ui/react-" package.json; then
                    print_message $YELLOW "⚠️  Radix UI components not found in package.json."
                    print_message $YELLOW "   You may need to install specific Radix UI packages, e.g.:"
                    print_message $YELLOW "   npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu"
                fi
            else
                print_message $RED "❌ Required dependency '$dep' is missing from package.json."
                print_message $YELLOW "👉 Please add it manually or check your project setup."
                exit 1
            fi
        fi
    done

    print_message $GREEN "✅ All required dependencies are present."
}

# Start the development server
start_dev_server() {
    print_message $BLUE "🚀 Starting the development server..."

    # Check if the dev script exists in package.json
    if ! npm run | grep -q "dev"; then
        print_message $RED "❌ 'dev' script not found in package.json."
        print_message $YELLOW "👉 Make sure your package.json has a script like:"
        print_message $YELLOW '   "scripts": { "dev": "vite", ... }'
        exit 1
    fi

    print_message $GREEN "✅ Running: npm run dev"
    print_message $GREEN "🌐 The app will be available at http://localhost:5173 (or similar)"
    print_message $YELLOW "👉 Press Ctrl+C in this terminal to stop the server."

    # Run the dev server (this will keep the script running)
    npm run dev
}

# Main execution flow
main() {
    print_message $GREEN "=============================================="
    print_message $GREEN "                 ProFind                      "
    print_message $GREEN "=============================================="

    check_node_npm
    check_project_structure
    install_dependencies
    verify_dependencies
    start_dev_server
}

# Run main function
main