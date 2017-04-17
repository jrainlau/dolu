const fileToBase64 = (file) => {
  const reader = new FileReader()

  reader.readAsDataURL(file)

  return new Promise((resolve) => {
    reader.addEventListener('load', () => {
      const result = reader.result
      resolve(result)
    })
  })
}

export default fileToBase64
