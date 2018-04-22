const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const MongoDBStore = require('connect-mongodb-session')(session)


const store = new MongoDBStore({
  uri: process.env.MONGODB || 'mongodb://localhost:27017/eec-session',
  collection: 'sessions'
})

const app = express()
app.use(bodyParser.json())

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'eec!secret',
  store,
  cookie: {
    maxAge: 15 * 60 * 1000, // 15min
    // secure: true,
  },
  rolling: true,
  resave: true,
  saveUninitialized: true,
}))

app.use((req, res, next) => {
  console.log('session=', req.session.data)
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

app.use('/api', require('./api'))

app.listen(9000, () => console.log('Example app listening on port 9000!'))
