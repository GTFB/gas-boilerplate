const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const { logger } = require('./utils/logger');

// Load configuration
const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf8'));
let projects = JSON.parse(fs.readFileSync(path.join(__dirname, 'projects.json'), 'utf8'));

// Function to add new project to projects.json
function addProjectToConfig(projectName, scriptId = '') {
  if (!projects[projectName]) {
    projects[projectName] = {
      id: scriptId,
      title: projectName.charAt(0).toUpperCase() + projectName.slice(1),
      description: `${projectName} project`
    };
    
    // Save updated projects.json
    fs.writeFileSync(
      path.join(__dirname, 'projects.json'), 
      JSON.stringify(projects, null, 2)
    );
    
    logger.info('PROJECT_ADDED', `Project ${projectName} added to configuration`);
    return true;
  }
  return false;
}

// Function to update project ID in projects.json
function updateProjectId(projectName, scriptId) {
  if (projects[projectName]) {
    projects[projectName].id = scriptId;
    
    // Save updated projects.json
    fs.writeFileSync(
      path.join(__dirname, 'projects.json'), 
      JSON.stringify(projects, null, 2)
    );
    
    logger.info('PROJECT_UPDATED', `Project ${projectName} ID updated to ${scriptId}`);
    return true;
  }
  return false;
}

// Get current project from command line or use default
function getCurrentProject() {
  const projectName = process.argv[3] || config.defaultProject;
  
  if (!projects[projectName]) {
    console.error(`❌ Project "${projectName}" not found in configuration`);
    console.log('Available projects:', Object.keys(projects).join(', '));
    process.exit(1);
  }
  
  if (!projects[projectName].id) {
    console.error(`❌ Project "${projectName}" has no Google Apps Script ID configured`);
    console.log('Please add the ID to system/projects.json');
    process.exit(1);
  }
  
  return { name: projectName, ...projects[projectName] };
}

async function getAuthClient() {
  const keyPath = path.join(__dirname, 'key.json');
  const key = JSON.parse(fs.readFileSync(keyPath, 'utf8'));
  
  return new google.auth.GoogleAuth({
    credentials: key,
    scopes: ['https://www.googleapis.com/auth/script.projects']
  });
}

