var express = require('express')
var fs = require('fs')
var app = express()
app.use(express.static('website'))

// Set Port Number
var port = 3000

// Start Listening on Port..
var server = app.listen(port, function() {
    console.log('Listening on port ' + port + '...')
})

// JSON file acting like a database table named 'temperature'
var temperatureTableFileName = 'temperatures.json'
var data = fs.readFileSync('temperatures.json')
var temperatureTable = JSON.parse(data)

// GET all stored temperature readings
app.get('/all/temperatures', (request, response) => {
    fs.readFile('temperatures.json', (err, data) => {
        if (err) throw err;
        let temps = JSON.parse(data)
        response.send(temps)
      })
})

// ADD one temperature to the database
app.get('/add/temperature/:temp', (request, response) => {
    let data = request.params
    // New Row that will be added to the DB
    var temperatureRecord = {
        temperature : Number(data.temp),
        timeStamp : + new Date()
    }
    temperatureTable['temperatures'].push(temperatureRecord)
    fs.writeFile(temperatureTableFileName, JSON.stringify(temperatureTable, null, 2), function(){
        response.send('Added ' + temperatureRecord.temperature + " to the database.")
    } ) 
})