const base64ToBlob = (base64) => {
  const byteString = atob(base64.split(',')[1])
  const mimeString = base64.split(',')[0].split(':')[1].split(';')[0]
  const ab = new ArrayBuffer(byteString.length)
  const ia = new Uint8Array(ab)
  for (let i = 0, len = byteString.length; i < len; i += 1) {
    ia[i] = byteString.charCodeAt(i)
  }

  let Builder = window.WebKitBlobBuilder || window.MozBlobBuilder
  let blobUrl

  if (Builder) {
    const builder = new Builder()
    builder.append(ab)
    blobUrl = builder.getBlob(mimeString)
  } else {
    blobUrl = new window.Blob([ab], { type: mimeString })
  }

  const fd = new FormData()
  fd.append('file', blobUrl)

  return fd
}

export default base64ToBlob
