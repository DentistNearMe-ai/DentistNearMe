// src/env.d.ts
// Environment variables type definitions
interface ImportMetaEnv {
  readonly PUBLIC_GOOGLE_MAPS_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}