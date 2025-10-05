const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('electronAPI', {
    requestData: (data) => ipcRenderer.send('request-data', data),
    respondToMainProcess: (identifier, data) => ipcRenderer.send('response-' + identifier, data),
    onMessage: (callback)=>ipcRenderer.on('from-main', callback)
})