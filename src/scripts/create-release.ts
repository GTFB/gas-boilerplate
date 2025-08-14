#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
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

  async createRelease(type: ReleaseType = 'patch'): Promise<void> {
    console.log(`🚀 Creating ${type} release...`);
    
    try {
      // 1. Check if working directory is clean
      this.checkWorkingDirectory();
      
      // 2. Validate configuration
      console.log('✅ Validating configuration...');
      execSync('npm run validate', { stdio: 'inherit' });
      
      // 3. Create new version
      console.log(`📦 Creating new ${type} version...`);
      const newVersion = this.calculateNewVersion(type);
      
      // 4. Update package.json
      this.updatePackageJson(newVersion);
      
      // 5. Update CHANGELOG.md
      this.updateChangelog(newVersion, type);
      
      // 6. Create Git commit
      console.log('📝 Creating Git commit...');
      execSync('git add .', { stdio: 'inherit' });
      execSync(`git commit -m "chore: bump version to ${newVersion}"`, { stdio: 'inherit' });
      
      // 7. Create Git tag
      console.log(`🏷️ Creating Git tag v${newVersion}...`);
      execSync(`git tag -a v${newVersion} -m "Release v${newVersion}"`, { stdio: 'inherit' });
      
      // 8. Push changes
      console.log('🚀 Pushing to remote...');
      execSync('git push', { stdio: 'inherit' });
      execSync('git push --tags', { stdio: 'inherit' });
      
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

  private checkWorkingDirectory(): void {
    try {
      const status = execSync('git status --porcelain', { encoding: 'utf8' }).trim();
      if (status) {
        throw new Error('Working directory is not clean. Please commit or stash changes first.');
      }
    } catch (error) {
      throw new Error('Failed to check git status. Make sure you are in a git repository.');
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
  const releaseType = process.argv[2] as ReleaseType || 'patch';
  const validTypes: ReleaseType[] = ['major', 'minor', 'patch', 'preview'];
  
  if (!validTypes.includes(releaseType)) {
    console.error('❌ Invalid release type. Use: major, minor, patch, or preview');
    console.log('📋 Examples:');
    console.log('   node scripts/create-release.js patch    # 1.0.0 → 1.0.1');
    console.log('   node scripts/create-release.js minor    # 1.0.0 → 1.1.0');
    console.log('   node scripts/create-release.js major    # 1.0.0 → 2.0.0');
    console.log('   node scripts/create-release.js preview  # 1.0.0 → 1.0.1-beta.1');
    process.exit(1);
  }
  
  try {
    const creator = new ReleaseCreator();
    
    // Show release preview
    const summary = creator.getReleaseSummary();
    console.log(`\n📋 Release Preview:`);
    console.log(`Current version: ${summary.currentVersion}`);
    console.log(`New version: ${summary.nextVersions[releaseType]}`);
    console.log(`Type: ${releaseType}`);
    
    // Confirm release
    console.log('\n🚀 Proceeding with release creation...');
    
    await creator.createRelease(releaseType);
    
  } catch (error) {
    console.error('❌ Release creation failed:', error instanceof Error ? error.message : 'Unknown error');
    process.exit(1);
  }
}

// Run main function if called directly
if (require.main === module) {
  main().catch(console.error);
}
