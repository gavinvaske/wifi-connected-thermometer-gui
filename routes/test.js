const express = require('express')
const router = express.Router()
const twilioService = require('../services/twilio.service')
const TemperatureModel = require('../models/temperature.model')

const schema = require('schm')
const { validate } = schema

const tempSchema = schema({
    temperature: String,
    time: Number
  })


router.use('/', function(request, response){
    fs.readFile('db/temperatures.json', (err, data) => {
        if (err) throw err;
        let jsonData = JSON.parse(data)
        return jsonData
      })


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