# Troubleshooting Guide

## 🔍 Problem Diagnosis

### Diagnostic Commands
```cmd
cd system
make validate          # Check configuration
make logs              # Show logs
make config            # Show settings
make projects          # Show projects
```

## ❌ Common Errors and Solutions

### 1. "Project not found in configuration"

**Symptoms:**
```
❌ Project "projectname" not found in configuration
Available projects: myproject, analytics
```

**Causes:**
- Incorrect project name
- Project not added to `projects.json`
- Typo in command

**Solution:**
1. Check project name correctness
2. Run `make projects` to view available projects
3. Add project to `projects.json`:
   ```json
   {
     "projectname": {
       "id": "SCRIPT_ID",
       "title": "Project Title",
       "description": "Project description"
     }
   }
   ```

### 2. "Google Apps Script API not enabled"

**Symptoms:**
```
❌ Push failed: User has not enabled the Apps Script API.
```

**Causes:**
- API not enabled in Google Apps Script settings
- Insufficient access rights

**Solution:**
1. Open [Google Apps Script Settings](https://script.google.com/home/usersettings)
2. Find "Google Apps Script API" section
3. Click "Enable"
4. Confirm activation
5. Wait several minutes for activation

### 3. "Service account key not found"

**Symptoms:**
```
❌ Pull failed: ENOENT: no such file or directory, open 'key.json'
```

**Causes:**
- `key.json` file missing
- Incorrect file path
- File not renamed

**Solution:**
1. Ensure `key.json` exists in `system/` folder
2. Check file name correctness
3. Rename downloaded file to `key.json`
4. Check environment variable:
   ```cmd
   echo %GOOGLE_APPLICATION_CREDENTIALS%
   ```

### 4. "Cannot find module 'googleapis'"

**Symptoms:**
```
Error: Cannot find module 'googleapis'
```

**Causes:**
- Node.js dependencies not installed
- `node_modules` folder corrupted

**Solution:**
1. Run `setup.bat` to install dependencies
2. Or run manually:
   ```cmd
   cd system
   npm install
   ```
3. Check for `node_modules/` folder

### 5. "Invalid JSON payload received"

**Symptoms:**
```
❌ Push failed: Invalid JSON payload received. Unknown name "content" at 'files[2]'
```

**Causes:**
- Incorrect data format for API
- Use of deprecated fields

**Solution:**
1. Update `clasp-clone.js` to latest version
2. Check project file format
3. Ensure all files have correct extensions

### 6. "Access blocked: Authorization Error"

**Symptoms:**
```
Access blocked: Authorization Error
You can't sign in to this app because it doesn't comply with Google's OAuth 2.0 policy
```

**Causes:**
- Google OAuth 2.0 policy issues
- Deprecated authentication methods

**Solution:**
1. Use service account instead of OAuth
2. Update `key.json` with new credentials
3. Check service account access rights

## 🔧 Configuration Issues

### Check config.json
```json
{
  "defaultProject": "myproject",
  "projectsPath": "../",
  "systemPath": "./",
  "logsPath": "./logs/"
}
```

**Check:**
- All required fields present
- Paths specified correctly
- Default project exists in `projects.json`

### Check projects.json
```json
{
  "myproject": {
    "id": "SCRIPT_ID",
    "title": "My Project",
    "description": "Project description"
  }
}
```

**Check:**
- JSON structure correct
- All projects have `title`
- For `pull`/`push` `id` is specified

## 📝 Logging Issues

### Logs not created
**Causes:**
- `logs/` folder doesn't exist
- Insufficient write permissions
- Logging system problems

**Solution:**
1. Create `logs/` folder manually
2. Check access permissions
3. Run `make validate` for verification

### Incorrect time format
**Causes:**
- Timezone issues
- Incorrect locale settings

**Solution:**
1. Check system settings
2. Update `logger.js` with correct time settings

## 🚀 Performance Issues

### Slow operation
**Causes:**
- Large project files
- Slow internet connection
- Google API problems

**Solution:**
1. Check project file sizes
2. Use stable internet connection
3. Check Google Apps Script API status

### Timeout errors
**Causes:**
- Slow response from Google API
- Network connection problems

**Solution:**
1. Increase timeouts in settings
2. Check network connection
3. Retry operation

## 🔐 Security Issues

### Service account key compromised
**Signs:**
- Authentication errors
- Access denied to projects

**Solution:**
1. Create new service account
2. Generate new key
3. Update `key.json`
4. Check access rights

### Incorrect access rights
**Causes:**
- Service account doesn't have required roles
- Project didn't grant access

**Solution:**
1. Check service account roles in Google Cloud Console
2. Ensure project is accessible to service account
3. Update access rights if necessary

## 📊 Monitoring and Prevention

### Regular Checks
```cmd
# Daily
make validate          # Check configuration
make logs              # View logs

# When problems occur
make config            # Check settings
make projects          # Check projects
```

### Backup
1. Regularly copy `key.json`
2. Save copies of configuration files
3. Document system changes

### Updates
1. Regularly check Node.js updates
2. Update dependencies via `npm update`
3. Monitor Google Apps Script API changes

## 📞 Getting Help

### System Logs
```cmd
make logs              # Show logs for today
```

### Configuration Check
```cmd
make validate          # System validation
make config            # Show settings
```

### Documentation
- Main guide: `README.md`
- Commands: `docs/commands.md`
- Setup: `docs/setup.md`
- Architecture: `docs/architecture.md`

### External Resources
- [Google Apps Script API](https://developers.google.com/apps-script/api)
- [Google Cloud Console](https://console.cloud.google.com/)
- [Node.js Documentation](https://nodejs.org/docs/)
