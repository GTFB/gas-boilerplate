# System Architecture

## 🏗️ Architecture Overview

The Google Apps Script CLI system represents a modular architecture built on principles of separation of responsibilities and centralized management.

## 📁 File Structure

```
gas-cli/
├── system/                      ← Central management system
│   ├── functions/              ← Processing functions
│   │   ├── extract-files.js    ← File extraction utility
│   │   └── index.js            ← Functions export
│   ├── templates/              ← Project templates
│   │   └── appsscript.json     ← GAS configuration template
│   ├── utils/                  ← Utility functions
│   │   ├── config-validator.js ← Configuration validation
│   │   └── logger.js           ← Logging system
│   ├── logs/                   ← Log files
│   ├── docs/                   ← Documentation
│   ├── clasp-clone.js          ← Main GAS script
│   ├── commands.bat            ← Make commands wrapper
│   ├── make.bat                ← Project creation
│   ├── setup.bat               ← Quick setup
│   ├── config.json             ← System configuration
│   ├── projects.json           ← Project definitions
│   ├── key.json                ← Service account key
│   ├── package.json            ← Dependencies
│   └── README.md               ← Main guide
├── myproject/                   ← My project
└── analytics/                   ← Analytics project
```

## 🔧 Key Components

### 1. clasp-clone.js
**Purpose:** Main script for Google Apps Script operations

**Functionality:**
- `pull` - download files from GAS
- `push` - upload files to GAS
- `list` - get project information
- `projects` - list all projects

**Features:**
- Service account authentication
- Configuration reading from JSON files
- Automatic folder structure creation
- Logging of all operations

### 2. Command System (commands.bat)
**Purpose:** Wrapper for all make commands

**Command Categories:**
- **Project commands:** clone, pull, push, status
- **Utility commands:** ff, validate, logs, config
- **Admin commands:** list, new, projects, help

**Principles:**
- Single entry point for all operations
- Command parameter validation
- Calling appropriate scripts
- Unified output

### 3. Functions System (functions/)
**Purpose:** Node.js utilities for project processing

**Current Functions:**
- `extract-files.js` - HTML data extraction
- `index.js` - centralized export

**Development Pattern:**
- Each function in separate file
- Export through index.js
- Uniform error handling
- Integration with logging system

### 4. Templates System (templates/)
**Purpose:** Standard files for new projects

**Current Templates:**
- `appsscript.json` - Google Apps Script configuration

**Principles:**
- Minimal configuration
- Default settings
- GAS compatibility

### 5. Utils System (utils/)
**Purpose:** Helper functions for system

**Components:**
- `config-validator.js` - configuration validation
- `logger.js` - logging system

**Features:**
- File structure validation
- Required fields checking
- Multi-level logging
- Backward compatibility

## 🔄 Data Flows

### Project Download (pull)
```
1. User → commands.bat → clasp-clone.js
2. clasp-clone.js → Google Apps Script API
3. API → clasp-clone.js → file system
4. Create folder structure
5. Write files
6. Log operation
```

### Project Upload (push)
```
1. User → commands.bat → clasp-clone.js
2. clasp-clone.js → read project files
3. Prepare data for API
4. clasp-clone.js → Google Apps Script API
5. Update project in GAS
6. Log operation
```

### File Extraction (ff)
```
1. User → commands.bat → extract-files.js
2. extract-files.js → read index.html
3. HTML parsing (h2 + p with JSON)
4. Create CSV, JSON files
5. Save to files/ folder
6. Log operation
```

## 🗄️ Configuration

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
- `projectsPath` - relative path to projects
- `systemPath` - path to system files
- `logsPath` - path to logs

### projects.json
```json
{
  "myproject": {
    "id": "SCRIPT_ID",
    "title": "My Project",
    "description": "Project description"
  }
}
```

**Project Structure:**
- `id` - unique GAS identifier
- `title` - human-readable name
- `description` - purpose description

## 📝 Logging System

### Log Levels
- **DEBUG** (0): Detailed debugging information
- **INFO** (1): General information (default)
- **WARN** (2): Warnings
- **ERROR** (3): Errors

### Log Format
- Daily files: `YYYY-MM-DD.md`
- Timestamps in Moscow time
- Emojis for visual separation
- Structured Markdown format

### Usage
```javascript
const { logger } = require('./utils/logger');

logger.info('ACTION', 'details');
logger.error('ERROR', 'error message');
logger.warn('WARNING', 'warning message');
logger.debug('DEBUG', 'debug info');
```

## 🔐 Security

### Service Account
- Authentication via JSON key
- Minimal required permissions
- Exclusion from version control system

### Environment Variables
- `GOOGLE_APPLICATION_CREDENTIALS` - path to key
- Automatic loading at startup
- Support for different operating systems

## 🚀 Extensibility

### Adding New Functions
1. Create file in `functions/`
2. Export in `functions/index.js`
3. Add command in `commands.bat`
4. Update documentation

### Adding New Commands
1. Implement logic in appropriate script
2. Add handling in `commands.bat`
3. Update help
4. Test functionality

### Adding New Templates
1. Create file in `templates/`
2. Update `make.bat` for copying
3. Add to documentation
4. Test project creation

## 🔍 Monitoring and Debugging

### Diagnostic Commands
- `make validate` - configuration check
- `make logs` - view logs
- `make config` - display settings

### System Validation
- Check file existence
- JSON structure validation
- Required fields checking
- API connection testing

## 📊 Performance

### Optimizations
- Configuration caching
- Minimal API calls
- Asynchronous processing
- Efficient memory management

### Scalability
- Multiple project support
- Modular architecture
- Easy addition of new functions
- Configurable paths and settings
