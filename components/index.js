const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

function createWindow() {
    let win = new BrowserWindow({
        width: 800, height: 600,
        webPreferences: {
            // 
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            enableRemoteModule:false
        }
    })
    // 
    win.loadFile(path.join(__dirname, 'index.html'))
}

// 
app.whenReady().then(createWindow);

// 
ipcMain.on('close-app', () => {
    app.quit();
})

// 
app.on('window-all-closed', () => {
    if(process.platform!=='darwin') app.quit()
})

// 
app.on('activate', () => {
    if (BrowserWindow.getAllWindows.length === 0) {
        createWindow()
    }
})