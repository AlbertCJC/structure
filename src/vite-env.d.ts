/// <reference types="vite/client" />

// Vite `?raw` imports — used by catalog/sources.ts so "Copy Code" copies the
// *actual* source of the demo you are looking at (no duplicated snippets).
declare module '*.tsx?raw' {
  const src: string
  export default src
}
declare module '*.ts?raw' {
  const src: string
  export default src
}
