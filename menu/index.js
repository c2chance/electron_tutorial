const { app, BrowserWindow, Menu, ipcMain, MenuItem } = require('electron')
let mainWindow;
let contextMenuTemplate = [
    { label: 'Right-key Menu Item1', click: (menuItem) => console.log(`${menuItem.label}.click`) },
    { label: 'Right-key Menu Item2', click: (menuItem) => console.log(`${menuItem.label}.click`) },
];
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800, height: 600,
        webPreferences: {
            contextIsolation: true
        }
    });
    mainWindow.loadFile('index.html')
    const mainMenu = Menu.buildFromTemplate(
        [{
            label: 'Edit', submenu:
            [
                {
                    label: 'Add right-key Menu', click: () => {
                        const itemLabel = `Right-key Menu Item${contextMenuTemplate.length + 1}`;
                        contextMenuTemplate.push({
                            label: itemLabel,
                            click: (menuItem) => console.log(`${menuItem.label} - click`)
                        })
                    }
                },
                {type:'separator'},
                {
                    label: 'Delete right-key Menu',
                    click: () => {
                        if (contextMenuTemplate.length > 2) {
                            contextMenuTemplate.pop()
                        }
                    }
                }
            ]
        },
            {
                label: 'File', submenu: [
                    {label:'New', click:(menuItem)=>{console.log(`${menuItem.label} - click`)}},
                    {label:'Open',click:(menuItem)=>{console.log(`${menuItem.label} - click`)}},
                    {type:'separator'},
                    {label:'Exit',role:'quit'}
                ]

            },
            {
                label: 'View', submenu: [
                    {label:'Explorer', click:(menuItem)=>{console.log(`${menuItem.label} - click`)}},
                    {label:'Search', click:(menuItem)=>{console.log(`${menuItem.label} - click`)}},
                    {type: 'separator' },
                    {label: 'Terminal', click:()=>{}},
                    {label:'Output', role:'quit'}
                ]
            }
    ])

    Menu.setApplicationMenu(mainMenu);
    mainWindow.webContents.on('context-menu', (e, params) => {
        contextMenu = Menu.buildFromTemplate(contextMenuTemplate);
        contextMenu.popup({window:mainWindow, x:params.x, y:params.y})
    })
}

app.whenReady().then(createWindow);