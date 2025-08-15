# GAS Boilerplate

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Version](https://img.shields.io/badge/Version-1.4.0-orange.svg)](CHANGELOG.md)

> **Powerful command-line interface for managing Google Apps Script projects with Git-like workflow**

## ✨ Features

- 🚀 **Project Management** - Create and manage multiple GAS projects
- 🔄 **Git Integration** - Automated repository setup and management
- 📦 **Release System** - Interactive version bumping and tagging
- 🎯 **TypeScript Support** - Full type safety and modern development
- ⚡ **CLI Interface** - Simple commands for all operations
- 🔧 **Auto-configuration** - Automatic project setup and validation

## 🚀 Quick Start

```bash
# 1. Create your project folder
mkdir my-project
cd my-project

# 2. Add gas-boilerplate as submodule in 'system' folder
git submodule add https://github.com/GTFB/gas-boilerplate.git system
cd system
npm install

# 3. Setup repository remotes
make setup-repos

# 4. Create project
make new projectname
make clone projectname
```

> **💡 All commands use `make` - see [Makefile](Makefile) for details**
> **📚 For detailed submodule setup, see [docs/submodule-setup.md](docs/submodule-setup.md)**
> **🎯 For practical examples, see [docs/repository-examples.md](docs/repository-examples.md)**

## Prerequisites

1. **[Node.js 18+](https://nodejs.org/)** installed
2. **[Make for Windows](https://chocolatey.org/packages/make)** - install via Chocolatey
3. **Google Cloud project** with Apps Script API enabled
4. **Service account key** (`key.json`) for authentication

### Installing Make on Windows

If you don't have Make installed, use Chocolatey:

```bash
# Install Chocolatey first (run in PowerShell as Administrator)
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Install Make
choco install make
```

## Setup

1. **Get Google Cloud credentials:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Enable Google Apps Script API
   - Create service account
   - Download `key.json`
   - Place `key.json` in project root

2. **Verify setup:**
   ```bash
   make validate
   make config
   ```

## Commands

> **📚 See [Makefile](Makefile) for complete command reference**

### Projects
```bash
make new projectname    # create project folder structure
make clone projectname  # add project to configuration
make pull projectname   # download from Google Apps Script
make push projectname   # upload to Google Apps Script
make files projectname  # extract files from files.html
make projects           # show configured projects
make list               # list all projects
```

### System
```bash
make config             # show system configuration
make validate           # validate system setup
make logs               # show recent logs
make setup-repos [url]  # setup git repositories
make test-repos         # test git connections
make update             # check for updates
make upgrade            # upgrade system
make release            # create release
```

## Configuration Files

### projects.json
```json
{
  "myproject": {
    "id": "SCRIPT_ID_HERE",
    "title": "My Project",
    "description": "Project description"
  }
}
```

**SCRIPT_ID** - your Google Apps Script project ID from the URL:
`https://script.google.com/d/SCRIPT_ID_HERE/edit`

### config.json
```json
{
  "defaultProject": "myproject",
  "projectsPath": "../",
  "systemPath": "./",
  "logsPath": "./logs/"
}
```

## Structure

```
gas-boilerplate/
├── src/gas.ts          # main CLI interface
├── Makefile            # command wrappers
├── config.json         # system settings
├── projects.json       # project definitions
├── key.json            # Google Cloud credentials
└── docs/               # documentation
```

## Complete Workflow

1. **Create project:**
   ```bash
   make new projectname
   ```

2. **Get SCRIPT_ID:**
   - Go to [Google Apps Script](https://script.google.com/)
   - Create new project or open existing
   - Copy ID from URL: `https://script.google.com/d/SCRIPT_ID/edit`

3. **Configure project:**
   - Edit `projects.json`
   - Add your SCRIPT_ID

4. **Setup project:**
   ```bash
   make clone projectname
   make pull projectname
   ```

5. **Work with project:**
   - Edit code in `../projectname/files/`
   - Test in Google Apps Script editor
   - Extract files if needed: `make files projectname`

6. **Upload changes:**
   ```bash
   make push projectname
   ```


## Troubleshooting

- **Project not found:** Run `make new projectname` first
- **SCRIPT_ID missing:** Edit `projects.json` and add your ID
- **Authentication failed:** Ensure `key.json` is present and valid
- **Need help:** Run `make help` to see all commands

## 📚 Documentation

- **[Main guide](README.md)** - Complete system overview (this file)
- **[Documentation Index](docs/README.md)** - Complete documentation overview
- **[Quick Start](docs/quick-start.md)** - Step-by-step setup guide
- **[Submodule Setup](docs/submodule-setup.md)** - Detailed submodule configuration
- **[Repository Examples](docs/repository-examples.md)** - Practical setup examples
- **[Google Cloud Setup](docs/google-cloud-setup.md)** - How to get credentials
- **[Troubleshooting](docs/troubleshooting.md)** - Common problems and solutions
- **[Cursor Rules](docs/cursor-rules.md)** - Development guidelines and rules

## 🔄 Working with Submodule

This project is designed as a **git submodule** that you can add to your projects:

### 1. Add to your project:
```bash
# From your project root
git submodule add https://github.com/GTFB/gas-boilerplate.git system
cd system
npm install
```

### 2. Setup repository remotes:
```bash
cd system
make setup-repos
make test-repos
```

### 3. Update from upstream:
```bash
# Get latest changes
git submodule update --remote system
cd system
npm install
make upgrade
```

### 4. Use in your project:
```bash
# From system folder
cd system
make new PROJECT=projectname
make clone PROJECT=projectname
```

### 5. Project structure after setup:
```
my-project/
├── system/                    # gas-boilerplate submodule
│   ├── src/
│   ├── Makefile
│   └── package.json
├── projectname/               # your GAS project
│   ├── system/
│   └── files/
└── README.md
```

> **💡 For detailed submodule setup, see [docs/submodule-setup.md](docs/submodule-setup.md)**
> **📚 For complete documentation, see [docs/README.md](docs/README.md)**



---

**System ready to use!** 🎯
