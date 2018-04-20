const express = require('express')
const router = express.Router()

module.exports = router

router.use('/trainee', require('./req-trainee'))
// router.use('/a', require('./req-a'))
// router.use('/b', require('./req-b'))
// router.use('/c', require('./req-c'))
