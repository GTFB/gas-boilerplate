// @ts-nocheck
import { execSync } from 'child_process';
import * as path from 'path';

export class RepositorySetup {
  async setupRepositories(projectRepoUrl?: string): Promise<void> {
    try {
      if (!this.isGitRepository()) {
        throw new Error('Not a git repository. Please initialize git first.');
      }

      const projectName = this.getProjectNameFromDirectory();
      console.log(`Setting up repositories for project: ${projectName}`);

      await this.setupUpstream();
      
      if (projectRepoUrl) {
        await this.setupOrigin(projectRepoUrl, projectName);
      } else {
        await this.createProjectRepository(projectName);
      }

      await this.verifySetup(projectName);

      console.log('✅ Repository setup completed!');
      console.log('\n📋 Current configuration:');
      console.log('  upstream -> gas-boilerplate (for updates)');
      console.log(`  origin -> ${projectName} (your repository)`);
      console.log('\n💡 Use these commands:');
      console.log('  git pull upstream main    - get updates from gas-boilerplate');
      console.log(`  git push origin main      - push to your ${projectName} repository`);
      console.log('  make update               - check for updates');
      console.log('  make upgrade              - apply updates');

    } catch (error) {
      console.error('❌ Repository setup failed:', error instanceof Error ? error.message : 'Unknown error');
      throw error;
    }
  }

  private getProjectNameFromDirectory(): string {
    const currentDir = process.cwd();
    const dirName = path.basename(currentDir);
    
    if (dirName === 'system') {
      const parentDir = path.basename(path.dirname(currentDir));
      return parentDir;
    }
    
    return dirName;
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
    
    if (currentRemotes['origin'] && currentRemotes['origin'].includes('gas-boilerplate')) {
      execSync('git remote rename origin upstream', { stdio: 'inherit' });
      console.log('✅ Renamed origin to upstream');
    } else if (currentRemotes['upstream']) {
      console.log('✅ Upstream already configured');
    } else {
      execSync('git remote add upstream https://github.com/GTFB/gas-boilerplate.git', { stdio: 'inherit' });
      console.log('✅ Added upstream remote');
    }
  }

  private async setupOrigin(projectRepoUrl: string, projectName: string): Promise<void> {
    const currentRemotes = this.getCurrentRemotes();
    
    if (currentRemotes['origin']) {
      execSync('git remote remove origin', { stdio: 'inherit' });
      console.log('✅ Removed existing origin');
    }
    
    execSync(`git remote add origin ${projectRepoUrl}`, { stdio: 'inherit' });
    console.log(`✅ Added origin remote for ${projectName}`);
  }

  private async createProjectRepository(projectName: string): Promise<void> {
    console.log(`\n🔧 Creating new ${projectName} repository...`);
    console.log(`Please provide the GitHub repository URL for ${projectName}:`);
    console.log(`Example: https://github.com/your-username/${projectName}.git`);
    console.log('');
    console.log('\n📝 Manual steps:');
    console.log(`1. Go to GitHub and create a new repository named "${projectName}"`);
    console.log('2. Copy the repository URL');
    console.log(`3. Run: git remote add origin <your-${projectName}-repo-url>`);
    console.log('4. Run: git push -u origin main');
    
    throw new Error(`Please create ${projectName} repository manually and provide the URL`);
  }

  private async verifySetup(projectName: string): Promise<void> {
    const finalRemotes = this.getCurrentRemotes();
    console.log('\n🔍 Verifying setup...');
    
    if (finalRemotes['upstream'] && finalRemotes['upstream'].includes('gas-boilerplate')) {
      console.log('✅ Upstream configured correctly');
    } else {
      console.log('❌ Upstream not configured correctly');
    }
    
    if (finalRemotes['origin'] && finalRemotes['origin'].includes(projectName)) {
      console.log(`✅ Origin configured correctly for ${projectName}`);
    } else {
      console.log(`⚠️  Origin not configured for ${projectName}`);
    }
    
    try {
      execSync('git fetch upstream', { stdio: 'ignore' });
      console.log('✅ Upstream connection working');
    } catch {
      console.log('❌ Upstream connection failed');
    }
  }

  async testConnection(): Promise<void> {
    const projectName = this.getProjectNameFromDirectory();
    console.log('\n🧪 Testing connections...');
    
    try {
      execSync('git fetch upstream', { stdio: 'ignore' });
      console.log('✅ Upstream (gas-boilerplate): OK');
    } catch {
      console.log('❌ Upstream (gas-boilerplate): Failed');
    }
    
    try {
      execSync('git fetch origin', { stdio: 'ignore' });
      console.log(`✅ Origin (${projectName}): OK`);
    } catch {
      console.log(`❌ Origin (${projectName}): Failed`);
    }
  }
}

async function main(): Promise<void> {
  const command = process.argv[2];
  const projectRepoUrl = process.argv[3];
  
  const setup = new RepositorySetup();
  
  try {
    switch (command) {
      case 'setup':
        await setup.setupRepositories(projectRepoUrl);
        break;
      case 'test':
        await setup.testConnection();
        break;
      default:
        console.log('Usage:');
        console.log('  setup [project-repo-url]  - Setup repositories');
        console.log('  test                      - Test connections');
        console.log('');
        console.log('Examples:');
        console.log('  ts-node src/scripts/setup-repos.ts setup https://github.com/username/myproject.git');
        console.log('  ts-node src/scripts/setup-repos.ts test');
    }
  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : 'Unknown error');
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch(console.error);
}
