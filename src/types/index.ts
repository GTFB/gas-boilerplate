/**
 * Type definitions for Google Apps Script CLI
 */

// Configuration types
export interface SystemConfig {
  defaultProject: string;
  projectsPath: string;
  systemPath: string;
  logsPath: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  name?: string; // Add name field for backward compatibility
}

export interface ProjectsConfig {
  [key: string]: Project;
}

// Google Apps Script types
export interface GASFile {
  name: string;
  type: string;
  source: string;
  id?: string;
}

export interface GASProjectContent {
  files: GASFile[];
  scriptId: string;
}

// Logger types
export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3
}

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  action: string;
  details: string;
}

// Release types
export type ReleaseType = 'patch' | 'minor' | 'major' | 'preview';

export interface ReleaseInfo {
  version: string;
  type: ReleaseType;
  date: string;
  description: string;
}

// Command types
export interface CommandResult {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}

// File extraction types
export interface ExtractedData {
  title: string;
  json: any;
}

// Update system types
export interface UpdateStatus {
  hasUpdates: boolean;
  currentVersion: string;
  latestVersion: string;
  commits: string[];
}

// Package.json types
export interface PackageJson {
  name: string;
  version: string;
  description: string;
  main: string;
  scripts: Record<string, string>;
  keywords: string[];
  author: string;
  license: string;
  dependencies: Record<string, string>;
  engines: Record<string, string>;
  repository: {
    type: string;
    url: string;
  };
  homepage: string;
  bugs: {
    url: string;
  };
  devDependencies?: Record<string, string>;
}

// Utility types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// Error types
export class GASCliError extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: any
  ) {
    super(message);
    this.name = 'GASCliError';
  }
}

export class ValidationError extends GASCliError {
  constructor(message: string, details?: any) {
    super(message, 'VALIDATION_ERROR', details);
    this.name = 'ValidationError';
  }
}

export class AuthenticationError extends GASCliError {
  constructor(message: string, details?: any) {
    super(message, 'AUTHENTICATION_ERROR', details);
    this.name = 'AuthenticationError';
  }
}

export class ProjectError extends GASCliError {
  constructor(message: string, details?: any) {
    super(message, 'PROJECT_ERROR', details);
    this.name = 'ProjectError';
  }
}
