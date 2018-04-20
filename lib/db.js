
var knex = require('knex')({
  client: 'mysql',
  connection: {
    host : 'eec.chpt.ac.th',
    user : 'somsak',
    password : 'saknarak',
    database : 'eec_test'
  },
  debug: true,
})
console.log('*****db****')

module.exports = knex
