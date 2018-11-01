import { TimelineLite, TweenLite, TweenMax,
  Power3, Elastic } from 'gsap'

const MAX_DISPLACEMENT = 6
const timeline = new TimelineLite({ paused: true })

const SLIDE_DEFAULT_STATE = {
  scale: 0.35,
  alpha: 0,
  offsetY: 0,
}

const SLIDER_INITIAL_STATE = {
  mouseX: 0, mouseY: 0, x: 0, displace: 0, displaceY: 0, props: [SLIDE_DEFAULT_STATE],
}

const HOMEPAGE_DEFAULT_STATE = {
  
}

const __state = {
  slider: SLIDER_INITIAL_STATE,
  homepage: {},
}

export function setMeshProps(images) {
  __state.slider.props = images.map((d, i) => ({...SLIDE_DEFAULT_STATE}))
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
  TweenMax.to(__state.slider, 0.5, {
    x: toIndex,
    ease: Power3.easeOut,
  })
  tweenDisplace(fromIndex, toIndex, 1, 'displace')
}

export function drag({ toIndex, speed }) {
  TweenMax.to(__state.slider, 0.5, {
    x: toIndex,
    ease: Power3.easeOut,
  })
  TweenMax.to(__state.slider.props.filter((p, i) => i === Math.floor(toIndex)), 0.25, {
    scale: 0.3,
  })
  // TweenMax.to(__state.slider, 0.5, {
  //   displaceY: speed * 0.2,
  // })
}

export function dragDecay(snap) {
  TweenMax.to(__state.slider, 1.0, {
    x: snap,
    ease: Power3.easeOut,
  })
  TweenMax.to(__state.slider.props, 0.25, {
    scale: 0.35,
  })
  // TweenMax.to(__state.slider, 0.25, {
  //   displaceY: 0,
  // })
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
    delay: 0.2,
  })
  tweenDisplace(1, 0, 2, 'displaceY')
}

export function fadeInSlides() {
  TweenMax.staggerTo(__state.slider.props, 1.0, {
    scale: 0.35,
    alpha: 1,
    delay: 1.0,
  }, 0.2)
  tweenDisplace(1, 0, 2, 'displaceY')
}


// export as immutable object
export const state = Object.freeze(__state)
