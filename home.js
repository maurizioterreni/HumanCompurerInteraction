const remote = require('electron').remove
const main = remote.require('./index.js')


var button = document.createElement('button')
button.textContent = 'Open Window'
button.addEventListener('click', () => {
  var window = remote.getCurrentWindow()
  window.close()
  main.openWindow('pageTwo')
}, false)

document.body.appendChild(button)
