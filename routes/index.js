const express = require('express')
const fs = require('fs')
const router = express.Router()
const path = require('path')
const appViews = '../views'

// Include all routes defined in routes/api.v0.js -> ( Base URL = /api/* )
router.use('/api', require('./api.v0.js'))

router.get('/test', function(request, response){
    response.render('test')
    response.send("This is a test!")
})

router.get('/settings', function(request, response){
    response.send('I am settings page')
    // response.render('settings', {root : path.join(__dirname, appViews)})
})

module.exports = router