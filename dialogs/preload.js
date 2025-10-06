const { contextBridge, ipcRenderer } = require('electron')
// 
contextBridge.exposeInMainWorld('dialog', {
    showOpenDialog: () => ipcRenderer.invoke('show-open-dialog'),
    showSaveDialog: () => ipcRenderer.invoke('show-save-dialog'),
    showMessageBox: () => ipcRenderer.invoke('show-message-box'),
    showErrorBox:()=> ipcRenderer.invoke('show-error-box')    
})