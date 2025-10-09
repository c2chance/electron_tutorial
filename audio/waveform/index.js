const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const fluentFfmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800, height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: true,
            enableRemoteModule: true
        }
    });

    mainWindow.loadFile(path.join(__dirname, 'index.html'));
    mainWindow.webContents.openDevTools();
}

ipcMain.handle('select-file', async () => {
    const { canceld, filePaths } = await dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [{ name: 'Audio', extensions: ['mp3', 'wav', 'ogg', 'm4a'] }]
    });
    if (canceld || filePaths.length === 0) { return null }
    else {
        extractWaveform(filePaths[0]);
        return filePaths[0]
    }
})

function extractWaveform(filePath) {
    const outputFilePath = path.join(app.getPath('temp'), 'output.pcm');
    fluentFfmpeg(filePath)
        .audioChannels(1)
        .audioFrequency(8000)
        .outputFormat('s161e').
        output(outputFilePath)
        .on('end', () => {
            console.log('Audio processing completed.');
            const buffer = fs.readFileSync(outputFilePath);
            const samples = new Int16Array(buffer.buffer);
            const waveform = Array.from(samples);

            mainWindow.webContents.send('file-processed', waveform);
        })
        .on('error', (err) => {
            console.error('Error processing audio file: ', err);
            mainWindow.webContents.send('file-prcessed', null);
        })
        .run()
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
})