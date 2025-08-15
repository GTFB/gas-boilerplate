# Repository Setup Examples

This document provides practical examples of setting up repositories with gas-boilerplate in different scenarios.

## 🎯 Example 1: New Project Setup

### Scenario
You want to create a new project called "myapp" using gas-boilerplate as a submodule.

### Step-by-step
```bash
# 1. Create project folder
mkdir myapp
cd myapp

# 2. Initialize git repository
git init

# 3. Add gas-boilerplate as submodule
git submodule add https://github.com/GTFB/gas-boilerplate.git system

# 4. Go to system folder and install dependencies
cd system
npm install

# 5. Setup repository remotes
make setup-repos

# 6. Test connections
make test-repos

# 7. Create your first project
make new PROJECT=myproject
```

### Expected Result
```
✅ Upstream (gas-boilerplate): OK
✅ Origin (myapp): OK
```

## 🎯 Example 2: Existing Project with Wrong Remotes

### Scenario
You have an existing project where the system submodule has incorrect remote configuration.

### Problem
```bash
cd system
git remote -v
# Shows wrong origin or missing upstream
```

### Solution
```bash
cd system

# Remove incorrect remotes
git remote remove origin
git remote remove upstream

# Setup remotes correctly
make setup-repos

# Verify setup
make test-repos
```

## 🎯 Example 3: Fixing Submodule Update Conflicts

### Scenario
You're trying to update the system submodule but have local changes that conflict.

### Problem
```bash
git submodule update --remote system
# Error: Your local changes would be overwritten
```

### Solution
```bash
# Option 1: Discard local changes (recommended for system files)
cd system
git reset --hard HEAD
cd ..
git submodule update --remote system

# Option 2: Commit local changes first
cd system
git add .
git commit -m "Local changes before update"
cd ..
git submodule update --remote system
```

## 🎯 Example 4: Manual Remote Configuration

### Scenario
Automatic setup fails and you need to configure remotes manually.

### Solution
```bash
cd system

# Check current remotes
git remote -v

# Add upstream (gas-boilerplate)
git remote add upstream https://github.com/GTFB/gas-boilerplate.git

# Add origin (your project)
git remote add origin https://github.com/your-username/your-project.git

# Test connections
make test-repos
```

## 🎯 Example 5: Working with Multiple Projects

### Scenario
You have multiple projects using gas-boilerplate and want to update all of them.

### Solution
```bash
# Project 1
cd project1/system
make update
make upgrade
cd ../..

# Project 2
cd project2/system
make update
make upgrade
cd ../..

# Commit updates in each project
cd project1
git add system
git commit -m "Update gas-boilerplate system"
git push

cd ../project2
git add system
git commit -m "Update gas-boilerplate system"
git push
```

## 🔧 Troubleshooting Commands

### Check Repository Status
```bash
cd system
git remote -v          # Show all remotes
git status             # Check git status
make test-repos        # Test connections
make validate          # Validate system setup
```

### Fix Common Issues
```bash
# Wrong origin remote
git remote remove origin
make setup-repos

# Missing upstream
git remote add upstream https://github.com/GTFB/gas-boilerplate.git

# Module not found errors
npm install
make validate

# Git conflicts
git reset --hard HEAD
git submodule update --remote system
```

## 📚 Related Documentation

- **[submodule-setup.md](submodule-setup.md)** - Complete submodule setup guide
- **[quick-start.md](quick-start.md)** - Step-by-step quick start
- **[Makefile](../Makefile)** - All available commands
- **[README.md](../README.md)** - Project overview and features

## 💡 Pro Tips

1. **Always work from the `system` folder** when running gas-boilerplate commands
2. **Use `make test-repos`** to verify your setup before proceeding
3. **Commit system updates** in your main project after updating the submodule
4. **Keep your upstream updated** to get the latest features and bug fixes
5. **Use `make validate`** to check if your system is properly configured