async function pull() {
  const project = getCurrentProject();
  logger.info('PULL', `Project: ${project.name}, ID: ${project.id}`);
  
  try {
    const auth = await getAuthClient();
    const script = google.script({ version: 'v1', auth });
    
    const response = await script.projects.getContent({ scriptId: project.id });
    
    // Create project directory if it doesn't exist
    const projectPath = path.join(config.projectsPath, project.name);
    if (!fs.existsSync(projectPath)) {
      fs.mkdirSync(projectPath, { recursive: true });
    }
    
    // Create system subdirectory
    const systemPath = path.join(projectPath, 'system');
    if (!fs.existsSync(systemPath)) {
      fs.mkdirSync(systemPath, { recursive: true });
    }
    
    response.data.files.forEach(file => {
      const fileName = file.name === 'appsscript' ? 'system/appsscript.json' : 
                      file.name === 'Code' ? 'Code.js' : 
                      file.name === 'ff' ? 'ff.html' : `${file.name}.js`;
      
      const content = file.source || file.content || '';
      const fullPath = path.join(projectPath, fileName);
      
      // Ensure directory exists
      const dir = path.dirname(fullPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      fs.writeFileSync(fullPath, content);
      console.log(`✓ Downloaded: ${fileName}`);
    });
    
    console.log('✅ Pull completed successfully');
              logger.info('PULL_SUCCESS', `Project: ${project.name}`);
  } catch (error) {
    console.error('❌ Pull failed:', error.message);
          logger.error('PULL_ERROR', `Project: ${project.name}, Error: ${error.message}`);
  }
}

async function push() {
  const project = getCurrentProject();
  logger.info('PUSH', `Project: ${project.name}, ID: ${project.id}`);
  
  try {
    const projectPath = path.join(config.projectsPath, project.name);
    const files = [];
    
    // Check for main project files
    const mainFiles = [
      { name: 'Code', type: 'SERVER_JS', path: 'Code.js' },
      { name: 'ff', type: 'HTML', path: 'ff.html' }
    ];
    
    mainFiles.forEach(file => {
      const filePath = path.join(projectPath, file.path);
      if (fs.existsSync(filePath)) {
        files.push({
          name: file.name,
          type: file.type,
          source: fs.readFileSync(filePath, 'utf8')
        });
      }
    });
    
    // Check for system files
    const systemFiles = [
      { name: 'appsscript', type: 'JSON', path: 'system/appsscript.json' }
    ];
    
    systemFiles.forEach(file => {
      const filePath = path.join(projectPath, file.path);
      if (fs.existsSync(filePath)) {
        files.push({
          name: file.name,
          type: file.type,
          source: fs.readFileSync(filePath, 'utf8')
        });
      }
    });
    
    if (files.length === 0) {
      console.log('❌ No files found to push');
      return;
    }
    
    const auth = await getAuthClient();
    const script = google.script({ version: 'v1', auth });
    
    await script.projects.updateContent({
      scriptId: project.id,
      requestBody: { files }
    });
    
    console.log('✅ Push completed successfully');
              logger.info('PUSH_SUCCESS', `Project: ${project.name}, Files: ${files.length}`);
  } catch (error) {
    console.error('❌ Push failed:', error.message);
          logger.error('PUSH_ERROR', `Project: ${project.name}, Error: ${error.message}`);
  }
}

async function list() {
  const project = getCurrentProject();
  logger.info('LIST', `Project: ${project.name}, ID: ${project.id}`);
  
  try {
    const auth = await getAuthClient();
    const script = google.script({ version: 'v1', auth });
    
    const response = await script.projects.get({ scriptId: project.id });
    console.log(`📁 Script: ${response.data.title}`);
    console.log(`🆔 ID: ${response.data.scriptId}`);
    console.log(`📅 Updated: ${new Date(response.data.updateTime).toLocaleString()}`);
    
              logger.info('LIST_SUCCESS', `Project: ${project.name}`);
  } catch (error) {
    console.error('❌ List failed:', error.message);
          logger.error('LIST_ERROR', `Project: ${project.name}, Error: ${error.message}`);
  }
}

async function listProjects() {
  logger.info('PROJECTS_LIST', 'Listing all configured projects');
  
  console.log('Available projects:');
  Object.entries(projects).forEach(([name, info]) => {
    const status = info.id ? 'Configured' : 'No ID';
    console.log(`  ${name}: ${info.title} - ${status}`);
    if (info.description) {
      console.log(`    ${info.description}`);
    }
  });
  
      logger.info('PROJECTS_LIST_SUCCESS', `Total: ${Object.keys(projects).length}`);
}

async function clone() {
  const projectName = process.argv[3];
  
  if (!projectName) {
    console.error('❌ Project name required: node clasp-clone.js clone [project]');
    process.exit(1);
  }
  
  logger.info('CLONE', `Creating new project: ${projectName}`);
  
  try {
    const projectPath = path.join(config.projectsPath, projectName);
    
    if (fs.existsSync(projectPath)) {
      console.error(`❌ Project ${projectName} already exists!`);
      return;
    }
    
    // Create project structure
    fs.mkdirSync(projectPath, { recursive: true });
    fs.mkdirSync(path.join(projectPath, 'system'), { recursive: true });
    fs.mkdirSync(path.join(projectPath, 'files'), { recursive: true });
    
    // Copy templates
    const templatePath = path.join(__dirname, 'templates', 'appsscript.json');
    if (fs.existsSync(templatePath)) {
      fs.copyFileSync(templatePath, path.join(projectPath, 'system', 'appsscript.json'));
    }
    
    // Create basic Code.js
    const codeContent = `// ${projectName} - Google Apps Script
// Created: ${new Date().toISOString()}

function doGet() {
  return HtmlService.createHtmlOutput('Hello from ${projectName}!');
}

function doPost(e) {
  // Handle POST requests
  return ContentService.createTextOutput('OK');
}`;
    
    fs.writeFileSync(path.join(projectPath, 'Code.js'), codeContent);
    
    // Create basic ff.html
    const htmlContent = `<!DOCTYPE html>
<html>
<head>
    <title>${projectName}</title>
    <meta charset="utf-8">
</head>
<body>
    <h1>${projectName}</h1>
    <p>Project created: ${new Date().toISOString()}</p>
    
    <h2>Sample Data</h2>
    <p>{"name": "example", "value": "data"}</p>
</body>
</html>`;
    
    fs.writeFileSync(path.join(projectPath, 'ff.html'), htmlContent);
    
    // Add to projects.json automatically
    addProjectToConfig(projectName);
    
    console.log(`✅ Project ${projectName} created successfully!`);
    console.log(`📁 Location: ${projectPath}`);
    console.log(`🔧 Next steps:`);
    console.log(`   1. Add Google Apps Script ID to projects.json`);
    console.log(`   2. Run: make pull ${projectName}`);
    console.log(`   3. Edit code and run: make push ${projectName}`);
    
    logger.info('CLONE_SUCCESS', `Project ${projectName} created`);
    
  } catch (error) {
    console.error(`❌ Clone failed: ${error.message}`);
    logger.error('CLONE_ERROR', `Project ${projectName}, Error: ${error.message}`);
  }
}

const command = process.argv[2];

switch (command) {
  case 'pull':
    pull();
    break;
  case 'push':
    push();
    break;
  case 'list':
    list();
    break;
  case 'projects':
    listProjects();
    break;
  case 'clone':
    clone();
    break;
  default:
    console.log('📋 Usage: node clasp-clone.js [command] [project]');
    console.log('  pull [project]     - Download files from Google Apps Script');
    console.log('  push [project]     - Upload files to Google Apps Script');
    console.log('  list [project]     - Show script info');
    console.log('  projects           - List all configured projects');
    console.log('  clone [project]    - Create a new project and add to configuration');
    console.log('');
    console.log('Examples:');
    console.log('  node clasp-clone.js pull leads');
    console.log('  node clasp-clone.js push cards');
    console.log('  node clasp-clone.js list leads');
    console.log('  node clasp-clone.js clone new-project');
}
