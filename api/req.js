const express = require('express')
const router = express.Router()

module.exports = router

router.use('/trainee', require('./req-trainee'))
// router.use('/a', require('./req-a'))
// router.use('/b', require('./req-b'))
// router.use('/c', require('./req-c'))
router.get('/major', async (req, res) => {
  let data = await req.db('major')
    .orderBy('major_id')
    .select(['major_id', 'major_name'])
  res.send({
    status: true,
    data,
  })
})

router.post('/manpower', async (req, res) => {
  // TODO:
  try {
    let cols = [
      'businessId', 'majorId', 'level', 'male', 'female', 'common', 'orgDate',
      'reqDate', 'changeReq', 'reqStart', 'reqEnd', 'ageRange', 'specialCondition',
    ]
    let data = cols.reduce((p, x) => {
      p[x] = req.body[x]
      return p
    }, {})
    let id = await req.db('reqHumanPower').insert(data).then(ids => ids[0])
    if (!id) {
      throw new Error('insert error')
    }
    res.send({status: true})
  } catch (e) {
    res.send({statsu: false, error: e.message})
  }
})
