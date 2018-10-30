import React, { Component } from 'react'
import { TweenLite, TweenMax, Bounce, Elastic, Power2 } from 'gsap/all'
import { scaleLinear } from 'd3-scale'
import CustomEase from '../utils/CustomEase'
import {
  AnimatedValue,
  animated,
  Spring,
  controller as spring,
} from 'react-spring'

const defaultSpring = {
  friction: 10,
  tension: 2,
}

CustomEase.create(
  'CustomElastic',
  "M0,0,C0.09,-0.1,0.05,1,1,1"
  // "M0,-0.01,C0,0.1,1,1,1,1"
)
const ScrollerContext = React.createContext('xx')

class LayerConsumer extends Component {
  constructor(props) {
    super(props)
    this.scrollY = 0
    this.scroll = null
    //nthis.scroll = new AnimatedValue(this.scrollY)
    this.opacity = new AnimatedValue(
      this.props.fade && !this.props.reverse ? 0 : 1
    )
    this.overflow = false
    // this.scroll.addListener(this.onScroll)

    if (typeof document !== 'undefined') {
      window.addEventListener('mousewheel', this.mousewheel)
      window.addEventListener('mousemove', this.mousemove, { passive: true })
      window.addEventListener('touchstart', this.touchstart, {
        passive: true,
      })
    }
  }

  componentWillUnmount() {
    window.removeEventListener('mousewheel', this.mousewheel)
    window.removeEventListener('mousemove', this.mousemove)
  }

  componentDidMount() {
    this.rect = this.node.getBoundingClientRect()
    this.s = Date.now()
    this.animate()
  }

  scrollTo = scrollY => {
    const { speed, scroller, top } = this.props
    let maxScroll = scroller.getHeight() - window.innerHeight
    const d = speed / scroller.props.maxSpeed
    // let topBoundary = 0
    let bottomBoundary = 0

    // if (top !== undefined) {
    //   topBoundary = this.rect.top - top
    //   bottomBoundary = 0
    //   console.log('normalSpeedY', scrollY)
    // }

    // clamp to boundaries
    this.scrollY = Math.min(
      Math.max(bottomBoundary - 20, scrollY),
      maxScroll * d
    )
  }

  animate = () => {
    requestAnimationFrame(() => {
      TweenLite.to(this.node, this.props.delay ? 0.75 : 1, {
        ease: this.props.delay ? 'CustomElastic' : Power2.easeOut,
        y: -this.scrollY,
      }).play()
      
      if (this.props.fade) {
        const ratio = Math.min(
          1,
          Math.max(
            0,
            Math.abs(
              this.scrollY / (this.rect.top + (this.props.fadeOffset || 0))
            )
          )
        )
        const opacity = this.props.reverse ? 1 - ratio : ratio
        // TweenLite.to(this.node, 1, {
        //     opacity,
        //   },
        // ).play()
        this.node.style.opacity = opacity
      }
      
      // TweenLite.to(this.node, this.props.delay ? 0.75 : 1, {
      //   ease: this.props.delay ? 'CustomElastic' : Power2.easeOut,
      //   y: -this.scrollY,
      //   opacity,
      // }).play()
    })
  }

  touchstart = evt => {
    evt.preventDefault()
    let currentScroll = 0
    let moveListener
    let upListener

    this.scroll.stopAnimation(startValue => {
      const event = evt.touches[0]
      const startPosition = event.clientY
      let lastTime = Date.now()
      let lastPosition = event.clientY
      let velocity = 0

      // config.onStart && config.onStart()

      const updateVelocity = event => {
        const now = Date.now()
        if (event.clientY === lastPosition || now === lastTime) {
          return
        }
        velocity = (event.clientY - lastPosition) / (now - lastTime)
        lastTime = now
        lastPosition = event.clientY
      }

      window.addEventListener(
        'touchmove',
        (moveListener = evt => {
          const event = evt.touches[0]
          currentScroll =
            startValue + (event.clientY - startPosition) * this.props.speed * 4
          updateVelocity(event)
          this.scrollTo(currentScroll)
          // spring(this.scroll, {
          //   to: this.scrollY,
          //   ...defaultSpring,
          // }).start()
        })
      )

      window.addEventListener(
        'touchend',
        (upListener = evt => {
          const event = evt.changedTouches[0]
          updateVelocity(event)
          window.removeEventListener('touchmove', moveListener)
          window.removeEventListener('touchend', upListener)
          spring
            .decay(this.scroll, {
              velocity,
              deceleration: 1.1,
            })
            .start()
          this.onScrollEnd(currentScroll)
        })
      )
    })
  }

