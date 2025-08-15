# System Submodule Setup

This guide explains how to use the `system` folder as a Git submodule in your projects.

## 🎯 What is this?

The `system` folder contains the core gas-boilerplate functionality that can be shared across multiple projects as a Git submodule.

## 🚀 Quick Setup

### 1. Clone your project
```bash
git clone https://github.com/your-username/your-project.git
cd your-project
```

### 2. Add system as submodule
```bash
git submodule add https://github.com/GTFB/gas-boilerplate.git system
```

### 3. Initialize and update submodule
```bash
git submodule init
git submodule update
```

### 4. Setup repository remotes
```bash
cd system
make setup-repos
```

This will automatically:
- Set `upstream` to point to gas-boilerplate repository
- Set `origin` to point to your project repository
- Test all connections

## 📁 Project Structure

After setup, your project will look like:
```
your-project/
├── your-files/
├── system/          # Submodule (gas-boilerplate)
│   ├── Makefile
│   ├── package.json
│   ├── src/
│   └── docs/
└── .gitmodules
```

## 🔄 Updating System

### Update to latest version
```bash
git submodule update --remote system
```

### Update to specific version
```bash
cd system
git checkout <commit-hash>
cd ..
git add system
git commit -m "Update system to specific version"
```

### Using gas-boilerplate commands for updates
```bash
cd system

# Check for updates
make update

# Apply updates
make upgrade

# Test repository connections
make test-repos
```

### Committing system updates
After updating the system submodule, commit the changes in your main project:

```bash
# From your main project root (not in system folder)
git add system
git commit -m "Update gas-boilerplate system to latest version"
git push origin main
```

## 📋 Available Commands

Once system is set up, you can use:
```bash
# From your project root
make help              # Show available commands
make new PROJECT=name  # Create new project
make setup-repos       # Setup repository remotes
make update            # Check for updates
make upgrade           # Apply updates
```

## 🔧 Repository Setup Guide

### Understanding the Repository Structure

When you use gas-boilerplate as a submodule, you have two repositories:

1. **Your main project repository** (e.g., `ayva`) - contains your project files
2. **System submodule** (`system`) - contains gas-boilerplate functionality

### Setting Up Repository Remotes

#### Option 1: Automatic Setup (Recommended)
```bash
cd system
make setup-repos
```

This command automatically:
- Renames the existing `origin` to `upstream` (pointing to gas-boilerplate)
- Sets `origin` to point to your main project repository
- Tests all connections

#### Option 2: Manual Setup
If automatic setup doesn't work, you can configure remotes manually:

```bash
cd system

# Check current remotes
git remote -v

# Add upstream (gas-boilerplate)
git remote add upstream https://github.com/GTFB/gas-boilerplate.git

# Add origin (your project repository)
git remote add origin https://github.com/your-username/your-project.git

# Test connections
make test-repos
```

### Verifying Repository Setup

After setup, verify that remotes are configured correctly:

```bash
cd system
git remote -v
```

You should see:
```
origin    https://github.com/your-username/your-project.git (fetch)
origin    https://github.com/your-username/your-project.git (push)
upstream  https://github.com/GTFB/gas-boilerplate.git (fetch)
upstream  https://github.com/GTFB/gas-boilerplate.git (push)
```

### Testing Repository Connections

```bash
cd system
make test-repos
```

This will test:
- ✅ Upstream (gas-boilerplate): Connection to gas-boilerplate repository
- ✅ Origin (your-project): Connection to your main project repository

## 🔧 Troubleshooting

### If submodule is empty
```bash
git submodule init
git submodule update
```

### If you want to remove submodule
```bash
git submodule deinit system
git rm system
rm -rf .git/modules/system
```

### If you want to convert submodule to regular folder
```bash
git submodule deinit system
git rm system
git add system/
git commit -m "Convert system to regular folder"
```

### Repository connection issues

#### "Origin remote already configured" error
If you get this error when running `make setup-repos`, it means the system already has an origin remote. Check current remotes:

```bash
cd system
git remote -v
```

If origin points to the wrong repository, remove and re-add it:

```bash
git remote remove origin
make setup-repos
```

#### "Cannot find module" errors
If you get module not found errors, make sure you're running commands from the `system` folder:

```bash
cd system
make validate
make test-repos
```

#### Git submodule update conflicts
If you have local changes in the system folder that conflict with updates:

```bash
cd system
git reset --hard HEAD  # Discard local changes
cd ..
git submodule update --remote system
```

## 📚 Benefits

✅ **Automatic updates** from gas-boilerplate  
✅ **Version control** - lock to specific versions  
✅ **Shared functionality** across projects  
✅ **Easy maintenance** - update once, use everywhere  

## 📖 Related Documentation

- **[Quick Start](quick-start.md)** - Step-by-step setup guide
- **[Repository Examples](repository-examples.md)** - Practical setup examples
- **[Main README](../README.md)** - Project overview and features

## 🎉 You're ready!

Now your project has access to all the gas-boilerplate functionality through the `system` submodule!
