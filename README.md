# GAS Boilerplate

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Version](https://img.shields.io/badge/Version-1.3.9-orange.svg)](CHANGELOG.md)

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

# 3. Create project
make new project
make clone project
```

> **💡 All commands use `make` - see [Makefile](Makefile) for details**

## Prerequisites

1. **[Node.js 18+](https://nodejs.org/)** installed
2. **Google Cloud project** with Apps Script API enabled
3. **Service account key** (`key.json`) for authentication

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

### Projects
```bash
make new projectname    # create project folder structure
make clone projectname  # add project to configuration
make pull projectname   # download from Google Apps Script
make push projectname   # upload to Google Apps Script
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
   make new project
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
   make clone project
   make pull project
   ```

5. **Work with project:**
   - Edit code in `../dashboard/files/`
   - Test in Google Apps Script editor

6. **Upload changes:**
   ```bash
   make push project
   ```

## Examples

```bash
# Create new project
make new project

# Edit projects.json - add SCRIPT_ID
# Example: "project": { "id": "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms" }

# Setup and download
make clone project
make pull project

# Work on code...
# Upload changes
make push project
```

## Troubleshooting

- **Project not found:** Run `make new projectname` first
- **SCRIPT_ID missing:** Edit `projects.json` and add your ID
- **Authentication failed:** Ensure `key.json` is present and valid
- **Need help:** Run `make help` to see all commands

## 📚 Documentation

- **[Main guide](README.md)** - Complete system overview (this file)
- **[Google Cloud Setup](docs/google-cloud-setup.md)** - How to get credentials
- **[Troubleshooting](docs/troubleshooting.md)** - Common problems and solutions

## 🔄 Working with Subrepository

This project is designed as a **git submodule** that you can add to your projects:

### 1. Add to your project:
```bash
# From your project root
git submodule add https://github.com/GTFB/gas-boilerplate.git system
cd system
npm install
```

### 2. Update from upstream:
```bash
# Get latest changes
git submodule update --remote --merge
cd system
npm install
```

### 3. Use in your project:
```bash
# From your project root
make -C system new dashboard
make -C system clone dashboard
```

### 4. Project structure after setup:
```
my-project/
├── system/                    # gas-boilerplate submodule
│   ├── src/
│   ├── Makefile
│   └── package.json
├── project/                   # your GAS project
│   ├── system/
│   └── files/
└── README.md
```



---

**System ready to use!** 🎯
