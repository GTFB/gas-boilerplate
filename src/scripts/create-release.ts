#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

class ReleaseCreator {
  async createRelease(): Promise<void> {
    console.log('🚀 Creating release...');
    
    const releaseType = await this.selectReleaseType();
    const version = await this.bumpVersion(releaseType);
    
    console.log(`\n📦 Creating ${releaseType} release: v${version}`);
    
    try {
      this.commitChanges(version);
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
    
    // For now, default to patch
    console.log('\n💡 Defaulting to patch release');
    return 'patch';
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
    
    console.log(`📈 Version bumped: ${currentVersion} → ${newVersion}`);
    return newVersion;
  }

  private commitChanges(version: string): void {
    try {
      execSync('git add .', { stdio: 'inherit' });
      execSync(`git commit -m "Release v${version}"`, { stdio: 'inherit' });
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
