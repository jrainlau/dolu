import Dolu from './index.js'
import axios from 'axios'

/* eslint no-new: "off" */
new Dolu({
  picker: '#picker',
  getDataUrls (arr) {
    axios({
      method: 'post',
      url: 'http://0.0.0.0:8001/uploadBase64',
      data: { imgData: arr[0] }
    })
  },
  getFormDatas (arr) {
    axios({
      method: 'post',
      url: 'http://0.0.0.0:8001/uploadBlob',
      data: arr[0]
    })
  }
})
