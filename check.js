const axios = require('axios')

axios.get('http://localhost:3000/user/token').then(res => {
  console.log(res.data)
})
