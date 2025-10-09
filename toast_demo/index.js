const { app, Tray, Menu, Notification } = require('electron');
const path = require('path')
let tray = null;

app.on('ready', () => {
    tray = new Tray(path.join(__dirname, 'tray.png'));
    tray.setToolTip('This is a tray icon');

    const contextMenu = Menu.buildFromTemplate([
        { label: 'Show message', click: showNotification },
        { label: 'Quit', click: () => app.quit() }
    ]);

    tray.setContextMenu(contextMenu);
    tray.on('click', showNotification);

    function showNotification() {
        const notification = new Notification({
            title: 'Heloo, shit world',
            body: 'This is message from Electron',
            icon: path.join(__dirname, 'tray.png')
        });

        notification.show();
        notification.on('click', () => {
            console.log('Notification clicked');
        })
    }
})

app.on('window-all-closed', () => {
    app.quit();
})