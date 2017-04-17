const express = require('express')
const multer = require('multer')
const cors = require('cors')

const app = express()
app.use(express.static('./public'))
app.use(cors())

app.listen(process.env.PORT || 8888)
console.log('Node.js Ajax Upload File running at: http://0.0.0.0:8888')

app.post('/upload', (req, res) => {
  const store = multer.diskStorage({
    destination: './server/imgs'
  })
  const upload = multer({
    storage: store
  }).any()

  upload(req, res, function (err) {
    if (err) {
      console.log(err)
      return res.end('Error')
    } else {
      console.log(req.body)
      req.files.forEach(function (item) {
        console.log(item)
      })
      res.end('File uploaded')
    }
  })
})
