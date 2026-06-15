declare module 'electron' {
  export const app: {
    whenReady(): Promise<void>;
  };

  export class BrowserWindow {
    constructor(options: {
      width: number;
      height: number;
      webPreferences: {
        nodeIntegration: boolean;
        contextIsolation: boolean;
      };
    });

    webContents: {
      openDevTools(options: { mode: 'detach' }): void;
    };

    loadURL(url: string): Promise<void>;
  }
}
