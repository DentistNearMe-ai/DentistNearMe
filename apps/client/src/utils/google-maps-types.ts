// Add export {} to make this an external module
export {};

declare global {
  interface Window {
    google: any;
    initGoogleMaps?: () => void;
  }
  
  // Use any for google to avoid namespace issues
  const google: any;
}