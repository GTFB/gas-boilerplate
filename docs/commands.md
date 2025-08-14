# Commands Reference

## 🍫 Git/Clasp Style Commands

### Project Commands

#### `make clone [project]`
Clones an existing Google Apps Script project.
```cmd
make clone myproject      # Clone myproject
make clone analytics      # Clone analytics project
```

#### `make pull [project]`
Downloads changes from Google Apps Script.
```cmd
make pull myproject       # Download changes from myproject
make pull analytics       # Download changes from analytics
```

#### `make push [project]`
Uploads changes to Google Apps Script.
```cmd
make push myproject       # Upload changes to myproject
make push analytics       # Upload changes to analytics
```

#### `make status [project]`
Shows the status of a Google Apps Script project.
```cmd
make status myproject     # Show status of myproject
make status analytics     # Show status of analytics
```

### Utility Commands

#### `make extract [project]`
Extracts data from `index.html` file to `files/` folder.
```cmd
make extract myproject    # Extract data from myproject/index.html
make extract analytics    # Extract data from analytics/index.html
```

**Result:**
- `extracted_data.csv` - CSV file with data
- `extracted_data.json` - JSON file with data
- Individual JSON files for each element

#### `make validate`
Validates system configuration.
```cmd
make validate         # Check system settings
```

**Checks:**
- Existence of configuration files
- Project structure
- Required fields presence

#### `make logs`
Shows recent system logs.
```cmd
make logs             # Show logs for today
```

#### `make config`
Shows current system configuration.
```cmd
make config           # Show settings
```

### Admin Commands

#### `make list`
Shows list of project folders.
```cmd
make list             # Show all projects
```

#### `make new [name]`
Creates new project structure.
```cmd
make new analytics    # Create analytics project
make new orders       # Create orders project
```

#### `make projects`
Shows all configured projects.
```cmd
make projects         # Show project configuration
```

#### `make help`
Shows command help.
```cmd
make help             # Show help
```

## 📋 Usage Examples

### Workflow with Single Project
```cmd
# 1. Create project
make new myproject

# 2. Clone from Google Apps Script
make clone myproject

# 3. Download changes
make pull myproject

# 4. Edit code

# 5. Upload changes
make push myproject

# 6. Extract data
make ff myproject
```

### Working with Multiple Projects
```cmd
# Check all projects
make projects

# Work with myproject
make pull myproject
make push myproject

# Work with analytics
make pull analytics
make push analytics

# Check status
make status myproject
make status analytics
```

### Diagnostics and Debugging
```cmd
# Check system
make validate

# View logs
make logs

# Show configuration
make config

# Get help
make help
```

## ⚠️ Important Notes

- All commands are executed from `system/` folder
- For project commands, project name must be specified
- `pull` and `push` commands require configured Google Apps Script ID
- `extract` command requires `index.html` file in project
- Logs are automatically saved in `logs/` folder
