import { TimelineLite, TweenLite, TweenMax,
  Power3, Elastic, Back, Cubic, Quad, Quart } from 'gsap'

const MAX_DISPLACEMENT = 8
const DEFAULT_SCALE = 0.25
const SLIDING_SCALE = 0.21
const ZOOM_SCALE = 1.1

const SLIDE_DEFAULT_STATE = {
  scale: DEFAULT_SCALE,
  alpha: 0,
  offsetY: 0,
  displace: 0,
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

function tweenDisplace(fromIndex, toIndex, duration = 3, prop) {
  TweenMax.killTweensOf(__state.slider[prop])
  const values = [
    { [prop]: 0 },
    { [prop]: toIndex > fromIndex ? MAX_DISPLACEMENT : MAX_DISPLACEMENT * 0.5 },
    { [prop]: 0 },
  ]
  TweenMax.to(__state.slider, duration, {
    bezier: { values, type: 'quadratic' },
    ease: toIndex > fromIndex ? Back.easeOut : Back.easeOut,
    delay: toIndex > fromIndex ? 0 : 0,
  })
}

function displaceSlide({ slideIndex, dir = 1 }) {
  const values = [
    { displace: 0 },
    { displace: dir ? -MAX_DISPLACEMENT : -MAX_DISPLACEMENT * 0.5 },
    { displace: 0 },
  ]
  TweenMax.to(__state.slider.props[slideIndex], 1, {
    bezier: { values, type: 'thru', curviness: 2, },
    //ease: Elastic.easeOut,
    delay: dir ? 0 : 0.0,
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
  TweenMax.to(__state.slider.props, 0.25, {
    scale: SLIDING_SCALE,
  })
}

export function dragDecay(snap) {
  TweenMax.to(__state.slider, 1.0, {
    x: snap,
    ease: Power3.easeOut,
  })
  TweenMax.to(__state.slider.props, 0.25, {
    scale: DEFAULT_SCALE,
  })
}

export function openProject({ index, delay = 0.25, }) {
  TweenMax.to(__state.slider.props.filter((p, i) => i !== index), 1.0, {
    scale: 0,
    alpha: 0,
  })
  TweenMax.to(__state.slider.props[index], 0.25, {
    scale: ZOOM_SCALE,
    alpha: .35,
    delay,
    ease: Power3.easeInOut,
  })
  TweenMax.to(__state.slider, 0.5, {
    x: index,
    // delay,
  })
  // tweenDisplace(0, 1, 2, 'displaceY')
  displaceSlide({ slideIndex: index })
}

export function closeProject(index) {
  TweenLite.to(__state.slider.props.filter((p) => p.scale === ZOOM_SCALE), 0.5, {
    scale: DEFAULT_SCALE,
    alpha: 1,
    delay: 0.25,
    ease: Power3.easeInOut,
  })
  TweenLite.to(__state.slider.props.filter((p) => p.scale === 0), 0.5, {
    scale: DEFAULT_SCALE,
    alpha: 1,
    delay: 0.5,
    // ease: Back.easeOut,
  })
  // tweenDisplace(1, 0, 2, 'displaceY')
  displaceSlide({ slideIndex: index, dir: 0 })
}

export function fadeInSlides() {
  TweenMax.staggerTo(__state.slider.props, 1.0, {
    scale: DEFAULT_SCALE,
    alpha: 1,
    delay: 1.0,
  }, 0.2)
  // tweenDisplace(1, 0, 2, 'displaceY')
}


// export as immutable object
export const state = Object.freeze(__state)
