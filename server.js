const express = require('express')
const path = require('path')
const fs = require('fs')
const bodyParser = require('body-parser')
var app = module.exports = express();
app.set('view engine', 'pug')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'));
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
app.use('/', function(request, response){
    response.render('index', {
        title: 'Wifi Enabled Thermometer'
    })
})

app.use((req, resp) => {
    resp.status(404).send('Unknown request')
})