const { app, BrowserWindow, globalShortcut } = require('electron');
const path = require('path');

let mainWindow;
app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 300, height: 300,
        frame: false,
        transparent: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true
        }
    })

    //
    mainWindow.loadFile(path.join(__dirname, 'index.html'));
    globalShortcut.register("Esc", () => {
        app.quit();
    });
    
    // 
    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    })
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})