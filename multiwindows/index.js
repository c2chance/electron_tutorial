const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
let mainWindow;
let secondWindow;

function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: 800, height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    })

    mainWindow.loadFile('index.html');
    mainWindow.webContents.openDevTools();
    mainWindow.on('closed', () => {
        mainWindow = null;
        if (secondWindow) secondWindow.close()
    })
}

function createSecondWindow() {
    if (!secondWindow) {
        secondWindow = new BrowserWindow({
            width: 500, height: 400,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js'),
                contextIsolation: true,
                nodeIntegration: false
            }
        })

        secondWindow.loadFile('multiwindows/second.html');
        secondWindow.on('closed', () => {
            secondWindow = null
        })
    } else {
        secondWindow.show()
    }
}

ipcMain.on('close-second-window', () => {
    if (secondWindow) {
        secondWindow.close();
        secondWindow = null;
    }
})

ipcMain.on('open-second-window', createSecondWindow)
app.whenReady().then(createMainWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createMainWindow();
    }
})