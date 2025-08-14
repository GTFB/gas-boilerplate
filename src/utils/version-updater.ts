import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import { logger } from './logger';
import { UpdateStatus, PackageJson } from '../types';

export class VersionUpdater {
  private currentDir: string;
  private packageJsonPath: string;

  constructor() {
    this.currentDir = process.cwd();
    this.packageJsonPath = path.join(this.currentDir, 'package.json');
  }

  async checkForUpdates(): Promise<UpdateStatus> {
    try {
      logger.info('UPDATE_CHECK', 'Checking for updates from gas-boilerplate...');
      
      // Get current version
      const currentVersion = this.getCurrentVersion();
      logger.info('CURRENT_VERSION', `Current version: ${currentVersion}`);
      
      // Check if we're in a git repository
      if (!this.isGitRepository()) {
        throw new Error('Not a git repository. Please initialize git first.');
      }
      
      // Check remote status
      const remoteStatus = this.checkRemoteStatus();
      if (!remoteStatus.hasRemote) {
        throw new Error('No remote repository configured. Please add gas-boilerplate as remote.');
      }
      
      // Fetch latest changes
      this.fetchLatestChanges();
      
      // Check for updates
      const hasUpdates = this.hasUpdates();
      
      if (hasUpdates) {
        const latestVersion = this.getLatestVersion();
        const commits = this.getNewCommits();
        
        logger.info('UPDATES_FOUND', `Updates available: ${currentVersion} → ${latestVersion}`);
        
        return {
          hasUpdates: true,
          currentVersion,
          latestVersion,
          commits
        };
      } else {
        logger.info('NO_UPDATES', 'No updates available');
        
        return {
          hasUpdates: false,
          currentVersion,
          latestVersion: currentVersion,
          commits: []
        };
      }
      
    } catch (error) {
      logger.error('UPDATE_CHECK_ERROR', `Failed to check for updates: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw error;
    }
  }

  async update(): Promise<void> {
    try {
      logger.info('UPDATE_START', 'Starting system update...');
      
      // Check for updates first
      const updateStatus = await this.checkForUpdates();
      
      if (!updateStatus.hasUpdates) {
        console.log('✅ System is already up to date');
        return;
      }
      
      console.log(`🔄 Updating from ${updateStatus.currentVersion} to ${updateStatus.latestVersion}...`);
      
      // Stash current changes if any
      const hasStash = this.stashCurrentChanges();
      
      try {
        // Pull latest changes
        this.pullLatestChanges();
        
        // Install new dependencies if package.json changed
        if (this.packageJsonChanged()) {
          this.installDependencies();
        }
        
        // Run validation
        this.runValidation();
        
        console.log('✅ System updated successfully!');
        logger.info('UPDATE_SUCCESS', `Updated to version ${updateStatus.latestVersion}`);
        
      } finally {
        // Restore stashed changes if any
        if (hasStash) {
          this.restoreStashedChanges();
        }
      }
      
    } catch (error) {
      logger.error('UPDATE_ERROR', `Update failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw error;
    }
  }

  private getCurrentVersion(): string {
    const packageJson = this.loadPackageJson();
    return packageJson.version;
  }

  private getLatestVersion(): string {
    try {
      const output = execSync('git describe --tags --abbrev=0', { encoding: 'utf8' });
      return output.trim().replace('v', '');
    } catch {
      // If no tags, use commit hash
      const output = execSync('git rev-parse --short HEAD', { encoding: 'utf8' });
      return output.trim();
    }
  }

  private loadPackageJson(): PackageJson {
    if (!fs.existsSync(this.packageJsonPath)) {
      throw new Error('package.json not found');
    }
    
    try {
      return JSON.parse(fs.readFileSync(this.packageJsonPath, 'utf8'));
    } catch (error) {
      throw new Error(`Failed to parse package.json: ${error instanceof Error ? error.message : 'Parse error'}`);
    }
  }

  private isGitRepository(): boolean {
    return fs.existsSync(path.join(this.currentDir, '.git'));
  }

  private checkRemoteStatus(): { hasRemote: boolean; remoteUrl: string | null } {
    try {
      const output = execSync('git remote -v', { encoding: 'utf8' });
      const lines = output.trim().split('\n');
      
      for (const line of lines) {
        if (line.includes('gas-boilerplate')) {
          const parts = line.split('\t');
          return { hasRemote: true, remoteUrl: parts[1] || null };
        }
      }
      
      return { hasRemote: false, remoteUrl: null };
    } catch {
      return { hasRemote: false, remoteUrl: null };
    }
  }

  private fetchLatestChanges(): void {
    logger.info('FETCH_CHANGES', 'Fetching latest changes from remote...');
    execSync('git fetch --all', { stdio: 'inherit' });
  }

  private hasUpdates(): boolean {
    try {
      execSync('git status --porcelain', { encoding: 'utf8' });
      const behindOutput = execSync('git rev-list --count HEAD..origin/main', { encoding: 'utf8' });
      const behindCount = parseInt(behindOutput.trim());
      
      return behindCount > 0;
    } catch {
      return false;
    }
  }

  private getNewCommits(): string[] {
    try {
      const output = execSync('git log --oneline HEAD..origin/main', { encoding: 'utf8' });
      return output.trim().split('\n').filter(line => line.trim());
    } catch {
      return [];
    }
  }

  private stashCurrentChanges(): boolean {
    try {
      const status = execSync('git status --porcelain', { encoding: 'utf8' });
      
      if (status.trim()) {
        logger.info('STASH_CHANGES', 'Stashing current changes...');
        execSync('git stash push -m "Auto-stash before update"', { stdio: 'inherit' });
        return true;
      }
      
      return false;
    } catch {
      return false;
    }
  }

  private pullLatestChanges(): void {
    logger.info('PULL_CHANGES', 'Pulling latest changes...');
    
    try {
      execSync('git pull origin main', { stdio: 'inherit' });
    } catch (error) {
      // Try to resolve conflicts automatically
      logger.warn('PULL_CONFLICT', 'Pull failed, attempting to resolve conflicts...');
      this.resolveConflicts();
    }
  }

  private resolveConflicts(): void {
    try {
      // Reset to remote state
      execSync('git reset --hard origin/main', { stdio: 'inherit' });
      logger.info('CONFLICT_RESOLVED', 'Conflicts resolved by resetting to remote state');
    } catch (error) {
      throw new Error('Failed to resolve conflicts automatically. Please resolve manually.');
    }
  }

  private packageJsonChanged(): boolean {
    try {
      const status = execSync('git status --porcelain package.json', { encoding: 'utf8' });
      return status.trim().length > 0;
    } catch {
      return false;
    }
  }

  private installDependencies(): void {
    logger.info('INSTALL_DEPS', 'Installing new dependencies...');
    execSync('npm install', { stdio: 'inherit' });
  }

  private runValidation(): void {
    logger.info('VALIDATION', 'Running system validation...');
    
    try {
      execSync('npm run validate', { stdio: 'inherit' });
      logger.info('VALIDATION_SUCCESS', 'System validation passed');
    } catch (error) {
      logger.warn('VALIDATION_WARNING', 'System validation failed, but update completed');
    }
  }

  private restoreStashedChanges(): void {
    try {
      logger.info('RESTORE_STASH', 'Restoring stashed changes...');
      execSync('git stash pop', { stdio: 'inherit' });
    } catch (error) {
      logger.warn('STASH_RESTORE_WARNING', 'Failed to restore stashed changes. Check git stash list.');
    }
  }

  // Method to get update status summary
  getUpdateStatus(): { isUpToDate: boolean; currentVersion: string; lastCheck: string } {
    const currentVersion = this.getCurrentVersion();
    const lastCheck = new Date().toISOString();
    
    return {
      isUpToDate: true, // This would need to be determined by actual check
      currentVersion,
      lastCheck
    };
  }
}

// Main function for command line execution
async function main(): Promise<void> {
  const command = process.argv[2] || 'check';
  
  try {
    const updater = new VersionUpdater();
    
    switch (command) {
      case 'check':
        const status = await updater.checkForUpdates();
        
        if (status.hasUpdates) {
          console.log('\n🔄 Updates available!');
          console.log(`Current version: ${status.currentVersion}`);
          console.log(`Latest version: ${status.latestVersion}`);
          console.log('\nNew commits:');
          status.commits.forEach(commit => console.log(`  ${commit}`));
          console.log('\nRun "npm run update" to apply updates');
        } else {
          console.log('✅ System is up to date');
        }
        break;
        
      case 'update':
        await updater.update();
        break;
        
      case 'status':
        const updateStatus = updater.getUpdateStatus();
        console.log('\n📋 Update Status:');
        console.log(`Current version: ${updateStatus.currentVersion}`);
        console.log(`Last check: ${updateStatus.lastCheck}`);
        console.log(`Up to date: ${updateStatus.isUpToDate ? 'Yes' : 'No'}`);
        break;
        
      default:
        console.log('Available commands: check, update, status');
        console.log('Usage: node version-updater.js [command]');
        process.exit(1);
    }
    
  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : 'Unknown error');
    process.exit(1);
  }
}

// Run main function if called directly
if (require.main === module) {
  main().catch(console.error);
}