  onScrollEnd = value => {
    const { speed, scroller } = this.props
    const d = speed / scroller.props.maxSpeed
    const maxScroll = this.props.scroller.getHeight() - window.innerHeight
    if (value < -100) {
      this.scroll.stopAnimation(value => {
        this.overflow = true
        this.scroll.removeAllListeners()
        spring(this.scroll, {
          to: 10,
          ...defaultSpring,
        }).start()
      })
    }
    if (value > maxScroll * d + 100) {
      this.overflow = true
      this.scroll.stopAnimation(value => {
        this.scroll.removeAllListeners()
        spring(this.scroll, {
          to: maxScroll * d,
          ...defaultSpring,
        }).start()
      })
    }
  }

  mousemove = evt => {}

  mousewheel = evt => {
    evt.preventDefault()
    const delta = evt.deltaY
    this.scrollTo(this.scrollY + delta * this.props.speed)
    this.animate()
  }

  render() {
    const { animateProps, scroller } = this.props
    const { scroll, offset = 0 } = this

    let animatedProps = {}

    if (typeof animateProps === 'function') {
      animatedProps = animateProps({
        scroll,
      })
    }

    let child = this.props.children

    if (typeof this.props.children === 'function') {
      child = this.props.children({
        scroll,
      })
    }

    const yOffset = offset * scroller.getHeight()

    return (
      // <animated.div
      //   style={{
      //     willChange: this.props.fade ? 'transform, opacity' : 'transform',
      //     opacity: this.opacity,
      //     transform: this.scroll.interpolate(
      //       d => `translate3d(0, ${-d.toFixed(1) - yOffset}px, 0)`
      //     ),
      //     ...animatedProps,
      //   }}
      // >
      //   {React.cloneElement(React.Children.only(child), {
      //     ref: el => (this.node = el),
      //   })}
      // </animated.div>

      React.cloneElement(React.Children.only(child), {
        ref: el => (this.node = el),
      })
    )
  }
}

export class Layer extends Component {
  render() {
    return (
      <ScrollerContext.Consumer>
        {({ scroller }) => {
          return <LayerConsumer {...this.props} scroller={scroller} />
        }}
      </ScrollerContext.Consumer>
    )
  }
}

class Scroller extends Component {
  layers = []
  _height = 0
  currentScroll = 0

  componentDidMount = () => {
    this._height = this._node.getBoundingClientRect().height
    window.addEventListener('mousewheel', this.mousewheel)
  }

  mousewheel = evt => {
    evt.preventDefault()
    this.currentScroll += evt.deltaY * this.props.maxSpeed
    this.scroll()
  }

  scroll = () => {
    requestAnimationFrame(() => {
      // TweenLite.to(window, 1, {
      //   // ease: 'CustomElastic',
      //   scrollTo: {
      //     y: this.currentScroll,
      //     autoKill: true,
      //   },
      //   overwrite: 5,
      // }).play()
    })
  }

  getRef = el => {
    if (!el) return
    this._node = el
  }

  getHeight() {
    return this._height
  }

  render() {
    return (
      <>
        <div ref={this.getRef}>
          <ScrollerContext.Provider value={{ scroller: this }}>
            {this.props.children}
          </ScrollerContext.Provider>
        </div>
      </>
    )
  }
}

export default Scroller
