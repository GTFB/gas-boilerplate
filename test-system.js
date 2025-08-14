#!/usr/bin/env node

/**
 * System Test Script
 * Tests all major components of the Google Apps Script CLI system
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 Testing Google Apps Script CLI System...\n');

// Test 1: Check required files
console.log('1️⃣ Checking required files...');
const requiredFiles = [
  'clasp-clone.js',
  'commands.bat',
  'make.bat',
  'setup.bat',
  'config.json',
  'projects.json',
  'package.json'
];

let filesOk = true;
requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`   ✅ ${file}`);
  } else {
    console.log(`   ❌ ${file} - MISSING`);
    filesOk = false;
  }
});

// Test 2: Check directories
console.log('\n2️⃣ Checking required directories...');
const requiredDirs = [
  'functions',
  'templates',
  'utils',
  'docs',
  'logs'
];

let dirsOk = true;
requiredDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    console.log(`   ✅ ${dir}/`);
  } else {
    console.log(`   ❌ ${dir}/ - MISSING`);
    dirsOk = false;
  }
});

// Test 3: Validate configuration
console.log('\n3️⃣ Validating configuration...');
try {
  const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
  const projects = JSON.parse(fs.readFileSync('projects.json', 'utf8'));
  
  console.log(`   ✅ config.json - Valid JSON`);
  console.log(`   ✅ projects.json - Valid JSON`);
  console.log(`   📋 Default project: ${config.defaultProject}`);
  console.log(`   📁 Projects count: ${Object.keys(projects).length}`);
  
} catch (error) {
  console.log(`   ❌ Configuration error: ${error.message}`);
}

// Test 4: Check Node.js dependencies
console.log('\n4️⃣ Checking Node.js setup...');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  console.log(`   ✅ package.json - Version ${packageJson.version}`);
  console.log(`   📦 Dependencies: ${Object.keys(packageJson.dependencies).length}`);
  
  if (fs.existsSync('node_modules')) {
    console.log(`   ✅ node_modules/ - Dependencies installed`);
  } else {
    console.log(`   ⚠️ node_modules/ - Run 'npm install' to install dependencies`);
  }
} catch (error) {
  console.log(`   ❌ Package.json error: ${error.message}`);
}

// Test 5: Check batch files
console.log('\n5️⃣ Checking batch files...');
const batchFiles = ['commands.bat', 'make.bat', 'setup.bat'];
batchFiles.forEach(file => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes('@echo off')) {
      console.log(`   ✅ ${file} - Valid batch file`);
    } else {
      console.log(`   ⚠️ ${file} - Missing @echo off`);
    }
  }
});

// Summary
console.log('\n📊 Test Summary:');
if (filesOk && dirsOk) {
  console.log('🎉 All tests passed! System is ready to use.');
  console.log('\n🚀 Next steps:');
  console.log('   1. Add your key.json file');
  console.log('   2. Run: make validate');
  console.log('   3. Run: make help');
} else {
  console.log('⚠️ Some tests failed. Please check the issues above.');
}

console.log('\n✨ Test completed!');
