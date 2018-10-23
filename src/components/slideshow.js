import React, { Component } from 'react'
import { TimelineLite, TweenLite, TweenMax, Elastic, Back, Power2 } from 'gsap'

export default class Slideshow extends Component {
  index = 0
  onClick = evt => {
    console.log('evt.clientX', evt.clientX)
    if (evt.clientX > (window.innerWidth / 2)) {
      this.next()
    } else {
      this.prev()
    }
  }
  prev = evt => {
    this.index -= 1
    TweenLite.to(this.scrollerNode, 1, {
      x: -this.index * (900 + 120),
    }).play()
  }
  next = evt => {
    this.index += 1
    TweenLite.to(this.scrollerNode, 1, {
      x: -this.index * (900 + 120),
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
  render() {
    const { works, isActive } = this.props
    return (
      <div
        className="absolute top-0 left-0 pl5"
        ref={this.getRef}
        onClick={isActive ? this.onClick : () => {}}
        style={{
          opacity: 0,
          // pointerEvents: 'none',
          height: 200,
          overflow: 'hidden',
        }}
      >
        {isActive && 
          <>
        <div
          style={{
            background: '#999',
            position: 'absolute',
            left: '35%',
            width: 120,
            height: '130%',
            zIndex: 9999,
            top: '-20%',
          }}
        />

        <div
          style={{
            background: '#999',
            position: 'absolute',
            left: '-10%',
            width: '10%',
            height: '130%',
            zIndex: 9999,
            top: '-20%',
          }}
        />
        </>
        }
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
                    width: 900,
                    backgroundImage: `url(${work.frontmatter.cover.publicURL})`,
                    backgroundSize: '105%',
                    backgroundPosition: '50% 50%',
                    backgroundRepeat: 'no-repeat',
                    marginRight: 120,
                  }}
                />
                {isActive &&
                  work.frontmatter.images.map((image, i) => {
                    return (
                      <div
                        key={i}
                        style={{
                          width: 900,
                          backgroundImage: `url(${image.publicURL})`,
                          backgroundSize: '105%',
                          backgroundPosition: '50% 50%',
                          backgroundRepeat: 'no-repeat',
                          marginRight: i < work.frontmatter.images.length -1 ? 120 : 0,
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
