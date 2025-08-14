# Scripts Directory

This directory contains automation scripts for the Google Apps Script CLI project.

## 🚀 Release Automation

### `create-release.js`
Automated script for creating Git tags and GitHub releases.

**Usage:**
```bash
# Create patch release (1.0.0 → 1.0.1)
node scripts/create-release.js patch

# Create minor release (1.0.0 → 1.1.0)
node scripts/create-release.js minor

# Create major release (1.0.0 → 2.0.0)
node scripts/create-release.js major

# Create preview release (1.0.0 → 1.0.1-beta.1)
node scripts/create-release.js preview
```

**What it does:**
1. ✅ Runs tests to ensure quality
2. ✅ Validates configuration
3. ✅ Updates package.json version
4. ✅ Updates CHANGELOG.md
5. ✅ Creates Git commit
6. ✅ Creates Git tag
7. ✅ Pushes to remote
8. 🎉 Triggers GitHub Actions for automatic release

### NPM Scripts
```bash
npm run release:patch    # Patch release
npm run release:minor    # Minor release
npm run release:major    # Major release
npm run release:preview  # Preview release
```

### Make Commands
```bash
make release             # Patch release
make release patch       # Patch release
make release minor       # Minor release
make release major       # Major release
make release preview     # Preview release
```

## 🔄 GitHub Actions Integration

When you push a tag (e.g., `v1.0.1`), GitHub Actions automatically:
- Runs tests
- Validates configuration
- Creates a GitHub release
- Generates release notes

## 📋 Release Types

- **Patch** (1.0.0 → 1.0.1): Bug fixes, small improvements
- **Minor** (1.0.0 → 1.1.0): New features, backward compatible
- **Major** (1.0.0 → 2.0.0): Breaking changes, major updates
- **Preview** (1.0.0 → 1.0.1-beta.1): Pre-release versions

## 🎯 Best Practices

1. **Always test before release**: `make test`
2. **Validate configuration**: `make validate`
3. **Use semantic versioning**: Follow semver.org
4. **Update CHANGELOG**: Document all changes
5. **Test release process**: Use preview releases for testing

## 🚨 Prerequisites

- Clean working directory (no uncommitted changes)
- All tests must pass
- Configuration must be valid
- Git remote configured
- GitHub Actions enabled
