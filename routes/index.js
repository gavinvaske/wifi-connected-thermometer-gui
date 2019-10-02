const express = require('express')
const router = express.Router()

// Base URL = /api/temperatures/* 
router.use('/temperatures', require('./temperatures.js'))
// Base URL = /api/settings/*
router.use('/settings', require('./settings.js'))
// Base URL = /api/test/*
router.use('/test', require('./api.test.js'))
// Base URL = /api/
router.use('/', function(request, response){
    response.send("Welcome to the base route of the API!")
})

module.exports = router // Export routes