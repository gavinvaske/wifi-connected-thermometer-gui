var express = require('express')
var router = express.Router()
const fs = require('fs')

var db = 'db/'
var settingsTableName = db + 'settings.json'

// GET all stored settings
router.get('/', (request, response) => {
    fs.readFile(settingsTableName, (err, data) => {
        if (err) throw err;
        let settings = JSON.parse(data)
        response.send(settings)
      })
})

// UPDATE settings
router.put('/', (request, response) => {
    fs.readFile(settingsTableName, (err, data) => {
        if (err) throw err;
        let settings = JSON.parse(data)
        response.send(settings)
      })
})

module.exports = router;