/**
 * Type definitions for Google Apps Script CLI
 */
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
    name?: string;
}
export interface ProjectsConfig {
    [key: string]: Project;
}
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
export declare enum LogLevel {
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
export type ReleaseType = 'patch' | 'minor' | 'major' | 'preview';
export interface ReleaseInfo {
    version: string;
    type: ReleaseType;
    date: string;
    description: string;
}
export interface CommandResult {
    success: boolean;
    message: string;
    data?: any;
    error?: string;
}
export interface ExtractedData {
    title: string;
    json: any;
}
export interface UpdateStatus {
    hasUpdates: boolean;
    currentVersion: string;
    latestVersion: string;
    commits: string[];
}
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
export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export declare class GASCliError extends Error {
    code: string;
    details?: any | undefined;
    constructor(message: string, code: string, details?: any | undefined);
}
export declare class ValidationError extends GASCliError {
    constructor(message: string, details?: any);
}
export declare class AuthenticationError extends GASCliError {
    constructor(message: string, details?: any);
}
export declare class ProjectError extends GASCliError {
    constructor(message: string, details?: any);
}
//# sourceMappingURL=index.d.ts.map