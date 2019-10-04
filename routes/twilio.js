const express = require('express')
const router = express.Router()
const TwilioService = require('../services/twilio.service')
const fs = require('fs')


router.post('/', function(request, response){
    // I.e. HIGH temp or LOW temp alert
    let alertType = Number(request.param('alert-type'))
    fs.readFile('db/settings.json', (err, data) => {
        if (err) throw err;
        let settings = JSON.parse(data)
        let phoneNumber = settings.phoneNumber
        if(alertType == 1){
            TwilioService.sendText(phoneNumber, settings.maxAlertMessage)
        } else {
            TwilioService.sendText(phoneNumber, settings.minAlertMessage)
        }
        response.send(JSON.stringify(request.params))
      })
})

router.post('/alerts', function(request, response){
    let alertType = Number(request.body.alertType)
    fs.readFile('db/settings.json', (err, data) => {
        if (err) throw err;
        let settings = JSON.parse(data)
        let phoneNumber = settings.phoneNumber
        if(alertType == 1){
            TwilioService.sendText(phoneNumber, settings.maxAlertMessage)
        } else {
            TwilioService.sendText(phoneNumber, settings.minAlertMessage)
        }
        response.send(settings)
      })
})

module.exports = router // Export routes