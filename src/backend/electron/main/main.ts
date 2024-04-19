import { join } from 'path';
import { app, BrowserWindow, ipcMain } from 'electron';
import { handleRequest } from '../../handlers';

const isDev = process.env.npm_lifecycle_event === 'app:dev' ? true : false;

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1500,
    height: 1000,
    titleBarStyle: 'hidden',
    webPreferences: {
      preload: join(__dirname, '../preload/preload.js'),
      webSecurity: false,
    },
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools(); // Open the DevTools.
  } else {
    mainWindow.loadFile(join(__dirname, '../../../index.html'));
  }
}

app.whenReady().then(() => {
  ipcMain.handle('window:close', () => handleRequest('window:close'));

  ipcMain.handle('window:minimize', () => handleRequest('window:minimize'));

  ipcMain.handle('window:maximize', () => handleRequest('window:maximize'));

  ipcMain.handle('app:images:getState', () =>
    handleRequest('app:images:getState')
  );

  ipcMain.handle('app:images:selectSourceDirectory', async () =>
    handleRequest('app:images:selectSourceDirectory')
  );

  createWindow();
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
