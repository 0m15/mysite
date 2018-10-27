import React, { Component } from 'react'
import { TimelineLite, TweenLite, TweenMax, Elastic, Back, Power2 } from 'gsap'

export default class Slideshow extends Component {
  index = 0
  imageNodes = []
  masks = []
  imagesTimeline
  scrollerNode

  constructor(props) {
    super(props)
    this.imagesTimeline = new TimelineLite({ paused: true })
  }

  fadeImages = to => {}

  onClick = evt => {
    if (evt.clientX > window.innerWidth / 2) {
      this.next()
    } else {
      this.prev()
    }
  }

  prev = evt => {
    this.index -= 1
    TweenLite.to(this.scrollerNode, 1, {
      x: -this.index * (800 + 120),
    }).play()
  }
  next = evt => {
    this.index += 1
    TweenLite.to(this.scrollerNode, 1, {
      x: -this.index * (800 + 120),
    }).play()
  }
  getRef = el => {
    this.props.getRef(el)
  }
  getScrollerRef = el => {
    this.scrollerNode = el
    this.props.getScrollerRef(el)
  }
  getElementRef = index => el => {
    this.props.getElementRef(index, el)
  }
  getImageRef = index => el => {
    this.imageNodes[index] = el
  }
  render() {
    const { works, isActive } = this.props
    return (
      <div
        className="absolute top-0 left-0 pl5 nl4"
        ref={this.getRef}
        onClick={isActive ? this.onClick : () => {}}
        style={{
          opacity: 0,
          // pointerEvents: 'none',
          height: 200,
          overflow: 'hidden',
        }}
      >
        <div
          ref={el => (this.masks[0] = el)}
          style={{
            opacity: 0,
            background: '#999',
            position: 'absolute',
            left: '35%',
            width: 120,
            height: '150%',
            zIndex: 9999,
            top: '-50%',
          }}
        />
        <div
          ref={el => (this.masks[1] = el)}
          style={{
            opacity: 0,
            background: '#999',
            position: 'absolute',
            left: '-10%',
            width: '10%',
            height: '150%',
            zIndex: 9999,
            top: '-t0%',
          }}
        />
        <div ref={this.getScrollerRef}>
          {works.map(({ node: work }, index) => {
            return (
              <div
                key={index}
                className="flex"
                ref={this.getElementRef(index)}
                style={{
                  height: 200,
                }}
              >
                <div
                  style={{
                    width: 800,
                    backgroundImage: `url(${work.frontmatter.cover.publicURL})`,
                    backgroundSize: '100%',
                    backgroundPosition: '50% 50%',
                    backgroundRepeat: 'no-repeat',
                    marginRight: 120,
                  }}
                />
                {true &&
                  work.frontmatter.images.map((image, i) => {
                    return (
                      <div
                        key={i}
                        ref={this.getImageRef(index + i)}
                        style={{
                          opacity: 0,
                          width: 800,
                          backgroundImage: `url(${image.publicURL})`,
                          backgroundSize: '105%',
                          backgroundPosition: '50% 50%',
                          backgroundRepeat: 'no-repeat',
                          marginRight:
                            i < work.frontmatter.images.length - 1 ? 120 : 0,
                        }}
                      />
                    )
                  })}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
