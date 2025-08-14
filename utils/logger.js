const fs = require('fs');
const path = require('path');

const LOG_LEVELS = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3
};

const DEFAULT_LOG_LEVEL = LOG_LEVELS.INFO;

class Logger {
  constructor(logLevel = DEFAULT_LOG_LEVEL) {
    this.logLevel = logLevel;
  }

  getLogFileName() {
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];
    return `${dateStr}.md`;
  }

  formatTimestamp() {
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

  writeLog(level, action, details = '') {
    if (level < this.logLevel) return;

    const logDir = path.join(__dirname, '..', 'logs');
    const logFile = path.join(logDir, this.getLogFileName());
    
    const timestamp = this.formatTimestamp();
    const levelEmoji = {
      [LOG_LEVELS.DEBUG]: '🔍',
      [LOG_LEVELS.INFO]: 'ℹ️',
      [LOG_LEVELS.WARN]: '⚠️',
      [LOG_LEVELS.ERROR]: '❌'
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
    const consolePrefix = {
      [LOG_LEVELS.DEBUG]: '[DEBUG]',
      [LOG_LEVELS.INFO]: '[INFO]',
      [LOG_LEVELS.WARN]: '[WARN]',
      [LOG_LEVELS.ERROR]: '[ERROR]'
    };
    
    console.log(`${consolePrefix[level]} ${action}`);
  }

  debug(action, details = '') {
    this.writeLog(LOG_LEVELS.DEBUG, action, details);
  }

  info(action, details = '') {
    this.writeLog(LOG_LEVELS.INFO, action, details);
  }

  warn(action, details = '') {
    this.writeLog(LOG_LEVELS.WARN, action, details);
  }

  error(action, details = '') {
    this.writeLog(LOG_LEVELS.ERROR, action, details);
  }

  setLogLevel(level) {
    if (level in LOG_LEVELS) {
      this.logLevel = level;
      console.log(`Log level set to: ${Object.keys(LOG_LEVELS)[level]}`);
    } else {
      console.error(`Invalid log level: ${level}`);
    }
  }

  getLogLevel() {
    return Object.keys(LOG_LEVELS)[this.logLevel];
  }
}

// Create default logger instance
const logger = new Logger();

// Legacy function for backward compatibility
function logAction(action, details = '') {
  logger.info(action, details);
}

module.exports = {
  Logger,
  LOG_LEVELS,
  logger,
  logAction
};
