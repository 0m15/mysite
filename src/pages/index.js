import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import { TimelineLite, TweenLite, TweenMax, Elastic, Back, Power2 } from 'gsap'
import Slideshow from '../components/slideshow'

const CURSOR_SIZE = 32


class IndexPage extends React.Component {
  state = {
    index: undefined,
  }

  constructor(props) {
    super(props)
    this.timeline = new TimelineLite({ paused: true })
    this.timeline2 = new TimelineLite({ paused: true })
    this.nodes = []
    this.detailNodes = []
    this.cursorNode = null
    this.detailNode = null
    this.scrollerNode = null
    this.currentIndex = null
    this.cursor = { x: 0, y: 0 }
  }

  componentDidMount() {
    this.timeline
      .staggerFrom(
        this.nodes,
        0.5,
        { opacity: 0, y: -59, ease: Back.easeOut },
        0.1
      )
      .play()
    window.addEventListener('mousemove', this.windowMouseMove, {
      passive: true,
    })
    this.node.addEventListener('mousemove', this.mousemove, { passive: true })
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

      if (this.detailOpen) {
        // const index = Math.round((this.cursor.x / window.innerWidth) * 3)
        // TweenLite.to(this.detailNodes[this.currentIndex], 2, {
        //   x: -index * 900,
        //   ease: Power2.easeOut,
        // }).play()
      }
    })
  }

  mouseEnterNode = evt => {
    if (this.detailOpen) return

    TweenLite.to(this.cursorNode, 0.25, {
      scale: 2,
      background: '#fff',
      opacity: 1,
    }).play()
    // TweenLite.to(this.detailNode, 0.5, {
    //   opacity: 1,
    //   z: -1,
    // }).play()
  }

  mouseLeaveNode = evt => {
    if (this.detailOpen) return

    TweenLite.to(this.cursorNode, 0.5, {
      scale: 1,
      // background: 'rgba(0, 0, 0, .9)',
      opacity: 0.5,
    }).play()
    // TweenLite.to(this.detailNode, 0.5, {
    //   opacity: 0,
    // }).play()
  }

  mousemove = evt => {
    if (this.detailOpen) return

    const mouseY = evt.clientY - this.node.offsetTop - CURSOR_SIZE / 2
    requestAnimationFrame(() => {
      this.nodes.forEach((node, i) => {
        // Math.sqrt(Math.pow(mouseY - node.offsetTop))
        const d = Math.abs(mouseY - node.offsetTop)
        if (d < 50) {
          const r = 1 - d / 50
          TweenLite.to(node, 2, {
            y: (mouseY - node.offsetTop) * r,
            // opacity: 1,
            ease: Elastic.easeOut,
            // color: '#fff',
          }).play()
          TweenLite.to(this.detailNode, 0.5, {
            y: evt.clientY - 100,
            // x: -200 + (-0.5 + (this.cursor.x / window.innerHeight)) * 30,
            // x: -600,
            opacity: 1,
            z: -1,
          }).play()
          TweenLite.to(this.scrollerNode, 1.5, {
            //y: -((mouseY - 100) / (this.node.clientHeight - 150)) * this.scrollerNode.clientHeight,
            y:
              -((mouseY - 40) / (this.node.clientHeight - 40)) *
              this.scrollerNode.clientHeight,
            ease: Elastic.easeOut,
          })
        } else {
          TweenLite.to(node, 1, {
            y: 0,
            // opacity: 0.6,
            ease: Elastic.easeOut,
            color: 'black',
          }).play()
        }
      })
    })
  }

  selectWork = (index, cb) => {
    const node = this.nodes[index]
    const detailNode = this.detailNodes[index]
    this.currentIndex = index
    this.detailOpen = true
    this.node.removeEventListener('mousemove', this.mousemove, {
      passive: true,
    })
    this.timeline2 = new TimelineLite({ paused: true, onComplete: cb })
      // enlarge cursor
      // .to(this.cursorNode, 0.6, {
      //   scale: 100,
      //   background: works[index].background || '#000',
      // })
      // fade out nodes
      .staggerTo(
        this.nodes.filter((n, i) => i !== index),
        1.0,
        { opacity: 0, y: -10, pointerEvents: 'none', ease: Back.easeOut },
        0.15
        // "-=0.5"
      )
      // fade out detail nodes
      .to(
        this.detailNodes.filter((n, i) => i !== index),
        0.5,
        { opacity: 0, pointerEvents: 'none' },
        0.1,
        '-=0.5'
      )
      // move node container to the top
      // .to(
      //   this.node,
      //   0.5,
      //   { y: -node.offsetTop, ease: Back.easeOut },
      //   '-=0.75'
      // )
      // move current node to the top
      .to(
        node,
        1.5,
        {
          y: -node.offsetTop + 400,
          height: 'auto',
          color: '#fff',
          ease: Back.easeOut,
        },
        '-=0.75'
      )
      // auto height slideshow
      .to(
        this.detailNode,
        0.5,
        { y: 200, height: 380, ease: Back.easeOut, overflow: 'visible' },
        // { y: 200, ease: Back.easeOut },
        '-=1.25'
      )
      .to(
        detailNode,
        0.5,
        {
          // position: 'absolute',
          x: 0,
          height: 380,
          ease: Back.easeOut,
        },
        '-=1.25'
      )
      .to(
        document.body,
        0.5,
        {
          backgroundColor: '#999',
          color: '#fff',
        },
        '-=1.25'
      )
      // .set(this.cursorNode, { opacity: 0, scale: 1 })
      .to(this.cursorNode, 0, {
        scale: 1,
        background: '#fff',
      })
      // .to(node, 0, { overflow: 'inherit' })
      .to(
        node.querySelector('.work-descr'),
        0.5,
        {
          opacity: 1,
          height: 'auto',
          y: -10,
        },
        '-=0.75'
      )
      .play()
      return this.timeline2
  }

  onClickWork = index => evt => {
    this.selectWork(index, () => {
      this.setState({
        currentIndex: index,
      })
    })
  }

  exitWork = evt => {
    this.setState({
      currentIndex: undefined,
    })
    this.detailOpen = false
    this.node.addEventListener('mousemove', this.mousemove, { passive: true })
    this.timeline2.timeScale(1.5).reverse()
  }

  render() {
    const works = this.props.data.allMarkdownRemark.edges
    console.log('works', works)
    return (
      <>
        <div className="mw8 center relative">
          <div className="ph5">
            <h1 className="f6 ma0 pa0 pt5 relative z-9999 no-cursor" onClick={this.exitWork}>
              simone carella
              <br />
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
              style={{
                // mixBlendMode: 'difference',
                cursor: 'none',
              }}
            >
              {works
                .map(({ node: work }, i) => {
                return (
                  <article
                    className="mv4 fw8"
                    ref={this.getRef(i)}
                    onClick={this.onClickWork(i)}
                    style={{
                      height: 60,
                      overflow: 'hidden',
                    }}
                    key={i}
                  >
                    <h2 className="f2 ma0 pa0">{work.frontmatter.title}</h2>
                    <div
                      className="work-descr mt4 w-100"
                      style={{ opacity: 0, height: 0 }}
                    >
                      <p
                        className="mw7 ma0 pa0 lh-copy fw4 f6 white"
                        style={{
                          columns: 2,
                        }}
                      >
                        {work.excerpt}
                      </p>
                      {
                        work.frontmatter.url &&
                          <div className="mt4 tr">
                            <a className="white fw7" href={work.frontmatter.url}>View project</a>
                          </div>
                      }
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
          <Slideshow
            works={works}
            getRef={el => this.detailNode = el}
            getElementRef={(index, el) => this.detailNodes[index] = el}
            getScrollerRef={el => this.scrollerNode = el}
            isActive={this.state.currentIndex !== undefined}
          />
        </div>
        <div
          ref={el => (this.cursorNode = el)}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            background: '#000',
            width: CURSOR_SIZE,
            height: CURSOR_SIZE,
            borderRadius: '50%',
            pointerEvents: 'none',
            mixBlendMode: 'difference',
            zIndex: 9999,
          }}
        />
      </>
    )
  }
}

export default ({ children, ...rest }) => (
  <StaticQuery
    query={graphql`
      query works {
        allMarkdownRemark(
          sort: { fields: [frontmatter___order], order: ASC }
          filter: { fileAbsolutePath: { regex: "/works/" } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 5000)
              frontmatter {
                url
                title
                images {
                 publicURL 
                }
                images {
                  publicURL
                  childImageSharp {
                    fluid(maxWidth: 420, maxHeight: 420) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
                cover {
                  publicURL
                  childImageSharp {
                    fluid(maxWidth: 420, maxHeight: 420) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={data => <IndexPage data={data} {...rest} />}
  />
)
