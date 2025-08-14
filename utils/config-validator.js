const fs = require('fs');
const path = require('path');

function validateConfig() {
  try {
    // Check if config files exist
    const configPath = path.join(__dirname, '..', 'config.json');
    const projectsPath = path.join(__dirname, '..', 'projects.json');
    const keyPath = path.join(__dirname, '..', 'key.json');
    
    if (!fs.existsSync(configPath)) {
      throw new Error('config.json not found');
    }
    
    if (!fs.existsSync(projectsPath)) {
      throw new Error('projects.json not found');
    }
    
    // Check if key.json exists (required for authentication)
    if (!fs.existsSync(keyPath)) {
      throw new Error('key.json not found - required for Google Apps Script API authentication');
    }
    
    // Validate key.json format
    try {
      const keyContent = JSON.parse(fs.readFileSync(keyPath, 'utf8'));
      if (!keyContent.type || !keyContent.project_id || !keyContent.private_key_id) {
        throw new Error('Invalid key.json format - missing required fields');
      }
    } catch (keyError) {
      throw new Error(`Invalid key.json format: ${keyError.message}`);
    }
    
    // Load and validate config
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));
    
    // Validate config structure
    const requiredConfigFields = ['defaultProject', 'projectsPath', 'systemPath', 'logsPath'];
    for (const field of requiredConfigFields) {
      if (!(field in config)) {
        throw new Error(`Missing required field in config.json: ${field}`);
      }
    }
    
    // Validate paths exist
    const projectsPathFull = path.resolve(__dirname, '..', config.projectsPath);
    if (!fs.existsSync(projectsPathFull)) {
      throw new Error(`Projects path does not exist: ${projectsPathFull}`);
    }
    
    const logsPathFull = path.resolve(__dirname, '..', config.logsPath);
    if (!fs.existsSync(logsPathFull)) {
      console.warn(`Warning: Logs path does not exist: ${logsPathFull}`);
    }
    
    // Validate projects structure
    if (Object.keys(projects).length === 0) {
      throw new Error('No projects defined in projects.json');
    }
    
    // Check if default project exists
    if (!(config.defaultProject in projects)) {
      throw new Error(`Default project '${config.defaultProject}' not found in projects.json`);
    }
    
    // Validate each project
    for (const [name, project] of Object.entries(projects)) {
      if (!project.title) {
        throw new Error(`Project '${name}' missing title`);
      }
      
      if (project.id && project.id.trim() === '') {
        console.warn(`Warning: Project '${name}' has empty ID`);
      }
    }
    
    console.log('✅ Configuration validation passed');
    return { config, projects };
    
  } catch (error) {
    console.error('❌ Configuration validation failed:', error.message);
    return null;
  }
}

function checkProjectStructure(projectName) {
  try {
    const projectPath = path.join(__dirname, '..', '..', projectName);
    
    if (!fs.existsSync(projectPath)) {
      throw new Error(`Project directory '${projectName}' not found`);
    }
    
    const requiredDirs = ['system', 'files'];
    const missingDirs = [];
    
    for (const dir of requiredDirs) {
      const dirPath = path.join(projectPath, dir);
      if (!fs.existsSync(dirPath)) {
        missingDirs.push(dir);
      }
    }
    
    if (missingDirs.length > 0) {
      throw new Error(`Missing required directories: ${missingDirs.join(', ')}`);
    }
    
    console.log(`✅ Project '${projectName}' structure validation passed`);
    return true;
    
  } catch (error) {
    console.error(`❌ Project '${projectName}' structure validation failed:`, error.message);
    return false;
  }
}

// Main function for command line execution
function main() {
  console.log('🔍 Validating system configuration...\n');
  
  const result = validateConfig();
  if (!result) {
    process.exit(1);
  }
  
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
}

// Export functions
module.exports = {
  validateConfig,
  checkProjectStructure
};

// Run main function if called directly
if (require.main === module) {
  main();
}
