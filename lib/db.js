var util = require('./util')
var knex = require('knex')({
  client: 'mysql',
  connection: {
    host : 'eec.chpt.ac.th',
    user : 'somsak',
    password : 'saknarak',
    database : 'eec_test'
  },
  debug: true,
  postProcessResponse(result) {
    if (Array.isArray(result)) {
      return result.map(row => util.snakeToCamel(row))
    } else {
      return snakeToCamel(result)
    }
  },
  wrapIdentifier(value) {
    if (value === '*') {
      return value
    }
    return '`' + util.camelToSnake(value) + '`'
  },
})

module.exports = knex
