const { app, BrowserWindow, dialog, globalShortcut } = require('electron');
function createWindow() {
    const win = new BrowserWindow({
        width: 800, height: 600,
    })

    win.loadFile('index.html');
}

app.whenReady().then(() => {
    createWindow();
    //
    globalShortcut.register('CommandOrControl+X', () => {
        dialog.showMessageBox({
            type: 'info',
            message: 'Global shortcut',
            details: 'You hit global shortcut-key: Ctrl+x',
            buttons: ['Ok']
        })
    })
})

app.on('window-all-closed', () => {
    globalShortcut.unregisterAll();
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();    
    }
})

app.on('well-quit', () => {
    globalShortcut.unregisterAll();
})