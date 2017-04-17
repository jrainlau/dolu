# Dolu
A tool for photo uploding in formdata.

## 1. Download
```
yarn add dolu
```

## 2. Usage
Both `es6` and `AMD` are supported by `Dolu`：
```
# es6
import Dolu from 'dolu'

# AMD
const Dolu = require('Dolu')
```
After importing/requiring, create an instance：
```
const dolu = new Dolu(config)
```

## 3. Configuration
| params | type | description | default | required |
| --- | --- | --- | --- | --- |
| picker | String | selector of your `<input>` picker | `null` | no |
| autoSend | Boolean | upload after file picking immediately | `false` | no |
| quantity | Number | the quantity of photoes | `4` | no |
| uploader | Function | defined your upload function, `dolu.send()` | `() => {}` | no |
| getDataUrls | Function | receive a `base64` array transform from your photoes | `() => {}` | no |
| getFormDatas | Function | receive a `formdata` array transform from your photoes  | `() => {}` | no |

> uploader: receive two params: `data` and `index`. Param `data` is type of `formdata`, and param `index` is the number of a photo.

## 4. Methods
`Dolu` has an instance method call `send()`. This method receive an array in type of `base64 string` or `formdata`, and upload it one by one after triggering it.
```
dolulu.send(yourArray)
```

## 5. Examples
1. Using `<input>` tag:
```
import Dolu from './dolu'
import axios from 'axios'

const dolu = new Dolu({
  // define the `<input>` tag
  picker: '#picker',

  // define an upload function by using `axios`
  uploader(data, index) {
    axios({
      method: 'post',
      url: '/upload',
      data: data,
      onUploadProgress: (e) => {
        const percent = Math.round( (e.loaded * 100) / e.total )
        console.log(percent, index)
      }
    }).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
  },

  // receive an array in type of `base64`
  getDataUrls(arr) {
    console.log(arr)
  },

  // upload manually
  getFormDatas(arr) {
    dolu.send(arr)
  }
})
```

2. Upload `base64` array
```
import Dolu from './dolu'
import axios from 'axios'

const dolu = new Dolu({
  uploader(data, index) {
    axios({
      method: 'post',
      url: '/upload',
      data: data,
      onUploadProgress: (e) => {
        const percent = Math.round( (e.loaded * 100) / e.total )
        console.log(percent, index)
      }
    }).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
  }
})

const base64Arr = [ ... ] // a `base64` array

dolu.send(base64Arr)
```

# 6. Development
```
git clone https://github.com/jrainlau/dolu.git

cd dolu && yarn add

# open a server for uploading test
yarn run server

# run dev
yarn run dev
```

> Note: `Dolu` is under `eslint-standard` rule, everyone should observe it, nor won't allow to be run or build.

