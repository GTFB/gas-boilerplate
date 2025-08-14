# 📚 Commands Reference

Complete reference for all available commands in the Google Apps Script CLI system.

## 🚀 Release Commands

### `make release`
Creates a patch release with automatic git operations:
- `git add .`
- `git commit -m "feat: patch release - [timestamp]"`
- `git push origin main`
- Creates release package via `create-release.ts`

**Aliases:**
- `make patch` - Same as `make release`

### `make minor`
Creates a minor release (1.0.0 → 1.1.0):
- Same git operations as patch
- Updates version in `package.json`
- Updates `CHANGELOG.md`

### `make major`
Creates a major release (1.0.0 → 2.0.0):
- Same git operations as patch
- Updates version in `package.json`
- Updates `CHANGELOG.md`

### `make preview`
Creates a preview release (1.0.0 → 1.0.1-beta.1):
- Same git operations as patch
- Creates beta version
- Updates `CHANGELOG.md`

## 📁 Project Management Commands

### `make clone PROJECT=name`
Clones a project from Google Apps Script:
- Downloads all project files
- Creates project structure
- Adds project to `projects.json`
- **Requires `SCRIPT_ID` in `projects.json`**

**Important**: Before running `make clone`, you must:
1. Run `make new PROJECT=name` to create project structure
2. Edit `projects.json` and add your Google Apps Script project ID
3. Then run `make clone PROJECT=name`

**Example:**
```bash
make clone PROJECT=myproject
```

### `make pull PROJECT=name`
Downloads latest changes from Google Apps Script:
- Fetches current project state
- Updates local files
- Preserves local changes

**Example:**
```bash
make pull PROJECT=myproject
```

### `make push PROJECT=name`
Uploads local changes to Google Apps Script:
- Sends modified files
- Updates project on Google's servers
- Requires authentication

**Example:**
```bash
make push PROJECT=myproject
```

### `make status PROJECT=name`
Shows project status:
- Current project state
- File modifications
- Connection status

**Example:**
```bash
make status PROJECT=myproject
```

### `make files PROJECT=name`
Extracts files from `files.html`:
- Parses HTML content
- Extracts structured data
- Creates JSON files

**Example:**
```bash
make files PROJECT=myproject
```

### `make new PROJECT=name`
Creates a new project structure:
- Creates project folders
- Copies templates
- Sets up basic structure

**Example:**
```bash
make new PROJECT=analytics
```

## 🔧 System Commands

### `make validate`
Validates system configuration:
- Checks config files
- Validates paths
- Tests connections
- Reports issues

### `make config`
Shows system configuration:
- Current settings
- Paths
- Project defaults

### `make logs`
Shows recent logs:
- Daily log files
- Recent activity
- Error tracking

### `make projects`
Lists all configured projects:
- Project names
- Script IDs
- Status information

### `make list`
Lists project directories:
- Shows available projects
- Excludes system folder
- Simple directory listing

## 🔄 Update Commands

### `make update`
Checks for updates from gas-boilerplate:
- Fetches from upstream
- Compares versions
- Shows available updates

### `make upgrade`
Applies updates from gas-boilerplate:
- Downloads new files
- Updates dependencies
- Preserves local changes

## 🏗️ Repository Setup Commands

### `make setup-repos [url]`
Sets up repository configuration:
- Renames origin to upstream
- Adds new origin for your repo
- Configures fork workflow

**Example:**
```bash
make setup-repos https://github.com/username/my-repo.git
```

### `make test-repos`
Tests repository connections:
- Verifies upstream access
- Tests origin connectivity
- Reports connection status

## 📋 Usage Examples

### Complete Workflow
```bash
# 1. Setup repositories
make setup-repos https://github.com/username/my-repo.git
make test-repos

# 2. Create project structure
make new PROJECT=myproject

# 3. Add SCRIPT_ID to projects.json
# Edit projects.json and add your Google Apps Script project ID

# 4. Clone existing project
make clone PROJECT=myproject

# 5. Download changes
make pull PROJECT=myproject

# 6. Edit code
# ... your work ...

# 7. Upload changes
make push PROJECT=myproject

# 8. Create release
make release
```

### Project Management
```bash
# List all projects
make projects

# Check project status
make status PROJECT=myproject

# Extract files
make files PROJECT=myproject

# Validate system
make validate
```

### System Updates
```bash
# Check for updates
make update

# Apply updates
make upgrade

# Verify system
make validate
```

## 🔍 Troubleshooting Commands

### Common Issues
```bash
# Configuration problems
make validate              # Check system config
make config                # Show current settings

# Connection issues
make test-repos            # Test repository access
make projects              # List project status

# Log analysis
make logs                  # View recent activity
```

## 📖 Help and Information

### `make help`
Shows all available commands:
- Command categories
- Usage examples
- Quick reference

## ⚠️ Important Notes

1. **PROJECT Parameter**: Always use `PROJECT=name` format, not `[name]`
2. **Authentication**: Ensure `key.json` is properly configured
3. **Working Directory**: Run commands from the `system` folder
4. **Git Status**: Ensure clean working directory before releases
5. **Dependencies**: Run `npm install` after cloning or updates

## 🔗 Related Documentation

- **[🚀 Quick Start](QUICK_START.md)** - Getting started guide
- **[📋 Repository Setup](repository-setup.md)** - Repository configuration
- **[🏗️ Architecture](architecture.md)** - System architecture
- **[🔍 Troubleshooting](troubleshooting.md)** - Problem solving
