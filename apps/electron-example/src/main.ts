import { Worker } from 'node:worker_threads';

import { app, BrowserWindow } from 'electron';

// Desired future output shape:
// require.resolve('./background-worker.js')
const backgroundWorkerEntry = require.resolve('./background-worker.ts');

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
