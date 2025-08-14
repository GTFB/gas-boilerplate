#!/usr/bin/env node

import * as fs from 'fs';
import { ConfigValidator } from './utils/config-validator';
import { logger } from './utils/logger';

/**
 * System Test Script
 * Tests all major components of the Google Apps Script CLI system
 */

interface TestResult {
  name: string;
  passed: boolean;
  message: string;
  details?: string;
}

class SystemTester {
  private testResults: TestResult[] = [];

  async runAllTests(): Promise<void> {
    console.log('🧪 Testing Google Apps Script CLI System...\n');

    // Run all tests
    await this.testRequiredFiles();
    await this.testRequiredDirectories();
    await this.testConfiguration();
    await this.testNodeJsSetup();
    await this.testBatchFiles();
    await this.testTypeScriptBuild();

    // Show summary
    this.showTestSummary();
  }

  private async testRequiredFiles(): Promise<void> {
    console.log('1️⃣ Checking required files...');
    
    const requiredFiles = [
      'commands.bat',
      'make.bat',
      'setup.bat',
      'config.json',
      'projects.json',
      'package.json',
      'tsconfig.json'
    ];

    let filesOk = true;
    
    for (const file of requiredFiles) {
      if (fs.existsSync(file)) {
        console.log(`   ✅ ${file}`);
        this.testResults.push({
          name: `File: ${file}`,
          passed: true,
          message: 'File exists'
        });
      } else {
        console.log(`   ❌ ${file} - MISSING`);
        this.testResults.push({
          name: `File: ${file}`,
          passed: false,
          message: 'File missing',
          details: `Required file ${file} not found`
        });
        filesOk = false;
      }
    }

    if (filesOk) {
      this.testResults.push({
        name: 'Required Files',
        passed: true,
        message: 'All required files present'
      });
    } else {
      this.testResults.push({
        name: 'Required Files',
        passed: false,
        message: 'Some required files missing'
      });
    }
  }

  private async testRequiredDirectories(): Promise<void> {
    console.log('\n2️⃣ Checking required directories...');
    
    const requiredDirs = [
      'templates',
      'docs',
      'logs',
      'src'
    ];

    let dirsOk = true;
    
    for (const dir of requiredDirs) {
      if (fs.existsSync(dir)) {
        console.log(`   ✅ ${dir}/`);
        this.testResults.push({
          name: `Directory: ${dir}`,
          passed: true,
          message: 'Directory exists'
        });
      } else {
        console.log(`   ❌ ${dir}/ - MISSING`);
        this.testResults.push({
          name: `Directory: ${dir}`,
          passed: false,
          message: 'Directory missing',
          details: `Required directory ${dir} not found`
        });
        dirsOk = false;
      }
    }

    if (dirsOk) {
      this.testResults.push({
        name: 'Required Directories',
        passed: true,
        message: 'All required directories present'
      });
    } else {
      this.testResults.push({
        name: 'Required Directories',
        passed: false,
        message: 'Some required directories missing'
      });
    }
    
    // Check TypeScript source files
    await this.testTypeScriptFiles();
  }

  private async testTypeScriptFiles(): Promise<void> {
    console.log('\n2️⃣.5️⃣ Checking TypeScript source files...');
    
    const requiredTsFiles = [
      'src/clasp-clone.ts',
      'src/utils/logger.ts',
      'src/utils/config-validator.ts',
      'src/utils/version-updater.ts',
      'src/functions/extract-files.ts',
      'src/scripts/create-release.ts',
      'src/test-system.ts',
      'src/types/index.ts'
    ];

    let tsFilesOk = true;
    
    for (const file of requiredTsFiles) {
      if (fs.existsSync(file)) {
        console.log(`   ✅ ${file}`);
        this.testResults.push({
          name: `TypeScript: ${file}`,
          passed: true,
          message: 'TypeScript file exists'
        });
      } else {
        console.log(`   ❌ ${file} - MISSING`);
        this.testResults.push({
          name: `TypeScript: ${file}`,
          passed: false,
          message: 'TypeScript file missing',
          details: `Required TypeScript file ${file} not found`
        });
        tsFilesOk = false;
      }
    }

    if (tsFilesOk) {
      this.testResults.push({
        name: 'TypeScript Files',
        passed: true,
        message: 'All TypeScript files present'
      });
    } else {
      this.testResults.push({
        name: 'TypeScript Files',
        passed: false,
        message: 'Some TypeScript files missing'
      });
    }
  }

