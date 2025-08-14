# GAS Boilerplate

Simple system for Google Apps Script development.

## Quick Start

```bash
npm install
make help
```

## Prerequisites

1. **Node.js 18+** installed
2. **Google Cloud project** with Apps Script API enabled
3. **Service account key** (`key.json`) for authentication

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Get Google Cloud credentials:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Enable Google Apps Script API
   - Create service account
   - Download `key.json`
   - Place `key.json` in project root

3. **Verify setup:**
   ```bash
   make validate
   make config
   ```

## Commands

### Projects
```bash
gas new projectname     # create project folder structure
gas clone projectname   # add project to configuration
gas pull projectname    # download from Google Apps Script
gas push projectname    # upload to Google Apps Script
gas projects            # show configured projects
gas list                # list all projects
```

### System
```bash
gas config              # show system configuration
gas validate            # validate system setup
gas logs                # show recent logs
gas setup-repos [url]   # setup git repositories
gas test-repos          # test git connections
gas check               # check for updates
gas upgrade             # upgrade system
gas release             # create release
```

## Make Commands

```bash
make new name           # gas new name
make clone name         # gas clone name
make pull name          # gas pull name
make push name          # gas push name
make projects           # gas projects
make config             # gas config
make validate           # gas validate
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
   make new dashboard
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
   make clone dashboard
   make pull dashboard
   ```

5. **Work with project:**
   - Edit code in `../dashboard/files/`
   - Test in Google Apps Script editor

6. **Upload changes:**
   ```bash
   make push dashboard
   ```

## Examples

```bash
# Create new project
make new dashboard

# Edit projects.json - add SCRIPT_ID
# Example: "dashboard": { "id": "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms" }

# Setup and download
make clone dashboard
make pull dashboard

# Work on code...
# Upload changes
make push dashboard
```

## Troubleshooting

- **Project not found:** Run `make new projectname` first
- **SCRIPT_ID missing:** Edit `projects.json` and add your ID
- **Authentication failed:** Ensure `key.json` is present and valid
- **Need help:** Run `make help` to see all commands

## Documentation

- **Main guide:** `README.md` (this file)
- **Setup help:** `docs/google-cloud-setup.md`
- **Problem solving:** `docs/troubleshooting.md`

System ready to use!
