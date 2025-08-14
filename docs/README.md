# Google Apps Script CLI - Technical Documentation

## 📚 System Documentation

Welcome to the technical documentation of the Google Apps Script CLI system. Here you will find detailed information about all aspects of the system.

## 📖 Available Documents

### 🚀 [Setup](setup.md)
**Step-by-step guide for system installation and configuration**
- Enable Google Apps Script API
- Install Node.js
- Configure service account
- Environment variables configuration
- System verification

### 📋 [Commands](commands.md)
**Detailed description of all available commands**
- Project commands (clone, pull, push, status)
- Utility commands (ff, validate, logs, config)
- Admin commands (list, new, projects, help)
- Usage examples
- Important notes

### 🏗️ [Architecture](architecture.md)
**Technical description of system architecture**
- File and folder structure
- Key components
- Data flows
- Logging system
- Extensibility principles

### 🔍 [Troubleshooting](troubleshooting.md)
**Solutions for common problems and errors**
- Problem diagnosis
- Common errors and solutions
- Configuration issues
- Monitoring and prevention
- Getting help

## 🎯 Quick Start

### 1. Setup
```cmd
cd system
setup.bat
set GOOGLE_APPLICATION_CREDENTIALS=C:\path\to\system\key.json
```

### 2. Verification
```cmd
make validate
make projects
```

### 3. Basic Commands
```cmd
make clone [project]     # Clone project
make pull [project]      # Download changes
make push [project]      # Upload changes
make ff [project]        # Extract data
```

## 🔧 Configuration

### Main Files
- **`config.json`** - system settings
- **`projects.json`** - project definitions
- **`key.json`** - service account key

### Project Structure
```
project-name/
├── system/                     # System files
├── Code.js                     # Main GAS code
├── ff.html                     # HTML for extraction
└── files/                      # Extracted files
```

## 📝 Logging System

- **Levels:** DEBUG, INFO, WARN, ERROR
- **Format:** Daily files `YYYY-MM-DD.md`
- **Time:** Moscow timezone
- **Usage:** Automatic logging of all operations

## 🔐 Security

- Service account for authentication
- Key `key.json` excluded from Git
- Minimal required access rights
- Environment variables for sensitive data

## 🚀 Extensibility

### Adding New Functions
1. Create file in `functions/`
2. Export in `functions/index.js`
3. Add command in `commands.bat`
4. Update documentation

### Adding New Commands
1. Implement logic in script
2. Add handling in `commands.bat`
3. Update help
4. Test functionality

## 📞 Support

### Diagnostic Commands
```cmd
make validate          # Check configuration
make logs              # Show logs
make config            # Show settings
make projects          # Show projects
```

### System Logs
- Automatic creation in `logs/` folder
- Detailed information about all operations
- Markdown format for easy reading

### Documentation
- Modular structure for easy navigation
- Usage examples
- Solutions for common problems
- Technical details

## 🔄 Updates

The system is regularly updated for:
- Compatibility with new Google Apps Script API versions
- Performance improvements
- Adding new features
- Bug fixes

## 📊 Monitoring

### Regular Checks
- Daily configuration validation
- System logs review
- Project status check
- Performance monitoring

### Backup
- Configuration files copies
- Key backups
- Change documentation
- Recovery testing

---

**To get started see [Setup](setup.md)**
**To learn commands see [Commands](commands.md)**
**For problems see [Troubleshooting](troubleshooting.md)**
