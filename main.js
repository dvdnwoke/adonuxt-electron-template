const electron = require('electron')
const path = require('path')
const url = require('url')
const http = require('http')

module.exports = function(url, config) {

  const app = electron.app
  const bw = electron.BrowserWindow

  const newWin = () => {
      win = new bw({
        width: config.electron.width || 800,
        height: config.electron.height || 600
    })
    if (!config.dev) {
      return win.loadURL(url)
    }
    win.loadURL(url)
    win.on('closed', () => win = null)
  }

  app.on('ready', newWin)
  app.on('window-all-closed', () => app.quit())
  app.on('activate', () => win === null && newWin())

}
