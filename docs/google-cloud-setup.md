# 🔐 Google Cloud Setup

This guide explains how to set up Google Cloud credentials for gas-boilerplate.

## 📚 Related Documentation

- **[Quick Start](quick-start.md)** - Step-by-step setup guide
- **[Submodule Setup](submodule-setup.md)** - Detailed submodule configuration
- **[Repository Examples](repository-examples.md)** - Practical setup examples
- **[Main README](../README.md)** - Project overview and features

## 🚀 Quick Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project or select existing
3. Enable Google Apps Script API
4. Create service account
5. Download key as `key.json`
6. Place `key.json` in project root

## Required APIs

- Google Apps Script API
- Google Drive API

## Service Account

- Create in IAM & Admin > Service Accounts
- Download JSON key
- Rename to `key.json`

## Permissions

- Apps Script: Editor access
- Drive: View access

That's all you need.
