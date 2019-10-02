const express = require('express')
const router = express.Router()
const TwilioService = require('../services/twilio.service')
const fs = require('fs')


router.use('/', function(request, response){
    // I.e. HIGH temp or LOW temp alert
    let alertType = Number(request.param('alert-type'))
    fs.readFile('db/settings.json', (err, data) => {
        if (err) throw err;
        let settings = JSON.parse(data)
        let phoneNumber = settings.phoneNumber
        if(alertType == 1){
            let message = settings.maxAlertMessage
        } else {
            let message = settings.minAlertMessage
        }
        TwilioService.sendText(phoneNumber, message)
        response.send(settings)
      })
})

module.exports = router // Export routes