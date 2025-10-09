const { app, BrowserWindow, ipcMain } = require('electron')
const path = require(
    'path'
)

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 300,
        height: 300, 
        frame: false,
        transparent: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })

    mainWindow.loadFile(path.join(__dirname, 'index.html'));
    mainWindow.setOpacity(0.7);
    app.on('window-all-closed', () => {
        app.quit()
    })
}

app.whenReady().then(createWindow);
ipcMain.on('close-window', (event) => {
    const window = BrowserWindow.getFocusedWindow();
    if (window) window.close()
})