#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Path to the UI components folder
const UI_FOLDER = './src/components/ui';

// Function to remove version numbers from imports
function removeVersionNumbers(content) {
  // Multiple patterns to catch different version number formats
  let updatedContent = content;
  
  // Pattern 1: @package-name@1.2.3 -> @package-name
  updatedContent = updatedContent.replace(/(@[^@\s"']+)@[\d.]+/g, '$1');
  
  // Pattern 2: package-name@1.2.3 -> package-name (for packages without @)
  updatedContent = updatedContent.replace(/([a-zA-Z0-9-_]+)@[\d.]+/g, '$1');
  
  // Pattern 3: Handle quoted imports "package@version" -> "package"
  updatedContent = updatedContent.replace(/"([^"@]+)@[\d.]+"/g, '"$1"');
  
  // Pattern 4: Handle single quoted imports 'package@version' -> 'package'
  updatedContent = updatedContent.replace(/'([^'@]+)@[\d.]+'/g, "'$1'");
  
  return updatedContent;
}

// Function to process a single file
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const updatedContent = removeVersionNumbers(content);
    
    // Only write if content changed
    if (content !== updatedContent) {
      fs.writeFileSync(filePath, updatedContent, 'utf8');
      console.log(`✅ Fixed: ${path.basename(filePath)}`);
      return true;
    } else {
      console.log(`⏭️  Skipped: ${path.basename(filePath)} (no changes needed)`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

// Main function
function main() {
  console.log('🔧 Starting UI imports version number removal...\n');
  
  // Check if UI folder exists
  if (!fs.existsSync(UI_FOLDER)) {
    console.error(`❌ UI folder not found: ${UI_FOLDER}`);
    process.exit(1);
  }
  
  // Get all .tsx files in the UI folder
  const files = fs.readdirSync(UI_FOLDER)
    .filter(file => file.endsWith('.tsx'))
    .map(file => path.join(UI_FOLDER, file));
  
  if (files.length === 0) {
    console.log('⚠️  No .tsx files found in UI folder');
    return;
  }
  
  console.log(`📁 Found ${files.length} UI component files\n`);
  
  let processedCount = 0;
  let changedCount = 0;
  
  // Process each file
  files.forEach(filePath => {
    const wasChanged = processFile(filePath);
    processedCount++;
    if (wasChanged) changedCount++;
  });
  
  // Summary
  console.log('\n📊 Summary:');
  console.log(`   Total files processed: ${processedCount}`);
  console.log(`   Files modified: ${changedCount}`);
  console.log(`   Files unchanged: ${processedCount - changedCount}`);
  
  if (changedCount > 0) {
    console.log('\n🎉 Version numbers successfully removed from UI imports!');
  } else {
    console.log('\n✨ All files were already clean!');
  }
}

// Run the script
main();
