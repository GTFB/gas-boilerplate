# Google Apps Script CLI - Setup Guide

## 📋 Project Description

**Google Apps Script CLI** is a powerful command-line interface for managing Google Apps Script projects. It provides Git-like commands for pulling, pushing, and managing your Apps Script code across multiple computers.

### Key Features
- 🚀 **Git-style Commands** - `clone`, `pull`, `push`, `status` just like Git
- 🔄 **Automatic Updates** - Keep your system up-to-date with gas-boilerplate
- 📁 **Project Management** - Create, clone, and manage multiple Apps Script projects
- 🛠️ **Smart Automation** - Automatic project structure creation and configuration
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

### Step 2: Copy to Second Computer
```
ayva/
├── system/                         ← REQUIRED!
│   ├── key.json                    ← service account key
│   ├── clasp-clone.js              ← main script
│   ├── commands.bat                ← make commands
│   ├── make.bat                    ← project creation
│   ├── setup.bat                   ← quick setup
│   ├── functions/                  ← shared functions
│   │   ├── extract-files.js        ← file extraction
│   │   └── index.js                ← functions index
│   ├── templates/                  ← project templates
│   │   └── appsscript.json         ← GAS config template
│   ├── utils/                      ← utility functions
│   │   ├── config-validator.js     ← config validation
│   │   ├── logger.js               ← enhanced logging
│   │   └── version-updater.js      ← version update system
│   ├── logs/                       ← change tracking
│   ├── docs/                       ← detailed documentation
│   ├── .gitignore                  ← Git exclusions
│   ├── package.json                ← dependencies
│   ├── config.json                 ← general configuration
│   ├── projects.json               ← project IDs and details
│   ├── CHANGELOG.md                ← version history
│   ├── LICENSE                     ← MIT license
│   ├── GIT_README.md               ← Git workflow guide
│   └── README.md                   ← this guide
└── myproject/                      ← myproject
    ├── Code.js                     ← main code
    ├── ff.html                     ← HTML interface
    └── files/                      ← extracted files
```

### Step 3: Install Node.js
- Download from https://nodejs.org/
- Install

### Step 4: Quick Setup
```cmd
cd system
setup.bat
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
make ff [project]        # extract files from ff.html
make validate            # validate configuration
make logs                # show recent logs
make config              # show configuration
```

### Update Commands
```cmd
make update              # check for updates from gas-boilerplate
make upgrade             # update from gas-boilerplate
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

# Extract files from ff.html
make ff myproject

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
- `ff.html` - HTML interface
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
- **[🔄 Git Workflow](GIT_README.md)** - Git integration and version updates
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
- Git workflow: `GIT_README.md`
- AI assistant rules: `CURSOR_RULES.md`

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🚀 Git Integration

This system is designed to work with Git repositories:
- **gas-boilerplate** - Main repository with latest features
- **Live Projects** - Clone and customize for your needs
- **Automatic Updates** - Keep projects up to date with `make upgrade`

See [GIT_README.md](GIT_README.md) for detailed Git workflow instructions.

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