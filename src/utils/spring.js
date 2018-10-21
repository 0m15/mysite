import { controller, AnimatedValue } from 'react-spring'
import { TimingAnimation } from 'react-spring/dist/addons.cjs'

export default (initialValue = 0) => {
  let animation = new AnimatedValue(initialValue)
  let current = 0

  animation.addListener(({ value }) => {
    current = value
  })

  const result = {}

  Object.defineProperties(result, {
    current: {
      get: function() {
        return current
      },
      enumerable: true,
    },
    to: {
        set: function(value) {
            let config = {}
            if (typeof value === 'number') {
                config = { to: value, tension: 70, friction: 60 }
            }

            if (typeof value === 'object') {
                config = value
            }
            return controller(animation, config).start()
        },
    }
  })
  
  return result
}
