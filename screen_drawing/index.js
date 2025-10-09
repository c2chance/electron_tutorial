const { app, BrowserWindow, globalShortcut, screen } = require("electron");
const path = require("path");

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  const mainWindow = new BrowserWindow({
    width: width,
    height: height,
    frame: false,
    transparent: true,
    webPreference: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile(path.join(__dirname, "index.html"));
  mainWindow.maximize();
  globalShortcut.register("Esc", () => {
    app.quit();
  });

  app.on("window-all-closed", () => {
    app.quit();
  });
}

app.whenReady().then(createWindow);