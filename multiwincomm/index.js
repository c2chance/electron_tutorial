const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800, height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    })
    mainWindow.loadFile('multiwincomm/index.html')
    mainWindow.webContents.openDevTools();
}

app.whenReady().then(createWindow)
ipcMain.on('request-data', (event, arg) => {
    console.log('receive data req from Renderer process: ', arg);
    mainWindow.webContents.send('from-main', 'This is data from main-process');
    ipcMain.once('response-' + arg, (event, response) => {
        console.log('response from Renderer-process: ', response)
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
})