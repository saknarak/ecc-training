const express = require('express')
const router = express.Router()

module.exports = router

// define the home page route
router.get('/', function (req, res) {
  res.send('Birds home page')
})
// define the about route
//   /req/trainee/about
router.get('/about', function (req, res) {
  res.send('About birds')
})
