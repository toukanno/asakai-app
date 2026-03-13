const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

function getDataPath() {
  const userDataPath = app.getPath('userData');
  const dataFilePath = path.join(userDataPath, 'asakai-data.json');
  return dataFilePath;
}

function loadData() {
  const dataPath = getDataPath();
  try {
    if (fs.existsSync(dataPath)) {
      const raw = fs.readFileSync(dataPath, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('データ読み込みエラー:', e);
  }
  return { entries: [] };
}

function saveData(data) {
  const dataPath = getDataPath();
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 700,
    minWidth: 600,
    minHeight: 500,
    title: '朝会アプリ',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'));
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC ハンドラー
ipcMain.handle('load-entries', () => {
  const data = loadData();
  return data.entries;
});

ipcMain.handle('save-entry', (_event, entry) => {
  const data = loadData();
  entry.id = Date.now().toString();
  entry.createdAt = new Date().toISOString();
  data.entries.unshift(entry);
  saveData(data);
  return data.entries;
});

ipcMain.handle('delete-entry', (_event, id) => {
  const data = loadData();
  data.entries = data.entries.filter((e) => e.id !== id);
  saveData(data);
  return data.entries;
});
