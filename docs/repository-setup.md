# Repository Setup Guide

This document describes how to automatically configure repositories for working with gas-boilerplate.

## 🚀 Step-by-Step Guide

### Step 1: Create a folder for your project
```bash
# Create a folder for your project (for example, ayva)
mkdir ayva
cd ayva
```

### Step 2: Clone gas-boilerplate
```bash
# Clone gas-boilerplate into system folder
git clone https://github.com/username/gas-boilerplate.git system
cd system
```

### Step 3: Install dependencies
```bash
# Install Node.js dependencies
npm install
```

### Step 4: Setup repositories
```bash
# If you already have an ayva repository on GitHub
make setup-repos https://github.com/your-username/ayva.git

# If the ayva repository doesn't exist yet
make setup-repos
```

### Step 5: Test connection
```bash
# Verify that everything is configured correctly
make test-repos
```

## The Problem

By default, your project is configured so that `origin` points to `gas-boilerplate`. This means:
- `git push` sends changes to gas-boilerplate (which is not needed)
- `git pull` receives updates from gas-boilerplate (which is needed)

## Solution

Configure two repositories:
- **upstream** → gas-boilerplate (for receiving updates)
- **origin** → ayva (your repository for push)

## Automatic Setup

### 1. Repository Setup

```bash
# If you already have an ayva repository on GitHub
make setup-repos https://github.com/your-username/ayva.git

# If the ayva repository doesn't exist yet
make setup-repos
```

### 2. Connection Test

```bash
make test-repos
```

### 3. Manual Setup (if automatic doesn't work)

```bash
# Rename origin to upstream
git remote rename origin upstream

# Add new origin for ayva
git remote add origin https://github.com/your-username/ayva.git

# Check configuration
git remote -v
```

## Usage After Setup

### Receiving updates from gas-boilerplate

```bash
# Check for available updates
make update

# Apply updates
make upgrade

# Or manually
git pull upstream main
```

### Sending changes to ayva

```bash
# Add changes
git add .

# Make commit
git commit -m "Your commit message"

# Send to ayva
git push origin main
```

## Commands

| Command | Description |
|---------|-------------|
| `make new PROJECT=name` | Create new project (with templates) |
| `make setup-repos [url]` | Setup repositories |
| `make test-repos` | Test connections |
| `make update` | Check for updates |
| `make upgrade` | Apply updates |
| `make release` | Create release (automatically commits and pushes) |
| `make help` | Show all available commands |

## Repository Structure

```
upstream (gas-boilerplate)
    ↓ (receiving updates)
your local repository
    ↓ (sending changes)
origin (ayva)
```

## Troubleshooting

### Error "upstream not configured"

```bash
# Add upstream manually
git remote add upstream https://github.com/username/gas-boilerplate.git
```

### Error "origin not configured"

```bash
# Add origin for ayva
git remote add origin https://github.com/your-username/ayva.git
```

### Check current settings

```bash
git remote -v
```

## Logs

All operations are logged in the `logs/` folder. Check logs for problem diagnosis:

```bash
make logs
```

## Support

If you encounter problems:
1. Check logs: `make logs`
2. Check connections: `make test-repos`
3. Check configuration: `make config`
