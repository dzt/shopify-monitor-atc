const electron = require('electron')
const Tray = require('electron').Tray
const Menu = require('electron').Menu
const app = electron.app
const ipcMain = electron.ipcMain
const BrowserWindow = electron.BrowserWindow
const dialog = require('electron').dialog

const os = require('os')

const debug = /--debug/.test(process.argv[2])

var mainWindow

app.setAsDefaultProtocolClient('shopify')

app.on('open-url', function(event, url) {
    var split = url.split('//')
    var shopifyurl = split
    var linkToCart = shopifyurl[1] + '://' + shopifyurl[2]
    dialog.showErrorBox('Link to be added to cart', linkToCart)
})

function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: 480,
        height: 480,
        resizable: false,
        fullscreenable: false,
        frame: true,
        show: false
    })

    mainWindow.on('close', () => {
        prefsWindow = undefined;
    })

    mainWindow.loadURL(`file://${__dirname}/../../static/main.html`);

    mainWindow.on('closed', () => {
        mainWindow = null;
        app.quit();
    })

    mainWindow.show();
    if (debug) {
        mainWindow.webContents.openDevTools()
        require('devtron').install()
    }
}

app.on('ready', () => {
    createMainWindow()
})
