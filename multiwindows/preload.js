const { contextBridge, ipcRenderer } = require('electron')
contextBridge.exposeInMainWorld('electronAPI', {
    closeSecondWindow: () => ipcRenderer.send('close-second-window'),
    openSecondWindow: ()=> ipcRenderer.send('open-second-window')
})
