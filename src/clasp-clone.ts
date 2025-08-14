import { google } from 'googleapis';
import * as fs from 'fs';
import * as path from 'path';
import { logger } from './utils/logger';
import { 
  SystemConfig, 
  ProjectsConfig, 
  Project, 
  GASFile, 
  ProjectError,
  AuthenticationError
} from './types';

export class GASCLI {
  private config: SystemConfig;
  private projects: ProjectsConfig;
  private auth: any;

  constructor() {
    this.config = this.loadConfig();
    this.projects = this.loadProjects();
  }

  private loadConfig(): SystemConfig {
    const configPath = path.join(__dirname, '..', 'config.json');
    return JSON.parse(fs.readFileSync(configPath, 'utf8'));
  }

  private loadProjects(): ProjectsConfig {
    const projectsPath = path.join(__dirname, '..', 'projects.json');
    return JSON.parse(fs.readFileSync(projectsPath, 'utf8'));
  }

  private saveProjects(): void {
    const projectsPath = path.join(__dirname, '..', 'projects.json');
    fs.writeFileSync(projectsPath, JSON.stringify(this.projects, null, 2));
  }

  addProjectToConfig(projectName: string, scriptId: string = ''): boolean {
    if (!this.projects[projectName]) {
      this.projects[projectName] = {
        id: scriptId,
        title: projectName.charAt(0).toUpperCase() + projectName.slice(1),
        description: `${projectName} project`
      };
      
      this.saveProjects();
      logger.info('PROJECT_ADDED', `Project ${projectName} added to configuration`);
      return true;
    }
    return false;
  }

  updateProjectId(projectName: string, scriptId: string): boolean {
    if (this.projects[projectName]) {
      this.projects[projectName].id = scriptId;
      this.saveProjects();
      logger.info('PROJECT_UPDATED', `Project ${projectName} ID updated to ${scriptId}`);
      return true;
    }
    return false;
  }

  getCurrentProject(projectName?: string): Project & { name: string } {
    const name = projectName || this.config.defaultProject;
    
    if (!this.projects[name]) {
      throw new ProjectError(`Project "${name}" not found in configuration`);
    }
    
    if (!this.projects[name].id) {
      throw new ProjectError(`Project "${name}" has no Google Apps Script ID configured`);
    }
    
    return { name, ...this.projects[name] };
  }

