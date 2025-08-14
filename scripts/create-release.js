#!/usr/bin/env node

/**
 * Automated Release Creator
 * Creates Git tags and GitHub releases automatically
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class ReleaseCreator {
  constructor() {
    this.packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    this.currentVersion = this.packageJson.version;
    this.changelogPath = 'CHANGELOG.md';
  }

  async createRelease(type = 'patch') {
    console.log(`🚀 Creating ${type} release...`);
    
    try {
      // 1. Check if working directory is clean
      this.checkWorkingDirectory();
      
      // 2. Run tests
      console.log('🧪 Running tests...');
      execSync('npm test', { stdio: 'inherit' });
      
      // 3. Validate configuration
      console.log('✅ Validating configuration...');
      execSync('npm run validate', { stdio: 'inherit' });
      
      // 4. Create new version
      console.log(`📦 Creating new ${type} version...`);
      const newVersion = this.calculateNewVersion(type);
      
      // 5. Update package.json
      this.updatePackageJson(newVersion);
      
      // 6. Update CHANGELOG.md
      this.updateChangelog(newVersion, type);
      
      // 7. Create Git commit
      console.log('📝 Creating Git commit...');
      execSync('git add .', { stdio: 'inherit' });
      execSync(`git commit -m "chore: bump version to ${newVersion}"`, { stdio: 'inherit' });
      
      // 8. Create Git tag
      console.log(`🏷️ Creating Git tag v${newVersion}...`);
      execSync(`git tag -a v${newVersion} -m "Release v${newVersion}"`, { stdio: 'inherit' });
      
      // 9. Push changes
      console.log('🚀 Pushing to remote...');
      execSync('git push', { stdio: 'inherit' });
      execSync('git push --tags', { stdio: 'inherit' });
      
      console.log(`🎉 Release v${newVersion} created successfully!`);
      console.log('📋 Next steps:');
      console.log(`   1. GitHub Actions will automatically create a release for v${newVersion}`);
      console.log('   2. Check GitHub Releases page');
      console.log('   3. Update documentation if needed');
      
    } catch (error) {
      console.error('❌ Release creation failed:', error.message);
      process.exit(1);
    }
  }

  checkWorkingDirectory() {
    const status = execSync('git status --porcelain', { encoding: 'utf8' }).trim();
    if (status) {
      throw new Error('Working directory is not clean. Please commit or stash changes first.');
    }
  }

  calculateNewVersion(type) {
    const [major, minor, patch] = this.currentVersion.split('.').map(Number);
    
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

  updatePackageJson(newVersion) {
    this.packageJson.version = newVersion;
    fs.writeFileSync('package.json', JSON.stringify(this.packageJson, null, 2));
    console.log(`📝 Updated package.json to version ${newVersion}`);
  }

  updateChangelog(newVersion, type) {
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
  }

  getReleaseTypeDescription(type) {
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
}

// Main execution
async function main() {
  const releaseType = process.argv[2] || 'patch';
  const validTypes = ['major', 'minor', 'patch', 'preview'];
  
  if (!validTypes.includes(releaseType)) {
    console.error('❌ Invalid release type. Use: major, minor, patch, or preview');
    console.log('📋 Examples:');
    console.log('   node scripts/create-release.js patch    # 1.0.0 → 1.0.1');
    console.log('   node scripts/create-release.js minor    # 1.0.0 → 1.1.0');
    console.log('   node scripts/create-release.js major    # 1.0.0 → 2.0.0');
    console.log('   node scripts/create-release.js preview  # 1.0.0 → 1.0.1-beta.1');
    process.exit(1);
  }
  
  const creator = new ReleaseCreator();
  await creator.createRelease(releaseType);
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { ReleaseCreator };
