const { app, Tray, Menu } = require('electron');
const path = require('path');
const sharp = require('sharp');

let tray = null;
/*
const iconPath = path.join(__dirname, 'images', 'tray.png');
const resizedIconPath = path.join(__dirname, 'images', 'resized_tray.png');
*/
const iconPath = path.join(__dirname, 'tray.png');
const resizedIconPath = path.join(__dirname, 'resized_tray.png');

function createTray() {
    tray = new Tray(resizedIconPath);
    tray.setToolTip('Electron Tray Demo Applicaiton');

    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Hello',
            click: () => { console.log('Hello from tray') }
        },
        {
            label: 'World',
            click: () => { console.log('This is a shit world')}
        },
        { type: 'separator' },
        {
            label: 'about the demo',
            click: (menuItem) => { console.log(`You hit the ${menuItem.label}`)}
        },
        {
            label: 'Exit',
            click: () => app.quit()
        }
    ]);

    tray.setContextMenu(contextMenu);
}

function resizeIconAndCreateTray()
{
    sharp(iconPath)
        .resize(16, 16)
        .toFile(resizedIconPath, (err, info) => {
            if (err) {
                console.error('Error resizing icon: ', err);
                return
            }
            createTray()
        })
}

app.whenReady().then(resizeIconAndCreateTray);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})