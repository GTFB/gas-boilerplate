import * as fs from 'fs';
import * as path from 'path';
import { LogLevel, LogEntry } from '../types';

export class Logger {
  private logLevel: LogLevel;

  constructor(logLevel: LogLevel = LogLevel.INFO) {
    this.logLevel = logLevel;
  }

  private getLogFileName(): string {
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];
    return `${dateStr}.md`;
  }

  private formatTimestamp(): string {
    return new Date().toLocaleString('en-US', {
      timeZone: 'Europe/Moscow',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }

  private writeLog(level: LogLevel, action: string, details: string = ''): void {
    if (level < this.logLevel) return;

    const logDir = path.join(__dirname, '..', '..', 'logs');
    const logFile = path.join(logDir, this.getLogFileName());
    
    const timestamp = this.formatTimestamp();
    const levelEmoji: Record<LogLevel, string> = {
      [LogLevel.DEBUG]: '🔍',
      [LogLevel.INFO]: 'ℹ️',
      [LogLevel.WARN]: '⚠️',
      [LogLevel.ERROR]: '❌'
    };
    
    const logEntry = `## ${timestamp}\n\n**${levelEmoji[level]} ${action}**\n${details}\n\n---\n\n`;
    
    // Create log file if it doesn't exist
    if (!fs.existsSync(logFile)) {
      const header = `# Daily Log - ${this.getLogFileName().replace('.md', '')}\n\n`;
      fs.writeFileSync(logFile, header);
    }
    
    // Append log entry
    fs.appendFileSync(logFile, logEntry);
    
    // Console output
    const consolePrefix: Record<LogLevel, string> = {
      [LogLevel.DEBUG]: '[DEBUG]',
      [LogLevel.INFO]: '[INFO]',
      [LogLevel.WARN]: '[WARN]',
      [LogLevel.ERROR]: '[ERROR]'
    };
    
    console.log(`${consolePrefix[level]} ${action}`);
  }

  debug(action: string, details: string = ''): void {
    this.writeLog(LogLevel.DEBUG, action, details);
  }

  info(action: string, details: string = ''): void {
    this.writeLog(LogLevel.INFO, action, details);
  }

  warn(action: string, details: string = ''): void {
    this.writeLog(LogLevel.WARN, action, details);
  }

  error(action: string, details: string = ''): void {
    this.writeLog(LogLevel.ERROR, action, details);
  }

  setLogLevel(level: LogLevel): void {
    this.logLevel = level;
    console.log(`Log level set to: ${LogLevel[level]}`);
  }

  getLogLevel(): string {
    return LogLevel[this.logLevel];
  }

  // Method to get recent logs
  getRecentLogs(limit: number = 10): LogEntry[] {
    const logDir = path.join(__dirname, '..', '..', 'logs');
    const logFile = path.join(logDir, this.getLogFileName());
    
    if (!fs.existsSync(logFile)) {
      return [];
    }

    try {
      const content = fs.readFileSync(logFile, 'utf8');
      const entries = content.split('---').filter(entry => entry.trim());
      
      return entries.slice(-limit).map(entry => {
        const lines = entry.trim().split('\n');
        const timestamp = lines[0]?.replace('## ', '') || '';
        const action = lines[2]?.replace('**', '').replace('**', '') || '';
        const details = lines.slice(3).join('\n').trim();
        
        return {
          timestamp,
          level: LogLevel.INFO, // Default level
          action,
          details
        };
      });
    } catch (error) {
      console.error('Error reading logs:', error);
      return [];
    }
  }
}

// Create default logger instance
export const logger = new Logger();

// Legacy function for backward compatibility
export function logAction(action: string, details: string = ''): void {
  logger.info(action, details);
}

// Export types for external use
export { LogLevel, LogEntry };
