# 📋 Projects Configuration

Guide for configuring `projects.json` with your Google Apps Script project IDs.

## 🔑 What is SCRIPT_ID?

The `SCRIPT_ID` is a unique identifier for your Google Apps Script project. You can find it in the URL when you open your project:

```
https://script.google.com/d/SCRIPT_ID_HERE/edit
```

## 📁 Projects.json Structure

Your `projects.json` should look like this:

```json
{
  "myproject": {
    "title": "My Project",
    "description": "Description of my project",
    "id": "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
    "created": "2025-01-01",
    "updated": "2025-01-01"
  },
  "analytics": {
    "title": "Analytics Dashboard",
    "description": "Google Analytics dashboard",
    "id": "1ABC123DEF456GHI789JKL012MNO345PQR678STU901VWX",
    "created": "2025-01-01",
    "updated": "2025-01-01"
  }
}
```

## 🚀 How to Add a New Project

### Step 1: Create Project Structure
```bash
make new PROJECT=myproject
```

### Step 2: Get Your SCRIPT_ID
1. Go to [Google Apps Script](https://script.google.com/)
2. Open your project
3. Copy the ID from the URL: `https://script.google.com/d/YOUR_SCRIPT_ID/edit`

### Step 3: Edit projects.json
```bash
# Open projects.json in your editor
code projects.json
# or
notepad projects.json
```

Add your project:
```json
{
  "myproject": {
    "title": "My Project",
    "description": "My first Google Apps Script project",
    "id": "YOUR_SCRIPT_ID_HERE",
    "created": "2025-01-01",
    "updated": "2025-01-01"
  }
}
```

### Step 4: Clone the Project
```bash
make clone PROJECT=myproject
```

## 📋 Project Fields

| Field | Description | Required |
|-------|-------------|----------|
| `title` | Project name | Yes |
| `description` | Project description | No |
| `id` | Google Apps Script project ID | **Yes** |
| `created` | Creation date | No |
| `updated` | Last update date | No |

## 🔍 Finding SCRIPT_ID

### Method 1: From URL
1. Open your Google Apps Script project
2. Look at the browser URL
3. Copy the ID after `/d/` and before `/edit`

### Method 2: From Project Settings
1. In your Google Apps Script project
2. Click on the project name (top left)
3. Click "Project settings"
4. Copy the "Script ID"

### Method 3: From Share Dialog
1. In your Google Apps Script project
2. Click "Share" button
3. Copy the project ID from the sharing dialog

## ⚠️ Common Mistakes

### ❌ Missing SCRIPT_ID
```json
{
  "myproject": {
    "title": "My Project",
    "description": "My project"
    // Missing "id" field!
  }
}
```

**Error**: `make clone` will fail with "Project ID not found"

### ❌ Invalid SCRIPT_ID Format
```json
{
  "myproject": {
    "title": "My Project",
    "id": "script.google.com/d/1234567890abcdef/edit"  // Wrong format!
  }
}
```

**Correct format**: `"id": "1234567890abcdef"`

### ❌ Duplicate Project Names
```json
{
  "myproject": { "id": "123", "title": "Project 1" },
  "myproject": { "id": "456", "title": "Project 2" }  // Duplicate name!
}
```

**Error**: Second project will overwrite the first

## 🧪 Testing Configuration

After editing `projects.json`, test your configuration:

```bash
make validate              # Validate configuration
make projects              # List all projects
make clone PROJECT=myproject  # Test cloning
```

## 🔄 Updating Projects

### Add New Project
```bash
make new PROJECT=newname
# Edit projects.json to add SCRIPT_ID
make clone PROJECT=newname
```

### Update Existing Project
```bash
# Edit projects.json to update fields
make validate              # Verify changes
```

### Remove Project
```bash
# Remove from projects.json
# Delete project folder if needed
make validate              # Verify configuration
```

## 📖 Example Workflow

```bash
# 1. Create project structure
make new PROJECT=myproject

# 2. Edit projects.json (add SCRIPT_ID)
# 3. Clone project
make clone PROJECT=myproject

# 4. Download files
make pull PROJECT=myproject

# 5. Edit code
# 6. Upload changes
make push PROJECT=myproject

# 7. Create release
make release
```

## 🔗 Related Documentation

- **[🚀 Quick Start](QUICK_START.md)** - Getting started guide
- **[📚 Commands Reference](commands-reference.md)** - All available commands
- **[🔐 Google Cloud Setup](google-cloud-setup.md)** - Service account setup
