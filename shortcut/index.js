const { app, BrowserWindow, dialog, globalShortcut } = require('electron');
const path = require('path');
function createWindow() {
    const win = new BrowserWindow({
        width: 800, height: 600,
    })

    win.loadFile('index.html');
}

app.whenReady().then(() => {
    createWindow();
    //
    let result=globalShortcut.register('CommandOrControl+X', () => {
        dialog.showMessageBox({
            type: 'info',
            message: 'Global Sortcut',
            detail: 'You hit global shortcut-key: Ctrl+X',
            buttons: ['Ok']
        })
    })
    if (result) {
        console.log(`Register success`);
    }
    else {
        console.log(`Register failed`);
    }
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

app.on('will-quit', () => {
    globalShortcut.unregisterAll();
})