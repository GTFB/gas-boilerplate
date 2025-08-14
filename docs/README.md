# GAS Boilerplate - Documentation

## Quick Start

```bash
npm install
make help
```

## What You Need

1. **Node.js 18+** - JavaScript runtime
2. **Google Cloud project** - for Apps Script API
3. **Service account key** - for authentication

## Setup Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Get Google credentials:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Enable Google Apps Script API
   - Create service account
   - Download `key.json`
   - Place in project root

3. **Verify setup:**
   ```bash
   make validate
   make config
   ```

## Commands

```bash
make new name          # create project
make clone name        # add to config
make pull name         # download
make push name         # upload
make projects          # show projects
make config            # show config
make validate          # validate
```

## Structure

```
gas-boilerplate/
├── src/gas.ts          # main CLI
├── Makefile            # command wrappers
└── config.json         # settings
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
make new dashboard
# add SCRIPT_ID to projects.json
make clone dashboard
make pull dashboard
# edit code
make push dashboard
```

## Configuration Files

### projects.json
```json
{
  "dashboard": {
    "id": "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
    "title": "Dashboard",
    "description": "Dashboard application"
  }
}
```

### config.json
```json
{
  "defaultProject": "dashboard",
  "projectsPath": "../",
  "systemPath": "./",
  "logsPath": "./logs/"
}
```

## Troubleshooting

- **Project not found:** Run `make new projectname` first
- **SCRIPT_ID missing:** Edit `projects.json` and add your ID
- **Authentication failed:** Ensure `key.json` is present and valid

## Need Help?

```bash
make help         # show all commands
make validate     # check system
make config       # show settings
make projects     # show projects
```

Complete documentation with examples and troubleshooting.
