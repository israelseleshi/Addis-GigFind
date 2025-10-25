# UI Import Version Fixer Scripts

This repository contains three scripts to automatically remove version numbers from module imports in the `src/components/ui` folder.

## Problem

Many UI component files contain imports with hardcoded version numbers like:
```typescript
import * as DialogPrimitive from "@radix-ui/react-dialog@1.1.6";
import { ChevronDownIcon } from "lucide-react@0.487.0";
import { cva } from "class-variance-authority@0.7.1";
```

These should be:
```typescript
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ChevronDownIcon } from "lucide-react";
import { cva } from "class-variance-authority";
```

## Available Scripts

### 1. Simple Node.js Script (`fix-ui-imports.js`)

**Usage:**
```bash
node fix-ui-imports.js
```

**Features:**
- ✅ Simple and fast
- ✅ Processes all `.tsx` files in `src/components/ui`
- ✅ Shows progress and summary
- ✅ Safe - only modifies files that need changes

### 2. Advanced Node.js Script (`fix-ui-imports-advanced.js`)

**Usage:**
```bash
# Normal run
node fix-ui-imports-advanced.js

# Preview changes without applying them
node fix-ui-imports-advanced.js --dry-run

# Run without creating backup
node fix-ui-imports-advanced.js --no-backup

# Show help
node fix-ui-imports-advanced.js --help
```

**Features:**
- ✅ Detailed logging with colors
- ✅ Shows exactly what will be changed
- ✅ Automatic backup creation
- ✅ Dry-run mode for preview
- ✅ Handles multiple file types (`.tsx`, `.ts`)
- ✅ Multiple pattern matching for different package types
- ✅ Error handling and recovery

### 3. Bash Script (`fix-ui-imports.sh`)

**Usage:**
```bash
./fix-ui-imports.sh
```

**Features:**
- ✅ No Node.js dependency required
- ✅ Automatic backup with timestamp
- ✅ Colored output
- ✅ Works on any Unix-like system

## What Gets Fixed

The scripts remove version numbers from these types of imports:

| Package Type | Before | After |
|--------------|--------|-------|
| Radix UI | `@radix-ui/react-dialog@1.1.6` | `@radix-ui/react-dialog` |
| Lucide React | `lucide-react@0.487.0` | `lucide-react` |
| Class Variance Authority | `class-variance-authority@0.7.1` | `class-variance-authority` |
| Generic packages | `@package/name@1.2.3` | `@package/name` |

## Safety Features

- ✅ **Backup Creation**: Automatic backups before making changes
- ✅ **Dry Run Mode**: Preview changes without applying them
- ✅ **Selective Processing**: Only modifies files that actually need changes
- ✅ **Error Handling**: Graceful handling of file system errors
- ✅ **Detailed Logging**: Clear feedback on what was changed

## Example Output

```
🔧 Starting UI imports version number removal...

📁 Found 47 UI component files

✅ Fixed: accordion.tsx
✅ Fixed: alert-dialog.tsx
⏭️  Skipped: alert.tsx (no changes needed)
✅ Fixed: avatar.tsx
...

📊 Summary:
   Total files processed: 47
   Files modified: 26
   Files unchanged: 21

🎉 Version numbers successfully removed from UI imports!
```

## Requirements

- **Node.js scripts**: Node.js (any recent version)
- **Bash script**: Unix-like system (Linux, macOS, WSL)

## Troubleshooting

### Permission Denied
```bash
chmod +x fix-ui-imports.sh
```

### Node.js Not Found
Make sure Node.js is installed:
```bash
node --version
```

### UI Folder Not Found
Make sure you're running the script from the project root directory where `src/components/ui` exists.

## Contributing

Feel free to modify these scripts for your specific needs. The patterns can be easily adjusted in the script files to handle different package naming conventions.
