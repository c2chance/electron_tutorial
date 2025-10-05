const { app, BrowserWindow, Notification } = require('electron');
const path = require('path')

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800, height: 600,/*
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            enableRemoteModule: false
        }*/
    })
    mainWindow.loadFile(path.join(__dirname, 'index.html'));
    mainWindow.webContents.openDevTools();
}

function showNotification() {
    const notification = new Notification({
        title: 'Electron Notification',
        body: 'This is a message from the Main Process!'
    });
    notification.show();
}

app.whenReady().then(() => {
    createWindow()
    app.on('active', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
    setTimeout(showNotification, 3000);
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})