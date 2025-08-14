# 🚀 Releases and Updates

Complete guide to the release system and update workflow in the Google Apps Script CLI.

## 📦 Release System

### Overview
The system includes comprehensive release automation that handles:
- Version management with semantic versioning
- Automatic Git operations (add, commit, push)
- Changelog updates
- Release package creation

### Release Types

#### Patch Release (`make release` or `make patch`)
- **Format**: 1.0.0 → 1.0.1
- **Use case**: Bug fixes, minor corrections
- **Command**: `make release` or `make patch`

#### Minor Release (`make minor`)
- **Format**: 1.0.0 → 1.1.0
- **Use case**: New features, backward compatible
- **Command**: `make minor`

#### Major Release (`make major`)
- **Format**: 1.0.0 → 2.0.0
- **Use case**: Breaking changes, major features
- **Command**: `make major`

#### Preview Release (`make preview`)
- **Format**: 1.0.0 → 1.0.1-beta.1
- **Use case**: Testing, pre-release versions
- **Command**: `make preview`

### Release Workflow

#### 1. Automatic Git Operations
Every release command automatically performs:
```bash
git add .                                    # Stage all changes
git commit -m "feat: [type] release - [timestamp]"  # Commit with timestamp
git push origin main                         # Push to remote
```

#### 2. Release Package Creation
After Git operations, the system:
- Runs configuration validation
- Creates new version number
- Updates `package.json`
- Updates `CHANGELOG.md`
- Creates Git tag
- Pushes tags to remote

#### 3. GitHub Release
- Git tags are created automatically
- GitHub releases can be created manually from tags
- Or automatically via GitHub CLI (if configured)

### Release Commands

#### Quick Release
```bash
make release              # Creates patch release
```

#### Specific Release Types
```bash
make patch                # Patch release (1.0.0 → 1.0.1)
make minor                # Minor release (1.0.0 → 1.1.0)
make major                # Major release (1.0.0 → 2.0.0)
make preview              # Preview release (1.0.0 → 1.0.1-beta.1)
```

#### NPM Scripts (Alternative)
```bash
npm run release:patch     # Patch release
npm run release:minor     # Minor release
npm run release:major     # Major release
npm run release:preview   # Preview release
```

#### Direct Script Execution
```bash
npx ts-node src/scripts/create-release.ts patch
npx ts-node src/scripts/create-release.ts minor
npx ts-node src/scripts/create-release.ts major
npx ts-node src/scripts/create-release.ts preview
```

## 🔄 Update System

### Overview
The system includes a smart version updater that:
- Detects updates from the gas-boilerplate repository
- Safely applies updates without losing local work
- Manages dependencies and configuration
- Handles merge conflicts automatically

### Update Workflow

#### 1. Check for Updates
```bash
make update              # Check for available updates
```

**What it does:**
- Fetches latest changes from upstream
- Compares versions
- Shows available updates
- Reports update status

#### 2. Apply Updates
```bash
make upgrade             # Apply available updates
```

**What it does:**
- Automatically stashes local changes
- Downloads new files from upstream
- Updates dependencies
- Resolves merge conflicts
- Restores local changes
- Validates system after update

#### 3. Verify System
```bash
make validate            # Verify system after update
```

**What it does:**
- Checks configuration files
- Validates paths and connections
- Reports any issues
- Ensures system health

### Update Commands

#### Check Update Status
```bash
make update              # Check for updates
```

#### Apply Updates
```bash
make upgrade             # Apply updates
```

#### Manual Update Commands
```bash
# Check update status
npx ts-node src/utils/version-updater.ts check

# Apply updates
npx ts-node src/utils/version-updater.ts update

# Show update status
npx ts-node src/utils/version-updater.ts status
```

### Update Safety Features

#### Automatic Stashing
- Local changes are automatically saved
- No work is lost during updates
- Changes are restored after update

#### Conflict Resolution
- Merge conflicts are handled automatically
- System remains functional after conflicts
- User is notified of any issues

#### Validation
- System is validated after each update
- Configuration is checked
- Dependencies are verified

## 📝 Changelog Management

### Automatic Updates
The release system automatically updates `CHANGELOG.md` with:
- Release version and date
- Release type description
- Automated release notes
- Structured format

### Changelog Format
```markdown
## [1.2.1] - 2025-08-14

### 🐛 Patch Release
- Automated release v1.2.1
- All tests passed
- Configuration validated

### Changed
- Version bumped to 1.2.1

---
```

### Manual Changelog Updates
You can manually edit `CHANGELOG.md` to add:
- Detailed feature descriptions
- Breaking changes
- Migration notes
- Contributor information

## 🔧 Release Configuration

### Package.json Updates
- Version number is automatically updated
- Dependencies are preserved
- Scripts remain unchanged

### Git Configuration
- Tags are created automatically
- Commits use standardized messages
- Push operations are automated

### Environment Variables
- `GOOGLE_APPLICATION_CREDENTIALS` must be set
- Git credentials must be configured
- Repository access must be verified

## 🚨 Troubleshooting Releases

### Common Issues

#### "Working directory is not clean"
**Solution:**
```bash
git add .
git commit -m "Your changes"
make release
```

#### "Configuration validation failed"
**Solution:**
```bash
make validate              # Check configuration
# Fix any issues reported
make release               # Try again
```

#### "Git push failed"
**Solution:**
```bash
git remote -v              # Check remote configuration
git status                 # Check git status
# Ensure you have push access
```

### Release Validation

#### Before Release
```bash
make validate              # Validate configuration
git status                 # Check git status
make test-repos            # Test repository access
```

#### After Release
```bash
git log --oneline -5       # Check recent commits
git tag -l                 # List tags
git remote -v              # Verify remotes
```

## 📊 Release Statistics

### Version History
- Follows semantic versioning (SemVer)
- Automatic version calculation
- Consistent release numbering

### Release Frequency
- Patch releases: As needed for fixes
- Minor releases: For new features
- Major releases: For breaking changes
- Preview releases: For testing

### Quality Gates
- Configuration validation
- System health checks
- Git status verification
- Automatic testing

## 🔗 Related Documentation

- **[📚 Commands Reference](commands-reference.md)** - All available commands
- **[🚀 Quick Start](QUICK_START.md)** - Getting started guide
- **[📋 Repository Setup](repository-setup.md)** - Repository configuration
- **[🏗️ Architecture](architecture.md)** - System architecture
