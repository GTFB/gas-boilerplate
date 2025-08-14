import { execSync } from 'child_process';
import { logger } from '../utils/logger';

export class RepositorySetup {
  private currentDir: string;

  constructor() {
    this.currentDir = process.cwd();
  }

  async setupRepositories(ayvaRepoUrl?: string): Promise<void> {
    try {
      logger.info('REPO_SETUP_START', 'Starting repository setup...');

      // Check if we're in a git repository
      if (!this.isGitRepository()) {
        throw new Error('Not a git repository. Please initialize git first.');
      }

      // Check current remote configuration
      const currentRemotes = this.getCurrentRemotes();
      logger.info('CURRENT_REMOTES', `Current remotes: ${JSON.stringify(currentRemotes)}`);

      // Step 1: Rename origin to upstream if it points to gas-boilerplate
      await this.setupUpstream();

      // Step 2: Add new origin for ayva repository
      if (ayvaRepoUrl) {
        await this.setupOrigin(ayvaRepoUrl);
      } else {
        await this.createAyvaRepository();
      }

      // Step 3: Verify setup
      await this.verifySetup();

      logger.info('REPO_SETUP_SUCCESS', 'Repository setup completed successfully!');
      console.log('✅ Repository setup completed!');
      console.log('\n📋 Current configuration:');
      console.log('  upstream -> gas-boilerplate (for updates)');
      console.log('  origin -> ayva (your repository)');
      console.log('\n💡 Use these commands:');
      console.log('  git pull upstream main    - get updates from gas-boilerplate');
      console.log('  git push origin main      - push to your ayva repository');
      console.log('  make update               - check for updates');
      console.log('  make upgrade              - apply updates');

    } catch (error) {
      logger.error('REPO_SETUP_ERROR', `Repository setup failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw error;
    }
  }

  private isGitRepository(): boolean {
    try {
      execSync('git rev-parse --git-dir', { stdio: 'ignore' });
      return true;
    } catch {
      return false;
    }
  }

  private getCurrentRemotes(): { [key: string]: string } {
    try {
      const output = execSync('git remote -v', { encoding: 'utf8' });
      const remotes: { [key: string]: string } = {};
      
      output.trim().split('\n').forEach(line => {
        if (line.trim()) {
          const [name, url] = line.split('\t');
          if (name && url) {
            remotes[name] = url;
          }
        }
      });
      
      return remotes;
    } catch {
      return {};
    }
  }

  private async setupUpstream(): Promise<void> {
    const currentRemotes = this.getCurrentRemotes();
    
    if (currentRemotes.origin && currentRemotes.origin.includes('gas-boilerplate')) {
      logger.info('SETUP_UPSTREAM', 'Setting up upstream from gas-boilerplate...');
      
      // Rename origin to upstream
      execSync('git remote rename origin upstream', { stdio: 'inherit' });
      console.log('✅ Renamed origin to upstream');
      
    } else if (currentRemotes.upstream) {
      logger.info('UPSTREAM_EXISTS', 'Upstream already configured');
      console.log('✅ Upstream already configured');
      
    } else {
      // Add upstream if it doesn't exist
      logger.info('ADD_UPSTREAM', 'Adding upstream remote...');
      execSync('git remote add upstream https://github.com/your-username/gas-boilerplate.git', { stdio: 'inherit' });
      console.log('✅ Added upstream remote');
    }
  }

  private async setupOrigin(ayvaRepoUrl: string): Promise<void> {
    logger.info('SETUP_ORIGIN', `Setting up origin for ayva: ${ayvaRepoUrl}`);
    
    // Remove existing origin if it exists
    try {
      execSync('git remote remove origin', { stdio: 'ignore' });
    } catch {
      // Origin doesn't exist, that's fine
    }
    
    // Add new origin
    execSync(`git remote add origin ${ayvaRepoUrl}`, { stdio: 'inherit' });
    console.log('✅ Added origin remote for ayva');
  }

  private async createAyvaRepository(): Promise<void> {
    logger.info('CREATE_AYVA_REPO', 'Creating new ayva repository...');
    
    console.log('\n🔧 Creating new ayva repository...');
    console.log('Please provide the GitHub repository URL for ayva:');
    console.log('Example: https://github.com/your-username/ayva.git');
    
    // In a real implementation, you might want to use a prompt library
    // For now, we'll just provide instructions
    console.log('\n📝 Manual steps:');
    console.log('1. Go to GitHub and create a new repository named "ayva"');
    console.log('2. Copy the repository URL');
    console.log('3. Run: git remote add origin <your-ayva-repo-url>');
    console.log('4. Run: git push -u origin main');
    
    throw new Error('Please create ayva repository manually and provide the URL');
  }

  private async verifySetup(): Promise<void> {
    logger.info('VERIFY_SETUP', 'Verifying repository setup...');
    
    const finalRemotes = this.getCurrentRemotes();
    console.log('\n🔍 Verifying setup...');
    
    if (finalRemotes.upstream && finalRemotes.upstream.includes('gas-boilerplate')) {
      console.log('✅ Upstream configured correctly');
    } else {
      console.log('❌ Upstream not configured correctly');
    }
    
    if (finalRemotes.origin && finalRemotes.origin.includes('ayva')) {
      console.log('✅ Origin configured correctly');
    } else {
      console.log('⚠️  Origin not configured for ayva');
    }
    
    // Test upstream connection
    try {
      execSync('git fetch upstream', { stdio: 'ignore' });
      console.log('✅ Upstream connection working');
    } catch {
      console.log('❌ Upstream connection failed');
    }
  }

  async testConnection(): Promise<void> {
    logger.info('TEST_CONNECTION', 'Testing repository connections...');
    
    console.log('\n🧪 Testing connections...');
    
    // Test upstream
    try {
      execSync('git fetch upstream', { stdio: 'ignore' });
      console.log('✅ Upstream (gas-boilerplate): OK');
    } catch {
      console.log('❌ Upstream (gas-boilerplate): Failed');
    }
    
    // Test origin
    try {
      execSync('git fetch origin', { stdio: 'ignore' });
      console.log('✅ Origin (ayva): OK');
    } catch {
      console.log('❌ Origin (ayva): Failed');
    }
  }
}

// Main function for command line execution
async function main(): Promise<void> {
  const command = process.argv[2];
  const ayvaRepoUrl = process.argv[3];
  
  try {
    const setup = new RepositorySetup();
    
    switch (command) {
      case 'setup':
        await setup.setupRepositories(ayvaRepoUrl);
        break;
        
      case 'test':
        await setup.testConnection();
        break;
        
      default:
        console.log('Repository Setup Tool');
        console.log('\nAvailable commands:');
        console.log('  setup [ayva-repo-url]  - Setup repositories');
        console.log('  test                    - Test connections');
        console.log('\nExamples:');
        console.log('  ts-node src/scripts/setup-repos.ts setup https://github.com/username/ayva.git');
        console.log('  ts-node src/scripts/setup-repos.ts test');
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
