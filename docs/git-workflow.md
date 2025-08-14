# Git Workflow Guide

## 🚀 Overview

This project follows a structured Git workflow for managing Google Apps Script projects and system updates.

## 📁 Repository Structure

### Main Repository (`gas-boilerplate`)
- **Purpose**: Template and boilerplate for new projects
- **Contains**: System files, templates, utilities, documentation
- **Updates**: Regular improvements and new features

### Live Projects
- **Purpose**: Active Google Apps Script projects
- **Contains**: Project-specific code and configuration
- **Updates**: Pull from main repository for system improvements

## 🔄 Update Workflow

### 1. Check for Updates
```bash
make update
```
This command:
- Checks the main `gas-boilerplate` repository
- Compares versions
- Shows available updates

### 2. Apply Updates
```bash
make upgrade
```
This command:
- Stashes local changes
- Pulls latest updates
- Resolves conflicts automatically
- Restores local changes

### 3. Manual Update Process
If automatic updates fail:
```bash
# Stash local changes
git stash

# Pull latest updates
git pull origin main

# Restore local changes
git stash pop

# Resolve conflicts if any
# Edit conflicted files
git add .
git commit -m "Resolve merge conflicts"
```

## 🌿 Branch Strategy

### Main Branch (`main`)
- **Purpose**: Stable, production-ready code
- **Protection**: No direct commits
- **Updates**: Only via Pull Requests

### Feature Branches
- **Naming**: `feature/description`
- **Purpose**: New features and improvements
- **Workflow**: Create → Develop → Test → PR → Merge

### Hotfix Branches
- **Naming**: `hotfix/issue-description`
- **Purpose**: Critical bug fixes
- **Workflow**: Create → Fix → Test → PR → Merge

## 📝 Commit Guidelines

### Commit Message Format
```
type(scope): description

[optional body]

[optional footer]
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Test additions/changes
- `chore`: Build/tooling changes

### Examples
```
feat(cli): add new extract command
fix(auth): resolve authentication timeout
docs(readme): update installation steps
refactor(utils): simplify config validation
```

## 🔀 Pull Request Process

### 1. Create Feature Branch
```bash
git checkout -b feature/amazing-feature
```

### 2. Make Changes
- Write code
- Add tests
- Update documentation
- Follow coding standards

### 3. Test Changes
```bash
npm test
npm run build
```

### 4. Commit and Push
```bash
git add .
git commit -m "feat: add amazing feature"
git push origin feature/amazing-feature
```

### 5. Create Pull Request
- Use the [PR Template](.github/PULL_REQUEST_TEMPLATE.md)
- Describe changes clearly
- Link related issues
- Request reviews

### 6. Code Review
- Address review comments
- Make requested changes
- Ensure all checks pass

### 7. Merge
- Squash commits if needed
- Delete feature branch
- Update documentation

## 🚨 Conflict Resolution

### Common Conflicts
1. **Package.json**: Dependencies and scripts
2. **Configuration files**: Settings and paths
3. **Documentation**: README and docs updates

### Resolution Steps
1. **Identify conflicts**: `git status`
2. **Open conflicted files**: Look for `<<<<<<<` markers
3. **Resolve manually**: Choose correct version or merge
4. **Test resolution**: `npm test`
5. **Commit resolution**: `git add . && git commit`

## 📊 Version Management

### Semantic Versioning
- **Major**: Breaking changes
- **Minor**: New features (backward compatible)
- **Patch**: Bug fixes (backward compatible)

### Release Process
```bash
# Patch release
npm run release:patch

# Minor release
npm run release:minor

# Major release
npm run release:major

# Preview release
npm run release:preview
```

## 🔐 Security Considerations

### Sensitive Files
- **Never commit**: `key.json`, `.env`, credentials
- **Use**: `.gitignore` to exclude sensitive files
- **Store**: Credentials securely (password managers, vaults)

### Access Control
- **Repository**: Private or restricted access
- **Collaborators**: Limited to trusted developers
- **Reviews**: Required for all changes

## 📚 Best Practices

### Code Quality
- Write clear, readable code
- Add comprehensive tests
- Follow TypeScript best practices
- Use meaningful variable names

### Documentation
- Update README for new features
- Document breaking changes
- Keep examples current
- Maintain troubleshooting guides

### Testing
- Test all new functionality
- Ensure backward compatibility
- Run full test suite before commits
- Test on different environments

## 🆘 Troubleshooting

### Common Issues
1. **Merge conflicts**: Use `git status` and resolve manually
2. **Update failures**: Check network and permissions
3. **Build errors**: Verify dependencies and TypeScript config

### Getting Help
- Check logs: `make logs`
- Validate config: `make validate`
- Review documentation: `docs/README.md`
- Create issue: Use [Issue Template](.github/ISSUE_TEMPLATE.md)

## 🎯 Quick Reference

### Essential Commands
```bash
make update              # Check for updates
make upgrade             # Apply updates
make validate            # Validate configuration
make test                # Run tests
npm run build            # Build TypeScript
git status               # Check repository status
git log --oneline        # View commit history
```

### Workflow Summary
1. **Develop** → Feature branch
2. **Test** → Local testing
3. **Commit** → Meaningful messages
4. **Push** → Feature branch
5. **PR** → Pull request with template
6. **Review** → Address feedback
7. **Merge** → Main branch
8. **Update** → Live projects
