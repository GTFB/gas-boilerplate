# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
- HTML data extraction from ff.html files
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
