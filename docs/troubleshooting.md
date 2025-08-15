# 🔧 Troubleshooting

This document provides solutions for common issues when working with gas-boilerplate.

## 📚 Related Documentation

- **[Quick Start](quick-start.md)** - Step-by-step setup guide
- **[Submodule Setup](submodule-setup.md)** - Detailed submodule configuration
- **[Repository Examples](repository-examples.md)** - Practical setup examples
- **[Main README](../README.md)** - Project overview and features

## 🚨 Common Issues

### Project not found
```bash
make new projectname  # create first
```

### SCRIPT_ID missing
Edit `projects.json` and add your Google Apps Script ID

### Authentication failed
Ensure `key.json` is present and valid

### Git errors
```bash
make test-repos  # check connections
```

## Validation

```bash
make validate     # check system
make config       # show settings
make projects     # show projects
```

## Getting Help

```bash
make help         # show all commands
make logs         # show recent logs
```

Simple solutions for common problems.
