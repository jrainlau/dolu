import base64ToBlob from './base64ToBlob'
import fileToBase64 from './fileToBase64'
import { isObject, isString, proxier, isFormData } from './utils'

const defaultConfig = {
  picker: null,
  autoSend: false,
  quantity: 4,
  uploader () {},
  getFiles () {},
  getDataUrls () {},
  getFormDatas () {}
}

export default class Dolu {
  constructor (config = {}) {
    this.config = Object.assign(defaultConfig, config)
    this.dataUrlArr = []
    this.formDataArr = []
    this._init()
  }

  _init () {
    if (this.config.picker) {
      return this._pickFile()
    }
  }

  _pickFile () {
    const picker = document.querySelector(this.config.picker)

    picker.addEventListener('change', () => {
      this._clearCache()
      if (!picker.files.length) {
        return
      }
      const files = [...picker.files]

      if (files.length > this.config.quantity) {
        throw new Error('Out of file quantity limit!')
      }

      this.config.getFiles(files)
      this._transformer(files)

      picker.value = null
    })
  }

  _transformer (files, manually = false) {
    const dataUrlArrProxy = proxier(this.dataUrlArr, (target, property, value) => {
      if (property === 'length') {
        if (target.length === files.length) {
          this.config.getDataUrls(this.dataUrlArr)
        }
      }
    })

    const formDataArrProxy = proxier(this.formDataArr, (target, property, value) => {
      if (property === 'length') {
        if (target.length === files.length) {
          this.config.getFormDatas(this.formDataArr)
        }
      }
    })

    files.forEach(async (file, index) => {
      if (isObject(file)) {
        if (!/\/(?:jpeg|png|gif)/i.test(file.type)) {
          return
        }

        const dataUrl = await fileToBase64(file)
        const formData = await base64ToBlob(dataUrl)

        dataUrlArrProxy.push(dataUrl)
        formDataArrProxy.push(formData)

        if (this.config.autoSend || manually) {
          this._uploader(formData, index)
        }
      }

      if (isString(file)) {
        const formData = await base64ToBlob(file)

        formDataArrProxy.push(formData)

        if (this.config.autoSend || manually) {
          this._uploader(formData, index)
        }
      }
    })

    return this
  }

  _uploader (formData, index) {
    this.config.uploader(formData, index)
    this._clearCache()
  }

  _clearCache () {
    this.dataUrlArr = []
    this.formDataArr = []
  }

  async getUrl (url, callback) {
    if (isString(url)) {
      const _formdata = await base64ToBlob(url)
      callback(_formdata)
    }
  }

  send (arr) {
    if (!isFormData(arr[0])) {
      this._transformer(arr, true)
      return
    }

    if (isFormData(arr[0])) {
      arr.forEach((data, index) => {
        this._uploader(data, index)
      })
      return
    }

    console.error('Type error.')
  }
}
