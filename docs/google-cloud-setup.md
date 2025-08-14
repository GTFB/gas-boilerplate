# 🔐 Google Cloud Setup Guide

Step-by-step guide for setting up Google Cloud service account and creating `key.json` for Google Apps Script CLI.

## 🚀 Quick Setup

### 1. Enable Google Apps Script API
1. Go to [Google Apps Script Settings](https://script.google.com/home/usersettings)
2. Enable "Google Apps Script API"
3. Click "Save"

### 2. Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Enter project name (e.g., "gas-cli-project")
4. Click "Create"

### 3. Enable Required APIs
1. In your project, go to "APIs & Services" → "Library"
2. Search and enable these APIs:
   - **Google Apps Script API**
   - **Google Drive API**
   - **Google Sheets API** (if using Sheets)

### 4. Create Service Account
1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "Service Account"
3. Fill in:
   - **Service account name**: `gas-cli-service`
   - **Description**: `Service account for Google Apps Script CLI`
4. Click "Create and Continue"
5. Skip role assignment (click "Continue")
6. Click "Done"

### 5. Generate Key File
1. Click on your service account name
2. Go to "Keys" tab
3. Click "Add Key" → "Create new key"
4. Select "JSON"
5. Click "Create"
6. **Important**: The `key.json` file will download automatically

### 6. Configure Service Account
1. Copy the `key.json` file to your project's `system/` folder
2. Set environment variable:
   ```bash
   # Windows
   set GOOGLE_APPLICATION_CREDENTIALS=C:\path\to\system\key.json
   
   # macOS/Linux
   export GOOGLE_APPLICATION_CREDENTIALS=/path/to/system/key.json
   ```

## 🔑 Key.json Structure

Your `key.json` should look like this:
```json
{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "abc123...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "gas-cli-service@your-project-id.iam.gserviceaccount.com",
  "client_id": "123456789...",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/gas-cli-service%40your-project-id.iam.gserviceaccount.com"
}
```

## ⚠️ Security Notes

- **Never commit `key.json`** to version control
- **Keep it secure** - it contains sensitive credentials
- **Use `.gitignore`** to exclude it:
  ```gitignore
  # Add to .gitignore
  key.json
  *.json.key
  ```

## 🧪 Test Setup

After creating `key.json`, test your setup:
```bash
cd system
make validate              # Should work without key.json errors
make projects              # Should show project list
```

**Prerequisites**: Make sure you have [Node.js 18+](https://nodejs.org/) installed.

## 🆘 Troubleshooting

### "Permission denied" error
- Ensure the service account has access to your Google Apps Script projects
- Check that the API is enabled in your Google Cloud project

### "Invalid key format" error
- Verify `key.json` is valid JSON
- Ensure the file path in environment variable is correct

### "API not enabled" error
- Go to Google Cloud Console and enable Google Apps Script API
- Wait a few minutes for changes to propagate

## 🔗 Related Documentation

- **[🚀 Quick Start](QUICK_START.md)** - Getting started guide
- **[📋 Repository Setup](repository-setup.md)** - Repository configuration
- **[🔍 Troubleshooting](troubleshooting.md)** - Problem solving guide
