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
	@echo "  make clone name             - clone project"
	@echo "  make clone-name             - clone project (alternative syntax)"
	@echo "  make pull name              - download changes"
	@echo "  make pull-name              - download changes (alternative syntax)"
	@echo "  make push name              - upload changes"
	@echo "  make push-name              - upload changes (alternative syntax)"
	@echo "  make status name            - show status"
	@echo "  make status-name            - show status (alternative syntax)"
	@echo "  make files name             - extract files from files.html"
	@echo "  make files-name             - extract files (alternative syntax)"
	@echo "  make new name               - create new project (with templates)"
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
	@echo "  make clone myproject"
	@echo "  make pull analytics"
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
	@echo "Cloning project: $(name)"
	@if exist "..\$(name)" ( \
		echo "ERROR: Project $(name) already exists!" && \
		exit /b 1 \
	)
	@echo "Creating project structure and adding to configuration..."
	npx ts-node src/gas.ts clone $(name)

clone-%:
	@echo "Cloning project: $*"
	@if exist "..\$*" ( \
		echo "ERROR: Project $* already exists!" && \
		exit /b 1 \
	)
	@echo "Creating project structure and adding to configuration..."
	npx ts-node src/gas.ts clone $*

pull:
	@echo "Downloading changes for project: $(name)"
	npx ts-node src/gas.ts pull $(name)

pull-%:
	@echo "Downloading changes for project: $*"
	npx ts-node src/gas.ts pull $*

push:
	@echo "Uploading changes for project: $(name)"
	npx ts-node src/gas.ts push $(name)

push-%:
	@echo "Uploading changes for project: $*"
	npx ts-node src/gas.ts push $*

status:
	@echo "Project status for: $(name)"
	npx ts-node src/gas.ts list

status-%:
	@echo "Project status for: $*"
	npx ts-node src/gas.ts list

files:
	@echo "Extracting files from project: $(name)"
	npx ts-node src/gas.ts files $(name)

files-%:
	@echo "Extracting files from project: $*"
	npx ts-node src/gas.ts files $*

new:
	@echo "Creating new project: $(name)"
	@node -e "const fs = require('fs'); const path = require('path'); const projectPath = path.resolve('../$(name)'); if (fs.existsSync(projectPath)) { console.log('ERROR: Project $(name) already exists!'); process.exit(1); }"
	@echo "Creating new project: $(name)"
	@node -e "const fs = require('fs'); const path = require('path'); const projectPath = path.resolve('../$(name)'); if (fs.existsSync(projectPath)) { console.log('ERROR: Project $(name) already exists!'); process.exit(1); }"
	@echo "Creating folder structure..."
	@node -e "const fs = require('fs'); const path = require('path'); const projectPath = path.resolve('../$(name)'); fs.mkdirSync(projectPath, { recursive: true }); fs.mkdirSync(path.join(projectPath, 'system'), { recursive: true }); fs.mkdirSync(path.join(projectPath, 'files'), { recursive: true });"
	@echo "Copying service account..."
	@node -e "const fs = require('fs'); const path = require('path'); const keyPath = path.resolve('key.json'); const targetPath = path.resolve('../$(name)/system/key.json'); if (fs.existsSync(keyPath)) { fs.copyFileSync(keyPath, targetPath); console.log('✅ Service account copied'); } else { console.log('⚠️  key.json not found (copy manually if needed)'); }"
	@echo "Copying project templates..."
	@node -e "const fs = require('fs'); const path = require('path'); const templatePath = path.resolve('templates/appsscript.json'); const targetPath = path.resolve('../$(name)/system/appsscript.json'); if (fs.existsSync(templatePath)) { fs.copyFileSync(templatePath, targetPath); console.log('✅ Project template copied'); } else { console.log('⚠️  appsscript.json template not found (copy manually if needed)'); }"
	@echo "SUCCESS: Project $(name) created!"
	@echo ""
	@echo "Project structure:"
	@echo "  ../$(name)/"
	@echo "  ├── system/          - system files"
	@echo "  └── files/           - project files"
	@echo ""
	@echo "Next steps:"
	@echo "  1. cd ../$(name)"
	@echo "  2. cd ../system"
	@echo "  3. make clone $(name)  - clone project"
	@echo "  4. cd ../$(name)"
	@echo "  5. cd ../system"
	@echo "  6. make pull $(name)   - download files"
	@echo "  7. Edit code"
	@echo "  8. make push $(name)   - upload changes"
	@echo ""
	@echo "Use commands from system folder:"
	@echo "  make help            - show all commands"
	@echo "  make clone name      - clone"
	@echo "  make pull name       - download"
	@echo "  make push name       - upload"
	@echo "  make status name     - status"
	@echo "  make projects        - project list"

list:
	@echo "Project list:"
	@node -e "const fs = require('fs'); const path = require('path'); const projectsPath = path.resolve('../'); const dirs = fs.readdirSync(projectsPath, { withFileTypes: true }).filter(dirent => dirent.isDirectory()).map(dirent => dirent.name).filter(name => name !== 'system' && name !== 'gas-boilerplate'); if (dirs.length === 0) { console.log('  No projects found'); } else { dirs.forEach(dir => console.log('  ' + dir)); }"
	@echo ""
	@echo "To clone: make clone projectname"

projects:
	@echo "Showing all configured projects:"
	npx ts-node src/gas.ts projects

# System commands
update:
	@echo "Checking for updates from gas-boilerplate..."
	npx ts-node src/gas.ts check

upgrade:
	@echo "Updating system..."
	npx ts-node src/gas.ts upgrade

validate:
	@echo "Validating system configuration..."
	npx ts-node src/gas.ts validate

logs:
	@echo "Showing recent logs..."
	npx ts-node src/gas.ts logs

config:
	@echo "System configuration:"
	@node -e "const fs = require('fs'); const config = JSON.parse(fs.readFileSync('config.json', 'utf8')); console.log('Default project:', config.defaultProject); console.log('Projects path:', config.projectsPath); console.log('System path:', config.systemPath); console.log('Logs path:', config.logsPath);"


