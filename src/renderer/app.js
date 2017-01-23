const ipcRenderer = require('electron').ipcRenderer
const $ = require('jquery')

ipcRenderer.on('log', function(event, data) {
  var date = new Date()
  var formatted = date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1")
  $("#log-box").append(`<span class="console-log">${formatted} ${data}</span><br />`);
})
