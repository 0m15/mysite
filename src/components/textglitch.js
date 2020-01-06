import React from 'react'

const SYMBOLS = '@!$&%_>=-+06ͶΔБCRPTQПPXY'.split('')
const vowels = ''

export class S extends React.Component {
  constructor(props) {
    super(props)
    const initial = vowels.indexOf(props.s.toLowerCase()) > -1 ? '' : props.s
    this.state = {
      s: initial,
      initial,
    }
  }

  animating = false

  componentWillReceiveProps(nextProps) {
    if (nextProps.animate && !this.props.animate) {
      this.start()
    }

    if (!nextProps.animate && this.props.animate) {
      this.stop()
    }
  }

  start = () => {
    this.startTime = Date.now()
    this.animating = true
    this.loop()
  }

  loop = () => {
    const { speed, duration } = this.props
    requestAnimationFrame(() => {
      if (!this.animating) return
      const t = Date.now() - this.startTime
      if (t % speed == 0) this.animate()
      if (t >= duration) return this.end()
      this.loop()
    })
  }

  stop() {
    this.animating = false
    this.setState({
      s: this.state.initial,
    })
  }

  end() {
    this.animating = false
    this.setState({
      s: this.props.s,
    })
  }

  animate() {
    const index = Math.floor(Math.random() * SYMBOLS.length - 1)
    this.setState({
      s: SYMBOLS[index],
    })
  }

  render() {
    const { val = '', speed = 2 } = this.props
    const { s } = this.state
    return <span>{s}</span>
  }
}

export default class TextGlitch extends React.Component {
  state = {
    animate: false,
  }
  componentDidMount() {
    if (this.props.animateOnMount) {
      this.setState({
        animate: true,
      })
    }

    if (this.props.auto) {
      this.autoAnimate()
    }
  }

  autoAnimate = () => {
    this.setState({
      animate: true,
    })

    setTimeout(() => {
      this.setState({
        animate: false,
      })
      this.autoAnimate()
    }, 0.5 + Math.random() *5000)
  }

  onMouseEnter = () => {
    if (this.props.animateOnMount) return
    this.setState({
      animate: true,
    })
  }
  onMouseLeave = () => {
    if (this.props.animateOnMount) return
    this.setState({
      animate: false,
    })
  }
  render() {
    const { val } = this.props
    return (
      <div
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        className={this.props.className}
      >
        {val.split('').map((s, i) => (
          <S
            key={s + i}
            s={s}
            speed={i + 100}
            duration={(i + 1) * 40 + Math.random() * 100}
            animate={this.state.animate}
          />
        ))}
      </div>
    )
  }
}
