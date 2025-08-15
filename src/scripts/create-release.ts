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
      
      // Ask user if they want to create a tag
      const shouldCreateTag = await this.askForTagCreation(version);
      if (shouldCreateTag) {
        await this.createTagWithDescription(version);
      } else {
        console.log('⏭️  Skipping tag creation');
      }
      
      this.pushChanges();
      
      // Push tags if they were created
      if (shouldCreateTag) {
        this.pushTags();
      }
      
      console.log(`\n✅ Release v${version} created successfully!`);
      console.log(`\n📋 Next steps:`);
      console.log(`  1. Review the changes: git log --oneline -5`);
      if (shouldCreateTag) {
        console.log(`  2. Tags already pushed to remote`);
        console.log(`  3. Create GitHub release if needed`);
        console.log(`\n💡 Tag created with description from CHANGELOG.md`);
        console.log(`   View tag: git show v${version}`);
      } else {
        console.log(`  2. Create tag manually if needed: git tag -a v${version} -m "Release v${version}"`);
        console.log(`  3. Push tags: git push --tags`);
        console.log(`  4. Create GitHub release if needed`);
      }
      
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
    
    // Check if CHANGELOG.md already has a higher version
    const changelogVersion = await this.getLatestVersionFromChangelog();
    
    if (changelogVersion && this.isVersionHigher(changelogVersion, currentVersion)) {
      console.log(`📋 Found higher version in CHANGELOG.md: ${changelogVersion}`);
      console.log(`📝 Using existing version from CHANGELOG.md instead of bumping`);
      
      // Use the version from CHANGELOG.md
      packageJson.version = changelogVersion;
      fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
      
      // Update version in README.md
      await this.updateReadmeVersion(currentVersion, changelogVersion);
      
      console.log(`📈 Version synchronized: ${currentVersion} → ${changelogVersion}`);
      return changelogVersion;
    }
    
    // Normal version bumping
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
    
    // Update version in CHANGELOG.md
    await this.updateChangelogVersion(currentVersion, newVersion);
    
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

  private getCurrentDate(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;
    console.log(`📅 Current date: ${dateString}`);
    return dateString;
  }

  private async getLatestVersionFromChangelog(): Promise<string | null> {
    try {
      const changelogPath = path.resolve(process.cwd(), 'CHANGELOG.md');
      if (fs.existsSync(changelogPath)) {
        const changelogContent = fs.readFileSync(changelogPath, 'utf8');
        
        // Find the latest version from CHANGELOG.md
        const versionHeaderRegex = /^## \[([\d.]+)\] - /gm;
        const matches = Array.from(changelogContent.matchAll(versionHeaderRegex));
        
        if (matches.length > 0) {
          const latestVersion = matches[0][1];
          console.log(`🔍 Latest version in CHANGELOG.md: ${latestVersion}`);
          return latestVersion;
        }
      }
      return null;
    } catch (error) {
      console.log(`⚠️  Could not read CHANGELOG.md: ${error instanceof Error ? error.message : 'Unknown error'}`);
      return null;
    }
  }

  private isVersionHigher(version1: string, version2: string): boolean {
    const v1Parts = version1.split('.').map(Number);
    const v2Parts = version2.split('.').map(Number);
    
    for (let i = 0; i < Math.max(v1Parts.length, v2Parts.length); i++) {
      const v1Part = v1Parts[i] || 0;
      const v2Part = v2Parts[i] || 0;
      
      if (v1Part > v2Part) return true;
      if (v1Part < v2Part) return false;
    }
    
    return false; // Versions are equal
  }

  private async updateChangelogVersion(oldVersion: string, newVersion: string): Promise<void> {
    try {
      const changelogPath = path.resolve(process.cwd(), 'CHANGELOG.md');
      if (fs.existsSync(changelogPath)) {
        let changelogContent = fs.readFileSync(changelogPath, 'utf8');
        
        // Update version in CHANGELOG.md header with current date
        const currentDate = this.getCurrentDate();
        const versionHeaderRegex = new RegExp(`^## \\[${oldVersion}\\] - [^\\n]+`, 'gm');
        changelogContent = changelogContent.replace(versionHeaderRegex, `## [${newVersion}] - ${currentDate}`);
        
        fs.writeFileSync(changelogPath, changelogContent);
        console.log(`📝 Version updated in CHANGELOG.md: ${oldVersion} → ${newVersion} (${currentDate})`);
      }
    } catch (error) {
      console.log(`⚠️  Could not update CHANGELOG.md: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private async askForTagCreation(version: string): Promise<boolean> {
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    return new Promise<boolean>((resolve) => {
      rl.question(`\n🏷️  Create git tag for v${version}? (y/N, default: N): `, (answer: string) => {
        rl.close();
        const choice = answer.trim().toLowerCase();
        const shouldCreate = choice === 'y' || choice === 'yes';
        console.log(`💡 User choice: ${shouldCreate ? 'YES - will create tag' : 'NO - skipping tag creation'}`);
        resolve(shouldCreate);
      });
    });
  }

  private async createTagWithDescription(version: string): Promise<void> {
    try {
      console.log('🏷️  Creating git tag...');
      
      // Get description from CHANGELOG.md
      const tagMessage = await this.getTagMessageFromChangelog(version);
      console.log(`📝 Tag message length: ${tagMessage.length} characters`);
      
      // Create the tag
      execSync(`git tag -a v${version} -m "${tagMessage}"`, { stdio: 'inherit' });
      console.log('✅ Tag created with description from CHANGELOG.md');
      
      // Verify tag was created
      try {
        execSync(`git tag -l v${version}`, { stdio: 'pipe' });
        console.log(`🔍 Tag verification: v${version} found in git tags`);
      } catch (verifyError) {
        console.log(`⚠️  Tag verification failed: ${verifyError instanceof Error ? verifyError.message : 'Unknown error'}`);
      }
    } catch (error) {
      console.error(`❌ Failed to create tag: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw new Error('Failed to create tag');
    }
  }

  private async getTagMessageFromChangelog(version: string): Promise<string> {
    try {
      const changelogPath = path.resolve(process.cwd(), 'CHANGELOG.md');
      if (fs.existsSync(changelogPath)) {
        const changelogContent = fs.readFileSync(changelogPath, 'utf8');
        
        console.log(`🔍 Looking for version ${version} in CHANGELOG.md...`);
        
        // Find the section for this version
        const versionSectionRegex = new RegExp(`## \\[${version}\\] - [^\\n]+\\n([\\s\\S]*?)(?=## \\[|$)`, 'g');
        const match = versionSectionRegex.exec(changelogContent);
        
        if (match && match[1]) {
          console.log(`✅ Found version ${version} in CHANGELOG.md`);
          
          // Extract the content and clean it up
          let content = match[1].trim();
          
          // Remove markdown formatting and clean up
          content = content
            .replace(/^###\s+/gm, '') // Remove ### headers
            .replace(/^\*\*\s+/gm, '• ') // Replace ** with •
            .replace(/^\s*-\s+/gm, '• ') // Replace - with •
            .replace(/^\s*✅\s+/gm, '• ') // Replace ✅ with •
            .replace(/^\s*🔧\s+/gm, '• ') // Replace 🔧 with •
            .replace(/^\s*📚\s+/gm, '• ') // Replace 📚 with •
            .replace(/^\s*🐛\s+/gm, '• ') // Replace 🐛 with •
            .replace(/^\s*✨\s+/gm, '• ') // Replace ✨ with •
            .replace(/^\s*📁\s+/gm, '• ') // Replace 📁 with •
            .replace(/^\s*📝\s+/gm, '• ') // Replace 📝 with •
            .replace(/\n\s*\n/g, '\n') // Remove extra blank lines
            .trim();
          
          console.log(`📝 Extracted content length: ${content.length} characters`);
          
          // Limit length to avoid git tag message issues
          if (content.length > 500) {
            content = content.substring(0, 500) + '...';
            console.log(`📏 Content truncated to 500 characters`);
          }
          
          const tagMessage = `Release v${version}\n\n${content}`;
          console.log(`🏷️  Final tag message length: ${tagMessage.length} characters`);
          
          return tagMessage;
        } else {
          console.log(`⚠️  Version ${version} not found in CHANGELOG.md, using fallback message`);
        }
      } else {
        console.log(`⚠️  CHANGELOG.md not found, using fallback message`);
      }
      
      // Fallback to simple message
      return `Release v${version}`;
    } catch (error) {
      console.log(`⚠️  Could not read CHANGELOG.md: ${error instanceof Error ? error.message : 'Unknown error'}`);
      return `Release v${version}`;
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



  private pushChanges(): void {
    try {
      execSync('git push', { stdio: 'inherit' });
      console.log('✅ Changes pushed');
    } catch (error) {
      console.log('⚠️  Could not push changes (remote may not be configured)');
    }
  }

  private pushTags(): void {
    try {
      execSync('git push --tags', { stdio: 'inherit' });
      console.log('✅ Tags pushed to remote');
    } catch (error) {
      console.log('⚠️  Could not push tags (remote may not be configured)');
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
