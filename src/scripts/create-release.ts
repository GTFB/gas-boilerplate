#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

class ReleaseCreator {
  async createRelease(): Promise<void> {
    const releaseType = await this.selectReleaseType();
    const version = await this.bumpVersion(releaseType);
    
    console.log(`\n📦 Creating ${releaseType} release: v${version}`);
    
    try {
      await this.commitChanges(version);
      this.createTag(version);
      this.pushChanges();
      
      console.log(`\n✅ Release v${version} created successfully!`);
      console.log(`\n📋 Next steps:`);
      console.log(`  1. Review the changes: git log --oneline -5`);
      console.log(`  2. Push tags: git push --tags`);
      console.log(`  3. Create GitHub release if needed`);
      
    } catch (error) {
      console.error('❌ Release creation failed:', error instanceof Error ? error.message : 'Unknown error');
      throw error;
    }
  }

  private async selectReleaseType(): Promise<string> {
    console.log('\n📋 Select release type:');
    console.log('  1 = Major (breaking changes)');
    console.log('  2 = Minor (new features)');
    console.log('  3 = Patch (bug fixes)');
    
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    return new Promise((resolve) => {
      rl.question('\n💡 Select release type (1-3, default: 3): ', (answer: string) => {
        rl.close();
        
        const choice = answer.trim();
        if (choice === '1') {
          resolve('major');
        } else if (choice === '2') {
          resolve('minor');
        } else {
          resolve('patch');
        }
      });
    });
  }

  private async bumpVersion(releaseType: string): Promise<string> {
    const packagePath = path.resolve(process.cwd(), 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    
    const currentVersion = packageJson.version;
    const [major, minor, patch] = currentVersion.split('.').map(Number);
    
    let newVersion: string;
    
    switch (releaseType) {
      case 'major':
        newVersion = `${major + 1}.0.0`;
        break;
      case 'minor':
        newVersion = `${major}.${minor + 1}.0`;
        break;
      case 'patch':
      default:
        newVersion = `${major}.${minor}.${patch + 1}`;
        break;
    }
    
    packageJson.version = newVersion;
    fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
    
    // Update version in README.md
    await this.updateReadmeVersion(currentVersion, newVersion);
    
    console.log(`📈 Version bumped: ${currentVersion} → ${newVersion}`);
    return newVersion;
  }

  private async updateReadmeVersion(oldVersion: string, newVersion: string): Promise<void> {
    try {
      const readmePath = path.resolve(process.cwd(), 'README.md');
      if (fs.existsSync(readmePath)) {
        let readmeContent = fs.readFileSync(readmePath, 'utf8');
        
        // Update version badge
        const versionBadgeRegex = /\[!\[Version\]\(https:\/\/img\.shields\.io\/badge\/Version-([\d.]+)-orange\.svg\)\]\(CHANGELOG\.md\)/g;
        readmeContent = readmeContent.replace(versionBadgeRegex, `[![Version](https://img.shields.io/badge/Version-${newVersion}-orange.svg)](CHANGELOG.md)`);
        
        fs.writeFileSync(readmePath, readmeContent);
        console.log(`📝 Version updated in README.md: ${oldVersion} → ${newVersion}`);
      }
    } catch (error) {
      console.log(`⚠️  Could not update README.md: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private async commitChanges(version: string): Promise<void> {
    try {
      const readline = require('readline');
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      
      const commitMessage = await new Promise<string>((resolve) => {
        rl.question(`\n💬 Enter commit message (default: "Release v${version}"): `, (answer: string) => {
          rl.close();
          const message = answer.trim() || `Release v${version}`;
          resolve(message);
        });
      });
      
      execSync('git add .', { stdio: 'inherit' });
      execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
      console.log('✅ Changes committed');
    } catch (error) {
      throw new Error('Failed to commit changes');
    }
  }

  private createTag(version: string): void {
    try {
      execSync(`git tag -a v${version} -m "Release v${version}"`, { stdio: 'inherit' });
      console.log('✅ Tag created');
    } catch (error) {
      throw new Error('Failed to create tag');
    }
  }

  private pushChanges(): void {
    try {
      execSync('git push', { stdio: 'inherit' });
      console.log('✅ Changes pushed');
    } catch (error) {
      console.log('⚠️  Could not push changes (remote may not be configured)');
    }
  }
}

// Main execution
async function main(): Promise<void> {
  try {
    const creator = new ReleaseCreator();
    await creator.createRelease();
  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : 'Unknown error');
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch(console.error);
}
