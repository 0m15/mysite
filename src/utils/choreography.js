import { TimelineLite, TweenLite, TweenMax,
  Power3, Elastic } from 'gsap'

const MAX_DISPLACEMENT = 6
const timeline = new TimelineLite({ paused: true })

const DEFAULT_PROPS = {
  scale: 0.35,
  alpha: 1,
  offsetY: 0,
}

const INITIAL_STATE = {
  mouseX: 0, mouseY: 0, x: 0, displace: 0, displaceY: 0, props: [DEFAULT_PROPS],
}

const __state = {
  slider: INITIAL_STATE,
  project: {},
}

export function setMeshProps(images) {
  __state.slider.props = images.map((d, i) => ({
    scale: 0.35,
    alpha: 1,
    offsetY: 0,
  }))
}

function tweenDisplace(fromIndex, toIndex, duration = 1, prop) {
  TweenMax.killTweensOf(__state.slider[prop])
  const values = [
    { [prop]: 0 },
    { [prop]: toIndex > fromIndex ? MAX_DISPLACEMENT : MAX_DISPLACEMENT * 0.5 },
    { [prop]: 0 },
  ]
  TweenMax.to(__state.slider, duration, {
    bezier: { values, type: 'soft', timeResolution: 0 },
    ease: Elastic.easeOut,
  })
}

export function slideTo({ fromIndex, toIndex }) {
  TweenMax.killTweensOf(__state.slider)
  TweenMax.to(__state.slider, 1.0, {
    x: toIndex,
    ease: Power3.easeInOut,
  })
  tweenDisplace(fromIndex, toIndex, 1, 'displace')
}

export function openProject({ index }) {
  TweenMax.to(__state.slider.props.filter((p, i) => i !== index), 1.0, {
    scale: 0,
    alpha: 0,
  })
  TweenMax.to(__state.slider.props[index], 0.5, {
    scale: 1.1,
    alpha: .35,
  })
  TweenMax.to(__state.slider, 0.5, {
    x: index,
  })
  tweenDisplace(0, 1, 2, 'displaceY')
}

export function closeProject() {
  TweenLite.to(__state.slider.props, 0.5, {
    scale: 0.35,
    alpha: 1,
    delay: 0.25,
  }).play()
  tweenDisplace(1, 0, 2, 'displaceY')
}


// export as immutable object
export const state = Object.freeze(__state)
