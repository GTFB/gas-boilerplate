# Changelog

## [1.3.1] - 2025-08-14

### 🐛 Patch Release
- Automated release v1.3.1
- All tests passed
- Configuration validated

### Changed
- Version bumped to 1.3.1

---



## [1.3.0] - 2025-08-14

### ✨ Minor Release
- Automated release v1.3.0
- All tests passed
- Configuration validated

### Changed
- Version bumped to 1.3.0

---



## [1.2.14] - 2025-08-14

### 🐛 Patch Release
- Automated release v1.2.14
- All tests passed
- Configuration validated

### Changed
- Version bumped to 1.2.14

---



## [1.2.13] - 2025-08-14

### 🐛 Patch Release
- Automated release v1.2.13
- All tests passed
- Configuration validated

### Changed
- Version bumped to 1.2.13

---



## [1.2.12] - 2025-08-14

### 🐛 Patch Release
- Automated release v1.2.12
- All tests passed
- Configuration validated

### Changed
- Version bumped to 1.2.12

---



## [1.2.11] - 2025-08-14

### 🐛 Patch Release
- Automated release v1.2.11
- All tests passed
- Configuration validated

### Changed
- Version bumped to 1.2.11

---



## [1.2.10] - 2025-08-14

### 🐛 Patch Release
- Automated release v1.2.10
- All tests passed
- Configuration validated

### Changed
- Version bumped to 1.2.10

---



## [1.2.8] - 2025-08-14

### 🐛 Patch Release
- Automated release v1.2.8
- All tests passed
- Configuration validated

### Changed
- Version bumped to 1.2.8

---



## [1.2.7] - 2025-08-14

### 🐛 Patch Release
- Fixed Makefile for Windows compatibility
- Converted Bash syntax to PowerShell commands
- All targets now work on Windows with Chocolatey make

### Changed
- `new` target: Windows-compatible directory creation and file copying
- `clone`, `pull`, `push`, `status`, `files` targets: Windows-compatible parameter validation
- `list` target: Windows-compatible directory listing
- `logs` target: Windows-compatible date handling and file reading

### Added
- Windows PowerShell syntax support
- Cross-platform compatibility improvements

---

## [1.2.5] - 2025-08-14

### 🐛 Patch Release
- Automated release v1.2.5
- All tests passed
- Configuration validated

### Changed
- Version bumped to 1.2.5

---



## [1.2.4] - 2025-08-14

### 🐛 Patch Release
- Automated release v1.2.4
- All tests passed
- Configuration validated

### Changed
- Version bumped to 1.2.4

---



## [1.2.3] - 2025-08-14

### 🐛 Patch Release
- Automated release v1.2.3
- All tests passed
- Configuration validated

### Changed
- Version bumped to 1.2.3

---



## [1.2.2] - 2025-08-14

### 🐛 Patch Release
- Automated release v1.2.2
- All tests passed
- Configuration validated

### Changed
- Version bumped to 1.2.2

---



## [1.2.1] - 2025-08-14

### 🐛 Patch Release
- Automated release v1.2.1
- All tests passed
- Configuration validated

### Changed
- Version bumped to 1.2.1

---



All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2025-01-XX

### Changed
- **BREAKING**: Migrated entire codebase to TypeScript
- **BREAKING**: Restructured project layout with `src/` directory
- **BREAKING**: Renamed `ff.html` to `files.html` for clarity
- **BREAKING**: Updated `make ff` command to `make files`

### Added
- TypeScript support with `tsconfig.json`
- Type definitions in `src/types/index.ts`
- Enhanced test system with TypeScript validation
- GitHub templates for issues and pull requests
- Comprehensive contributing guidelines (`CONTRIBUTING.md`)
- Git workflow documentation (`docs/git-workflow.md`)
- Updated AI assistant rules for TypeScript
- Build system with npm scripts

### Improved
- Project structure and organization
- Code quality with static typing
- Documentation and examples
- Development workflow and guidelines
- Error handling and validation
- Test coverage and validation

### Removed
- Legacy JavaScript files
- Duplicate documentation files (`GIT_README.md`)
- Outdated project structure references

## [1.1.0] - 2025-08-14

### Added
- **Version Update System** - Automatic updates from gas-boilerplate repository
- **Smart Git Integration** - Detects repository connections and manages updates
- **Automatic Stashing** - Safely saves local changes before updates
- **Conflict Resolution** - Handles merge conflicts automatically
- **Update Logging** - Tracks all update operations in `logs/updates.md`
- **New Commands** - `make update` and `make upgrade` for version management
- **Git Workflow Guide** - Complete documentation in `GIT_README.md`

### Changed
- **Project Name** - Renamed to `gas-boilerplate` for Git repository
- **Package.json** - Added update scripts and repository information
- **Commands** - Added update commands to main command interface
- **Documentation** - Updated with Git integration and update system

### Fixed
- **Hardcoded References** - All project names now use generic examples
- **Configuration** - Standardized project structure and naming

## [1.0.0] - 2025-08-14

### Added
- Initial release of Google Apps Script CLI
- Git-style commands: clone, pull, push, status
- Utility commands: ff (extract files), validate, logs, config
- Admin commands: list, new, projects, help
- Service account authentication
- Automatic project structure creation
- HTML data extraction from index.html files
- Multi-level logging system
- Configuration validation
- Project templates

### Changed
- Removed all hardcoded project names
- Standardized project structure
- Unified command interface
- Improved error handling

### Fixed
- Hardcoded project references in commands.bat
- Hardcoded project references in make.bat
- Hardcoded file names in clasp-clone.js
- Configuration inconsistencies

## [0.9.0] - 2025-01-14

### Added
- Basic CLI functionality
- Google Apps Script API integration
- Project management commands

### Known Issues
- Hardcoded project names throughout system
- Inconsistent configuration
- Duplicate functionality between scripts
