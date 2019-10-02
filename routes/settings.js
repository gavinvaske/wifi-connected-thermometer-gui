var express = require('express')
var router = express.Router()
const fs = require('fs')
const Settings = require('../models/settings.model')
const schema = require('schm')
const { validate } = schema

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
router.post('/', (request, response) => {
    let schema = Settings.settingsSchema
    let newSettings = schema.parse(request.params)
    validate(newSettings, schema)
        .then((parsedValues) => {
            fs.writeFile('db/settings.json', JSON.stringify(newSettings, null, 2), function(error){
              if (error) throw error
              console.log('Yayyy!', parsedValues)
            })
            response.redirect('/')
        })
        .catch((errors) => {
            console.log('Oops!', errors)
            response.send(errors)
        })
})

module.exports = router;