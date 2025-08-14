# Git Workflow & Version Updates

## 🚀 Initial Setup

### 1. Create Repository
```bash
# Create new repository on GitHub
# Name: gas-boilerplate
# Description: Google Apps Script CLI boilerplate
# Public/Private: Your choice
```

### 2. Initialize Git
```bash
cd system
git init
git add .
git commit -m "Initial commit: Google Apps Script CLI boilerplate"
git branch -M main
git remote add origin https://github.com/yourusername/gas-boilerplate.git
git push -u origin main
```

## 📥 Using in Live Projects

### 1. Clone Boilerplate
```bash
git clone https://github.com/yourusername/gas-boilerplate.git myproject
cd myproject
npm install
```

### 2. Configure for Your Project
- Edit `projects.json` - add your project IDs
- Edit `config.json` - set default project
- Place your `key.json` in the system folder

## 🔄 Updating Live Projects

### Check for Updates
```bash
make update
# or
npm run update check
```

### Apply Updates
```bash
make upgrade
# or
npm run update
```

### Check Update Status
```bash
node utils/version-updater.js status
```

## 🔧 Update System Features

### Automatic Features
- ✅ **Git Integration** - Detects if project is connected to gas-boilerplate
- ✅ **Smart Stashing** - Automatically stashes local changes before update
- ✅ **Dependency Management** - Runs `npm install` after update
- ✅ **Validation** - Runs system validation after update
- ✅ **Conflict Resolution** - Attempts to restore stashed changes
- ✅ **Update Logging** - Creates detailed update logs

### Manual Override
```bash
# Force update (ignores local changes)
git fetch origin
git reset --hard origin/main
npm install

# Check what changed
git log HEAD..origin/main --oneline
```

## 📋 Update Workflow

### 1. Development Cycle
```
gas-boilerplate (main repo)
    ↓ (develop new features)
    ↓ (commit & push)
    ↓
Live Project A ← make upgrade
Live Project B ← make upgrade
Live Project C ← make upgrade
```

### 2. Update Process
```
1. make update          ← Check for updates
2. make upgrade         ← Apply updates
3. Review changes       ← Check what was updated
4. Test system          ← make validate
5. Continue work        ← Your project continues
```

## 🚨 Troubleshooting

### Update Fails
```bash
# Check git status
git status

# Check remote connection
git remote -v

# Manual update
git fetch origin
git pull origin main
npm install
```

### Conflicts After Update
```bash
# Check stashed changes
git stash list

# Apply stashed changes
git stash pop

# Resolve conflicts manually if needed
```

### Not Connected to gas-boilerplate
```bash
# Check remote URL
git remote get-url origin

# Should contain: gas-boilerplate
# If not, update system manually or re-clone
```

## 📊 Update Logs

Updates are logged in `logs/updates.md`:
```markdown
## 1.1.0 - 2025-01-14T10:30:00.000Z
- Updated from 1.0.0
- Source: gas-boilerplate
- Status: Success

## 1.0.1 - 2025-01-13T15:45:00.000Z
- Updated from 1.0.0
- Source: gas-boilerplate
- Status: Success
```

## 🔐 Security Notes

- `key.json` is excluded from Git (see `.gitignore`)
- Service account credentials are never committed
- Each project maintains its own `key.json`
- Update system preserves local project configuration

## 📚 Best Practices

### For gas-boilerplate Repository
1. **Semantic Versioning** - Use proper version numbers
2. **Changelog** - Document all changes in `CHANGELOG.md`
3. **Testing** - Test updates before pushing to main
4. **Documentation** - Keep docs up to date

### For Live Projects
1. **Regular Updates** - Check for updates weekly
2. **Backup** - Commit local changes before updating
3. **Testing** - Test system after each update
4. **Logging** - Monitor update logs for issues

## 🆘 Getting Help

- **Update Issues**: Check `logs/updates.md`
- **Git Problems**: Use `git status` and `git log`
- **System Issues**: Run `make validate`
- **Documentation**: See `docs/README.md`
