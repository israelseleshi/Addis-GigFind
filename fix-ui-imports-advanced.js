#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  UI_FOLDER: './src/components/ui',
  BACKUP_FOLDER: './backup-ui-components',
  CREATE_BACKUP: true,
  FILE_EXTENSIONS: ['.tsx', '.ts'],
  DRY_RUN: false // Set to true to see what would be changed without making changes
};

// Patterns to match different types of versioned imports
const PATTERNS = [
  // @radix-ui/react-dialog@1.1.6 -> @radix-ui/react-dialog
  {
    name: 'Radix UI packages',
    pattern: /(@radix-ui\/[^@\s"']+)@[\d.]+/g,
    replacement: '$1'
  },
  // lucide-react@0.487.0 -> lucide-react
  {
    name: 'Lucide React',
    pattern: /(lucide-react)@[\d.]+/g,
    replacement: '$1'
  },
  // class-variance-authority@0.7.1 -> class-variance-authority
  {
    name: 'Class Variance Authority',
    pattern: /(class-variance-authority)@[\d.]+/g,
    replacement: '$1'
  },
  // Generic pattern for any @package@version
  {
    name: 'Generic versioned packages',
    pattern: /(@[^@\s"']+)@[\d.]+/g,
    replacement: '$1'
  }
];

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function colorize(text, color) {
  return `${colors[color]}${text}${colors.reset}`;
}

// Function to create backup
function createBackup(sourceDir, backupDir) {
  if (!CONFIG.CREATE_BACKUP) return;
  
  try {
    if (fs.existsSync(backupDir)) {
      fs.rmSync(backupDir, { recursive: true });
    }
    fs.mkdirSync(backupDir, { recursive: true });
    
    const files = fs.readdirSync(sourceDir);
    files.forEach(file => {
      const sourcePath = path.join(sourceDir, file);
      const backupPath = path.join(backupDir, file);
      
      if (fs.statSync(sourcePath).isFile()) {
        fs.copyFileSync(sourcePath, backupPath);
      }
    });
    
    console.log(colorize(`📦 Backup created: ${backupDir}`, 'cyan'));
  } catch (error) {
    console.error(colorize(`❌ Failed to create backup: ${error.message}`, 'red'));
  }
}

// Function to analyze content and show what would change
function analyzeContent(content, filePath) {
  const changes = [];
  let updatedContent = content;
  
  PATTERNS.forEach(({ name, pattern, replacement }) => {
    const matches = content.match(pattern);
    if (matches) {
      matches.forEach(match => {
        const newMatch = match.replace(pattern, replacement);
        if (match !== newMatch) {
          changes.push({
            type: name,
            from: match,
            to: newMatch
          });
        }
      });
      updatedContent = updatedContent.replace(pattern, replacement);
    }
  });
  
  return {
    hasChanges: changes.length > 0,
    changes,
    updatedContent
  };
}

// Function to process a single file
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const analysis = analyzeContent(content, filePath);
    
    const fileName = path.basename(filePath);
    
    if (!analysis.hasChanges) {
      console.log(colorize(`⏭️  ${fileName}`, 'yellow') + ' - No changes needed');
      return { processed: true, changed: false };
    }
    
    // Show what will be changed
    console.log(colorize(`🔧 ${fileName}`, 'blue') + ` - ${analysis.changes.length} change(s) found:`);
    analysis.changes.forEach(change => {
      console.log(`   ${colorize('FROM:', 'red')} ${change.from}`);
      console.log(`   ${colorize('TO:', 'green')}   ${change.to}`);
    });
    
    if (CONFIG.DRY_RUN) {
      console.log(colorize('   [DRY RUN - No changes made]', 'yellow'));
      return { processed: true, changed: false };
    }
    
    // Write the updated content
    fs.writeFileSync(filePath, analysis.updatedContent, 'utf8');
    console.log(colorize(`   ✅ Changes applied`, 'green'));
    
    return { processed: true, changed: true };
    
  } catch (error) {
    console.error(colorize(`❌ Error processing ${filePath}: ${error.message}`, 'red'));
    return { processed: false, changed: false };
  }
}

// Main function
function main() {
  console.log(colorize('🚀 UI Components Import Fixer', 'bright'));
  console.log(colorize('=====================================', 'cyan'));
  
  if (CONFIG.DRY_RUN) {
    console.log(colorize('🔍 DRY RUN MODE - No files will be modified', 'yellow'));
  }
  
  console.log();
  
  // Check if UI folder exists
  if (!fs.existsSync(CONFIG.UI_FOLDER)) {
    console.error(colorize(`❌ UI folder not found: ${CONFIG.UI_FOLDER}`, 'red'));
    process.exit(1);
  }
  
  // Create backup
  if (CONFIG.CREATE_BACKUP && !CONFIG.DRY_RUN) {
    createBackup(CONFIG.UI_FOLDER, CONFIG.BACKUP_FOLDER);
  }
  
  // Get all relevant files in the UI folder
  const allFiles = fs.readdirSync(CONFIG.UI_FOLDER);
  const files = allFiles
    .filter(file => CONFIG.FILE_EXTENSIONS.some(ext => file.endsWith(ext)))
    .map(file => path.join(CONFIG.UI_FOLDER, file));
  
  if (files.length === 0) {
    console.log(colorize('⚠️  No matching files found in UI folder', 'yellow'));
    return;
  }
  
  console.log(colorize(`📁 Found ${files.length} files to process`, 'cyan'));
  console.log();
  
  let stats = {
    processed: 0,
    changed: 0,
    errors: 0
  };
  
  // Process each file
  files.forEach(filePath => {
    const result = processFile(filePath);
    if (result.processed) {
      stats.processed++;
      if (result.changed) stats.changed++;
    } else {
      stats.errors++;
    }
    console.log(); // Empty line for readability
  });
  
  // Summary
  console.log(colorize('📊 SUMMARY', 'bright'));
  console.log(colorize('==========', 'cyan'));
  console.log(`${colorize('Total files:', 'blue')} ${stats.processed + stats.errors}`);
  console.log(`${colorize('Successfully processed:', 'green')} ${stats.processed}`);
  console.log(`${colorize('Files modified:', 'green')} ${stats.changed}`);
  console.log(`${colorize('Files unchanged:', 'yellow')} ${stats.processed - stats.changed}`);
  
  if (stats.errors > 0) {
    console.log(`${colorize('Errors:', 'red')} ${stats.errors}`);
  }
  
  if (CONFIG.DRY_RUN) {
    console.log();
    console.log(colorize('💡 To apply changes, set DRY_RUN to false in the script', 'yellow'));
  } else if (stats.changed > 0) {
    console.log();
    console.log(colorize('🎉 Import version numbers successfully removed!', 'green'));
    if (CONFIG.CREATE_BACKUP) {
      console.log(colorize(`📦 Backup available at: ${CONFIG.BACKUP_FOLDER}`, 'cyan'));
    }
  } else {
    console.log();
    console.log(colorize('✨ All files were already clean!', 'green'));
  }
}

// Handle command line arguments
if (process.argv.includes('--dry-run')) {
  CONFIG.DRY_RUN = true;
}

if (process.argv.includes('--no-backup')) {
  CONFIG.CREATE_BACKUP = false;
}

if (process.argv.includes('--help')) {
  console.log(`
${colorize('UI Components Import Fixer', 'bright')}
${colorize('Usage:', 'cyan')} node fix-ui-imports-advanced.js [options]

${colorize('Options:', 'cyan')}
  --dry-run     Show what would be changed without making changes
  --no-backup   Skip creating backup files
  --help        Show this help message

${colorize('Examples:', 'cyan')}
  node fix-ui-imports-advanced.js                    # Fix all imports
  node fix-ui-imports-advanced.js --dry-run          # Preview changes
  node fix-ui-imports-advanced.js --no-backup        # Fix without backup
`);
  process.exit(0);
}

// Run the script
main();
