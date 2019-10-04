var express = require('express')
var router = express.Router()
const fs = require('fs')

var db = 'db/'
var temperatureTableFileName = db + 'temperatures.json'

// GET all stored temperature readings
router.get('/', (request, response) => {
    fs.readFile(temperatureTableFileName, (err, data) => {
        if (err) throw err;
        let temps = JSON.parse(data)
        response.send(temps)
      })
})

// ADD one temperature to the database
router.post('/blank', (request, response) => {
  // New Row that will be added to the DB
  var temperatureRecord = {
    temperature : 0,
    timeStamp : Date.now() / 1000 | 0 // Get current time in seconds
  }

  fs.readFile('db/temperatures.json', (err, data) => {
    if (err) response.send(false);
    let temperaturesTable = JSON.parse(data)
    temperaturesTable['temperatures'].push(temperatureRecord)
    fs.writeFile('db/temperatures.json', JSON.stringify(temperaturesTable, null, 2), function(){
        response.send(true)
    }) 
  })
})

// ADD one temperature to the database
router.post('/', (request, response) => {
    // let data = request.params
    let temp = Number(request.param('temperature-measurement'))
    console.log("Temp == " + JSON.stringify(request.params) )
    // response.send('temp = ' + temp)
    let minTemperature = 10
    let maxTemperature = 50
    let statusCode = 406
    let message = "Error: An unknown error occurred"

    if(!temp){
        message = "Error: Missing 'temp' body param"
    }
    // New Row that will be added to the DB
    var temperatureRecord = {
        temperature : temp,
        timeStamp : Date.now() / 1000 | 0
    }
    // TESTING PURPOSES ONLY
    // response.send("Adding temperature = " + temp + " to the database.")
    
    // Check if temperature is within the acceptable range
    if( temperatureRecord.temperature >= minTemperature && temperatureRecord.temperature <= maxTemperature ){
        // temperatureTable['temperatures'].push(temperatureRecord) Marked for deletion
        statusCode = 202
        message = 'Success: Added ' + temperatureRecord.temperature + " to the database."
    } else {
        statusCode = 406
        message = 'Error: Temperature must be between the ranges 10 -> 50 degress celsius'
    }
    let responseMessage = 
    {
        httpStatusCode: statusCode,
        message: message
    }
    // If all is well
    if(statusCode == 202){
        fs.readFile(temperatureTableFileName, (err, data) => {
            if (err) throw err;
            let temperaturesTable = JSON.parse(data)
            temperaturesTable['temperatures'] = temperaturesTable['temperatures'].slice(-299)   // Grab 299 records from DB (300 max is allowed and we are about to add 1)
            temperaturesTable['temperatures'].push(temperatureRecord)
            fs.writeFile(temperatureTableFileName, JSON.stringify(temperaturesTable, null, 2), function(){
                response.send(responseMessage)
            }) 
          })
    } else{
        response.send(responseMessage)
    }
})

module.exports = router;
