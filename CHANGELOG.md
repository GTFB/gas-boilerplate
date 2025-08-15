# Changelog

## [1.4.2] - 2025-08-15

### 🐛 Bug Fixes
- **Fixed tag creation**: Added comprehensive logging and verification for git tag creation
- **Fixed date handling**: Now automatically uses current system date instead of hardcoded dates
- **Enhanced error handling**: Better error messages and fallback mechanisms for tag creation

### 🔧 Technical Improvements
- **Dynamic date generation**: Added `getCurrentDate()` method for automatic date handling
- **Better logging**: Added detailed logging throughout the tag creation process
- **Tag verification**: Added verification step to confirm tag was created successfully
- **Content extraction**: Improved CHANGELOG.md parsing with better error handling

### 📝 Date Handling
- **CHANGELOG.md**: Now automatically uses current system date (YYYY-MM-DD format)
- **Version updates**: Dates are dynamically generated when updating versions
- **Consistent formatting**: All date formats now use ISO standard (YYYY-MM-DD)

---

## [1.4.0] - 2025-08-15
- **Interactive tag creation**: Added question "Create git tag? (y/N)" with default "No"
- **Smart tag descriptions**: Automatically extracts release description from CHANGELOG.md
- **Rich tag messages**: Tags now include detailed changelog content instead of just "Release vX.X.X"
- **Formatting cleanup**: Automatically converts markdown formatting to clean text for git tags
- **Fallback support**: Falls back to simple message if CHANGELOG.md cannot be read

### 🔧 Release Process Improvements
- **User choice**: Users can now choose whether to create tags or skip them
- **Better guidance**: Updated next steps based on user's tag creation choice
- **Content extraction**: Intelligent parsing of CHANGELOG.md sections for tag descriptions
- **Length limits**: Automatically truncates long descriptions to avoid git tag issues

### 📝 Tag Message Format
Tags now include:
- Release version header
- Cleaned changelog content
- Bullet points for features/fixes
- Automatic emoji cleanup
- Smart content truncation

---

## [1.3.19] - 2025-08-14

### 🔧 Release System Improvements
- **Fixed version bumping**: `make release` now updates versions in 3 places instead of 2
- **Added CHANGELOG.md support**: Version is now automatically updated in CHANGELOG.md
- **Enhanced create-release.ts**: Added `updateChangelogVersion` method for complete version synchronization
- **Better logging**: Added confirmation messages for all version updates

### 📝 Version Update Locations
Now `make release` updates versions in:
1. ✅ `package.json` - Node.js package version
2. ✅ `README.md` - Version badge in documentation
3. ✅ `CHANGELOG.md` - Version header in changelog

---

## [1.3.17] - 2025-08-13

### ✨ New Features
- **Direct project name support**: `make new projectname` now works without `name=` or `PROJECT=`
- **Pattern-based commands**: Added `new-%` rule for direct project creation
- **Simplified syntax**: Users can now run `make new leads` instead of `make new name=leads`

### 🔧 Makefile Improvements
- Replaced complex variable logic with simple pattern matching
- Updated help messages to show new direct syntax
- Added examples for all project management commands
- Improved error messages and user guidance

---

## [1.3.16] - 2025-08-12

---

## [1.3.4] - 2025-08-11

### 📚 Documentation Improvements
- Enhanced `SUBMODULE_SETUP.md` with detailed repository configuration guide
- Added comprehensive troubleshooting section for common repository issues
- Updated `QUICK_START.md` with step-by-step repository setup instructions
- Created new `REPOSITORY_EXAMPLES.md` with practical setup examples
- Improved `README.md` with better submodule setup instructions
- Added cross-references between documentation files

### 🔧 Repository Setup Enhancements
- Added detailed instructions for automatic and manual remote configuration
- Included examples for fixing common repository setup issues
- Added troubleshooting commands for repository connection problems
- Documented the complete workflow for setting up gas-boilerplate as submodule

### 📁 Documentation Reorganization
- Moved detailed guides to `docs/` folder for better organization
- Renamed files to use lowercase with hyphens (kebab-case)
- Updated all internal links and cross-references
- Created `docs/README.md` as documentation index
- Added navigation links between all documentation files

---

## [1.3.3] - 2025-08-14

### 🐛 Patch Release
- Automated release v1.3.3
- All tests passed
- Configuration validated

### Changed
- Version bumped to 1.3.3

---



## [1.3.2] - 2025-08-14

### 🐛 Patch Release
- Automated release v1.3.2
- All tests passed
- Configuration validated

### Changed
- Version bumped to 1.3.2

---



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
