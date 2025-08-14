# Contributing to Google Apps Script CLI

Thank you for your interest in contributing to the Google Apps Script CLI project! This document provides guidelines and information for contributors.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Git installed
- Basic knowledge of TypeScript
- Understanding of Google Apps Script

### Setup Development Environment
```bash
# Fork and clone the repository
git clone https://github.com/YOUR_USERNAME/gas-boilerplate.git
cd gas-boilerplate

# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test
```

## 📋 Contribution Guidelines

### What We're Looking For
- **Bug fixes** - Fix issues and improve stability
- **New features** - Add useful functionality
- **Documentation** - Improve guides and examples
- **Testing** - Add tests and improve coverage
- **Performance** - Optimize existing code
- **Security** - Identify and fix vulnerabilities

### What NOT to Contribute
- **Breaking changes** without discussion
- **Large refactoring** without prior approval
- **New dependencies** without justification
- **Platform-specific** code without cross-platform support

## 🔧 Development Workflow

### 1. Create an Issue
- Check existing issues first
- Use the [Issue Template](.github/ISSUE_TEMPLATE.md)
- Describe the problem or feature clearly
- Include steps to reproduce if applicable

### 2. Fork and Clone
```bash
# Fork on GitHub first, then:
git clone https://github.com/YOUR_USERNAME/gas-boilerplate.git
cd gas-boilerplate
git remote add upstream https://github.com/ORIGINAL_OWNER/gas-boilerplate.git
```

### 3. Create Feature Branch
```bash
git checkout -b feature/your-feature-name
# or for bug fixes:
git checkout -b fix/issue-description
```

### 4. Make Changes
- Follow the [coding standards](#coding-standards)
- Write tests for new functionality
- Update documentation as needed
- Keep commits focused and atomic

### 5. Test Your Changes
```bash
# Run the test suite
npm test

# Build the project
npm run build

# Test specific functionality
npm run validate
```

### 6. Commit Changes
```bash
git add .
git commit -m "feat: add new feature description"
```

**Commit Message Format:**
```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Test additions/changes
- `chore`: Build/tooling changes

**Examples:**
```
feat(cli): add new extract command
fix(auth): resolve authentication timeout
docs(readme): update installation steps
refactor(utils): simplify config validation
```

### 7. Push and Create Pull Request
```bash
git push origin feature/your-feature-name
```

- Use the [PR Template](.github/PULL_REQUEST_TEMPLATE.md)
- Link related issues
- Describe changes clearly
- Request reviews from maintainers

## 📝 Coding Standards

### TypeScript
- Use TypeScript for all new code
- Define proper interfaces and types
- Use ES6+ features when appropriate
- Follow TypeScript best practices

### Code Style
- Use meaningful variable and function names
- Add JSDoc comments for public APIs
- Keep functions focused and small
- Use consistent indentation (2 spaces)

### Error Handling
- Always handle errors gracefully
- Use the logger for all operations
- Provide meaningful error messages
- Validate inputs before processing

### Testing
- Write tests for new functionality
- Ensure existing tests pass
- Use descriptive test names
- Test edge cases and error conditions

## 🏗️ Project Structure

### Source Code (`src/`)
```
src/
├── functions/          ← Processing functions
├── utils/             ← Utility functions
├── scripts/           ← Build and deployment
├── types/             ← TypeScript definitions
└── clasp-clone.ts     ← Main application
```

### Key Files
- `src/types/index.ts` - Centralized type definitions
- `src/functions/index.ts` - Function exports
- `src/utils/logger.ts` - Logging system
- `src/utils/config-validator.ts` - Configuration validation

### Adding New Functions
1. Create file in `src/functions/`
2. Export from `src/functions/index.ts`
3. Add to `commands.bat` if needed
4. Update documentation
5. Add tests

### Adding New Commands
1. Add to `commands.bat` with proper validation
2. Create corresponding TypeScript function
3. Update help text and examples
4. Test thoroughly

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run specific test file
npx ts-node src/test-system.ts

# Build and test
npm run build && npm test
```

### Writing Tests
- Test both success and failure cases
- Mock external dependencies
- Use descriptive test names
- Group related tests together

### Test Structure
```typescript
describe('Feature Name', () => {
  it('should do something specific', () => {
    // Test implementation
  });

  it('should handle errors gracefully', () => {
    // Error test
  });
});
```

## 📚 Documentation

### What to Document
- New features and functionality
- Configuration options
- API changes
- Breaking changes
- Troubleshooting steps

### Documentation Files
- `README.md` - Main project guide
- `docs/` - Detailed documentation
- `CHANGELOG.md` - Version history
- `CURSOR_RULES.md` - AI assistant rules

### Documentation Standards
- Use clear, concise language
- Include examples and code snippets
- Keep information up to date
- Use consistent formatting

## 🔄 Review Process

### Pull Request Review
1. **Automated Checks** - CI/CD pipeline runs
2. **Code Review** - Maintainers review code
3. **Testing** - Verify functionality works
4. **Documentation** - Ensure docs are updated
5. **Merge** - Approved changes are merged

### Review Criteria
- **Functionality** - Does it work as intended?
- **Code Quality** - Is the code clean and maintainable?
- **Testing** - Are there adequate tests?
- **Documentation** - Is the documentation updated?
- **Performance** - Does it perform well?
- **Security** - Are there security implications?

### Addressing Feedback
- Respond to review comments promptly
- Make requested changes
- Explain decisions if you disagree
- Ask for clarification if needed

## 🚀 Release Process

### Version Management
- Follow [Semantic Versioning](https://semver.org/)
- Major: Breaking changes
- Minor: New features (backward compatible)
- Patch: Bug fixes (backward compatible)

### Release Commands
```bash
# Patch release (bug fixes)
npm run release:patch

# Minor release (new features)
npm run release:minor

# Major release (breaking changes)
npm run release:major

# Preview release
npm run release:preview
```

### Release Checklist
- [ ] All tests pass
- [ ] Documentation is updated
- [ ] CHANGELOG.md is updated
- [ ] Version is bumped
- [ ] Git tags are created
- [ ] GitHub release is created

## 🆘 Getting Help

### Resources
- [Project README](README.md)
- [Documentation](docs/)
- [Issue Tracker](https://github.com/ORIGINAL_OWNER/gas-boilerplate/issues)
- [Discussions](https://github.com/ORIGINAL_OWNER/gas-boilerplate/discussions)

### Communication
- **Issues**: Use GitHub issues for bugs and feature requests
- **Discussions**: Use GitHub discussions for questions and ideas
- **Pull Requests**: Use PRs for code contributions
- **Security**: Report security issues privately to maintainers

### Community Guidelines
- Be respectful and inclusive
- Help others when possible
- Follow the project's code of conduct
- Provide constructive feedback

## 📋 Contributor Checklist

Before submitting your contribution, ensure you have:

- [ ] Read and understood this guide
- [ ] Followed the coding standards
- [ ] Written tests for new functionality
- [ ] Updated documentation as needed
- [ ] Tested your changes thoroughly
- [ ] Used appropriate commit messages
- [ ] Created a descriptive pull request
- [ ] Linked related issues

## 🎉 Recognition

Contributors are recognized in several ways:
- **Contributors list** on GitHub
- **CHANGELOG.md** entries
- **Release notes** for significant contributions
- **Special thanks** for major contributions

## 📄 License

By contributing to this project, you agree that your contributions will be licensed under the same license as the project (MIT License).

---

Thank you for contributing to the Google Apps Script CLI project! Your contributions help make this tool better for everyone.
