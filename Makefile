# Makefile for gas-boilerplate project
# Works on Windows with Chocolatey make
# Unified interface for all commands

.PHONY: help release patch minor major preview setup-repos test-repos clone pull push status list projects files validate logs config update upgrade new bump-version

# Default target
help:
	@echo "Available commands:"
	@echo ""
	@echo "Release commands:"
	@echo "  make release     - create patch release"
	@echo "  make patch       - create patch release"
	@echo "  make minor       - create minor release"
	@echo "  make major       - create major release"
	@echo "  make preview     - create preview release"
	@echo ""
	@echo "Repository commands:"
	@echo "  make setup-repos [url] - setup upstream/origin repositories"
	@echo "  make test-repos        - test repository connections"
	@echo ""
	@echo "Project management commands:"
	@echo "  make clone PROJECT=name     - clone project"
	@echo "  make pull PROJECT=name      - download changes"
	@echo "  make push PROJECT=name      - upload changes"
	@echo "  make status PROJECT=name    - show status"
	@echo "  make files PROJECT=name     - extract files from files.html"
	@echo "  make new PROJECT=name       - create new project (with templates)"
	@echo "  make list                   - list projects"
	@echo "  make projects               - show all configured projects"
	@echo ""
	@echo "System commands:"
	@echo "  make update              - check for updates from gas-boilerplate"
	@echo "  make upgrade             - update from gas-boilerplate"
	@echo "  make validate            - validate configuration"
	@echo "  make logs                - show recent logs"
	@echo "  make config              - show configuration"
	@echo ""
	@echo "Examples:"
	@echo "  make clone PROJECT=myproject"
	@echo "  make pull PROJECT=analytics"
	@echo "  make release"
	@echo "  make patch"
	@echo "  make setup-repos REPO_URL=https://github.com/username/ayva.git"

# Version bumping function
bump-version:
	@echo "🔄 Bumping version..."
	@node -e "const fs = require('fs'); const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8')); const currentVersion = pkg.version; const parts = currentVersion.split('.'); const patch = parseInt(parts[2]) + 1; const newVersion = parts[0] + '.' + parts[1] + '.' + patch; console.log('Current version:', currentVersion); console.log('New version:', newVersion); pkg.version = newVersion; fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2)); console.log('✅ Version bumped in package.json'); const readme = fs.readFileSync('README.md', 'utf8'); const updatedReadme = readme.replace(/Version-\d+\.\d+\.\d+/g, 'Version-' + newVersion); fs.writeFileSync('README.md', updatedReadme); console.log('✅ Version bumped in README.md');"

# Release commands
release: patch

patch:
	@echo "Creating patch release..."
	@echo "📦 Creating release package..."
	npx ts-node src/scripts/create-release.ts

minor:
	@echo "Creating minor release..."
	@echo "📦 Creating release package..."
	npx ts-node src/scripts/create-release.ts

major:
	@echo "Creating major release..."
	@echo "📦 Creating release package..."
	npx ts-node src/scripts/create-release.ts

preview:
	@echo "Creating preview release..."
	@echo "📦 Creating release package..."
	npx ts-node src/scripts/create-release.ts

# Repository setup commands
setup-repos:
	@echo "Setting up repositories..."
	npx ts-node src/scripts/setup-repos.ts setup $(REPO_URL)

%:
	@:

test-repos:
	@echo "Testing repository connections..."
	npx ts-node src/scripts/setup-repos.ts test

# Project management commands
clone:
	@if "$(PROJECT)"=="" ( \
		echo "ERROR: Specify project name: make clone PROJECT=name" && \
		echo "Example: make clone PROJECT=myproject" && \
		exit /b 1 \
	)
	@echo "Cloning project: $(PROJECT)"
	@if exist "..\$(PROJECT)" ( \
		echo "ERROR: Project $(PROJECT) already exists!" && \
		exit /b 1 \
	)
	@echo "Creating project structure and adding to configuration..."
	npx ts-node src/clasp-clone.ts clone $(PROJECT)

pull:
	@if "$(PROJECT)"=="" ( \
		echo "ERROR: Specify project name: make pull PROJECT=name" && \
		echo "Example: make pull PROJECT=myproject" && \
		exit /b 1 \
	)
	@echo "Downloading changes for project: $(PROJECT)"
	npx ts-node src/clasp-clone.ts pull $(PROJECT)

push:
	@if "$(PROJECT)"=="" ( \
		echo "ERROR: Specify project name: make push PROJECT=name" && \
		echo "Example: make push PROJECT=myproject" && \
		exit /b 1 \
	)
	@echo "Uploading changes for project: $(PROJECT)"
	npx ts-node src/clasp-clone.ts push $(PROJECT)

