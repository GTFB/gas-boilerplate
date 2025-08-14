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

## 📚 Benefits

✅ **Automatic updates** from gas-boilerplate  
✅ **Version control** - lock to specific versions  
✅ **Shared functionality** across projects  
✅ **Easy maintenance** - update once, use everywhere  

## 🎉 You're ready!

Now your project has access to all the gas-boilerplate functionality through the `system` submodule!
