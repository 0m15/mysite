import { Controller } from 'react-spring'
import { TimingAnimation } from 'react-spring/dist/addons.cjs'

export default (initialValue = 0, interpolate = { range: [0, 1], output: [0, 1]}) => {
  let animation = new Controller(initialValue)
  let current = initialValue
  let prev = 0
  let speed = 0

  // animation
  //   .interpolate(interpolate)
  //   .interpolate(d => {
  //     return d
  //   })

  // animation.addListener(({ value }) => {
  //   current = value
  //   speed = current - prev
  //   prev = current
  // })

  const result = {}

  Object.defineProperties(result, {
    current: {
      get: function() {
        return current
      },
      enumerable: true,
    },
    speed: {
      get: function() {
        return speed
      },
      enumerable: true,
    },
    anim: {
      get: function() {
        return animation
      },
      enumerable: true,
    },
    to: {
      set: function(value) {
        let config = {}
        if (typeof value === 'number') {
          config = { to: value, tension: 70, friction: 30 }
        }

        if (typeof value === 'object') {
          config = value
        }
        animation.update(config)
      },
    },
  })

  return result
}
