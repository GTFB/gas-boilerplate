# Logs Directory

This directory contains daily log files for the Google Apps Script CLI system.

## File Format
- **Naming**: `YYYY-MM-DD.md` (e.g., `2024-01-15.md`)
- **Format**: Markdown files with timestamps and action details
- **Content**: System operations, errors, warnings, and information messages

## Log Levels
- 🔍 **DEBUG** - Detailed debugging information
- ℹ️ **INFO** - General information about operations
- ⚠️ **WARN** - Warning messages
- ❌ **ERROR** - Error messages

## Viewing Logs
```cmd
# View today's logs
make logs

# View specific date logs
type logs\2024-01-15.md

# View all logs
dir logs\*.md
```

## Log Rotation
- Logs are automatically created daily
- Old logs are preserved for debugging
- Each log file contains a full day of activity

## Example Log Entry
```markdown
## 15.01.2024, 14:30:25

**ℹ️ PULL**  
Project: myproject, ID: 1234567890abcdef

---
```
