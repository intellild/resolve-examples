import { Worker } from 'node:worker_threads';

import { app, BrowserWindow } from 'electron';

// Desired ESM output shape:
// new URL('./background-worker.output-chunk.js', import.meta.url)
const backgroundWorkerEntry = new URL('./background-worker.ts', import.meta.url);

function createWindow() {
  return new BrowserWindow({
    width: 960,
    height: 640,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });
}

export function createBackgroundWorker() {
  return new Worker(backgroundWorkerEntry, {
    name: 'electron-background-worker',
  });
}

app.whenReady().then(() => {
  const window = createWindow();
  const worker = createBackgroundWorker();

  worker.once('message', (message) => {
    window.webContents.openDevTools({ mode: 'detach' });
    console.log('Background worker replied:', message);
  });

  window.loadURL('data:text/html,<h1>Electron code URL example</h1>');
});
