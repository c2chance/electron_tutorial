const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('electron', {
    selectFile: () => ipcRenderer.invoke('select-file'),
    onFileProcessed: (callback)=>ipcRenderer.on('filter-processed', (event, data)=> callback(data))
})