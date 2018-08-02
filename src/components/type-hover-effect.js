import React from 'react'
import PropTypes from 'prop-types'

class TypeHoverEffect extends React.Component {
  static propTypes = {

  }

  static defaultProps = {
    styleStack: [
      {fontFamily: 'Helvetica Neue', fontWeight: 100, fontStyle: 'normal' },
      {fontFamily: 'Helvetica Neue', fontWeight: 400, fontStyle: 'normal' },
      {fontFamily: 'Helvetica Neue', fontWeight: 900, fontStyle: 'italic' },
      {fontFamily: 'Helvetica Neue', fontWeight: 200, fontStyle: 'normal' },
      {fontFamily: 'Helvetica Neue', fontWeight: 900, fontStyle: 'normal' },
      {fontFamily: 'Helvetica Neue', fontWeight: 300, fontStyle: 'italic' },
      {fontFamily: 'Helvetica Neue', fontWeight: 900, fontStyle: 'normal' },
    ],
    fps: 2,
  }

  constructor(props) {
    super(props)
    this.state = {
      index: 0,
    }
    this.animate()
  }

  animate() {
    const fpsInterval = 1000 / this.props.fps
    let then = Date.now()
    const startTime = then

    const _animate = () => {
      if (typeof window !== `undefined`) {
        requestAnimationFrame(_animate)
      }
      const now = Date.now()
      const elapsed = now - then

      console.log('elapsed');
      if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval)
        this.transition()
      }
    }

    if (typeof window !== `undefined`) {
      requestAnimationFrame(_animate)
    }
  }

  transition() {
    this.setState(current => {
      if (current.index + 1 >= this.props.styleStack.length) {
        return {
          index: 0
        }
      }

      return {
        index: this.state.index + 1
      }
    })
  }

  render() {
    const { style, text, content, styleStack } = this.props
    const { index } = this.state

    return (
      <span>
        <span style={{
          ...style,
          ...styleStack[index],
          lineHeight: '0',
        }}>
          {content}
        </span>
      </span>
    )
  }
}

export default TypeHoverEffect