status:
	@if "$(PROJECT)"=="" ( \
		echo "ERROR: Specify project name: make status PROJECT=name" && \
		echo "Example: make status PROJECT=myproject" && \
		exit /b 1 \
	)
	@echo "Project status for: $(PROJECT)"
	npx ts-node src/clasp-clone.ts list $(PROJECT)

files:
	@if "$(PROJECT)"=="" ( \
		echo "ERROR: Specify project name: make files PROJECT=name" && \
		echo "Example: make files PROJECT=myproject" && \
		exit /b 1 \
	)
	@echo "Extracting files from project: $(PROJECT)"
	npx ts-node src/functions/extract-files.ts $(PROJECT)

new:
	@if "$(PROJECT)"=="" ( \
		echo "ERROR: Specify project name: make new PROJECT=name" && \
		echo "Example: make new PROJECT=analytics" && \
		exit /b 1 \
	)
	@echo "Creating new project: $(PROJECT)"
	@if exist "..\$(PROJECT)" ( \
		echo "ERROR: Project $(PROJECT) already exists!" && \
		exit /b 1 \
	)
	@echo "Creating folder structure..."
	@if not exist "..\$(PROJECT)" mkdir "..\$(PROJECT)"
	@if not exist "..\$(PROJECT)\system" mkdir "..\$(PROJECT)\system"
	@if not exist "..\$(PROJECT)\files" mkdir "..\$(PROJECT)\files"
	@echo "Copying service account..."
	@if exist "key.json" ( \
		copy "key.json" "..\$(PROJECT)\system\" && \
		echo "✅ Service account copied" \
	) else ( \
		echo "⚠️  key.json not found (copy manually if needed)" \
	)
	@echo "Copying project templates..."
	@if exist "templates\appsscript.json" ( \
		copy "templates\appsscript.json" "..\$(PROJECT)\system\" && \
		echo "✅ Project template copied" \
	) else ( \
		echo "⚠️  appsscript.json template not found (copy manually if needed)" \
	)
	@echo "SUCCESS: Project $(PROJECT) created!"
	@echo ""
	@echo "Project structure:"
	@echo "  ../$(PROJECT)/"
	@echo "  ├── system/          - system files"
	@echo "  └── files/           - project files"
	@echo ""
	@echo "Next steps:"
	@echo "  1. cd ../$(PROJECT)"
	@echo "  2. cd ../system"
	@echo "  3. make clone PROJECT=$(PROJECT)  - clone project"
	@echo "  4. cd ../$(PROJECT)"
	@echo "  5. cd ../system"
	@echo "  6. make pull PROJECT=$(PROJECT)   - download files"
	@echo "  7. Edit code"
	@echo "  8. make push PROJECT=$(PROJECT)   - upload changes"
	@echo ""
	@echo "Use commands from system folder:"
	@echo "  make help            - show all commands"
	@echo "  make clone PROJECT=name   - clone"
	@echo "  make pull PROJECT=name    - download"
	@echo "  make push PROJECT=name    - upload"
	@echo "  make status PROJECT=name  - status"
	@echo "  make projects        - project list"

list:
	@echo "Project list:"
	@for /d %%d in (..\*) do ( \
		if not "%%d"=="..\system" ( \
			echo   %%~nxd \
		) \
	)
	@echo ""
	@echo "To clone: make clone PROJECT=name"

projects:
	@echo "Showing all configured projects:"
	npx ts-node src/clasp-clone.ts projects

# System commands
update:
	@echo "Checking for updates from gas-boilerplate..."
	npx ts-node src/utils/version-updater.ts check

upgrade:
	@echo "Updating system..."
	npx ts-node src/utils/version-updater.ts update

validate:
	@echo "Validating system configuration..."
	npx ts-node src/utils/config-validator.ts

logs:
	@echo "Showing recent logs..."
	@for /f "tokens=1-3 delims=/" %%a in ('date /t') do set today=%%a
	@if exist "logs\%%today%%.md" ( \
		type "logs\%%today%%.md" \
	) else ( \
		echo "No logs found for today" \
	)

config:
	@echo "System configuration:"
	@node -e "const fs = require('fs'); const config = JSON.parse(fs.readFileSync('config.json', 'utf8')); console.log('Default project:', config.defaultProject); console.log('Projects path:', config.projectsPath); console.log('System path:', config.systemPath); console.log('Logs path:', config.logsPath);"


