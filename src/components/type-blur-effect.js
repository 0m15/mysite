import React from 'react'
import PropTypes from 'prop-types'
import { Spring } from 'react-spring'
import Animated from 'animated/lib/targets/react-dom'

const SIZE = 24
const INNER_SIZE = 10

class Cursor extends React.Component {
  static propTypes = {

  }

  static defaultProps = {
    delay: 100,
  }

  constructor(props) {
    super(props)
    this.letters = []
    this.state = {
      x: new Animated.Value(0),
      y: new Animated.Value(0),
      anims: props.text.split('').map(v => new Animated.Value(0)),
      text: props.text.split(''),
    }
  }
  componentDidMount() {
    window.addEventListener('mousemove', this.mousemove)
    // Animated.stagger(
    //   this.props.delay,
    //   this.state.anims.map(anim => Animated.spring(anim, {
    //     toValue: 1,
    //     // tension: 10,
    //     // friction: 1,
    //     speed: 1,
    //     bounciness: 10,
    //   }))
    // ).start()
    // this.interpolate = this.state.x.interpolate({
    //   inputRange: [0, window.innerWidth],
    //   outputRange: ['0', '20'],
    // })
    this.letters.forEach((letter, i) => {
      // Animated.spring(anim, {
      //   toValue: 1,
      //   speed: 250,
      // }).start()
      const delay = Math.random() * 500 - 250
      this.animateLetter(letter, i, delay)
    })
  }

  animateLetter = (letter, i, delay) => {
    if (!letter) return
    const time = new Date().getTime() * 0.0008 // + (Math.random() * 0.1)
    const blur = Math.sin(time - delay) * 4 + 4
    // letter.style.opacity = Math.sin(time - delay) * 1 + 1.5
    letter.style.filter = `blur(${blur}px)`
    requestAnimationFrame(() => {
      this.animateLetter(letter, i, delay)
    })
  }

  mousemove = (evt) => {
    Animated.spring(this.state.x, { toValue: evt.clientX - INNER_SIZE / 2 }).start()
    Animated.spring(this.state.y, { toValue: evt.clientY - INNER_SIZE / 2 }).start()
  }

  render() {
    const {
      x, y
    } = this.state
    return (
      <React.Fragment>
        {
          this.state.text.map((text, i) => {
            return (
              <span
                ref={el =>
                  this.letters[i] = el
                }
                key={i}
                style={{
                  willChange: 'filter',
                  ...this.props.style,
                  // opacity: anim.interpolate({
                  //   inputRange: [0, 10],
                  //   outputRange: [0, 1],
                  // }),
                  // filter: anim.interpolate({
                  //   inputRange: [0, 1],
                  //   outputRange: ['blur(50px)', 'blur(0px)'],
                  // }),
                }}
              >
                {text}
              </span>
            )
          })
        }
      </React.Fragment>
    )
  }
}

export default Cursor
