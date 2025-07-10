const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const { setupPresence } = require('./presence');

let mainWindow;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    icon: path.join(__dirname, 'assets', 'icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  // Remove the default menu bar
  Menu.setApplicationMenu(null);

  // Load the Miruku.cafe web app
  mainWindow.loadURL('https://miruku.cafe');

  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  }

  // Initialize Discord Rich Presence integration
  setupPresence(mainWindow);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(createMainWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createMainWindow();
  }
}); 