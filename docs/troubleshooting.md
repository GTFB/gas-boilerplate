# Troubleshooting

## Common Issues

### Project not found
```bash
make new projectname  # create first
```

### SCRIPT_ID missing
Edit `projects.json` and add your Google Apps Script ID

### Authentication failed
Ensure `key.json` is present and valid

### Git errors
```bash
make test-repos  # check connections
```

## Validation

```bash
make validate     # check system
make config       # show settings
make projects     # show projects
```

## Getting Help

```bash
make help         # show all commands
make logs         # show recent logs
```

Simple solutions for common problems.
