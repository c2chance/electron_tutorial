const { app, BrowserWindow } = require('electron')
const path = require('path');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800, height: 600
    })
    mainWindow.loadFile(path.join(__dirname, 'index.html'))
}

app.whenReady().then(() => {
    createWindow()
    app.on('active', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})