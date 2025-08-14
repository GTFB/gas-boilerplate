# 🚀 Google Apps Script CLI

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Version](https://img.shields.io/badge/Version-1.2.0-orange.svg)](CHANGELOG.md)
[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen.svg)](https://github.com/yourusername/gas-boilerplate/actions)

> **Powerful command-line interface for managing Google Apps Script projects with Git-like workflow**

<div align="center">
  <img src="https://img.shields.io/badge/TypeScript-56.0%25-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/JavaScript-34.0%25-yellow?style=for-the-badge&logo=javascript" alt="JavaScript" />
  <img src="https://img.shields.io/badge/Batch-10.0%25-black?style=for-the-badge&logo=windows" alt="Batch" />
</div>

---

## 📊 **Project Statistics**

<div align="center">
  <a href="https://github.com/yourusername/gas-boilerplate">
    <img src="https://img.shields.io/github/stars/yourusername/gas-boilerplate?style=social" alt="GitHub Stars" />
  </a>
  <a href="https://github.com/yourusername/gas-boilerplate/network">
    <img src="https://img.shields.io/github/forks/yourusername/gas-boilerplate?style=social" alt="GitHub Forks" />
  </a>
  <a href="https://github.com/yourusername/gas-boilerplate/issues">
    <img src="https://img.shields.io/github/issues/yourusername/gas-boilerplate" alt="GitHub Issues" />
  </a>
  <a href="https://github.com/yourusername/gas-boilerplate/pulls">
    <img src="https://img.shields.io/github/issues-pr/yourusername/gas-boilerplate" alt="GitHub Pull Requests" />
  </a>
</div>

<div align="center">
  <img src="https://img.shields.io/github/languages/top/yourusername/gas-boilerplate" alt="Top Language" />
  <img src="https://img.shields.io/github/languages/count/yourusername/gas-boilerplate" alt="Languages" />
  <img src="https://img.shields.io/github/repo-size/yourusername/gas-boilerplate" alt="Repo Size" />
  <img src="https://img.shields.io/github/last-commit/yourusername/gas-boilerplate" alt="Last Commit" />
</div>

---

## 📋 Project Description

**Google Apps Script CLI** is a powerful command-line interface for managing Google Apps Script projects. It provides Git-like commands for pulling, pushing, and managing your Apps Script code across multiple computers.

### Key Features
- 🚀 **Git-style Commands** - `clone`, `pull`, `push`, `status` just like Git
- 🔄 **Automatic Updates** - Keep your system up-to-date with gas-boilerplate
- 🏗️ **Repository Setup** - Automatic upstream/origin configuration for fork workflow
- 📁 **Project Management** - Create, clone, and manage multiple Apps Script projects
- 🛠️ **Smart Automation** - Automatic project structure creation and configuration
- 🚀 **Auto-Releases** - One-command releases with automatic git commit and push
- 🔐 **Service Account Auth** - Secure authentication using Google Cloud service accounts
- 📊 **File Extraction** - Extract data from HTML files with JSON parsing
- 📝 **Comprehensive Logging** - Track all operations with detailed logs
- ✅ **Configuration Validation** - Ensure your system is properly configured

### What It Does
This system replaces the deprecated `clasp` tool with a custom Node.js solution that:
- Downloads your Apps Script code to local files
- Uploads local changes back to Google Apps Script
- Manages multiple projects from a single interface
- Automatically updates from a central boilerplate repository
- Provides a consistent workflow across different computers

## 🎯 **What You Get**

<div align="center">

```bash
🚀 Google Apps Script CLI - Demo
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  $ make setup-repos https://github.com/username/ayva.git   │
│  ✅ Repository setup completed!                            │
│                                                             │
│  $ make clone PROJECT=myproject                            │
│  ✅ Project cloned successfully                            │
│                                                             │
│  $ make pull PROJECT=myproject                             │
│  📥 Downloaded latest changes from GAS                     │
│                                                             │
│  $ make push PROJECT=myproject                             │
│  📤 Uploaded changes to Google Apps Script                 │
│                                                             │
│  $ make release                                             │
│  🔄 Auto-committing and pushing changes...                 │
│  ✅ Release committed and pushed!                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

</div>

### ✨ **Key Features at a Glance**
- 🚀 **Git-style Commands** - `clone PROJECT=name`, `pull PROJECT=name`, `push PROJECT=name`
- 🔄 **Automatic Updates** - Keep system up-to-date
- 🏗️ **Repository Setup** - `setup-repos`, `test-repos` for fork workflow
- 📁 **Smart Project Management** - Multiple projects, one interface
- 🚀 **Auto-Releases** - `make release` automatically commits and pushes
- 🆕 **Project Creation** - `make new PROJECT=name` with templates
- 🛠️ **TypeScript Powered** - Modern, type-safe development
- 🔐 **Secure Authentication** - Service account integration
- 📊 **File Extraction** - HTML to JSON data processing
- 📝 **Comprehensive Logging** - Track all operations
- ✅ **Auto-Validation** - Configuration and system health checks

---

## 🚀 Quick Start

### 📋 Пошаговое руководство
Смотрите [QUICK_START.md](QUICK_START.md) для детальных инструкций по порядку действий.

### Prerequisites
- Node.js 18+ installed
- Google Apps Script API enabled
- Service account key file (`key.json`)

### Installation
```bash
git clone <your-repo>
cd gas-boilerplate
npm install
npm run build
```

## ⚡ Super Quick Workflow

**Complete project workflow in 8 commands:**

```bash
1. make clone myproject       ← Creates project + adds to projects.json
2. + Add SCRIPT_ID            ← In projects.json
3. make pull myproject        ← Download files from GAS
4. + Edit code                ← Your work
5. make push myproject        ← Upload changes to GAS
6. make update                ← Check for updates from gas-boilerplate
7. make upgrade               ← Apply updates (automatically)
8. + Continue working         ← Your project is updated!
```

**System updates:**
```bash
make update              # Check for updates
make upgrade             # Apply updates
```

## 🚀 Quick Setup

### Step 1: Enable Google Apps Script API
- Open [Google Apps Script Settings](https://script.google.com/home/usersettings)
- Enable "Google Apps Script API"

### Step 2: Структура проекта
```
ayva/                               ← Ваша папка проекта
├── system/                         ← gas-boilerplate (система)
│   ├── key.json                    ← service account key
│   ├── Makefile                    ← все команды
│   ├── src/                        ← исходный код
│   │   ├── clasp-clone.ts          ← main script
│   │   ├── functions/              ← shared functions
│   │   ├── utils/                  ← utility functions
│   │   └── scripts/                ← scripts
│   ├── templates/                  ← project templates
│   │   └── appsscript.json         ← GAS config template
│   ├── logs/                       ← change tracking
│   ├── docs/                       ← detailed documentation
│   ├── package.json                ← dependencies
│   ├── config.json                 ← general configuration
│   ├── projects.json               ← project IDs and details
│   └── README.md                   ← this guide
└── myproject/                      ← myproject
    ├── system/                     ← system files
    └── files/                      ← project files
```

### Step 3: Install Node.js
- Download from https://nodejs.org/
- Install

### Step 4: Quick Setup
```cmd
cd system
npm install
```

### Step 5: Set Environment Variable
```cmd
set GOOGLE_APPLICATION_CREDENTIALS=C:\path\to\system\key.json
```

### Step 6: Test Setup
```cmd
cd system
make validate
make projects
```

## 🍫 Git/Clasp Style Commands

### Project Commands
```cmd
make clone [project]     # clone project (like git clone)
make pull [project]      # download changes (like git pull)
make push [project]      # upload changes (like git push)
make status [project]    # show status (like git status)
```

### Utility Commands
```cmd
make files [project]      # extract files from files.html
make validate            # validate configuration
make logs                # show recent logs
make config              # show configuration
```

### Update Commands
```cmd
make update              # check for updates from gas-boilerplate
make upgrade             # update from gas-boilerplate
```

### Release Commands
```cmd
make release             # create patch release
make release [type]      # create release (patch/minor/major/preview)
```

### Admin Commands
```cmd
make list                # list projects
make new [name]          # create new project
make projects            # show all configured projects
make help                # show help
```

### Usage Examples
```cmd
# Clone existing project
make clone myproject

# Download changes in current project
make pull myproject

# Upload changes in current project
make push analytics

# Show project status
make status myproject

# Create new project
make new analytics

# Extract files from files.html
make files myproject

# Validate system
make validate

# Check for updates
make update

# Apply updates
make upgrade
```

## 🛠️ For Other Projects (analytics, etc.)

```cmd
cd system
make.bat analytics           # create project structure
make clone analytics         # clone project
cd ..\analytics              # go to project
cd ..\system                 # return to system folder
make pull analytics          # download files
# edit code
make push analytics          # upload changes
```

## 🔄 Version Update System

### Automatic Updates
The system includes a smart version updater that:
- ✅ **Detects Updates** - Checks gas-boilerplate for new versions
- ✅ **Smart Stashing** - Automatically saves local changes
- ✅ **Safe Updates** - Updates without losing your work
- ✅ **Dependency Management** - Installs new dependencies
- ✅ **Validation** - Tests system after update
- ✅ **Conflict Resolution** - Handles merge conflicts automatically

## 🚀 Release Automation

### Automated Releases
The system includes comprehensive release automation:

- ✅ **GitHub Actions** - Automatic releases on tag push
- ✅ **Version Management** - Semantic versioning (patch/minor/major)
- ✅ **Changelog Updates** - Automatic CHANGELOG.md updates
- ✅ **Quality Gates** - Tests and validation before release
- ✅ **Multiple Commands** - Release via make, npm, or direct script

### Quick Release Commands
```cmd
# Via make commands
make release              # Patch release (1.0.0 → 1.0.1)
make release minor        # Minor release (1.0.0 → 1.1.0)
make release major        # Major release (1.0.0 → 2.0.0)
make release preview      # Preview release (1.0.0 → 1.0.1-beta.1)

# Via npm scripts
npm run release:patch     # Patch release
npm run release:minor     # Minor release
npm run release:major     # Major release
npm run release:preview   # Preview release

# Direct script
node scripts/create-release.js patch
```

### Release Workflow
1. **Prepare** - Ensure clean working directory
2. **Test** - Run `make test` and `make validate`
3. **Release** - Use `make release [type]`
4. **Automate** - GitHub Actions creates release automatically
5. **Verify** - Check GitHub Releases page

### Update Workflow
```cmd
# 1. Check for updates
make update

# 2. Apply updates
make upgrade

# 3. Verify system
make validate

# 4. Continue working
```

### Manual Update Commands
```cmd
# Check update status
node utils/version-updater.js status

# Check for updates
node utils/version-updater.js check

# Apply updates
node utils/version-updater.js update

# Or use npm
npm run update
```

## 📁 Project Structure
- `system/` - system files
  - `package.json` - project dependencies
  - `appsscript.json` - Google Apps Script config
  - `node_modules/` - installed Node.js packages
- `Code.js` - main script code
- `files.html` - HTML interface
- `files/` - extracted and processed files

## 🔍 Troubleshooting

### Common Issues
1. **"Project not found"** - Run `make validate` to check config
2. **"API not enabled"** - Enable Google Apps Script API
3. **"Key not found"** - Check `key.json` exists and path is correct

### Validation Commands
```cmd
make validate            # Check system configuration
make config              # Show current settings
make logs                # View recent activity
```

### Update Issues
```cmd
make update              # Check for updates
make upgrade             # Apply updates
node utils/version-updater.js status  # Show update status
```

## 📚 Documentation

The system has modular documentation for different aspects:

- **[📋 Commands](docs/commands.md)** - detailed description of all commands
- **[🚀 Setup](docs/setup.md)** - step-by-step installation guide
- **[🏗️ Architecture](docs/architecture.md)** - technical system description
- **[🔍 Troubleshooting](docs/troubleshooting.md)** - problem solving
- **[🔄 Git Workflow](docs/git-workflow.md)** - Git integration and version updates
- **[🤖 AI Assistant Rules](CURSOR_RULES.md)** - rules for AI assistants (Cursor)

For technical details see `docs/README.md`

## 🔐 Security Notes
- `key.json` contains sensitive credentials
- Never commit to version control
- Use `.gitignore` to exclude sensitive files

## 📞 Support
- Check logs: `make logs`
- Validate config: `make validate`
- Check updates: `make update`
- See docs: `docs/README.md`
- View changes: `CHANGELOG.md`
- Git workflow: `docs/git-workflow.md`
- AI assistant rules: `CURSOR_RULES.md`

## 🤝 Contributing

We welcome contributions! Please follow these steps:

### Development Setup
```bash
git clone <your-fork>
cd gas-boilerplate
npm install
npm run build
npm test
```

### Making Changes
1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Make your changes
3. Test: `npm test`
4. Build: `npm run build`
5. Commit: `git commit -m "Add amazing feature"`
6. Push: `git push origin feature/amazing-feature`
7. Create a Pull Request

### Code Style
- Follow TypeScript best practices
- Use meaningful commit messages
- Update documentation for new features
- Add tests for new functionality

### Reporting Issues
- Use the [Issue Template](.github/ISSUE_TEMPLATE.md)
- Include steps to reproduce
- Specify your environment details

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🚀 Git Integration

This system is designed to work with Git repositories:
- **gas-boilerplate** - Main repository with latest features
- **Live Projects** - Clone and customize for your needs
- **Automatic Updates** - Keep projects up to date with `make upgrade`

See [docs/git-workflow.md](docs/git-workflow.md) for detailed Git workflow instructions.

## 🤖 AI Assistant Rules (Cursor)

This project includes specific rules for AI assistants (like Cursor) to understand the architecture and development patterns:

### 📋 Cursor Rules
The project follows these architectural principles that AI assistants should respect:

1. **Modular Architecture** - Each component in its own directory
2. **Function Separation** - One function per file in `functions/`
3. **Centralized Exports** - All functions exported via `functions/index.js`
4. **Batch Command Pattern** - All commands go through `commands.bat`
5. **Configuration Validation** - Always validate before operations
6. **Logging Integration** - Use logger for all operations
7. **Template System** - Use templates for new projects
8. **Update Workflow** - Respect the version update system

### 🔧 Development Guidelines for AI
- **Adding Functions**: Create in `functions/`, export via `index.js`
- **Adding Commands**: Add to `commands.bat` with proper validation
- **Configuration**: Update both `config.json` and `projects.json`
- **Documentation**: Update relevant docs in `docs/` folder
- **Testing**: Use `make test` to validate changes

### 📁 File Structure Rules
```
system/
├── functions/          ← Node.js processing functions
├── templates/          ← Project templates  
├── utils/             ← Utility functions
├── docs/              ← Documentation
├── logs/              ← Daily log files
└── *.bat              ← Command wrappers
```

**Note**: AI assistants should follow these patterns when suggesting modifications or improvements to the system.
