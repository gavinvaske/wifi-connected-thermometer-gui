const express = require('express')
const path = require('path')
const fs = require('fs')
const bodyParser = require('body-parser')
var app = module.exports = express();
app.set('view engine', 'pug')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

const Settings = require('./models/settings.model')
const schema = require('schm')
const { validate } = schema
// app.use(express.static(__dirname + '/public'));

// Example of importing
// const sqr = require('../wifi-connected-thermometer-gui/models/test')
// console.log(sqr.test())

// Set Port Number
var port = process.env.PORT || 3000

// Start Listening on Port..
var server = app.listen(port, function() {
    console.log('Listening on port ' + port + '...')
})

// JSON file acting like a database table named 'temperature'
// var temperatureTableFileName = 'temperatures.json'
// var data = fs.readFileSync('db/temperatures.json')
// var temperatureTable = JSON.parse(data)

// Any /api requests go here
app.use('/api', require('./routes'))

// Homepage
app.get('/', function(request, response){
    response.render('index', {
        title: 'Wifi Enabled Thermometer'
    })
})

// Process Settings Form Inputs
app.post('/update-settings', function(request, response){
    let schema = Settings.settingsSchema
    let newSettings = schema.parse(request.body)
    console.log('New settings = ' + JSON.stringify(request.body))
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
    // let formData = request.body
    // console.log(formData)
    // // console.log(formData)
    // // let valideData = Settings.validateData(formData)
    // // console.log(formData)
    // response.redirect('/')
})

app.use((req, resp) => {
    resp.status(404).send('Unknown request')
})