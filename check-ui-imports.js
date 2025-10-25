#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Path to the UI components folder
const UI_FOLDER = './src/components/ui';

// Function to check for version numbers in imports
function checkForVersionNumbers(content) {
  const versionPatterns = [
    /@[^@\s"']+@[\d.]+/g,  // @package@version
    /[a-zA-Z0-9-_]+@[\d.]+/g,  // package@version
    /"[^"@]+@[\d.]+"/g,  // "package@version"
    /'[^'@]+@[\d.]+'/g   // 'package@version'
  ];
  
  const found = [];
  versionPatterns.forEach((pattern, index) => {
    const matches = content.match(pattern);
    if (matches) {
      found.push(...matches);
    }
  });
  
  return found;
}

// Function to analyze a single file
function analyzeFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const versionedImports = checkForVersionNumbers(content);
    
    return {
      file: path.basename(filePath),
      hasVersions: versionedImports.length > 0,
      versions: versionedImports,
      success: true
    };
  } catch (error) {
    return {
      file: path.basename(filePath),
      hasVersions: false,
      versions: [],
      success: false,
      error: error.message
    };
  }
}

// Main function
function main() {
  console.log('🔍 Checking UI imports for version numbers...\n');
  
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
  
  console.log(`📁 Analyzing ${files.length} UI component files...\n`);
  
  let cleanFiles = 0;
  let dirtyFiles = 0;
  let errorFiles = 0;
  
  // Analyze each file
  files.forEach(filePath => {
    const result = analyzeFile(filePath);
    
    if (!result.success) {
      console.log(`❌ ${result.file} - Error: ${result.error}`);
      errorFiles++;
      return;
    }
    
    if (result.hasVersions) {
      console.log(`🔴 ${result.file} - Found ${result.versions.length} versioned import(s):`);
      result.versions.forEach(version => {
        console.log(`   - ${version}`);
      });
      dirtyFiles++;
    } else {
      console.log(`✅ ${result.file} - Clean`);
      cleanFiles++;
    }
  });
  
  // Summary
  console.log('\n📊 Analysis Summary:');
  console.log(`   Clean files: ${cleanFiles}`);
  console.log(`   Files with versions: ${dirtyFiles}`);
  console.log(`   Error files: ${errorFiles}`);
  console.log(`   Total files: ${files.length}`);
  
  if (dirtyFiles === 0 && errorFiles === 0) {
    console.log('\n🎉 All UI imports are clean! No version numbers found.');
  } else if (dirtyFiles > 0) {
    console.log('\n⚠️  Some files still contain version numbers. Run fix-ui-imports.js to clean them.');
  }
  
  if (errorFiles > 0) {
    console.log('\n❌ Some files had errors during analysis.');
  }
}

// Run the script
main();
