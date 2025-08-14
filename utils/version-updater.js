const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { logger } = require('./logger');

class VersionUpdater {
  constructor() {
    this.config = JSON.parse(fs.readFileSync(path.join(__dirname, '../config.json'), 'utf8'));
    this.packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8'));
    this.currentVersion = this.packageJson.version;
  }

  async checkForUpdates() {
    logger.info('UPDATE_CHECK', `Checking for updates from gas-boilerplate...`);
    
    try {
      // Get remote origin URL
      const remoteUrl = execSync('git remote get-url origin', { encoding: 'utf8' }).trim();
      
      if (!remoteUrl.includes('gas-boilerplate')) {
        logger.warn('UPDATE_WARNING', 'This project is not connected to gas-boilerplate repository');
        return false;
      }

      // Fetch latest changes
      execSync('git fetch origin', { stdio: 'inherit' });
      
      // Get local and remote commit hashes
      const localCommit = execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();
      const remoteCommit = execSync('git rev-parse origin/main', { encoding: 'utf8' }).trim();
      
      if (localCommit === remoteCommit) {
        logger.info('UPDATE_INFO', 'Already up to date with gas-boilerplate');
        return false;
      }

      // Get commit messages since last update
      const commits = execSync(`git log ${localCommit}..origin/main --oneline`, { encoding: 'utf8' });
      
      logger.info('UPDATE_AVAILABLE', `Found updates in gas-boilerplate:`);
      console.log(commits);
      
      return true;
    } catch (error) {
      logger.error('UPDATE_ERROR', `Failed to check for updates: ${error.message}`);
      return false;
    }
  }

  async updateFromBoilerplate() {
    logger.info('UPDATE_START', 'Starting update from gas-boilerplate...');
    
    try {
      // Stash any local changes
      const hasChanges = execSync('git status --porcelain', { encoding: 'utf8' }).trim();
      let stashed = false;
      
      if (hasChanges) {
        logger.info('UPDATE_STASH', 'Stashing local changes...');
        execSync('git stash push -m "Auto-stash before update"', { stdio: 'inherit' });
        stashed = true;
      }

      // Pull latest changes
      logger.info('UPDATE_PULL', 'Pulling latest changes...');
      execSync('git pull origin main', { stdio: 'inherit' });
      
      // Install/update dependencies
      logger.info('UPDATE_DEPS', 'Updating dependencies...');
      execSync('npm install', { stdio: 'inherit' });
      
      // Run validation
      logger.info('UPDATE_VALIDATE', 'Validating system after update...');
      execSync('node utils/config-validator.js', { stdio: 'inherit' });
      
      // Restore stashed changes if any
      if (stashed) {
        logger.info('UPDATE_RESTORE', 'Restoring stashed changes...');
        try {
          execSync('git stash pop', { stdio: 'inherit' });
        } catch (stashError) {
          logger.warn('UPDATE_STASH_WARNING', 'Failed to restore stashed changes, manual merge required');
        }
      }
      
      // Get new version
      const newPackageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8'));
      const newVersion = newPackageJson.version;
      
      logger.info('UPDATE_SUCCESS', `Successfully updated from ${this.currentVersion} to ${newVersion}`);
      
      // Create update log
      this.createUpdateLog(newVersion);
      
      return true;
    } catch (error) {
      logger.error('UPDATE_FAILED', `Update failed: ${error.message}`);
      
      // Try to restore from stash if update failed
      try {
        execSync('git stash pop', { stdio: 'inherit' });
        logger.info('UPDATE_RESTORE', 'Restored from stash after failed update');
      } catch (restoreError) {
        logger.error('UPDATE_RESTORE_FAILED', 'Failed to restore from stash');
      }
      
      return false;
    }
  }

  createUpdateLog(newVersion) {
    const updateLogPath = path.join(__dirname, '../logs/updates.md');
    const updateDir = path.dirname(updateLogPath);
    
    if (!fs.existsSync(updateDir)) {
      fs.mkdirSync(updateDir, { recursive: true });
    }
    
    const timestamp = new Date().toISOString();
    const updateEntry = `## ${newVersion} - ${timestamp}
- Updated from ${this.currentVersion}
- Source: gas-boilerplate
- Status: Success

`;
    
    let existingContent = '';
    if (fs.existsSync(updateLogPath)) {
      existingContent = fs.readFileSync(updateLogPath, 'utf8');
    }
    
    fs.writeFileSync(updateLogPath, updateEntry + existingContent);
    logger.info('UPDATE_LOG', `Update log created: ${updateLogPath}`);
  }

  async showUpdateStatus() {
    try {
      const status = execSync('git status --porcelain', { encoding: 'utf8' }).trim();
      const branch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
      const lastCommit = execSync('git log -1 --oneline', { encoding: 'utf8' }).trim();
      
      console.log('📊 Update Status:');
      console.log(`Branch: ${branch}`);
      console.log(`Last commit: ${lastCommit}`);
      console.log(`Local changes: ${status ? 'Yes' : 'No'}`);
      
      if (status) {
        console.log('\nModified files:');
        console.log(status);
      }
      
      // Check if behind origin
      try {
        const behind = execSync('git rev-list HEAD..origin/main --count', { encoding: 'utf8' }).trim();
        if (behind !== '0') {
          console.log(`\n⚠️  Behind origin/main by ${behind} commits`);
        } else {
          console.log('\n✅ Up to date with origin/main');
        }
      } catch (error) {
        console.log('\n❓ Cannot determine sync status with origin');
      }
      
    } catch (error) {
      logger.error('STATUS_ERROR', `Failed to show status: ${error.message}`);
    }
  }
}

// CLI interface
async function main() {
  const updater = new VersionUpdater();
  const command = process.argv[2];
  
  switch (command) {
    case 'check':
      await updater.checkForUpdates();
      break;
    case 'update':
      await updater.updateFromBoilerplate();
      break;
    case 'status':
      await updater.showUpdateStatus();
      break;
    default:
      console.log('📋 Version Updater Usage:');
      console.log('  node version-updater.js check    - Check for updates');
      console.log('  node version-updater.js update   - Update from gas-boilerplate');
      console.log('  node version-updater.js status   - Show update status');
      console.log('');
      console.log('Or use npm script:');
      console.log('  npm run update                  - Update from gas-boilerplate');
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = VersionUpdater;
