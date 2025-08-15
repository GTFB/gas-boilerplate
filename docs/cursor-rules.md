# 🤖 Cursor Rules for Google Apps Script CLI Project

## 🎯 Purpose
This document defines the architectural rules and development patterns that AI assistants (like Cursor) must follow when working with this Google Apps Script CLI project.

## 📚 Related Documentation

- **[Quick Start](quick-start.md)** - Step-by-step setup guide
- **[Submodule Setup](submodule-setup.md)** - Detailed submodule configuration
- **[Repository Examples](repository-examples.md)** - Practical setup examples
- **[Main README](../README.md)** - Project overview and features

## 🏗️ Architecture Overview

### Core Principles
1. **Modular Design** - Each component has a specific responsibility
2. **Separation of Concerns** - Functions, utilities, and templates are separate
3. **Centralized Management** - All operations go through the command system
4. **Configuration-Driven** - Settings stored in JSON files
5. **Logging-First** - All operations are logged for debugging

## 📁 Directory Structure Rules

```
gas-boilerplate/
├── src/                    ← TypeScript source code
│   ├── functions/          ← Processing functions
│   │   ├── extract-files.ts ← HTML/JSON extraction utility
│   │   └── index.ts        ← Functions export (REQUIRED!)
│   ├── utils/              ← Utility functions
│   │   ├── config-validator.ts ← Configuration validation
│   │   ├── logger.ts       ← Enhanced logging system
│   │   └── version-updater.ts ← Version update system
│   ├── scripts/            ← Build and deployment scripts
│   ├── types/              ← TypeScript type definitions
│   │   └── index.ts        ← Centralized types
│   └── clasp-clone.ts      ← Main GAS script (pull/push/status)
├── templates/              ← Project templates
│   └── appsscript.json     ← GAS configuration template
├── docs/                   ← Detailed documentation
├── logs/                   ← Daily log files
├── commands.bat            ← Make commands wrapper
├── make.bat                ← Project creation script
├── setup.bat               ← Quick setup script
├── config.json             ← System configuration
├── projects.json           ← Project definitions
├── package.json            ← Dependencies
├── tsconfig.json           ← TypeScript configuration
└── README.md               ← Main guide
```

## 🔧 Development Rules

### 1. Function System (`src/functions/`)
- **Rule**: One function per file
- **Export**: Must export via `src/functions/index.ts`
- **Pattern**: Each function should be self-contained with proper types
- **Example**:
```typescript
// src/functions/my-function.ts
import { logger } from '../utils/logger';

interface MyFunctionParams {
  param: string;
}

export function myFunction(params: MyFunctionParams): void {
  logger.info('MY_FUNCTION', `Processing: ${params.param}`);
  // function logic here
}

// src/functions/index.ts
export { myFunction } from './my-function';
```

### 2. Command System (`commands.bat`)
- **Rule**: All new commands go through `commands.bat`
- **Pattern**: Use `goto` labels and proper error handling
- **Validation**: Always validate parameters
- **Example**:
```batch
if "%1"=="newcommand" goto newcommand
:newcommand
if "%2"=="" (
  echo ERROR: Specify parameter: make newcommand [param]
  goto end
)
echo Executing new command...
node scripts/new-command.js %2
goto end
```

### 3. Configuration Files
- **config.json**: System-wide settings
- **projects.json**: Project definitions
- **Rule**: Always validate before using
- **Pattern**: Use `utils/config-validator.js`

### 4. Logging System
- **Rule**: Use logger for ALL operations
- **Pattern**: `logger.info('ACTION', 'details')`
- **Levels**: DEBUG, INFO, WARN, ERROR
- **Example**:
```javascript
const { logger } = require('./utils/logger');
logger.info('PULL', `Project: ${project.name}, ID: ${project.id}`);
```

### 5. Template System
- **Rule**: Templates go in `templates/` folder
- **Pattern**: Minimal, working configurations
- **Usage**: Copied to new projects automatically

### 6. TypeScript Rules (`src/`)
- **Rule**: All source code must be TypeScript
- **Types**: Define interfaces in `src/types/index.ts`
- **Imports**: Use ES6 import/export syntax
- **Compilation**: Build with `npm run build`
- **Development**: Use `ts-node` for direct execution
- **Example**:
```typescript
// src/types/index.ts
export interface Project {
  name: string;
  id?: string;
  title: string;
  description?: string;
}

// src/functions/my-function.ts
import { Project } from '../types';

export function processProject(project: Project): void {
  // Type-safe code here
}
```

## 🚫 What NOT to Do

### ❌ Bad Practices
- Don't modify `clasp-clone.js` without updating commands
- Don't add functions without exporting via `index.js`
- Don't skip configuration validation
- Don't ignore logging requirements
- Don't create circular dependencies
- Don't modify batch files without testing

### ❌ Anti-Patterns
- Hardcoding paths instead of using config
- Skipping error handling
- Not using the logger
- Creating monolithic files
- Ignoring the command system

## ✅ What TO Do

### ✅ Good Practices
- Always use the logger for operations
- Validate configuration before operations
- Follow the modular architecture
- Update documentation when adding features
- Test commands with `make test`
- Use proper error handling
- Follow the established naming conventions

### ✅ Required Steps for New Features
1. **Create function** in appropriate directory
2. **Export** via `index.js` if in `functions/`
3. **Add command** to `commands.bat`
4. **Update documentation** in `docs/`
5. **Test** with `make test`
6. **Validate** with `make validate`

## 🔍 Validation Commands

### System Health Check
```cmd
make test              # Test all components
make validate          # Validate configuration
make help              # Show all commands
```

### Project Operations
```cmd
make clone [project]   # Create new project
make pull [project]    # Download from GAS
make push [project]    # Upload to GAS
make status [project]  # Show project status
```

## 📚 Documentation Rules

### Required Documentation
- **README.md**: Main project guide
- **docs/**: Detailed technical documentation
- **CURSOR_RULES.md**: This file (AI assistant rules)
- **Inline comments**: Explain complex logic

### Documentation Standards
- Use clear, concise language
- Include examples for commands
- Document all configuration options
- Explain error messages and solutions

## 🧪 Testing Requirements

### Before Committing
1. Run `make test` - All tests must pass
2. Run `make validate` - Configuration must be valid
3. Test new commands manually
4. Check logs for errors
5. Verify documentation is updated

## 🔄 Update System Rules

### Version Updates
- **Rule**: Respect the version update system
- **Pattern**: Use `make update` and `make upgrade`
- **Integration**: Don't break the update workflow
- **Testing**: Test after updates with `make validate`

## 🎯 Summary for AI Assistants

When working with this project:

1. **Respect the modular architecture**
2. **Always use the logger**
3. **Validate configuration first**
4. **Follow the command system**
5. **Update documentation**
6. **Test everything**
7. **Maintain backward compatibility**

### Quick Reference
- **Functions**: `functions/` + `index.js`
- **Commands**: `commands.bat`
- **Logging**: `utils/logger.js`
- **Validation**: `utils/config-validator.js`
- **Testing**: `make test`
- **Help**: `make help`

---

**Remember**: This system is designed to be maintainable and scalable. Follow these rules to ensure consistency and reliability.
