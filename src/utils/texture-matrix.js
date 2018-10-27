import mat4 from 'gl-mat4'

export const getMatrix = ({
    image,
    width,
    height,
    mode = 'contain',
    offset,
    scale,
    pan = 0,
    panSpeed = 0.1,
  }) => {
    const canvasAspect = width / height
    const imageAspect = image.width / image.height
  
    let scaleY
    let scaleX
  
    switch (mode) {
      case 'fitV':
        scaleY = 1
        scaleX = imageAspect / canvasAspect
        break
      case 'fitH':
        scaleX = 1
        scaleY = canvasAspect / imageAspect
        break
      case 'contain':
        scaleY = 1
        scaleX = imageAspect / canvasAspect
        if (scaleX > 1) {
          scaleY = 1 / scaleX
          scaleX = 1
        }
        break
      case 'cover':
        scaleY = 1
        scaleX = imageAspect / canvasAspect
        if (scaleX < 1) {
          scaleY = 1 / scaleX
          scaleX = 1
        }
        break
    }
  
    const m = mat4.create()
    mat4.translate(m, m, [offset[0] - (pan * panSpeed), offset[1], 0])
    mat4.scale(m, m, [scaleX * scale, -scaleY * scale, 1])
    return m
  }