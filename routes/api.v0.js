const express = require('express')
const fs = require('fs')
const router = express.Router()
const path = require('path')
const bodyParser = require('body-parser')
const appViews = 'views'

const baseUrl = __dirname + '/api'

router.get('/', function(request, response){
    let apiRouteDescriptions = 
    [
        {
            route: baseUrl + '/all/temperatures',
            description: 'GET array of temperature records from database. Each element in the array is an object representing one row in the database.',
        },
        {
            route: baseUrl + '/add/temperature/:temp',
            description: 'SAVE new :temp to the database.',
        },
    ]
    response.send(JSON.stringify(apiRouteDescriptions, null, 2))
})

// GET all stored temperature readings
router.get('/all/temperatures', (request, response) => {
    fs.readFile('temperatures.json', (err, data) => {
        if (err) throw err;
        let temps = JSON.parse(data)
        response.send(temps)
      })
})

// ADD one temperature to the database
router.get('/add/temperature/:temp', (request, response) => {
    let data = request.params
    let minTemperature = 10
    let maxTemperature = 50
    let statusCode = 406
    let message = "Invalid temperature received."
    // New Row that will be added to the DB
    var temperatureRecord = {
        temperature : Number(data.temp),
        timeStamp : + new Date()
    }
    // Check if temperature is within the acceptable range
    if( temperatureRecord.temperature >= minTemperature && temperatureRecord.temperature <= maxTemperature ){
        temperatureTable['temperatures'].push(temperatureRecord)
        statusCode = 202
        message = 'Added ' + temperatureRecord.temperature + " to the database."
    }

    fs.writeFile(temperatureTableFileName, JSON.stringify(temperatureTable, null, 2), function(){
        let responseMessage = 
        {
            httpStatusCode: statusCode,
            message: message
        }
        response.send(responseMessage)
    } ) 
})

// ADD one temperature to the database
router.post('/temperature', (request, response) => {
    // let data = request.params
    let temp = Number(request.param('temp'))
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
        timeStamp : new Date()
    }

    response.send("Adding temperature = " + temp + " to the database.")
    
    // // Check if temperature is within the acceptable range
    // if( temperatureRecord.temperature >= minTemperature && temperatureRecord.temperature <= maxTemperature ){
    //     temperatureTable['temperatures'].push(temperatureRecord)
    //     statusCode = 202
    //     message = 'Success: Added ' + temperatureRecord.temperature + " to the database."
    // } else {
    //     statusCode = 406
    //     message = 'Error: Temperature must be between the ranges 10 -> 50 degress celsius'
    // }

    // let responseMessage = 
    // {
    //     httpStatusCode: statusCode,
    //     message: message
    // }
    // if(statusCode == 202){
    //     fs.writeFile(temperatureTableFileName, JSON.stringify(temperatureTable, null, 2), function(){
    //         response.send(responseMessage)
    //     } ) 
    // } else{
    //     response.send(responseMessage)
    // }
})

module.exports = router