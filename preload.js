const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  loadEntries: () => ipcRenderer.invoke('load-entries'),
  saveEntry: (entry) => ipcRenderer.invoke('save-entry', entry),
  deleteEntry: (id) => ipcRenderer.invoke('delete-entry', id),
});
