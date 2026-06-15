import { defineManifest } from '@crxjs/vite-plugin';

export default defineManifest({
  manifest_version: 3,
  name: 'CRXJS Resolve Example',
  description: 'Loads a page main-world script from a CRXJS content script.',
  version: '0.0.1',
  action: {
    default_popup: 'index.html',
  },
  content_scripts: [
    {
      js: ['src/content-script.ts'],
      matches: ['<all_urls>'],
    },
  ],
  web_accessible_resources: [
    {
      resources: ['assets/main-world-*.js'],
      matches: ['<all_urls>'],
    },
  ],
});
