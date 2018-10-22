import React from 'react'
import { TimelineLite, TweenLite, TweenMax, Elastic, Back } from 'gsap'
import img0 from '../images/ht.gif'
import img1 from '../images/celli.gif'
import img2 from '../images/ims.jpg'
import img3 from '../images/songul.jpg'
import img4 from '../images/rebr.png'

const CURSOR_SIZE = 32

const works = [
  {
    title: 'The Hidden Tribes',
    at: 'Accurat',
    for: 'More in Common',
    img: img0,
  },
  {
    title: 'Intellitower',
    at: 'Accurat',
    for: 'Celli',
    img: img1,
  },
  {
    title: 'Dataviz tools',
    at: 'Accurat',
    for: 'Sanofi',
    img: img2,
  },
  {
    title: 'Rebrandly',
    at: 'Musixmatch',
    for: 'Musixmatch',
    img: img4,
  },
  {
    title: 'Misc',
    at: 'Musixmatch',
    for: 'Musixmatch',
    img: img3,
  },
]

class IndexPage extends React.Component {
  state = {
    index: undefined,
  }

  constructor(props) {
    super(props)
    this.timeline = new TimelineLite({ paused: true })
    this.nodes = []
    this.cursor = { x: 0, y: 0 }
  }

  componentDidMount() {
    this.timeline
      .staggerFromTo(
        this.nodes,
        2,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, ease: Elastic.easeOut },
        0.1
      )
      .play()
    this.node.addEventListener('mousemove', this.mousemove, { passive: true })
    window.addEventListener('mousemove', this.windowMouseMove, {
      passive: true,
    })
  }

  getRef = index => el => {
    this.nodes[index] = el
  }

  windowMouseMove = evt => {
    this.cursor = {
      x: evt.clientX - CURSOR_SIZE / 2,
      y: evt.clientY - CURSOR_SIZE / 2,
    }
    requestAnimationFrame(() => {
      TweenLite.to(this.cursorNode, 0.25, {
        ...this.cursor,
      }).play()
    })
  }

  mouseEnterNode = evt => {
    TweenLite.to(this.cursorNode, 0.25, {
      scale: 2,
      // background: 'rgba(100, 0, 0, .9)',
      opacity: 1,
    }).play()
    TweenLite.to(this.detailNode, 0.5, {
      opacity: 1,
      z: -1,
    }).play()
  }

  mouseLeaveNode = evt => {
    TweenLite.to(this.cursorNode, 0.5, {
      scale: 1,
      // background: 'rgba(0, 0, 0, .9)',
      opacity: 0.5,
    }).play()
    TweenLite.to(this.detailNode, 0.5, {
      opacity: 0,
    }).play()
  }

  mousemove = evt => {
    const mouseY = evt.clientY - this.node.offsetTop - CURSOR_SIZE / 2
    requestAnimationFrame(() => {
      this.nodes.forEach((node, i) => {
        const d = Math.sqrt(Math.pow(mouseY - node.offsetTop, 2))
        if (d < 50) {
          const r = 1 - d / 50
          TweenLite.to(node, 2, {
            y: (mouseY - node.offsetTop) * r,
            opacity: 1,
            ease: Elastic.easeOut,
            color: '#fff',
          }).play()
          TweenLite.to(this.detailNode, 0.5, {
            y: evt.clientY - 100,
            // x: -200 + (-0.5 + (this.cursor.x / window.innerHeight)) * 30,
            x: -600,
            opacity: 1,
            z: -1,
          }).play()
          TweenLite.to(this.scrollerNode, 1.5, {
            //y: -((mouseY - 100) / (this.node.clientHeight - 150)) * this.scrollerNode.clientHeight,
            y: -((mouseY - 40) / (this.node.clientHeight - 40)) * this.scrollerNode.clientHeight,
            ease: Elastic.easeOut,
            
          })
        } else {
          TweenLite.to(node, 1, {
            y: 0,
            opacity: 0.6,
            ease: Elastic.easeOut,
            color: 'black',
          }).play()
        }
      })
    })
  }

  render() {
    return (
      <div className="mw7 center">
        <div className="ph5">
          <h1 className="f6 pt5">
            simone carella<br/>
            <span className="fw1">digital designer/coder</span>
          </h1>
          {/* <p className="f6 pt6 pb3 light-silver">
            Projects and works
            <br />
            2014—2018
          </p> */}
          <div
            ref={el => (this.node = el)}
            className="relative pv3 mt5 z-999"
            onMouseEnter={this.mouseEnterNode}
            onMouseLeave={this.mouseLeaveNode}
          >
            {works.map((work, i) => {
              return (
                <article
                  className="f2 mv4 fw8"
                  ref={this.getRef(i)}
                  key={i}
                  style={{}}
                >
                  <h2
                    className="f2 ma0 pa0"
                    style={{
                      mixBlendMode: 'difference',
                    }}
                  >
                    {work.title}
                  </h2>
                </article>
              )
            })}
          </div>
        </div>
        <div
          className="absolute top-0 left-0 overflow-hidden"
          ref={el => (this.detailNode = el)}
          style={{
            opacity: 0,
            left: '70%',
            pointerEvents: 'none',
            height: 200,
          }}
        >
        <div ref={el => this.scrollerNode = el}>
          {works.map((work, index) => {
            return (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 600,
                  height: 200,
                  backgroundImage: `url(${work.img})`,
                  backgroundSize: '105%',
                  backgroundPosition: '50% 50%',
                }}
              >
              </div>
            )
          })}
          </div>
        </div>
        <div
          ref={el => (this.cursorNode = el)}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            background: 'red',
            width: CURSOR_SIZE,
            height: CURSOR_SIZE,
            borderRadius: '50%',
            pointerEvents: 'none',
          }}
        />
      </div>
    )
  }
}

export default IndexPage
