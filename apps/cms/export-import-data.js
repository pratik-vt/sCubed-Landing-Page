#!/usr/bin/env node

/**
 * Strapi Export/Import Data Management Script
 * Uses Strapi's official data management commands for reliable data operations
 * 
 * Based on: https://docs.strapi.io/cms/data-management/import
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const BACKUP_DIR = './data-backups';
const SAMPLE_DATA_FILE = './sample-data-export.tar.gz';

function ensureBackupDir() {
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
    console.log(`📁 Created backup directory: ${BACKUP_DIR}`);
  }
}

function exportCurrentData() {
  console.log('📤 Exporting current Strapi data...');
  
  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFile = `${BACKUP_DIR}/backup-${timestamp}.tar.gz.enc`;
    
    execSync(`npm run strapi export -- -f ${backupFile}`, { 
      stdio: 'inherit',
      cwd: process.cwd()
    });
    
    console.log(`✅ Data exported to: ${backupFile}`);
    return backupFile;
  } catch (error) {
    console.error('❌ Export failed:', error.message);
    throw error;
  }
}

function importData(filePath, options = {}) {
  console.log(`📥 Importing data from: ${filePath}`);
  
  try {
    let command = `npm run strapi import -- -f ${filePath}`;
    
    // Add options
    if (options.force) {
      command += ' --force';
    }
    
    if (options.key) {
      command += ` --key "${options.key}"`;
    }
    
    if (options.exclude) {
      command += ` --exclude ${options.exclude}`;
    }
    
    if (options.only) {
      command += ` --only ${options.only}`;
    }
    
    console.log(`🔧 Running: ${command}`);
    
    execSync(command, { 
      stdio: 'inherit',
      cwd: process.cwd()
    });
    
    console.log('✅ Data import completed successfully!');
  } catch (error) {
    console.error('❌ Import failed:', error.message);
    throw error;
  }
}

function createSampleDataExport() {
  console.log('🌱 Creating sample data export...');
  
  // First, let's create a minimal sample data export
  try {
    // Export without encryption for easier handling
    execSync(`npm run strapi export -- -f ${SAMPLE_DATA_FILE} --no-encrypt`, { 
      stdio: 'inherit',
      cwd: process.cwd()
    });
    
    console.log(`✅ Sample data exported to: ${SAMPLE_DATA_FILE}`);
    return SAMPLE_DATA_FILE;
  } catch (error) {
    console.error('❌ Sample export failed:', error.message);
    throw error;
  }
}

function listBackups() {
  console.log('📋 Available backups:');
  
  if (!fs.existsSync(BACKUP_DIR)) {
    console.log('  No backups found. Create one with: node export-import-data.js export');
    return [];
  }
  
  const backups = fs.readdirSync(BACKUP_DIR)
    .filter(file => file.endsWith('.tar.gz.enc') || file.endsWith('.tar.gz') || file.endsWith('.tar'))
    .sort()
    .reverse(); // Most recent first
  
  if (backups.length === 0) {
    console.log('  No backup files found in ./data-backups/');
    return [];
  }
  
  backups.forEach((backup, index) => {
    const filePath = path.join(BACKUP_DIR, backup);
    const stats = fs.statSync(filePath);
    const size = (stats.size / (1024 * 1024)).toFixed(2);
    const date = stats.mtime.toISOString().split('T')[0];
    
    console.log(`  ${index + 1}. ${backup}`);
    console.log(`     Size: ${size} MB | Date: ${date}`);
  });
  
  return backups;
}

function showUsage() {
  console.log(`
🗃️  Strapi Data Management Tool

Usage: node export-import-data.js <command> [options]

Commands:
  export              - Export current data to backup
  import <file>       - Import data from file
  sample-export       - Create sample data export (current content)
  sample-import       - Import sample data (if available)
  list                - List available backups
  help                - Show this help

Import Options:
  --force            - Skip confirmation prompts
  --key <key>        - Encryption key for encrypted files
  --exclude <types>  - Exclude content,files,config (comma-separated)
  --only <types>     - Include only specified types

Examples:
  node export-import-data.js export
  node export-import-data.js import ./backup.tar.gz
  node export-import-data.js import ./backup.tar.gz.enc --key mykey
  node export-import-data.js import ./backup.tar --only content
  node export-import-data.js list

⚠️  Warning: Import operations delete existing data!
    Always create a backup before importing.

📖 Documentation: https://docs.strapi.io/cms/data-management/import
`);
}

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const command = args[0];
  const file = args[1];
  
  const options = {};
  
  for (let i = 1; i < args.length; i++) {
    if (args[i] === '--force') {
      options.force = true;
    } else if (args[i] === '--key' && args[i + 1]) {
      options.key = args[i + 1];
      i++; // Skip next arg
    } else if (args[i] === '--exclude' && args[i + 1]) {
      options.exclude = args[i + 1];
      i++;
    } else if (args[i] === '--only' && args[i + 1]) {
      options.only = args[i + 1];
      i++;
    }
  }
  
  return { command, file, options };
}

// Main execution
async function main() {
  const { command, file, options } = parseArgs();
  
  ensureBackupDir();
  
  try {
    switch (command) {
      case 'export':
        await exportCurrentData();
        break;
        
      case 'import':
        if (!file) {
          console.error('❌ Please specify a file to import');
          console.log('Usage: node export-import-data.js import <file>');
          process.exit(1);
        }
        
        if (!fs.existsSync(file)) {
          console.error(`❌ File not found: ${file}`);
          process.exit(1);
        }
        
        await importData(file, options);
        break;
        
      case 'sample-export':
        await createSampleDataExport();
        break;
        
      case 'sample-import':
        if (fs.existsSync(SAMPLE_DATA_FILE)) {
          await importData(SAMPLE_DATA_FILE, options);
        } else {
          console.error(`❌ Sample data file not found: ${SAMPLE_DATA_FILE}`);
          console.log('💡 Create sample data first with: node export-import-data.js sample-export');
        }
        break;
        
      case 'list':
        listBackups();
        break;
        
      case 'help':
      case '--help':
      case '-h':
        showUsage();
        break;
        
      default:
        console.error(`❌ Unknown command: ${command}`);
        showUsage();
        process.exit(1);
    }
  } catch (error) {
    console.error('❌ Operation failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { exportCurrentData, importData, createSampleDataExport, listBackups }; 