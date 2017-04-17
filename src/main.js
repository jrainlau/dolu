import Dolu from '../dist/index.js'
import axios from 'axios'

const dolu = new Dolu({
  picker: '#picker',
  uploader (data, index) {
    axios({
      method: 'post',
      url: '/upload',
      data: data,
      onUploadProgress: (e) => {
        const percent = Math.round((e.loaded * 100) / e.total)
        console.log(percent, index)
      }
    }).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
  },
  getDataUrls (arr) {
    const pics = document.querySelector('.pics')
    arr.forEach((dataUrl) => {
      let img = new Image()
      img.src = dataUrl
      pics.appendChild(img)
      img = null
    })
  },
  getFormDatas (arr) {
    dolu.send(arr)
  }
})
