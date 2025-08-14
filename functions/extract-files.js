const fs = require('fs');
const path = require('path');
const { logger } = require('../utils/logger');

function extractHtmlData(htmlContent) {
  try {
    console.log(`Processing HTML content: ${htmlContent.length} characters`);
    
    const h2Pattern = /<h2>(.*?)<\/h2>/g;
    const h2Matches = [];
    let match;
    
    while ((match = h2Pattern.exec(htmlContent)) !== null) {
      h2Matches.push({
        text: match[1],
        index: match.index
      });
    }
    
    console.log(`Found h2 headers: ${h2Matches.length}`);
    
    const jsonObjects = [];
    
    for (let i = 0; i < h2Matches.length; i++) {
      const h2Start = h2Matches[i].index;
      const h2End = h2Start + h2Matches[i].text.length + 5;
      
      console.log(`Processing header ${i + 1}: ${h2Matches[i].text}`);
      
      let pStart = htmlContent.indexOf('<p>', h2End);
      if (pStart === -1) {
        console.log(`   Paragraph <p> not found after header`);
        continue;
      }
      
      let pEnd = htmlContent.indexOf('</p>', pStart);
      if (pEnd === -1) {
        console.log(`   Closing </p> tag not found`);
        continue;
      }
      
      let pContent = htmlContent.substring(pStart + 3, pEnd).trim();
      console.log(`   Found paragraph: ${pContent.length} characters`);
      
      try {
        const jsonObj = JSON.parse(pContent);
        jsonObjects.push(jsonObj);
        console.log(`   JSON object parsed: ${jsonObj.name || 'No name'}`);
      } catch (e) {
        console.warn(`   Failed to parse JSON for header ${i + 1}: ${e.message}`);
      }
    }
    
    console.log(`Found JSON objects: ${jsonObjects.length}`);
    
    const results = [];
    for (let i = 0; i < Math.min(h2Matches.length, jsonObjects.length); i++) {
      const title = h2Matches[i].text.trim();
      const jsonContent = jsonObjects[i];
      
      results.push({
        title: title,
        json: jsonContent
      });
    }
    
    console.log('All data processed successfully!');
    console.log(`Total pairs: ${results.length}`);
    
    return results;
    
  } catch (error) {
    console.error('Error processing HTML:', error.message);
    return null;
  }
}

function extractFiles(projectName) {
  logger.info('EXTRACT_FILES', `Project: ${projectName}`);
  
  try {
    const projectPath = path.join('..', projectName);
    const htmlFile = path.join(projectPath, 'ff.html');
    const filesDir = path.join(projectPath, 'files');
    
    // Check if HTML file exists
    if (!fs.existsSync(htmlFile)) {
      console.error(`HTML file not found: ${htmlFile}`);
      console.log('Make sure ff.html exists in the project directory');
      logger.error('EXTRACT_FILES_ERROR', `Project: ${projectName}, File not found: ff.html`);
      return;
    }
    
    // Create files directory if it doesn't exist
    if (!fs.existsSync(filesDir)) {
      fs.mkdirSync(filesDir, { recursive: true });
      console.log(`Created files directory: ${filesDir}`);
    }
    
    // Read HTML file
    const htmlContent = fs.readFileSync(htmlFile, 'utf8');
    console.log(`Read HTML file: ${htmlContent.length} characters`);
    
    // Extract data
    const results = extractHtmlData(htmlContent);
    
    if (results && results.length > 0) {
      // Create CSV file
      const csvPath = path.join(filesDir, 'extracted_data.csv');
      let csvContent = 'Title,JSON Data\n';
      
      results.forEach(result => {
        const title = result.title.replace(/"/g, '""'); // Escape quotes
        const jsonStr = JSON.stringify(result.json).replace(/"/g, '""');
        csvContent += `"${title}","${jsonStr}"\n`;
      });
      
      fs.writeFileSync(csvPath, csvContent);
      console.log(`CSV file created: ${csvPath}`);
      
      // Create JSON file
      const jsonPath = path.join(filesDir, 'extracted_data.json');
      fs.writeFileSync(jsonPath, JSON.stringify(results, null, 2));
      console.log(`JSON file created: ${jsonPath}`);
      
      // Create individual JSON files for each item
      results.forEach((result, index) => {
        const fileName = result.title.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
        const individualPath = path.join(filesDir, `${fileName}.json`);
        fs.writeFileSync(individualPath, JSON.stringify(result.json, null, 2));
        console.log(`Individual file created: ${individualPath}`);
      });
      
      console.log('✅ File extraction completed successfully!');
      logger.info('EXTRACT_FILES_SUCCESS', `Project: ${projectName}, Files: ${results.length}`);
    } else {
      console.log('No data found to extract');
      logger.warn('EXTRACT_FILES_WARNING', `Project: ${projectName}, No data found`);
    }
    
  } catch (error) {
    console.error('❌ File extraction failed:', error.message);
    logger.error('EXTRACT_FILES_ERROR', `Project: ${projectName}, Error: ${error.message}`);
  }
}

// Get project name from command line
const projectName = process.argv[2];

if (!projectName) {
  console.log('Usage: node extract-files.js [project_name]');
  console.log('Example: node extract-files.js leads');
  process.exit(1);
}

extractFiles(projectName);
