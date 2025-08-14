# 🛠️ Development Guide

Complete guide for developers contributing to the Google Apps Script CLI project.

## 🚀 Development Setup

### Prerequisites
- Node.js 18+ installed
- Git configured with your credentials
- Access to the repository

### Initial Setup
```bash
# Clone your fork
git clone <your-fork-url>
cd gas-boilerplate

# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test
```

### Development Commands
```bash
npm run dev                # Run in development mode
npm run build              # Build TypeScript
npm run build:watch        # Build with watch mode
npm run clean              # Clean build artifacts
npm run validate           # Validate configuration
```

## 🔧 Making Changes

### 1. Create Feature Branch
```bash
git checkout -b feature/amazing-feature
```

### 2. Make Your Changes
- Follow TypeScript best practices
- Use meaningful commit messages
- Update documentation for new features
- Add tests for new functionality

### 3. Test Changes
```bash
npm run build              # Build project
npm test                   # Run tests
make validate              # Validate configuration
```

### 4. Commit and Push
```bash
git add .
git commit -m "Add amazing feature"
git push origin feature/amazing-feature
```

### 5. Create Pull Request
- Use the [Issue Template](.github/ISSUE_TEMPLATE.md)
- Include steps to reproduce
- Specify your environment details

## 📋 Code Style Guidelines

### TypeScript Best Practices
- Use strict TypeScript configuration
- Prefer interfaces over types
- Use meaningful variable names
- Add JSDoc comments for public APIs

### File Organization
- One function per file in `functions/`
- All functions exported via `functions/index.ts`
- Utility functions in `utils/` folder
- Scripts in `scripts/` folder

### Error Handling
- Use custom error classes
- Provide meaningful error messages
- Log errors appropriately
- Handle edge cases gracefully

## 🤖 AI Assistant Rules (Cursor)

This project includes specific rules for AI assistants (like Cursor) to understand the architecture and development patterns.

### 📋 Cursor Rules
The project follows these architectural principles that AI assistants should respect:

1. **Modular Architecture** - Each component in its own directory
2. **Function Separation** - One function per file in `functions/`
3. **Centralized Exports** - All functions exported via `functions/index.ts`
4. **Makefile Pattern** - All commands go through `Makefile`
5. **Configuration Validation** - Always validate before operations
6. **Logging Integration** - Use logger for all operations
7. **Template System** - Use templates for new projects
8. **Update Workflow** - Respect the version update system

### 🔧 Development Guidelines for AI
- **Adding Functions**: Create in `functions/`, export via `index.ts`
- **Adding Commands**: Add to `Makefile` with proper validation
- **Configuration**: Update both `config.json` and `projects.json`
- **Documentation**: Update relevant docs in `docs/` folder
- **Testing**: Use `make validate` to validate changes

### 📁 File Structure Rules
```
system/
├── functions/          ← Node.js processing functions
├── templates/          ← Project templates  
├── utils/             ← Utility functions
├── scripts/           ← Command scripts
├── docs/              ← Documentation
├── logs/              ← Daily log files
└── Makefile           ← Command definitions
```

**Note**: AI assistants should follow these patterns when suggesting modifications or improvements to the system.

## 🧪 Testing

### Test Commands
```bash
make validate              # Validate configuration
make test-repos            # Test repository setup
npm test                   # Run test suite
```

### Test Coverage
- Configuration validation
- Repository connectivity
- Command execution
- Error handling

## 📚 Documentation

### Documentation Standards
- Use clear, concise language
- Include code examples
- Provide troubleshooting guides
- Keep documentation up-to-date

### Required Updates
When adding new features, update:
- `README.md` - Overview and quick start
- `docs/commands-reference.md` - Command documentation
- `docs/releases-and-updates.md` - Release information
- `QUICK_START.md` - Setup instructions

## 🔄 Version Management

### Semantic Versioning
- **Patch**: Bug fixes (1.0.0 → 1.0.1)
- **Minor**: New features (1.0.0 → 1.1.0)
- **Major**: Breaking changes (1.0.0 → 2.0.0)

### Release Process
1. Ensure clean working directory
2. Run validation tests
3. Use appropriate release command
4. Verify release on GitHub

## 🚨 Troubleshooting Development

### Common Issues

#### Build Failures
```bash
npm run clean              # Clean build artifacts
npm install                # Reinstall dependencies
npm run build              # Try building again
```

#### Test Failures
```bash
make validate              # Check configuration
make test-repos            # Test repository setup
# Fix any issues reported
```

#### Dependency Issues
```bash
rm -rf node_modules        # Remove node_modules
npm install                # Reinstall dependencies
```

## 📞 Support

### Getting Help
- Check logs: `make logs`
- Validate config: `make validate`
- Check documentation: `docs/` folder
- Review error messages carefully

### Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 🔗 Related Documentation

- **[📚 Commands Reference](commands-reference.md)** - All available commands
- **[🚀 Quick Start](QUICK_START.md)** - Getting started guide
- **[📋 Repository Setup](repository-setup.md)** - Repository configuration
- **[🏗️ Architecture](architecture.md)** - System architecture
- **[🔍 Troubleshooting](troubleshooting.md)** - Problem solving guide
