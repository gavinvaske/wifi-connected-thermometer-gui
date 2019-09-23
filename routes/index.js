const express = require('express')
const fs = require('fs')
const router = express.Router()
const path = require('path')

// Include all routes defined in routes/api.v0.js -> ( Base URL = /api/* )
router.use('/api', require('./api.v0.js'))

router.get('/test', function(request, response){
    response.send("This is a test!")
})

module.exports = router