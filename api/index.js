const express = require('express')
const router = express.Router()

module.exports = router

router.use('/auth', require('./auth'))
router.use('/user', checkSession, require('./user'))
router.use('/student', checkSession, require('./student'))
// router.use('/business', require('./business'))
// router.use('/user', require('./user'))
router.use('/req', checkSession, require('./req'))

function checkSession(req, res, next) {
  // check session
  let ok = req.session.data && req.session.data.id
  if (!ok) {
    return res.send({status: false, session: null})
  }
  next()
}
