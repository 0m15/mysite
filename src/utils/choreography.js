import { TimelineLite, TweenLite, TweenMax, Power3 } from 'gsap'

const MAX_DISPLACEMENT = 16
const timeline = new TimelineLite({ paused: true })

const state = {
  slider: { __currentSlide: 0, x: 0, displace: 0, props: [] },
  project: {},
}

export default {
  nextSlide: () => {},
  prevSlide: () => {},
  slideTo: ({ fromIndex, toIndex }) => {
    TweenMax.killTweensOf(state.slider)
    TweenMax
      .to(state.slider, 1.0, {
        x: toIndex,
        ease: Power3.easeInOut,
      })
    const displace = TweenMax
      .to(
        state.slider,
        0.5,
        {
          displace: toIndex > fromIndex ? MAX_DISPLACEMENT : -MAX_DISPLACEMENT,
          ease: Power3.easeIn,
          onComplete: () => displace.reverse()
        },
      )
  },
  openProject: () => {},
  closeProject: () => {},
  setMeshProps: (props) => {
    state.slider.props = props
  },
  state: state,
}
