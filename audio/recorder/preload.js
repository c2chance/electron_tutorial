const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('electronAPI', {
    saveAudioFile: (buffer, filePath) => ipcRenderer.invoke('save-audio', buffer, filePath)
})