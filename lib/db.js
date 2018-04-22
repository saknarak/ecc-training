
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
      return result.map(row => snakeToCamel(row))
    } else {
      return snakeToCamel(result)
    }
  },
  wrapIdentifier(value) {
    if (value === '*') {
      return value
    }
    return '`' + camelToSnake(value) + '`'
  },
})
console.log('*****db****')

module.exports = knex

function snakeToCamel(s) {
  let newObj = {}
  Object.keys(s).forEach(k => {
    newObj[k.toLowerCase().replace(/(\w)(_\w)/g, m => m[0] + m[2].toUpperCase())] = s[k]
  })
  return newObj
}

function camelToSnake(s) {
  return s.replace(/[A-Z]/g, m => '_' + m[0])
}
