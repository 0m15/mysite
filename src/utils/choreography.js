import { TimelineLite, TweenLite, TweenMax,
  Power3, Back } from 'gsap'

const MAX_DISPLACEMENT = 12
const timeline = new TimelineLite({ paused: true })


export const state = {
  slider: { x: 0, displace: 0, displaceY: 0, props: [] },
  project: {},
}

export function setMeshProps(props) {
  state.slider.props = props
}

function tweenDisplace(fromIndex, toIndex, duration = 1, prop = 'displace') {
  TweenMax.killTweensOf(state.slider[prop])
  const values = [
    { [prop]: 0 },
    { [prop]: toIndex > fromIndex ? MAX_DISPLACEMENT : -MAX_DISPLACEMENT },
    { [prop]: 0 },
  ]
  TweenMax.to(state.slider, duration, {
    bezier: { values, type: "soft", timeResolution: 0 },
    ease: Back.easeOut,
  })
}

export function slideTo({ fromIndex, toIndex }) {
  TweenMax.killTweensOf(state.slider)
  TweenMax.to(state.slider, 1.0, {
    x: toIndex,
    ease: Power3.easeInOut,
  })
  tweenDisplace(fromIndex, toIndex)
}

export function openProject({ index }) {
  console.log('state', state.slider.props)
  TweenMax.to(state.slider.props.filter((p, i) => i !== index), 1.0, {
    scale: 0,
    alpha: 0,
  })
  TweenMax.to(state.slider.props[index], 0.5, {
    scale: 1.1,
    alpha: .5,
  })
  TweenMax.to(state.slider, 0.5, {
    x: index,
  })
  tweenDisplace(0, 1)
}

export function closeProject() {
  TweenLite.to(state.slider.props, 1.0, {
    scale: 0.35,
    alpha: 1,
  }).play()
  tweenDisplace(1, 0)
}
