import React from 'react'
import PropTypes from 'prop-types'

const SIZE = 24

class Cursor extends React.Component {
  static propTypes = {

  }

  static defaultProps = {}

  componentDidMount() {
    window.addEventListener('mousemove', this.mousemove)
  }

  mousemove = (evt) => {
    console.log('evnt', evt)
    this.node.style.transform = `translate(${evt.clientX - SIZE / 2}px, ${evt.clientY - SIZE / 2}px)`
    console.log('this.node', this.node.style);
  }

  render() {
    const { } = this.props
    return (
      <div
        style={{
          position: 'absolute',
          width: SIZE,
          height: SIZE,
          borderRadius: SIZE / 2,
          border: '4px solid #000',
          zIndex: 9999,
          pointerEvents: 'none',
        }}
        ref={el => this.node = el}
      />
    )
  }
}

export default Cursor
