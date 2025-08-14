import * as fs from 'fs';
import * as path from 'path';
import { 
  SystemConfig, 
  ProjectsConfig, 
  ValidationError, 
  AuthenticationError 
} from '../types';

export class ConfigValidator {
  private configPath: string;
  private projectsPath: string;
  private keyPath: string;

  constructor() {
    this.configPath = path.join(__dirname, '..', '..', 'config.json');
    this.projectsPath = path.join(__dirname, '..', '..', 'projects.json');
    this.keyPath = path.join(__dirname, '..', '..', 'key.json');
  }

  validateConfig(): { config: SystemConfig; projects: ProjectsConfig } {
    try {
      // Check if config files exist
      if (!fs.existsSync(this.configPath)) {
        throw new ValidationError('config.json not found');
      }
      
      if (!fs.existsSync(this.projectsPath)) {
        throw new ValidationError('projects.json not found');
      }
      
      // Check if key.json exists (required for authentication)
      if (!fs.existsSync(this.keyPath)) {
        throw new AuthenticationError('key.json not found - required for Google Apps Script API authentication');
      }
      
      // Validate key.json format
      this.validateKeyFile();
      
      // Load and validate config
      const config = this.loadAndValidateConfig();
      const projects = this.loadAndValidateProjects();
      
      // Validate paths exist
      this.validatePaths(config);
      
      // Validate projects structure
      this.validateProjectsStructure(projects);
      
      console.log('✅ Configuration validation passed');
      return { config, projects };
      
    } catch (error) {
      if (error instanceof ValidationError || error instanceof AuthenticationError) {
        throw error;
      }
      throw new ValidationError(`Configuration validation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Basic validation without key.json requirement
   * Used for testing and setup validation
   */
  validateBasicConfig(): { config: SystemConfig; projects: ProjectsConfig } {
    try {
      // Check if config files exist
      if (!fs.existsSync(this.configPath)) {
        throw new ValidationError('config.json not found');
      }
      
      if (!fs.existsSync(this.projectsPath)) {
        throw new ValidationError('projects.json not found');
      }
      
      // Load and validate config (without key.json)
      const config = this.loadAndValidateConfig();
      const projects = this.loadAndValidateProjects();
      
      // Validate paths exist
      this.validatePaths(config);
      
      // Validate projects structure
      this.validateProjectsStructure(projects);
      
      console.log('✅ Basic configuration validation passed (key.json not required)');
      return { config, projects };
      
    } catch (error) {
      if (error instanceof ValidationError) {
        throw error;
      }
      throw new ValidationError(`Basic configuration validation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private validateKeyFile(): void {
    try {
      const keyContent = JSON.parse(fs.readFileSync(this.keyPath, 'utf8'));
      const requiredFields = ['type', 'project_id', 'private_key_id'];
      
      for (const field of requiredFields) {
        if (!keyContent[field]) {
          throw new ValidationError(`Invalid key.json format - missing required field: ${field}`);
        }
      }
    } catch (keyError) {
      if (keyError instanceof ValidationError) {
        throw keyError;
      }
      throw new ValidationError(`Invalid key.json format: ${keyError instanceof Error ? keyError.message : 'Parse error'}`);
    }
  }

  private loadAndValidateConfig(): SystemConfig {
    const config = JSON.parse(fs.readFileSync(this.configPath, 'utf8'));
    
    const requiredConfigFields: (keyof SystemConfig)[] = ['defaultProject', 'projectsPath', 'systemPath', 'logsPath'];
    
    for (const field of requiredConfigFields) {
      if (!(field in config)) {
        throw new ValidationError(`Missing required field in config.json: ${field}`);
      }
    }
    
    return config as SystemConfig;
  }

  private loadAndValidateProjects(): ProjectsConfig {
    const projects = JSON.parse(fs.readFileSync(this.projectsPath, 'utf8'));
    
    if (Object.keys(projects).length === 0) {
      throw new ValidationError('No projects defined in projects.json');
    }
    
    return projects as ProjectsConfig;
  }

  private validatePaths(config: SystemConfig): void {
    const projectsPathFull = path.resolve(__dirname, '..', '..', config.projectsPath);
    if (!fs.existsSync(projectsPathFull)) {
      throw new ValidationError(`Projects path does not exist: ${projectsPathFull}`);
    }
    
    const logsPathFull = path.resolve(__dirname, '..', '..', config.logsPath);
    if (!fs.existsSync(logsPathFull)) {
      console.warn(`Warning: Logs path does not exist: ${logsPathFull}`);
    }
  }

  private validateProjectsStructure(projects: ProjectsConfig): void {
    // Check if default project exists
    const config = this.loadAndValidateConfig();
    if (!(config.defaultProject in projects)) {
      throw new ValidationError(`Default project '${config.defaultProject}' not found in projects.json`);
    }
    
    // Validate each project
    for (const [name, project] of Object.entries(projects)) {
      if (!project.title) {
        throw new ValidationError(`Project '${name}' missing title`);
      }
      
      if (project.id && project.id.trim() === '') {
        console.warn(`Warning: Project '${name}' has empty ID`);
      }
    }
  }

  checkProjectStructure(projectName: string): boolean {
    try {
      const projectPath = path.join(__dirname, '..', '..', '..', projectName);
      
      if (!fs.existsSync(projectPath)) {
        throw new ValidationError(`Project directory '${projectName}' not found`);
      }
      
      const requiredDirs = ['system', 'files'];
      const missingDirs: string[] = [];
      
      for (const dir of requiredDirs) {
        const dirPath = path.join(projectPath, dir);
        if (!fs.existsSync(dirPath)) {
          missingDirs.push(dir);
        }
      }
      
      if (missingDirs.length > 0) {
        throw new ValidationError(`Missing required directories: ${missingDirs.join(', ')}`);
      }
      
      console.log(`✅ Project '${projectName}' structure validation passed`);
      return true;
      
    } catch (error) {
      if (error instanceof ValidationError) {
        throw error;
      }
      throw new ValidationError(`Project '${projectName}' structure validation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Method to get validation summary
  getValidationSummary(): { isValid: boolean; errors: string[]; warnings: string[] } {
    const errors: string[] = [];
    const warnings: string[] = [];
    
    try {
      this.validateConfig();
      return { isValid: true, errors, warnings };
    } catch (error) {
      if (error instanceof ValidationError || error instanceof AuthenticationError) {
        errors.push(error.message);
      } else {
        errors.push('Unknown validation error');
      }
      return { isValid: false, errors, warnings };
    }
  }
}

// Main function for command line execution
function main(): void {
  console.log('🔍 Validating system configuration...\n');
  
  const validator = new ConfigValidator();
  
  try {
    const result = validator.validateConfig();
    const { config, projects } = result;
    
    console.log('\n📋 Configuration Summary:');
    console.log(`Default project: ${config.defaultProject}`);
    console.log(`Projects path: ${config.projectsPath}`);
    console.log(`System path: ${config.systemPath}`);
    console.log(`Logs path: ${config.logsPath}`);
    
    console.log('\n📁 Projects:');
    Object.entries(projects).forEach(([name, project]) => {
      const status = project.id ? '✅ Configured' : '⚠️ No ID';
      console.log(`  ${name}: ${project.title} - ${status}`);
      if (project.description) {
        console.log(`    ${project.description}`);
      }
    });
    
    console.log('\n✅ All validations passed successfully!');
    
  } catch (error) {
    if (error instanceof ValidationError || error instanceof AuthenticationError) {
      console.error('❌ Configuration validation failed:', error.message);
    } else {
      console.error('❌ Unexpected error:', error);
    }
    process.exit(1);
  }
}

// Run main function if called directly
if (require.main === module) {
  main();
}
