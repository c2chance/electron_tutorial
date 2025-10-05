const { contextBridge } = require('electron');
contextBridge.exposeInMainWorld('electron', {
    showNotification: (title, body) => {
        new Notification(title, { body }).onclick = () => {
            console.log('notification by click it')
        }
    }
})