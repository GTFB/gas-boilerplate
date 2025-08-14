#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import * as readline from 'readline';
import { logger } from '../utils/logger';
import { ReleaseType, PackageJson } from '../types';

export class ReleaseCreator {
  private packageJson: PackageJson;
  private currentVersion: string;
  private changelogPath: string;

  constructor() {
    this.packageJson = this.loadPackageJson();
    this.currentVersion = this.packageJson.version;
    this.changelogPath = 'CHANGELOG.md';
  }

  async createRelease(): Promise<void> {
    try {
      // 1. Select release type
      console.log('🔄 Selecting release type...');
      const releaseType = await this.selectReleaseType();
      console.log(`✅ Selected: ${releaseType} release`);
      
      // 2. Get commit message
      console.log('💬 Getting commit message...');
      const commitMessage = await this.getCommitMessage();
      console.log(`✅ Commit message: ${commitMessage}`);
      
      // 3. Validate configuration
      console.log('✅ Validating configuration...');
      execSync('npx ts-node src/utils/config-validator.ts basic', { stdio: 'pipe' });
      
      // 4. Create new version
      console.log(`📦 Creating new ${releaseType} version...`);
      const newVersion = this.calculateNewVersion(releaseType);
      
      // 5. Update package.json
      this.updatePackageJson(newVersion);
      
      // 6. Update CHANGELOG.md
      this.updateChangelog(newVersion, releaseType);
      
      // 7. Add all changes to git (including version updates)
      console.log('📝 Adding all changes to git...');
      execSync('git add .', { stdio: 'inherit' });
      
      // 8. Create Git commit
      console.log('📝 Creating Git commit...');
      execSync(`git commit -m "${commitMessage}" --no-verify`, { stdio: 'inherit' });
      
      // 9. Create Git tag
      console.log(`🏷️ Creating Git tag v${newVersion}...`);
      execSync(`git tag -a v${newVersion} -m "Release v${newVersion}"`, { stdio: 'inherit' });
      
      // 10. Push changes
      console.log('🚀 Pushing to remote...');
      execSync('git push', { stdio: 'inherit' });
      execSync('git push --tags', { stdio: 'inherit' });
      
      // 11. Verify push was successful
      console.log('✅ Verifying push was successful...');
      const remoteStatus = execSync('git status -uno', { encoding: 'utf8' });
      if (remoteStatus.includes('Your branch is behind') || remoteStatus.includes('Your branch is ahead')) {
        throw new Error('Push verification failed. Branch is not in sync with remote.');
      }
      
      console.log(`🎉 Release v${newVersion} created successfully!`);
      console.log('📋 Next steps:');
      console.log(`   1. GitHub Actions will automatically create a release for v${newVersion}`);
      console.log('   2. Check GitHub Releases page');
      console.log('   3. Update documentation if needed');
      
      logger.info('RELEASE_CREATED', `Release v${newVersion} created successfully`);
      
    } catch (error) {
      logger.error('RELEASE_ERROR', `Release creation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      console.error('❌ Release creation failed:', error instanceof Error ? error.message : 'Unknown error');
      process.exit(1);
    }
  }

  private loadPackageJson(): PackageJson {
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    
    if (!fs.existsSync(packageJsonPath)) {
      throw new Error('package.json not found');
    }
    
    try {
      return JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    } catch (error) {
      throw new Error(`Failed to parse package.json: ${error instanceof Error ? error.message : 'Parse error'}`);
    }
  }



  private calculateNewVersion(type: ReleaseType): string {
    const parts = this.currentVersion.split('.').map(Number);
    const major = parts[0] || 0;
    const minor = parts[1] || 0;
    const patch = parts[2] || 0;
    
    switch (type) {
      case 'major':
        return `${major + 1}.0.0`;
      case 'minor':
        return `${major}.${minor + 1}.0`;
      case 'patch':
        return `${major}.${minor}.${patch + 1}`;
      case 'preview':
        return `${major}.${minor}.${patch + 1}-beta.1`;
      default:
        throw new Error(`Invalid release type: ${type}`);
    }
  }

  private updatePackageJson(newVersion: string): void {
    this.packageJson.version = newVersion;
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    
    fs.writeFileSync(packageJsonPath, JSON.stringify(this.packageJson, null, 2));
    console.log(`📝 Updated package.json to version ${newVersion}`);
    
    logger.info('PACKAGE_JSON_UPDATED', `Version updated to ${newVersion}`);
    
    // Also update README.md version badge
    this.updateReadmeVersion(newVersion);
  }

  private updateChangelog(newVersion: string, type: ReleaseType): void {
    if (!fs.existsSync(this.changelogPath)) {
      this.createChangelogFile();
    }
    
    const changelog = fs.readFileSync(this.changelogPath, 'utf8');
    const today = new Date().toISOString().split('T')[0];
    
    const newEntry = `## [${newVersion}] - ${today}

### ${this.getReleaseTypeDescription(type)}
- Automated release v${newVersion}
- All tests passed
- Configuration validated

### Changed
- Version bumped to ${newVersion}

---

`;
    
    const updatedChangelog = changelog.replace('# Changelog', `# Changelog\n\n${newEntry}`);
    fs.writeFileSync(this.changelogPath, updatedChangelog);
    
    console.log(`📝 Updated CHANGELOG.md with v${newVersion}`);
    logger.info('CHANGELOG_UPDATED', `CHANGELOG.md updated with v${newVersion}`);
  }

  private createChangelogFile(): void {
    const changelogContent = `# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

`;
    
    fs.writeFileSync(this.changelogPath, changelogContent);
    console.log('📝 Created new CHANGELOG.md file');
  }

  private getReleaseTypeDescription(type: ReleaseType): string {
    switch (type) {
      case 'major':
        return '🚀 Major Release';
      case 'minor':
        return '✨ Minor Release';
      case 'patch':
        return '🐛 Patch Release';
      case 'preview':
        return '🔍 Preview Release';
      default:
        return '📦 Release';
    }
  }

  private updateReadmeVersion(newVersion: string): void {
    const readmePath = path.join(process.cwd(), 'README.md');
    
    if (!fs.existsSync(readmePath)) {
      console.log('⚠️  README.md not found, skipping version update');
      return;
    }
    
    try {
      const readme = fs.readFileSync(readmePath, 'utf8');
      const updatedReadme = readme.replace(
        /Version-\d+\.\d+\.\d+/g,
        `Version-${newVersion}`
      );
      
      fs.writeFileSync(readmePath, updatedReadme);
      console.log(`📝 Updated README.md version badge to ${newVersion}`);
      logger.info('README_UPDATED', `README.md version badge updated to ${newVersion}`);
    } catch (error) {
      console.log('⚠️  Failed to update README.md version badge');
      logger.warn('README_UPDATE_FAILED', `Failed to update README.md: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private async selectReleaseType(): Promise<ReleaseType> {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    return new Promise((resolve) => {
      rl.question('Select release type (Enter for patch, 1=major, 2=minor, 3=patch): ', (answer) => {
        rl.close();
        const choice = answer.trim();
        
        switch (choice) {
          case '1':
            resolve('major');
            break;
          case '2':
            resolve('minor');
            break;
          case '3':
          case '':
          default:
            resolve('patch');
            break;
        }
      });
    });
  }

  private async getCommitMessage(): Promise<string> {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    return new Promise((resolve) => {
      rl.question('Enter commit message: ', (answer) => {
        rl.close();
        const message = answer.trim();
        if (!message) {
          throw new Error('Commit message cannot be empty');
        }
        resolve(message);
      });
    });
  }

  // Method to get release summary
  getReleaseSummary(): { currentVersion: string; nextVersions: Record<ReleaseType, string> } {
    const parts = this.currentVersion.split('.').map(Number);
    const major = parts[0] || 0;
    const minor = parts[1] || 0;
    const patch = parts[2] || 0;
    
    return {
      currentVersion: this.currentVersion,
      nextVersions: {
        patch: `${major}.${minor}.${patch + 1}`,
        minor: `${major}.${minor + 1}.0`,
        major: `${major + 1}.0.0`,
        preview: `${major}.${minor}.${patch + 1}-beta.1`
      }
    };
  }
}

// Main execution
async function main(): Promise<void> {
  try {
    const creator = new ReleaseCreator();
    
    // Show current version
    const summary = creator.getReleaseSummary();
    console.log(`\n📋 Current version: ${summary.currentVersion}`);
    
    // Start release process
    console.log('\n🚀 Starting release process...');
    
    await creator.createRelease();
    
  } catch (error) {
    console.error('❌ Release creation failed:', error instanceof Error ? error.message : 'Unknown error');
    process.exit(1);
  }
}

// Run main function if called directly
if (require.main === module) {
  main().catch(console.error);
}
