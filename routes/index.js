const express = require('express')
const router = express.Router()

// Include all routes defined in routes/api.v0.js -> ( Base URL = /api/* )
router.use('/api', require('./api.v0.js'))

module.exports = router