  private async testConfiguration(): Promise<void> {
    console.log('\n3️⃣ Validating configuration...');
    
    try {
      const validator = new ConfigValidator();
      const result = validator.validateBasicConfig();
      
      console.log(`   ✅ config.json - Valid JSON`);
      console.log(`   ✅ projects.json - Valid JSON`);
      console.log(`   📋 Default project: ${result.config.defaultProject}`);
      console.log(`   📁 Projects count: ${Object.keys(result.projects).length}`);
      console.log(`   ℹ️ key.json - Not required for basic validation`);
      
      this.testResults.push({
        name: 'Configuration Validation',
        passed: true,
        message: 'Basic configuration validation passed',
        details: `Default project: ${result.config.defaultProject}, Projects: ${Object.keys(result.projects).length}`
      });
      
    } catch (error) {
      console.log(`   ❌ Configuration error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      
      this.testResults.push({
        name: 'Configuration Validation',
        passed: false,
        message: 'Configuration validation failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  private async testNodeJsSetup(): Promise<void> {
    console.log('\n4️⃣ Checking Node.js setup...');
    
    try {
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      console.log(`   ✅ package.json - Version ${packageJson.version}`);
      console.log(`   📦 Dependencies: ${Object.keys(packageJson.dependencies).length}`);
      console.log(`   🔧 Dev Dependencies: ${Object.keys(packageJson.devDependencies || {}).length}`);
      
      if (fs.existsSync('node_modules')) {
        console.log(`   ✅ node_modules/ - Dependencies installed`);
        this.testResults.push({
          name: 'Node.js Setup',
          passed: true,
          message: 'Node.js setup complete',
          details: `Version: ${packageJson.version}, Dependencies: ${Object.keys(packageJson.dependencies).length}`
        });
      } else {
        console.log(`   ⚠️ node_modules/ - Run 'npm install' to install dependencies`);
        this.testResults.push({
          name: 'Node.js Setup',
          passed: false,
          message: 'Dependencies not installed',
          details: 'Run npm install to install dependencies'
        });
      }
      
    } catch (error) {
      console.log(`   ❌ Package.json error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      
      this.testResults.push({
        name: 'Node.js Setup',
        passed: false,
        message: 'Package.json error',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  private async testBatchFiles(): Promise<void> {
    console.log('\n5️⃣ Checking batch files...');
    
    const batchFiles = ['commands.bat', 'make.bat', 'setup.bat'];
    let batchOk = true;
    
    for (const file of batchFiles) {
      if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf8');
        if (content.includes('@echo off')) {
          console.log(`   ✅ ${file} - Valid batch file`);
          this.testResults.push({
            name: `Batch File: ${file}`,
            passed: true,
            message: 'Valid batch file'
          });
        } else {
          console.log(`   ⚠️ ${file} - Missing @echo off`);
          this.testResults.push({
            name: `Batch File: ${file}`,
            passed: false,
            message: 'Missing @echo off',
            details: 'Batch file should start with @echo off'
          });
          batchOk = false;
        }
      } else {
        console.log(`   ❌ ${file} - File not found`);
        this.testResults.push({
          name: `Batch File: ${file}`,
          passed: false,
          message: 'File not found'
        });
        batchOk = false;
      }
    }

    if (batchOk) {
      this.testResults.push({
        name: 'Batch Files',
        passed: true,
        message: 'All batch files valid'
      });
    } else {
      this.testResults.push({
        name: 'Batch Files',
        passed: false,
        message: 'Some batch files have issues'
      });
    }
  }

  private async testTypeScriptBuild(): Promise<void> {
    console.log('\n6️⃣ Testing TypeScript build...');
    
    try {
      // Check if TypeScript is installed
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      const hasTypeScript = packageJson.devDependencies && packageJson.devDependencies.typescript;
      
      if (hasTypeScript) {
        console.log(`   ✅ TypeScript installed - Version ${packageJson.devDependencies.typescript}`);
        
        // Try to build
        try {
          const { execSync } = require('child_process');
          execSync('npm run build', { stdio: 'pipe' });
          console.log(`   ✅ TypeScript build successful`);
          
          this.testResults.push({
            name: 'TypeScript Build',
            passed: true,
            message: 'TypeScript build successful'
          });
          
        } catch (buildError) {
          console.log(`   ⚠️ TypeScript build failed - check for type errors`);
          
          this.testResults.push({
            name: 'TypeScript Build',
            passed: false,
            message: 'TypeScript build failed',
            details: 'Check for type errors in TypeScript files'
          });
        }
        
      } else {
        console.log(`   ❌ TypeScript not installed`);
        
        this.testResults.push({
          name: 'TypeScript Build',
          passed: false,
          message: 'TypeScript not installed',
          details: 'Install TypeScript with npm install --save-dev typescript'
        });
      }
      
    } catch (error) {
      console.log(`   ❌ TypeScript test error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      
      this.testResults.push({
        name: 'TypeScript Build',
        passed: false,
        message: 'TypeScript test error',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  private showTestSummary(): void {
    console.log('\n📊 Test Summary:');
    
    const passedTests = this.testResults.filter(result => result.passed);
    const failedTests = this.testResults.filter(result => !result.passed);
    
    console.log(`✅ Passed: ${passedTests.length}`);
    console.log(`❌ Failed: ${failedTests.length}`);
    console.log(`📊 Total: ${this.testResults.length}`);
    
    if (failedTests.length === 0) {
      console.log('\n🎉 All tests passed! System is ready to use.');
      console.log('\n🚀 Next steps:');
      console.log('   1. Add your key.json file');
      console.log('   2. Run: make validate');
      console.log('   3. Run: make help');
      console.log('   4. Build TypeScript: npm run build');
      
    } else {
      console.log('\n⚠️ Some tests failed. Please check the issues above.');
      console.log('\n🔧 Common fixes:');
      console.log('   1. Run: npm install');
      console.log('   2. Check file permissions');
      console.log('   3. Verify configuration files');
      console.log('   4. Fix TypeScript errors');
    }

    console.log('\n✨ Test completed!');
    
    // Log test results
    logger.info('TEST_COMPLETED', `Tests completed: ${passedTests.length} passed, ${failedTests.length} failed`);
    
    // Exit with error code if any tests failed
    if (failedTests.length > 0) {
      process.exit(1);
    }
  }

  // Method to get test results for external use
  getTestResults(): TestResult[] {
    return this.testResults;
  }

  // Method to check if all tests passed
  allTestsPassed(): boolean {
    return this.testResults.every(result => result.passed);
  }
}

// Main execution
async function main(): Promise<void> {
  try {
    const tester = new SystemTester();
    await tester.runAllTests();
    
    // Exit with appropriate code
    if (!tester.allTestsPassed()) {
      process.exit(1);
    }
    
  } catch (error) {
    console.error('❌ Test execution failed:', error instanceof Error ? error.message : 'Unknown error');
    process.exit(1);
  }
}

// Export for use in other modules
export { SystemTester, TestResult };

// Run main function if called directly
if (require.main === module) {
  main().catch(console.error);
}
