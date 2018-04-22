const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.use((req, res, next) => {
  var header = { 'Access-Control-Allow-Origin': '*' }
  for (var i in req.headers) {
    if (i.toLowerCase().substr(0, 15) === 'access-control-') {
      header[i.replace(/-request-/g, '-allow-')] = req.headers[i]
    }
  }
  res.header(header)
  next()
})

app.use((req, res, next) => {
  req.db = require('./lib/db')
  next()
})

app.use('/student', require('./api/student'))
// app.use('/business', require('./api/business'))
// app.use('/user', require('./api/user'))
app.use('/req', require('./api/req'))
app.use('/user', require('./api/user'))
app.listen(9000, () => console.log('Example app listening on port 9000!'))
