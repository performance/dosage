# DomainIntel

DomainIntel is a web-based platform that helps users discover, value, and sell domains with AI-powered insights.

## Features

- **Domain Valuation**: Get accurate market valuations for any domain based on multiple factors
- **Domain Discovery**: Find available, brandable domains that match your business needs
- **Playbook Generator**: Create customized selling strategies for each domain
- **Landing Page Generator**: Visualize domain potential with industry-specific landing page mockups
- **Prospect Finder**: Identify potential buyers for your domains with relevance scores

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- Yarn or npm

### Installation

#### Option 1: Using the setup script

1. Clone the repository
   ```
   git clone https://github.com/yourusername/domainintel.git
   cd domainintel
   ```

2. Run the setup script
   ```
   ./setup.sh
   ```
   This script will check for Node.js, install dependencies using yarn or npm, and start the development server.

#### Option 2: Manual installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/domainintel.git
   cd domainintel
   ```

2. Install dependencies
   ```
   yarn install
   ```
   or
   ```
   npm install
   ```

3. Start the development server
   ```
   yarn start
   ```
   or
   ```
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser

## Project Structure

```
/src
├── components/           # Reusable UI components
│   ├── common/           # Shared components like buttons, inputs, etc.
│   ├── layout/           # Layout components like header, footer, etc.
│   └── feature/          # Feature-specific components
├── pages/                # Page components representing each route
├── services/             # API and external service integrations
├── hooks/                # Custom React hooks
├── utils/                # Utility functions
├── context/              # React context for state management
└── styles/               # Global styles and Tailwind configuration
```

## Technologies Used

- React
- React Router
- Tailwind CSS
- Context API for state management

## Development

### Quick Start

To quickly start the development server, you can use:

```
./dev.sh
```

This script will:
1. Check if dependencies are installed and install them if needed
2. Start the development server using yarn or npm

### Production Build

To build the application for production, you can use:

```
./build.sh
```

This script will:
1. Check if dependencies are installed and install them if needed
2. Build the application for production using yarn or npm
3. Output the production files to the `build` directory

### Testing

To run tests for the application, you can use:

```
./test.sh
```

This script will:
1. Check if dependencies are installed and install them if needed
2. Run tests using yarn or npm

### Linting

To lint the codebase and check for code quality issues, you can use:

```
./lint.sh
```

This script will:
1. Check if dependencies are installed and install them if needed
2. Add a lint script to package.json if it doesn't exist
3. Run ESLint on the src directory

### Git Setup

To initialize the Git repository, you can use the provided script:

```
./init-git.sh
```

This script will:
1. Initialize a new Git repository if one doesn't exist
2. Add all project files
3. Create an initial commit
4. Provide instructions for adding a remote repository

### Cleanup

To clean up the project and remove build artifacts, dependencies, and logs, you can use:

```
./cleanup.sh
```

This script will remove:
1. Build directory
2. Node modules
3. Yarn/npm cache and logs
4. Coverage reports

### Run All Scripts

To run all the main scripts in sequence (setup, lint, test, build), you can use:

```
./run-all.sh
```

This script will:
1. Make all scripts executable if they aren't already
2. Ask for confirmation before proceeding
3. Run setup, lint, test, and build scripts in sequence
4. Provide instructions for next steps

## License

This project is licensed under the MIT License - see the LICENSE file for details.
