import * as fs from 'fs';
import * as path from 'path';

interface ExtractedData {
  title: string;
  json: any;
}

export class FileExtractor {
  private projectPath: string;
  private htmlPath: string;
  private filesDir: string;

  constructor(projectName: string) {
    this.projectPath = path.join(__dirname, '..', '..', '..', projectName);
    this.htmlPath = path.join(this.projectPath, 'files.html');
    this.filesDir = path.join(this.projectPath, 'files');
  }

  extractFiles(): ExtractedData[] {
    try {
      console.log(`🚀 Starting extraction from ${this.htmlPath}`);
      
      if (!fs.existsSync(this.htmlPath)) {
        throw new Error(`files.html not found at: ${this.htmlPath}`);
      }

      // Create files directory if it doesn't exist
      if (!fs.existsSync(this.filesDir)) {
        fs.mkdirSync(this.filesDir, { recursive: true });
        console.log(`📁 Created files directory: ${this.filesDir}`);
      }

      const htmlContent = fs.readFileSync(this.htmlPath, 'utf8');
      const extractedData = this.parseHtmlContent(htmlContent);
      
      // Save extracted data to files
      this.saveExtractedData(extractedData);
      
      console.log(`✅ Extracted ${extractedData.length} files`);
      return extractedData;
      
    } catch (error) {
      console.error(`❌ Failed to extract files: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw error;
    }
  }

  private parseHtmlContent(htmlContent: string): ExtractedData[] {
    const extractedData: ExtractedData[] = [];
    
    // Split HTML by script tags
    const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/gi;
    let match;
    let scriptIndex = 0;
    
    while ((match = scriptRegex.exec(htmlContent)) !== null) {
      const scriptContent = match[1]?.trim() || '';
      
      if (scriptContent && this.isValidScriptContent(scriptContent)) {
        try {
          // Try to parse as JSON
          const jsonData = JSON.parse(scriptContent);
          const title = this.extractTitle(jsonData) || `script_${scriptIndex}`;
          
          extractedData.push({
            title,
            json: jsonData
          });
          
          console.log(`📝 Parsed script ${scriptIndex}: ${title}`);
          
        } catch (parseError) {
          // If not JSON, try to extract other data
          const extracted = this.extractNonJsonData(scriptContent, scriptIndex);
          if (extracted) {
            extractedData.push(extracted);
          }
        }
      }
      
      scriptIndex++;
    }
    
    return extractedData;
  }

  private isValidScriptContent(content: string): boolean {
    // Skip empty or very short content
    if (content.length < 10) return false;
    
    // Skip common non-data content
    const skipPatterns = [
      /^\/\*[\s\S]*?\*\//,  // Multi-line comments
      /^\/\/.*$/m,          // Single-line comments
      /^function\s*\(/,     // Function definitions
      /^var\s+\w+\s*=/,     // Variable declarations
      /^const\s+\w+\s*=/,   // Const declarations
      /^let\s+\w+\s*=/      // Let declarations
    ];
    
    return !skipPatterns.some(pattern => pattern.test(content.trim()));
  }

  private extractTitle(data: any): string | null {
    // Try to find a meaningful title from the data
    if (typeof data === 'object' && data !== null) {
      const titleFields = ['title', 'name', 'id', 'type', 'category'];
      
      for (const field of titleFields) {
        if (data[field] && typeof data[field] === 'string') {
          return data[field];
        }
      }
      
      // If no title field, use the first string value
      for (const [key, value] of Object.entries(data)) {
        if (typeof value === 'string' && value.length > 0) {
          return `${key}_${value}`;
        }
      }
    }
    
    return null;
  }

  private extractNonJsonData(content: string, index: number): ExtractedData | null {
    // Try to extract structured data from non-JSON content
    const lines = content.split('\n').filter(line => line.trim());
    
    if (lines.length === 0) return null;
    
    // Look for key-value patterns
    const keyValuePattern = /^(\w+)\s*[:=]\s*(.+)$/;
    const extracted: Record<string, any> = {};
    
    for (const line of lines) {
      const match = line.match(keyValuePattern);
      if (match) {
        const [, key, value] = match;
        if (key && value) {
          extracted[key.trim()] = value.trim();
        }
      }
    }
    
    if (Object.keys(extracted).length > 0) {
      return {
        title: `extracted_data_${index}`,
        json: extracted
      };
    }
    
    return null;
  }

  private saveExtractedData(extractedData: ExtractedData[]): void {
    for (const data of extractedData) {
      const fileName = this.sanitizeFileName(data.title);
      const filePath = path.join(this.filesDir, `${fileName}.json`);
      
      try {
        fs.writeFileSync(filePath, JSON.stringify(data.json, null, 2));
        console.log(`💾 Saved: ${fileName}.json`);
      } catch (error) {
        console.error(`❌ Failed to save ${fileName}.json: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  }

  private sanitizeFileName(fileName: string): string {
    // Remove or replace invalid characters
    return fileName
      .replace(/[<>:"/\\|?*]/g, '_')
      .replace(/\s+/g, '_')
      .replace(/[^\w\-_]/g, '')
      .toLowerCase();
  }

  // Method to get extraction summary
  getExtractionSummary(): { totalFiles: number; savedFiles: number; errors: string[] } {
    const errors: string[] = [];
    let savedFiles = 0;
    
    if (fs.existsSync(this.filesDir)) {
      const files = fs.readdirSync(this.filesDir);
      savedFiles = files.filter(file => file.endsWith('.json')).length;
    }
    
    return {
      totalFiles: savedFiles,
      savedFiles,
      errors
    };
  }
}

// Main function for command line execution
function main(): void {
  const projectName = process.argv[2];
  
  if (!projectName) {
    console.error('❌ Project name required');
    console.log('Usage: node extract-files.js [project-name]');
    process.exit(1);
  }
  
  try {
    const extractor = new FileExtractor(projectName);
    const extractedData = extractor.extractFiles();
    
    console.log(`\n✅ Extraction completed successfully!`);
    console.log(`📁 Project: ${projectName}`);
    console.log(`📊 Extracted files: ${extractedData.length}`);
    
    const summary = extractor.getExtractionSummary();
    console.log(`💾 Saved files: ${summary.savedFiles}`);
    
    if (extractedData.length > 0) {
      console.log('\n📋 Extracted data:');
      extractedData.forEach((data, index) => {
        console.log(`  ${index + 1}. ${data.title}`);
      });
    }
    
    console.log(`\n📂 Files saved to: ${path.join(projectName, 'files')}`);
    
  } catch (error) {
    console.error('❌ Extraction failed:', error instanceof Error ? error.message : 'Unknown error');
    process.exit(1);
  }
}

// Run main function if called directly
if (require.main === module) {
  main();
}
