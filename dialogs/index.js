const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
let win;
function createWindow() {
    win = new BrowserWindow({
        width: 800, height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            enableRemoteModule: false
        }
    })
    win.loadFile(path.join(__dirname, 'index.html'));
    win.webContents.openDevTools();
}

app.whenReady().then(createWindow);
ipcMain.handle('show-open-dialog', async () => {
    const result = await dialog.showOpenDialog(win, {
        properties: ['openFile', 'multiSelections']
    })
    return result.filePaths;
})

ipcMain.handle('show-save-dialog', async () => {
    const result = await dialog.showSaveDialog(win, {
        title: 'Save file',
        buttonLabel: 'Save',
        filters: [
            { name: 'Text Files', extensions: ['txt'] },
            { name: 'All Files', extensions: ['*']}
        ]
    })
    return result.filePath;
})

ipcMain.handle('show-message-box', async () => {
    result = await dialog.showMessageBox(win, {
        type: 'info',
        title: 'message',
        message: 'This is a message box',
        buttons: ['ok', 'cancel']
    })
    return result.response
})

ipcMain.handle('show-error-box', () => {
    dialog.showErrorBox('Error', 'This is a Error-Box');
})