  private async getAuthClient(): Promise<any> {
    try {
      const keyPath = path.join(__dirname, '..', 'key.json');
      const key = JSON.parse(fs.readFileSync(keyPath, 'utf8'));
      
      this.auth = new google.auth.GoogleAuth({
        credentials: key,
        scopes: ['https://www.googleapis.com/auth/script.projects']
      });
      
      return this.auth;
    } catch (error) {
      throw new AuthenticationError(`Failed to load authentication: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async pull(projectName?: string): Promise<void> {
    const project = this.getCurrentProject(projectName);
    logger.info('PULL', `Project: ${project.name}, ID: ${project.id}`);
    
    try {
      const auth = await this.getAuthClient();
      const script = google.script({ version: 'v1', auth });
      
      const response = await script.projects.getContent({ scriptId: project.id });
      
      if (!response.data.files) {
        throw new ProjectError('No files found in project');
      }
      
      // Create project directory if it doesn't exist
      const projectPath = path.join(this.config.projectsPath, project.name);
      if (!fs.existsSync(projectPath)) {
        fs.mkdirSync(projectPath, { recursive: true });
      }
      
      // Create system subdirectory
      const systemPath = path.join(projectPath, 'system');
      if (!fs.existsSync(systemPath)) {
        fs.mkdirSync(systemPath, { recursive: true });
      }
      
      // Process each file
      for (const file of response.data.files) {
        const fileName = file.name === 'appsscript' ? 'system/appsscript.json' : 
                        file.name === 'Code' ? 'Code.js' : 
                        `${file.name}.${file.type === 'SERVER_JS' ? 'js' : (file.type || 'js').toLowerCase()}`;
        
        const filePath = path.join(projectPath, fileName);
        const fileDir = path.dirname(filePath);
        
        if (!fs.existsSync(fileDir)) {
          fs.mkdirSync(fileDir, { recursive: true });
        }
        
        if (file.source) {
          fs.writeFileSync(filePath, file.source);
          logger.info('FILE_DOWNLOADED', `Downloaded: ${fileName}`);
        }
      }
      
      logger.info('PULL_SUCCESS', `Project ${project.name} pulled successfully`);
      
    } catch (error) {
      logger.error('PULL_ERROR', `Failed to pull project ${project.name}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw error;
    }
  }

  async push(projectName?: string): Promise<void> {
    const project = this.getCurrentProject(projectName);
    logger.info('PUSH', `Project: ${project.name}, ID: ${project.id}`);
    
    try {
      const auth = await this.getAuthClient();
      const script = google.script({ version: 'v1', auth });
      
      const projectPath = path.join(this.config.projectsPath, project.name);
      if (!fs.existsSync(projectPath)) {
        throw new ProjectError(`Project directory not found: ${projectPath}`);
      }
      
      const files: GASFile[] = [];
      
      // Read project files
      const projectFiles = this.getProjectFiles(projectPath);
      
      for (const filePath of projectFiles) {
        const relativePath = path.relative(projectPath, filePath);
        const fileName = this.getGASFileName(relativePath);
        
        if (fileName) {
          const content = fs.readFileSync(filePath, 'utf8');
          files.push({
            name: fileName,
            type: this.getGASType(fileName),
            source: content
          });
        }
      }
      
      if (files.length === 0) {
        throw new ProjectError('No valid files found to upload');
      }
      
      // Update project content
      await script.projects.updateContent({
        scriptId: project.id,
        requestBody: { files }
      });
      
      logger.info('PUSH_SUCCESS', `Project ${project.name} pushed successfully`);
      
    } catch (error) {
      logger.error('PUSH_ERROR', `Failed to push project ${project.name}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw error;
    }
  }

  private getProjectFiles(projectPath: string): string[] {
    const files: string[] = [];
    
    const readDir = (dir: string): void => {
      const items = fs.readdirSync(dir);
      
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory() && item !== 'node_modules' && item !== '.git') {
          readDir(fullPath);
        } else if (stat.isFile() && this.isValidProjectFile(item)) {
          files.push(fullPath);
        }
      }
    };
    
    readDir(projectPath);
    return files;
  }

  private isValidProjectFile(fileName: string): boolean {
    const validExtensions = ['.js', '.html', '.json', '.css'];
    const validNames = ['Code', 'appsscript'];
    
    const ext = path.extname(fileName);
    const name = path.basename(fileName, ext);
    
    return validExtensions.includes(ext) || validNames.includes(name);
  }

  private getGASFileName(relativePath: string): string | null {
    if (relativePath === 'Code.js') return 'Code';
    if (relativePath === 'system/appsscript.json') return 'appsscript';
    if (relativePath.endsWith('.js')) return path.basename(relativePath, '.js');
    if (relativePath.endsWith('.html')) return path.basename(relativePath, '.html');
    return null;
  }

  private getGASType(fileName: string): string {
    if (fileName === 'Code') return 'SERVER_JS';
    if (fileName === 'appsscript') return 'JSON';
    if (fileName.endsWith('.html')) return 'HTML';
    return 'SERVER_JS';
  }

  listProjects(): void {
    console.log('\n📁 Configured Projects:');
    Object.entries(this.projects).forEach(([name, project]) => {
      const status = project.id ? '✅ Configured' : '⚠️ No ID';
      console.log(`  ${name}: ${project.title} - ${status}`);
      if (project.description) {
        console.log(`    ${project.description}`);
      }
    });
  }

  listProject(projectName?: string): void {
    const project = this.getCurrentProject(projectName);
    console.log(`\n📋 Project: ${project.name}`);
    console.log(`  ID: ${project.id}`);
    console.log(`  Title: ${project.title}`);
    console.log(`  Description: ${project.description}`);
    
    const projectPath = path.join(this.config.projectsPath, project.name);
    if (fs.existsSync(projectPath)) {
      console.log(`  Path: ${projectPath}`);
      const files = this.getProjectFiles(projectPath);
      console.log(`  Files: ${files.length}`);
      files.forEach(file => {
        const relativePath = path.relative(projectPath, file);
        console.log(`    ${relativePath}`);
      });
    }
  }
}

// Main execution
async function main(): Promise<void> {
  const cli = new GASCLI();
  const command = process.argv[2];
  const projectName = process.argv[3];
  
  try {
    switch (command) {
      case 'clone':
        if (!projectName) {
          throw new Error('Project name required for clone');
        }
        cli.addProjectToConfig(projectName);
        console.log(`✅ Project ${projectName} added to configuration`);
        break;
        
      case 'pull':
        await cli.pull(projectName);
        console.log('✅ Project pulled successfully');
        break;
        
      case 'push':
        await cli.push(projectName);
        console.log('✅ Project pushed successfully');
        break;
        
      case 'list':
        if (projectName) {
          cli.listProject(projectName);
        } else {
          cli.listProjects();
        }
        break;
        
      case 'projects':
        cli.listProjects();
        break;
        
      default:
        console.log('Available commands: clone, pull, push, list, projects');
        process.exit(1);
    }
  } catch (error) {
    if (error instanceof ProjectError || error instanceof AuthenticationError) {
      console.error(`❌ ${error.name}: ${error.message}`);
    } else {
      console.error('❌ Error:', error instanceof Error ? error.message : 'Unknown error');
    }
    process.exit(1);
  }
}

// Run main function if called directly
if (require.main === module) {
  main().catch(console.error);
}
