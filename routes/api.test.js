const express = require('express')
const router = express.Router()
const twilioService = require('../services/twilio.service')

const schema = require('schm')

const tempSchema = schema({
    temperature: String,
    time: Number
  })


router.use('/', function(request, response){
    let toNumber = '+15159717560'
    let body = "Holllly cow"
    twilioService.sendText(toNumber, body)
    // let parsedSchema = tempSchema.parse({
    //     test: 'hiiii',
    //     temperature: 1234,
    //     time: "55"
    // })
    response.send("Did it work?")
})

module.exports = router // Export routes