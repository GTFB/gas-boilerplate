# 🚀 Quick Start - Step-by-Step Guide

## 📋 Prerequisites
- [Node.js 18+](https://nodejs.org/) installed
- Google Apps Script API enabled
- Service account key file (`key.json`) - see **[🔐 Google Cloud Setup](docs/google-cloud-setup.md)**

## 📋 What to do in order

### 1️⃣ **Create a folder for your project**
```bash
# Create a folder ayva (or any other name)
mkdir ayva
cd ayva
```

### 2️⃣ **Clone gas-boilerplate**
```bash
# Clone into system folder
git clone https://github.com/username/gas-boilerplate.git system
cd system
```

### 3️⃣ **Install dependencies**
```bash
# Install Node.js packages
npm install
```

### 4️⃣ **Create a repository on GitHub**
- Go to [GitHub.com](https://github.com)
- Create a new repository (for example, `ayva`)
- **DO NOT** initialize with README, .gitignore, or license
- Copy the repository URL

### 5️⃣ **Setup repositories**
```bash
# Insert your repository URL
make setup-repos https://github.com/your-username/ayva.git
```

### 6️⃣ **Test the setup**
```bash
# Make sure everything works
make test-repos
```

### 7️⃣ **Create your first project**
```bash
# Create project myproject
make new PROJECT=myproject

# Add SCRIPT_ID to projects.json
# Edit projects.json and add your Google Apps Script project ID

# Clone the project
make clone PROJECT=myproject
```

## ✅ What happens automatically

- ✅ **origin** will be renamed to **upstream** (for gas-boilerplate)
- ✅ **origin** will be set to your ayva repository
- ✅ System will check all connections
- ✅ Project folder structure will be created

## ⚠️ Important Note

**After `make new PROJECT=name`**, you must manually add the `SCRIPT_ID` to `projects.json` before running `make clone`. The `SCRIPT_ID` is the ID from your Google Apps Script project URL.

## 🔄 After setup

### Getting updates from gas-boilerplate
```bash
make update    # check for updates
make upgrade   # apply updates
```

### Sending changes to ayva
```bash
git add .
git commit -m "Your changes"
git push origin main
```

### Creating a release
```bash
make release   # automatically commits and pushes!
```

## 🆘 If something goes wrong

```bash
# Check current settings
git remote -v

# Check logs
make logs

# Check configuration
make config
```

## 📚 All commands

```bash
make help              # show all commands
make new PROJECT=name  # create new project
make release           # create release (auto-commit + push)
make setup-repos [url] # setup repositories
make test-repos        # test connections
```

## 🎯 Final structure

```
ayva/                          # Your project folder
├── system/                    # gas-boilerplate (system)
│   ├── Makefile              # All commands
│   ├── src/                  # Source code
│   └── docs/                 # Documentation
└── myproject/                # Your project
    ├── system/               # System files
    └── files/                # Project files
```

## 💡 Useful tips

1. **Always work from the `system` folder** to execute commands
2. **Use `make help`** to view all available commands
3. **`make release`** automatically does git add, commit and push
4. **Check logs** if something doesn't work: `make logs`

## 📖 Detailed documentation

- **[📋 Projects Configuration](docs/projects-configuration.md)** - How to configure projects.json with SCRIPT_ID
- **[📋 Repository Setup](docs/repository-setup.md)** - Detailed description of all capabilities
