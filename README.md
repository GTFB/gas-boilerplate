# 🚀 Google Apps Script CLI

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Version](https://img.shields.io/badge/Version-1.2.12-orange.svg)](CHANGELOG.md)

> **Powerful command-line interface for managing Google Apps Script projects with Git-like workflow**

## 🎯 Overview

**Google Apps Script CLI** is a powerful command-line interface for managing Google Apps Script projects. It provides Git-like commands for pulling, pushing, and managing your Apps Script code across multiple computers.

### ✨ Key Features
- 🚀 **Git-style Commands** - `clone`, `pull`, `push`, `status` just like Git
- 🔄 **Automatic Updates** - Keep your system up-to-date with gas-boilerplate
- 🏗️ **Repository Setup** - Automatic upstream/origin configuration for fork workflow
- 📁 **Project Management** - Create, clone, and manage multiple Apps Script projects
- 🚀 **Auto-Releases** - One-command releases with automatic git commit and push
- 🔐 **Service Account Auth** - Secure authentication using Google Cloud service accounts
- 📊 **File Extraction** - Extract data from HTML files with JSON parsing
- ✅ **Configuration Validation** - Ensure your system is properly configured

## 🚀 Quick Start

### Prerequisites
- [Node.js 18+](https://nodejs.org/) installed
- Google Apps Script API enabled
- Service account key file (`key.json`) - see **[🔐 Google Cloud Setup](docs/google-cloud-setup.md)**

### Installation Options

#### Option 1: Clone as Submodule (Recommended)
```bash
# 1. Create project folder
mkdir my-project
cd my-project

# 2. Add gas-boilerplate as submodule
git submodule add https://github.com/GTFB/gas-boilerplate.git system

# 3. Initialize submodule
git submodule init
git submodule update

# 4. Install dependencies
cd system
npm install
cd ..

# 5. Setup repositories (replace with your repo URL)
cd system
make setup-repos REPO_URL=https://github.com/your-username/your-repo.git
cd ..

# 6. Test setup
cd system
make test-repos
cd ..

# 7. Create your first project
cd system
make new PROJECT=myproject
cd ..
```

#### Option 2: Clone as Regular Folder
```bash
# 1. Create project folder
mkdir my-project
cd my-project

# 2. Clone gas-boilerplate
git clone https://github.com/GTFB/gas-boilerplate.git system
cd system

# 3. Install dependencies
npm install

# 4. Setup repositories (replace with your repo URL)
make setup-repos REPO_URL=https://github.com/your-username/your-repo.git

# 5. Test setup
make test-repos

# 6. Create your first project
make new PROJECT=myproject
```

**💡 Recommendation**: Use **Option 1 (Submodule)** for automatic updates and better version control.

**Note**: Make sure you have [Node.js 18+](https://nodejs.org/) installed before running `npm install`.

### Environment Setup
```bash
# Set Google credentials path
set GOOGLE_APPLICATION_CREDENTIALS=C:\path\to\system\key.json
```

**Need help creating `key.json`?** See **[🔐 Google Cloud Setup](docs/google-cloud-setup.md)** for step-by-step instructions.

## 📚 Commands

> **💡 New to submodules?** See **[📖 Submodule Setup Guide](SUBMODULE_SETUP.md)** for detailed instructions.

### Project Management
```bash
make clone PROJECT=name     # Clone project from Google Apps Script
make pull PROJECT=name      # Download latest changes from GAS
make push PROJECT=name      # Upload changes to Google Apps Script
make status PROJECT=name    # Show project status
make files PROJECT=name     # Extract files from files.html
```

### System Commands
```bash
make new PROJECT=name       # Create new project with templates
make projects               # List all configured projects
make validate               # Validate system configuration
make update                 # Check for updates from gas-boilerplate
make upgrade                # Apply updates from gas-boilerplate
```

### Submodule Commands (if using system as submodule)
```bash
git submodule update --remote system  # Update system to latest version
git submodule status                   # Check submodule status
git submodule init                     # Initialize submodule
git submodule update                   # Update submodule to tracked commit
```

### Release Commands
```bash
make release                # Create patch release (auto-commit + push)
make patch                  # Create patch release
make minor                  # Create minor release
make major                  # Create major release
make preview                # Create preview release
```

### Repository Setup
```bash
make setup-repos REPO_URL=url  # Setup upstream/origin repositories
make test-repos             # Test repository connections
```

## 🔄 Workflow Example

```bash
# Complete project workflow
make new PROJECT=myproject      # Create project structure
# Add SCRIPT_ID to projects.json
make clone PROJECT=myproject    # Clone project from Google Apps Script
make pull PROJECT=myproject     # Download latest files
# ... edit your code ...
make push PROJECT=myproject     # Upload changes to Google Apps Script
make release                    # Create release
```

**Important**: After `make new PROJECT=name`, you must add the `SCRIPT_ID` to `projects.json` before running `make clone`.

## 📁 Project Structure

```
my-project/                          # Your project folder
├── system/                         # gas-boilerplate (system)
│   ├── Makefile                    # All commands
│   ├── src/                        # Source code
│   ├── templates/                  # Project templates
│   └── docs/                       # Documentation
└── myproject/                      # Your project
    ├── system/                     # System files
    └── files/                      # Project files
```

## 📖 Documentation

- **[🚀 Quick Start Guide](QUICK_START.md)** - Step-by-step setup instructions
- **[🔐 Google Cloud Setup](docs/google-cloud-setup.md)** - Service account and key.json setup
- **[📋 Projects Configuration](docs/projects-configuration.md)** - How to configure projects.json with SCRIPT_ID
- **[📚 Commands Reference](docs/commands-reference.md)** - Complete command documentation
- **[🚀 Releases and Updates](docs/releases-and-updates.md)** - Release system and update workflow
- **[📋 Repository Setup](docs/repository-setup.md)** - Detailed repository configuration
- **[🏗️ Architecture](docs/architecture.md)** - Technical system description
- **[🔍 Troubleshooting](docs/troubleshooting.md)** - Problem solving guide
- **[🛠️ Development Guide](docs/development-guide.md)** - Development setup and AI assistant rules

## 🛠️ Development

For development setup and guidelines, see **[🛠️ Development Guide](docs/development-guide.md)**.

### Quick Commands
```bash
npm run build              # Build TypeScript
npm run dev                # Run in development mode
make validate              # Validate configuration
make test-repos            # Test repository setup
```

## 🔐 Security

- `key.json` contains sensitive credentials
- Never commit to version control
- Use `.gitignore` to exclude sensitive files

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with `make validate`
5. Submit a pull request

## 📞 Support

- Check logs: `make logs`
- Validate config: `make validate`
- Check updates: `make update`
- View documentation: `docs/` folder
