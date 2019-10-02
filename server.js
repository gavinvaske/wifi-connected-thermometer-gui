const express = require('express')
const path = require('path')
const fs = require('fs')
const bodyParser = require('body-parser')
const app = express()
app.set('view engine', 'pug')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'));

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

app.use(require('./routes'))

app.use('/', function(request, response){
    response.render('index', {
        title: 'Wifi Enabled Thermometer'
    })
})

app.use((req, resp) => {
    resp.status(404).send('Unknown request')
})