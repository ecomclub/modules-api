'use strict'

/**
 * @file E-Com Plus Mods API Node.js App
 * @copyright E-Com Club. All rights reserved. Since 2016
 * <br>E-COM CLUB SOFTWARES PARA E-COMMERCE LTDA / CNPJ: 24.356.660/0001-78
 * @license GPL-3.0
 * @author E-Com Club
 */

function error (err) {
  // fatal error
  // log to file before exit
  let msg = '\n[' + new Date().toString() + ']\n'
  if (err) {
    if (err.hasOwnProperty('stack')) {
      msg += err.stack
    } else if (err.hasOwnProperty('message')) {
      msg += err.message
    } else {
      msg += err.toString()
    }
    msg += '\n'
  }

  let fs = require('fs')
  fs.appendFile('/var/log/nodejs/_stderr', msg, () => {
    process.exit(1)
  })
}

process.on('uncaughtException', error)

// NodeJS filesystem module
const fs = require('fs')

// web application
// recieve requests from Nginx by reverse proxy
let web = require('./bin/web.js')

// read config file
fs.readFile(process.cwd() + '/config/config.json', 'utf8', (err, data) => {
  if (err) {
    // can't read config file
    throw err
  } else {
    let config = JSON.parse(data)
    // start web app
    web(config)
  }
})

// local application
// executable server side only
require('./bin/local.js')
