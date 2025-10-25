#!/bin/bash

# UI Components Import Version Fixer
# Removes version numbers from imports in UI components

UI_FOLDER="./src/components/ui"
BACKUP_FOLDER="./backup-ui-$(date +%Y%m%d_%H%M%S)"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${CYAN}🔧 UI Components Import Fixer${NC}"
echo -e "${CYAN}================================${NC}"
echo

# Check if UI folder exists
if [ ! -d "$UI_FOLDER" ]; then
    echo -e "${RED}❌ UI folder not found: $UI_FOLDER${NC}"
    exit 1
fi

# Create backup
echo -e "${BLUE}📦 Creating backup...${NC}"
mkdir -p "$BACKUP_FOLDER"
cp -r "$UI_FOLDER"/* "$BACKUP_FOLDER"/ 2>/dev/null
echo -e "${GREEN}✅ Backup created: $BACKUP_FOLDER${NC}"
echo

# Count files
file_count=$(find "$UI_FOLDER" -name "*.tsx" -o -name "*.ts" | wc -l)
echo -e "${BLUE}📁 Found $file_count files to process${NC}"
echo

processed=0
changed=0

# Process each .tsx and .ts file
for file in "$UI_FOLDER"/*.tsx "$UI_FOLDER"/*.ts; do
    # Skip if no files match the pattern
    [ ! -f "$file" ] && continue
    
    filename=$(basename "$file")
    echo -n "Processing $filename... "
    
    # Create temporary file for changes
    temp_file=$(mktemp)
    
    # Apply sed replacements to remove version numbers
    sed -E 's/(@[^@[:space:]"'\'']+)@[0-9]+\.[0-9]+\.[0-9]+/\1/g' "$file" > "$temp_file"
    
    # Check if file was changed
    if ! cmp -s "$file" "$temp_file"; then
        mv "$temp_file" "$file"
        echo -e "${GREEN}✅ Fixed${NC}"
        ((changed++))
    else
        rm "$temp_file"
        echo -e "${YELLOW}⏭️  No changes needed${NC}"
    fi
    
    ((processed++))
done

echo
echo -e "${CYAN}📊 Summary:${NC}"
echo -e "   Total files processed: $processed"
echo -e "   Files modified: ${GREEN}$changed${NC}"
echo -e "   Files unchanged: ${YELLOW}$((processed - changed))${NC}"

if [ $changed -gt 0 ]; then
    echo
    echo -e "${GREEN}🎉 Version numbers successfully removed from UI imports!${NC}"
    echo -e "${BLUE}📦 Backup available at: $BACKUP_FOLDER${NC}"
else
    echo
    echo -e "${GREEN}✨ All files were already clean!${NC}"
    # Remove empty backup folder if no changes were made
    rmdir "$BACKUP_FOLDER" 2>/dev/null
fi
