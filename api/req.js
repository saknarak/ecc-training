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
