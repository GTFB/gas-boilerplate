# Setup Guide

## 🚀 Step-by-Step Setup

### Step 1: Enable Google Apps Script API

1. Open [Google Apps Script Settings](https://script.google.com/home/usersettings)
2. Find "Google Apps Script API" section
3. Click "Enable"
4. Confirm activation

### Step 2: Install Node.js

1. Download Node.js from [official website](https://nodejs.org/)
2. Choose LTS version (recommended)
3. Run installer
4. Follow installation instructions
5. Verify installation:
   ```cmd
   node --version
   npm --version
   ```

### Step 3: Copy System to Second Computer

Copy entire `gas-cli/` folder to second computer. Structure should be:
```
gas-cli/
├── system/                           ← REQUIRED!
│   ├── key.json                    ← service account key
│   ├── clasp-clone.js             ← main script
│   ├── commands.bat                ← make commands
│   ├── make.bat                    ← project creation
│   ├── setup.bat                   ← quick setup
│   ├── functions/                  ← shared functions
│   ├── templates/                  ← project templates
│   ├── utils/                      ← utility functions
│   ├── logs/                       ← logs
│   ├── docs/                       ← documentation
│   ├── .gitignore                  ← Git exclusions
│   ├── package.json                ← dependencies
│   ├── config.json                 ← general configuration
│   ├── projects.json               ← project IDs and details
│   └── README.md                   ← this guide
└── myproject/                      ← myproject
    ├── Code.js                     ← main code
    ├── index.html                  ← HTML interface
    └── files/                      ← extracted files
```

### Step 4: Quick Setup

```cmd
cd system
setup.bat
```

This script:
- Installs Node.js dependencies
- Checks for required files
- Creates folder structure

### Step 5: Environment Variable Setup

#### For Windows (Command Prompt):
```cmd
set GOOGLE_APPLICATION_CREDENTIALS=C:\path\to\system\key.json
```

#### For Windows (PowerShell):
```powershell
$env:GOOGLE_APPLICATION_CREDENTIALS="C:\path\to\system\key.json"
```

#### For permanent setup:
```cmd
setx GOOGLE_APPLICATION_CREDENTIALS "C:\path\to\system\key.json"
```

### Step 6: Setup Verification

```cmd
cd system
make validate
make projects
```

## 🔧 Configuration

### config.json
```json
{
  "defaultProject": "myproject",
  "projectsPath": "../",
  "systemPath": "./",
  "logsPath": "./logs/"
}
```

**Parameters:**
- `defaultProject` - default project
- `projectsPath` - path to project folders
- `systemPath` - path to system files
- `logsPath` - path to logs

### projects.json
```json
{
  "myproject": {
    "id": "SCRIPT_ID_HERE",
    "title": "My Project",
    "description": "Project description"
  },
  "analytics": {
    "id": "",
    "title": "Analytics",
    "description": "Analytics system"
  }
}
```

**For each project:**
- `id` - Google Apps Script ID (required for pull/push)
- `title` - project title
- `description` - project description

## 🔐 Service Account Setup

### 1. Create Project in Google Cloud Console
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project or select existing one
3. Remember project ID

### 2. Enable Google Apps Script API
1. In left menu select "APIs & Services" → "Library"
2. Find "Google Apps Script API"
3. Click "Enable"

### 3. Create Service Account
1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "Service Account"
3. Fill the form:
   - Name: any name
   - Description: description (optional)
4. Click "Create and Continue"

### 4. Configure Roles
1. In "Grant this service account access to project" section:
   - Role: "Editor" (or "Owner" for full access)
2. Click "Continue"
3. Click "Done"

### 5. Create Key
1. In service accounts list find created one
2. Click on service account email
3. Go to "Keys" tab
4. Click "Add Key" → "Create new key"
5. Select "JSON"
6. Download key file

### 6. Place Key
1. Rename downloaded file to `key.json`
2. Place in `system/` folder
3. Ensure file is added to `.gitignore`

## 📁 Project Structure

Each project has the following structure:
```
project-name/
├── system/                     # Project system files
│   ├── appsscript.json        # GAS configuration
│   ├── key.json               # Service account key
│   └── node_modules/          # Node.js dependencies
├── Code.js                     # Main GAS code
├── index.html                  # HTML file for extraction
└── files/                      # Extracted and processed files
```

## 🔍 Troubleshooting

### "Project not found in configuration"
- Check `projects.json` file
- Ensure project name is written exactly
- Run `make validate` for verification

### "Google Apps Script API not enabled"
- Go to [Google Apps Script Settings](https://script.google.com/home/usersettings)
- Enable "Google Apps Script API"

### "Service account key not found"
- Ensure `key.json` exists in `system/` folder
- Check file access rights
- Check path in environment variable

### "Cannot find module 'googleapis'"
- Run `setup.bat` to install dependencies
- Or run `npm install` in `system/` folder

## ✅ Setup Verification

After setup run:
```cmd
cd system
make validate          # Check configuration
make projects          # Show projects
make logs              # Show logs
```

All commands should run without errors.
