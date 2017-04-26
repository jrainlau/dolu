const express = require('express')
const multer = require('multer')
const cors = require('cors')
const bodyParser = require('body-parser')
const fs = require('fs')

const app = express()
app.use(express.static('./public'))
app.use(bodyParser({ limit: '50mb' }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.listen(process.env.PORT || 8001)
console.log('Node.js Ajax Upload File running at: http://0.0.0.0:8001')

app.post('/uploadBlob', (req, res) => {
  const store = multer.diskStorage({
    destination: './server/imgs_blob'
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
      res.end('Blob 接收成功')
    }
  })
})

app.post('/uploadBase64', (req, res) => {
  const imgData = req.body.imgData
  const base64Data = imgData.replace(/^data:image\/\w+;base64,/, '')
  const dataBuffer = Buffer.from(base64Data, 'base64')
  const fileName = Number(Math.random() * 100000).toFixed(0)
  fs.writeFile(`./server/imgs_base64/${fileName}.txt`, dataBuffer, (err) => {
    if (err) {
      res.end(err)
    } else {
      res.end('Base64 接收成功')
    }
  })
})
