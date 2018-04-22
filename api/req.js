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
    let id = await req.db('req_human_power').insert({
      business_id: req.body.businessId,
      major_id: req.body.majorId,
      level: req.body.level,
      male: req.body.male,
      female: req.body.female,
      common: req.body.common,
      org_date: req.body.orgDate,
      req_date: req.body.reqDate,
      change_req: req.body.changeReq,
      req_start: req.body.reqStart,
      req_end: req.body.reqEnd,
      age_range: req.body.ageRange,
      special_condition: req.body.specialCondition,
    }).then(ids => ids[0])
    if (!id) {
      throw new Error('insert error')
    }
    res.send({status: true})
  } catch (e) {
    res.send({statsu: false, error: e.message})
  }
})
