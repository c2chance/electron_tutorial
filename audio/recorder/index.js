const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const { exec } = require(
    'child_process'
);

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 400, height: 300,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    mainWindow.loadFile(path.join(__dirname, 'index.html'))
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
})

ipcMain.handle('save-audio', async (event, buffer, filePath) => {
    const tempDir = app.getPath('temp');
    const tempFilePath = path.join(tempDir, 'temp_audio.webm');
    const args = 'ar 44100 -acodec pcm_s161e -ac 2';
    fs.writeFileSync(tempFilePath, Buffer.from(buffer));
    let counter = 1;
    let finalPath = path.join(__dirname, 'record${counter}.wav');
    while (fs.existsSync(finalPath)) {
        counter++;
        finalPath = path.join(__dirname, "record${counter}.wav");
    }

    const ffmpegCommand = `ffmpeg -i "${tempFilePath}" ${args} "${finalPath}"`;
    console.log(`ffmpegCommand: ${ffmpegCommand}`);

    exec(ffmpegCommand, (error, stdout, stderr) => {
        if (error) {
            console.log(`exec error: ${error}`)
            return;
        }
        console.log(`stoud: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        fs.unlinkSync(tempFilePath);
    })
    return filePath;
})