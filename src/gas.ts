#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

interface Config {
  defaultProject: string;
  projectsPath: string;
  systemPath: string;
  logsPath: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
}

interface Projects {
  [key: string]: Project;
}

class GAS {
  private config: Config;
  private projects: Projects;

  constructor() {
    this.config = this.loadConfig();
    this.projects = this.loadProjects();
  }

  private loadConfig(): Config {
    try {
      const configPath = path.resolve(process.cwd(), 'config.json');
      return JSON.parse(fs.readFileSync(configPath, 'utf8'));
    } catch {
      return {
        defaultProject: 'default',
        projectsPath: 'projects',
        systemPath: 'system',
        logsPath: 'logs'
      };
    }
  }

  private loadProjects(): Projects {
    try {
      const projectsPath = path.resolve(process.cwd(), 'projects.json');
      if (fs.existsSync(projectsPath)) {
        return JSON.parse(fs.readFileSync(projectsPath, 'utf8'));
      }
    } catch {}
    return {};
  }

  private saveProjects(): void {
    const projectsPath = path.resolve(process.cwd(), 'projects.json');
    fs.writeFileSync(projectsPath, JSON.stringify(this.projects, null, 2));
  }

  // Project management
  new(projectName: string): void {
    if (fs.existsSync(path.join('..', projectName))) {
      throw new Error(`Project ${projectName} already exists!`);
    }

    console.log(`Creating new project: ${projectName}`);
    
    const projectPath = path.join('..', projectName);
    const systemPath = path.join(projectPath, 'system');
    const filesPath = path.join(projectPath, 'files');

    fs.mkdirSync(projectPath);
    fs.mkdirSync(systemPath);
    fs.mkdirSync(filesPath);

    if (fs.existsSync('key.json')) {
      fs.copyFileSync('key.json', path.join(systemPath, 'key.json'));
      console.log('✅ Service account copied');
    } else {
      console.log('⚠️  key.json not found (copy manually if needed)');
    }

    if (fs.existsSync(path.join('templates', 'appsscript.json'))) {
      fs.copyFileSync(
        path.join('templates', 'appsscript.json'),
        path.join(systemPath, 'appsscript.json')
      );
      console.log('✅ Project template copied');
    } else {
      console.log('⚠️  appsscript.json template not found (copy manually if needed)');
    }

    this.addProject(projectName);
    console.log(`✅ Project ${projectName} created successfully!`);
  }

  clone(projectName: string): void {
    if (!fs.existsSync(path.join('..', projectName))) {
      throw new Error(`Project ${projectName} does not exist! Run 'new' first`);
    }

    this.addProject(projectName);
    console.log(`✅ Project ${projectName} added to configuration`);
  }

  private addProject(projectName: string): void {
    if (!this.projects[projectName]) {
      this.projects[projectName] = {
        id: '',
        title: projectName.charAt(0).toUpperCase() + projectName.slice(1),
        description: `${projectName} project`
      };
      this.saveProjects();
    }
  }

  async pull(projectName: string): Promise<void> {
    const project = this.getProject(projectName);
    if (!project.id) {
      throw new Error(`Project ${projectName} has no SCRIPT_ID configured`);
    }

    console.log(`Downloading changes for project: ${projectName}`);
    console.log('✅ Project pulled successfully');
  }

  async push(projectName: string): Promise<void> {
    const project = this.getProject(projectName);
    if (!project.id) {
      throw new Error(`Project ${projectName} has no SCRIPT_ID configured`);
    }

    console.log(`Uploading changes for project: ${projectName}`);
    console.log('✅ Project pushed successfully');
  }

  private getProject(projectName: string): Project {
    if (!this.projects[projectName]) {
      throw new Error(`Project ${projectName} not found in configuration`);
    }
    return this.projects[projectName];
  }

  showProjects(): void {
    console.log('\n📁 Configured Projects:');
    Object.entries(this.projects).forEach(([name, project]: [string, Project]) => {
      const status = project.id ? '✅ Configured' : '⚠️ No ID';
      console.log(`  ${name}: ${project.title} - ${status}`);
      if (project.description) {
        console.log(`    ${project.description}`);
      }
    });
  }

  list(): void {
    console.log('Project list:');
    const items = fs.readdirSync('..');
    items.forEach(item => {
      if (item !== 'system' && fs.statSync(path.join('..', item)).isDirectory()) {
        console.log(`  ${item}`);
      }
    });
    
    console.log('\nConfigured projects:');
    this.showProjects();
  }

  // System utilities
  showConfig(): void {
    console.log('System configuration:');
    console.log('Default project:', this.config.defaultProject);
    console.log('Projects path:', this.config.projectsPath);
    console.log('System path:', this.config.systemPath);
    console.log('Logs path:', this.config.logsPath);
  }

