import React from 'react'
import PropTypes from 'prop-types'
import { Spring } from 'react-spring'
import Animated from 'animated/lib/targets/react-dom'

const SIZE = 24
const INNER_SIZE = 10

class Cursor extends React.Component {
  static propTypes = {

  }

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {
      x: new Animated.Value(0),
      y: new Animated.Value(0)
    }
  }
  componentDidMount() {
    window.addEventListener('mousemove', this.mousemove)
  }

  mousemove = (evt) => {
    this.node.style.transform = `translate(${evt.clientX - SIZE / 2}px, ${evt.clientY - SIZE / 2}px)`
    Animated.spring(this.state.x, { toValue: evt.clientX - INNER_SIZE / 2 }).start()
    Animated.spring(this.state.y, { toValue: evt.clientY - INNER_SIZE / 2 }).start()
  }

  render() {
    const {
      x, y
    } = this.state
    console.log('x', x)
    return (
      <div style={{ position: 'absolute', zIndex: 9999 }}>
        <div
          ref={el => this.node = el}
          style={{
            position: 'absolute',
            width: SIZE,
            height: SIZE,
            borderRadius: SIZE / 2,
            border: '4px solid #000',
            pointerEvents: 'none',
            mixBlendMode: 'difference',
            zIndex: 9999,
            // transform: `translate3d(${this.x}px, ${this.y}px, 0)`,
          }}
        />
        <Animated.div
          style={{
            position: 'absolute',
            width: INNER_SIZE,
            height: INNER_SIZE,
            borderRadius: INNER_SIZE / 2,
            background: '#000',
            // border: '4px solid #000',
            zIndex: 9999,
            pointerEvents: 'none',
            transform: [
              { translateX: x, },
              { translateY: y, }
            ],
            mixBlendMode: 'difference',
            // left: x,
            // top: y,
          }}
        />
      </div>
    )
  }
}

export default Cursor
