const express = require('express')
const router = express.Router()

module.exports = router
// /user/disactive
// /user/id/:id
// /user/
// /user/login
// /user/token

let tokenList = {}

router.get('/disactive', async (req, res) => {
  let db = req.db
  let data = await db('user as u')
    .leftJoin('eec_center as e', 'u.org_id', ' e.eec_center_id')
    .leftJoin('school as s', 'u.org_id', ' s.school_id')
    .leftJoin('business as b', 'u.org_id', ' b.business_id')
    .where({status: 'disactive'})
    .select([
      'u.user_id',
      'u.username',
      'u.fname',
      'u.lname',
      'u.status',
      db.raw('if(u.user_type_id=1,e.office_name,if(u.user_type_id=2,e.office_name,if(u.user_type_id=3,s.school_name,b.business_name))) as org_name'),
    ])
  res.send({data})
})


router.get('/:id', async (req, res) => {
  let db = req.db
  let data = await db('user as u')
    .leftJoin('eec_center as e', 'u.org_id', ' e.eec_center_id')
    .leftJoin('school as s', 'u.org_id', ' s.school_id')
    .leftJoin('business as b', 'u.org_id', ' b.business_id')
    .where({user_id: req.params.id})
    .select([
      'u.user_id',
      'u.username',
      'u.fname',
      'u.lname',
      'u.status',
      db.raw('if(u.user_type_id=1,e.office_name,if(u.user_type_id=2,e.office_name,if(u.user_type_id=3,s.school_name,b.business_name))) as org_name'),
    ])
  res.send({data})
})


router.get('/', async (req, res) => {
  let db = req.db
  let data = await db('user as u')
    .leftJoin('eec_center as e', 'u.org_id', ' e.eec_center_id')
    .leftJoin('school as s', 'u.org_id', ' s.school_id')
    .leftJoin('business as b', 'u.org_id', ' b.business_id')
    .select([
      'u.user_id',
      'u.username',
      'u.fname',
      'u.lname',
      'u.status',
      db.raw('if(u.user_type_id=1,e.office_name,if(u.user_type_id=2,e.office_name,if(u.user_type_id=3,s.school_name,b.business_name))) as org_name'),
    ])
  res.send({data})
})

router.post('/login', async (req, res) => {
  // check require
  if (!req.query.username || !req.query.password) {
    return res.send({
      message: 'กรุณาตรวจสอบชื่อผู้ใช้งานและรหัสผ่าน',
      status: 'fail',
    })
  }
  let tokenDate = tokenList[req.query.token]
  if (!tokenDate) {
    return res.send({})
  }
  if (new Date().getTime() - tokenDate.getTime() > 5 * 60 * 1000) {
    // expired token
    delete tokenList[req.query.token]
  }
  let db = req.db
  let row = await db('user').where({username: req.query.username, status: 'active'})
    .then(rows => rows.length && rows[0])

  let strHash = create_password_hash(req.query.password, PASSWORD_DEFAULT)
  
  if (!row || !verify_password_hash($row.password, strHash)) {
    return res.send({
      message: 'กรุณาตรวจสอบชื่อผู้ใช้งานและรหัสผ่าน2',
      status: 'fail',
    })
  }

  // TODO: $_SESSION['user'] = $result;
  res.send({
    'message':  'เข้าสู่ระบบสำเร็จ',
    'status': 'success',
  })
})
router.get('/token', (req, res) => {
  let token = md5('ECC' + Math.random())
  tokenList[token] = new Date()
  res.send({token})
})