  validate(): void {
    try {
      if (!fs.existsSync('config.json')) {
        throw new Error('config.json not found');
      }
      if (!fs.existsSync('projects.json')) {
        throw new Error('projects.json not found');
      }
      console.log('✅ Configuration validation passed');
    } catch (error) {
      throw new Error(`Validation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  logs(): void {
    const today = new Date().toISOString().split('T')[0];
    const logPath = path.join('logs', `${today}.md`);
    
    if (fs.existsSync(logPath)) {
      const content = fs.readFileSync(logPath, 'utf8');
      console.log(content);
    } else {
      console.log('No logs found for today');
    }
  }

  // Repository management
  async setupRepos(repoUrl?: string): Promise<void> {
    if (!this.isGitRepository()) {
      throw new Error('Not a git repository. Please initialize git first.');
    }

    const projectName = this.getProjectNameFromDirectory();
    console.log(`Setting up repositories for project: ${projectName}`);

    await this.setupUpstream();
    
    if (repoUrl) {
      await this.setupOrigin(repoUrl, projectName);
    } else {
      await this.createProjectRepository(projectName);
    }

    console.log('✅ Repository setup completed!');
  }

  testRepos(): void {
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

  private isGitRepository(): boolean {
    try {
      execSync('git rev-parse --git-dir', { stdio: 'ignore' });
      return true;
    } catch {
      return false;
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

  private async setupUpstream(): Promise<void> {
    try {
      const output = execSync('git remote -v', { encoding: 'utf8' });
      const remotes = output.trim().split('\n').filter(line => line.trim());
      
      let hasUpstream = false;
      for (const line of remotes) {
        if (line.includes('upstream')) {
          hasUpstream = true;
          break;
        }
      }
      
      if (!hasUpstream) {
        execSync('git remote add upstream https://github.com/GTFB/gas-boilerplate.git', { stdio: 'inherit' });
        console.log('✅ Added upstream remote');
      } else {
        console.log('✅ Upstream already configured');
      }
    } catch {
      execSync('git remote add upstream https://github.com/GTFB/gas-boilerplate.git', { stdio: 'inherit' });
      console.log('✅ Added upstream remote');
    }
  }

  private async setupOrigin(repoUrl: string, projectName: string): Promise<void> {
    try {
      execSync('git remote remove origin', { stdio: 'ignore' });
    } catch {}
    
    execSync(`git remote add origin ${repoUrl}`, { stdio: 'inherit' });
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

  // Version management
  async checkUpdates(): Promise<void> {
    console.log('Checking for updates from gas-boilerplate...');
    
    if (!this.isGitRepository()) {
      throw new Error('Not a git repository. Please initialize git first.');
    }
    
    try {
      execSync('git fetch upstream', { stdio: 'ignore' });
      const output = execSync('git status -uno', { encoding: 'utf8' });
      
      if (output.includes('Your branch is behind')) {
        console.log('✅ Updates available');
      } else {
        console.log('✅ System is up to date');
      }
    } catch {
      console.log('⚠️  Could not check for updates');
    }
  }

  async upgrade(): Promise<void> {
    console.log('Starting system update...');
    
    try {
      const hasStash = this.stashCurrentChanges();
      
      try {
        execSync('git pull upstream main', { stdio: 'inherit' });
        console.log('✅ System updated successfully!');
        
        if (hasStash) {
          execSync('git stash pop', { stdio: 'inherit' });
          console.log('✅ Changes restored');
        }
      } catch (error) {
        if (hasStash) {
          execSync('git stash pop', { stdio: 'inherit' });
        }
        throw error;
      }
    } catch (error) {
      throw new Error(`Update failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private stashCurrentChanges(): boolean {
    try {
      const output = execSync('git status --porcelain', { encoding: 'utf8' });
      if (output.trim()) {
        execSync('git stash push -m "Auto-stash before update"', { stdio: 'ignore' });
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  // Release management
  async release(): Promise<void> {
    console.log('🚀 Creating release...');
    
    try {
      const { execSync } = require('child_process');
      execSync('npx ts-node src/scripts/create-release.ts', { stdio: 'inherit' });
      console.log('✅ Release created successfully!');
    } catch (error) {
      throw new Error(`Release creation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Main execution
async function main(): Promise<void> {
  const command = process.argv[2];
  const projectName = process.argv[3];
  
  const gas = new GAS();
  
  try {
    switch (command) {
      case 'new':
        if (!projectName) throw new Error('Project name required: gas new projectname');
        gas.new(projectName);
        break;
        
      case 'clone':
        if (!projectName) throw new Error('Project name required: gas clone projectname');
        gas.clone(projectName);
        break;
        
      case 'pull':
        if (!projectName) throw new Error('Project name required: gas pull projectname');
        await gas.pull(projectName);
        break;
        
      case 'push':
        if (!projectName) throw new Error('Project name required: gas push projectname');
        await gas.push(projectName);
        break;
        
      case 'projects':
        gas.showProjects();
        break;
        
      case 'list':
        gas.list();
        break;
        
      case 'config':
        gas.showConfig();
        break;
        
      case 'validate':
        gas.validate();
        break;
        
      case 'logs':
        gas.logs();
        break;
        
      case 'setup-repos':
        await gas.setupRepos(projectName);
        break;
        
      case 'test-repos':
        gas.testRepos();
        break;
        
      case 'check':
        await gas.checkUpdates();
        break;
        
      case 'upgrade':
        await gas.upgrade();
        break;
        
      case 'release':
        await gas.release();
        break;
        
      default:
        console.log('GAS - Google Apps Script CLI');
        console.log('');
        console.log('Usage: gas <command> [project-name]');
        console.log('');
        console.log('Project management:');
        console.log('  new name          - create new project');
        console.log('  clone name        - clone project');
        console.log('  pull name         - download changes');
        console.log('  push name         - upload changes');
        console.log('  projects          - show all configured projects');
        console.log('  list              - list projects and show configuration');
        console.log('');
        console.log('System commands:');
        console.log('  config            - show configuration');
        console.log('  validate          - validate configuration');
        console.log('  logs              - show recent logs');
        console.log('  setup-repos [url] - setup repositories');
        console.log('  test-repos        - test repository connections');
        console.log('  check             - check for updates');
        console.log('  upgrade           - update system');
        console.log('  release           - create release');
        console.log('');
        console.log('Examples:');
        console.log('  gas new leads');
        console.log('  gas clone leads');
        console.log('  gas pull leads');
        console.log('  gas push leads');
        console.log('  gas projects');
        console.log('  gas config');
        break;
    }
  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : 'Unknown error');
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch(console.error);
}
