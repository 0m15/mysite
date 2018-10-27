export const mouseChange = function() {
  var x = 0
  var y = 0
  var prevX = 0
  var prevY = 0
  var dy = 0
  var dx = 0
  var evt = {}

  const onmousemove = evt => {
    x = evt.clientX
    y = evt.clientY

    if (prevY !== 0) {
      dy = Math.abs(y - prevY)
    }

    if (prevX !== 0) {
      dx = Math.abs(x - prevY)
    }

    evt = evt
    prevX = x
    prevY = y
  }

  if (typeof document !== 'undefined')
    document.addEventListener('mousemove', onmousemove, { passive: true })

  let result = {}

  Object.defineProperties(result, {
    x: {
      get: function() {
        return x
      },
      enumerable: true,
    },
    y: {
      get: function() {
        return y
      },
      enumerable: true,
    },
    dx: {
      get: function() {
        return dx
      },
      enumerable: true,
    },
    dy: {
      get: function() {
        return dy
      },
      enumerable: true,
    },
  })

  return result
}

export const mouseWheelChange = function() {
  var dx = 0
  var dy = 0
  var evt = {}

  const onwheel = evt => {
    dx = evt.deltaX
    dy = evt.deltaY
    evt = evt
  }

  if (typeof document !== 'undefined') {
    const MOUSE_WHEEL_EVT = /Firefox/i.test(navigator.userAgent)
      ? 'DOMMouseScroll'
      : 'mousewheel'
    document.addEventListener(MOUSE_WHEEL_EVT, onwheel, { passive: true })
  }

  let result = {}

  Object.defineProperties(result, {
    dx: {
      get: function() {
        return dx
      },
      enumerable: true,
    },
    dy: {
      get: function() {
        return dy
      },
      enumerable: true,
    },
  })

  return result
}
