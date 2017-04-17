const compress = (img) => {
  //    用于压缩图片的canvas
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext('2d');
  //    瓦片canvas
  const tCanvas = document.createElement("canvas");
  const tctx = tCanvas.getContext("2d");

  const initSize = img.src.length

  let width = 200
  let height = 200

  console.log(width, height)

  // 如果图片大于四百万像素，计算压缩比并将大小压至400万以下
  let ratio = width * height / 4000000
  if (ratio > 1) {
    ratio = Math.sqrt(ratio)
    width /= ratio
    height /= ratio
  }else {
    ratio = 1
  }

  canvas.width = width
  canvas.height = height

  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // 如果图片像素大于100万则使用瓦片绘制
  let count = width * height / 1000000
  if (count > 1) {
    count = ~~(Math.sqrt(count) + 1)
    // 瓦片宽高
    const nw = ~~(width / count)
    const nh = ~~(height / count)

    tCanvas.width = nw
    tCanvas.height = nh

    for (var i = 0; i < count; i++) {
      for (var j = 0; j < count; j++) {
        tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh)

        ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh)
      }
    }
  } else {
    ctx.drawImage(img, 0, 0, width, height)
  }

  //进行最小压缩
  const ndata = canvas.toDataURL('image/jpeg', 0.1);

  console.log('压缩前：' + initSize)
  console.log('压缩后：' + ndata.length)
  console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%")

  tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0

  return ndata
}

export default compress
