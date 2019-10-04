const express = require('express')
const router = express.Router()
const twilioService = require('../services/twilio.service')
const TemperatureModel = require('../models/temperature.model')
const fs = require('fs')

const schema = require('schm')
const { validate } = schema

const tempSchema = schema({
    temperature: String,
    time: Number
  })


router.use('/', function(request, response){
  response.send('You clicked a button! ' + JSON.stringify(request.body))
  // // New Row that will be added to the DB
  // var temperatureRecord = {
  //   temperature : 0,
  //   timeStamp : Date.now() / 1000 | 0 // Get current time in seconds
  // }
  // fs.readFile('db/temperatures.json', (err, data) => {
  //   if (err) response.send(false);
  //   let temperaturesTable = JSON.parse(data)
  //   temperaturesTable['temperatures'].push(temperatureRecord)
  //   fs.writeFile('db/temperatures.json', JSON.stringify(temperaturesTable, null, 2), function(){
  //       response.send(true)
  //   }) 
  // })



      // fs.writeFile('db/temperatures.json', JSON.stringify(temperaturesTable, null, 2), function(){
      //   response.send(responseMessage)
      // }) 
    // fs.readFile('db/temperatures.json', (err, data) => {
    //     if (err) throw err;
    //     let jsonData = JSON.parse(data)
    //     return jsonData
    //   })


    // let data = {
    //     temperature: 34324324234,
    //     time: Date.now
    // }

    // let temperature = tempSchema.parse({
    //     temperature: 34324324234,
    //     time: Date.now() / 1000 | 0
    // })

    // console.log("Time = ", Date.now() / 1000 | 0)

    // validate(data, tempSchema)
    //     .then((parsedValues) => {
    //         console.log('Yayyy!', parsedValues)
    //         response.send(parsedValues)
    //     })
    //     .catch((errors) => {
    //         console.log('Oops!', errors)
    //         response.send(errors)
    //     })


    // // let toNumber = '+15159717560'
    // // let body = "Holllly cow"
    // // twilioService.sendText(toNumber, body)
    // // let parsedSchema = tempSchema.parse({
    // //     test: 'hiiii',
    // //     temperature: 1234,
    // //     time: "55"
    // // })
    
})

module.exports = router // Export routes