/**
 * Functions Index
 * Central export point for all Google Apps Script CLI functions
 */

// Export main classes
export { GASCLI } from '../clasp-clone';
export { FileExtractor } from './extract-files';

// Export utility classes
export { Logger, logger, LogLevel, LogEntry } from '../utils/logger';
export { ConfigValidator } from '../utils/config-validator';
export { VersionUpdater } from '../utils/version-updater';

// Export script classes
export { ReleaseCreator } from '../scripts/create-release';

// Export test classes
export { SystemTester, TestResult } from '../test-system';

// Export types
export * from '../types';

// Legacy exports for backward compatibility
export { logAction } from '../utils/logger';
