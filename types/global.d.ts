// Global type declarations to resolve conflicts
declare namespace NodeJS {
  interface Global {
    MimeType: any;
  }
}

// Exclude conflicting DOM types
declare var MimeType: any;
