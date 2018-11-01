import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import { Transition, TransitionGroup } from 'react-transition-group'
import { TimelineLite, TweenLite, TweenMax, Draggable } from 'gsap/all'
import Slideshow from '../components/carousel'
import TextCover from '../components/text-cover'
import { drag, dragDecay } from '../utils/choreography'

class WorksLayout extends React.Component {
  state = { index: 0, loaded: false, loadedPct: 0 }
  loadedPct = 0

  componentDidMount() {
    TweenMax.set(this.preloaderNode.querySelector('.bar'), {
      width: 0,
    })
    if (this.dragCursor) {
      this.dragger = Draggable.create(this.dragCursor, {
        type: 'x',
        edgeResistance: 0.65,
        bounds: this.dragCursor.parentNode,
        throwProps: true,
        onDrag: this.onDrag,
        onDragEnd: this.onDragEnd,
      })
    }
  }

  onDragEnd = evt => {
    const snap = Math.max(
      0,
      Math.round(
        (this.dragger[0].x / this.dragger[0].maxX) * (this.props.data.allMarkdownRemark.edges.length - 1)
      )
    )
    this.setState(
      {
        index: snap,
      },
      () => {
        dragDecay(snap)
      }
    )
  }

  onDrag = evt => {
    const index =
      (this.dragger[0].x / this.dragger[0].maxX) * (this.props.data.allMarkdownRemark.edges.length - 1)
    drag({
      toIndex: index,
      speed: this.dragger[0].deltaX,
    })
  }

  onPreloadProgress = (loaded, total) => {
    TweenMax.to(this.preloaderNode.querySelector('.bar'), 1, {
      width: (loaded / total) * 100 + '%',
    })
  }

  render() {
    const { edges: works } = this.props.data.allMarkdownRemark
    const images = works.map(({ node }) => {
      return {
        url: node.frontmatter.cover.publicURL,
        title: node.frontmatter.title,
      }
    })
    const { pageContext } = this.props
    const selectedIndex = pageContext.node
      ? works.findIndex(d => d.node.id === pageContext.node.id)
      : undefined
    const showControls = selectedIndex === undefined
    const showDetail = !showControls

    return (
      <>
        <div className="mw8 center">
          <div className="ph5">
            <Slideshow
              ref={comp => (this.slideshow = comp)}
              index={this.state.index}
              selectedIndex={selectedIndex}
              images={images}
              onPreloadProgress={this.onPreloadProgress}
            />
            {!showDetail && (
              <div
                className="absolute w-100 top-0 left-0 z-9999"
                style={{
                  transform: 'translateY(-50%)',
                  top: '50%',
                  height: '50vh',
                }}
              >
                <Link
                  className="db w-50 center flex justify-center h-100 white relative"
                  to={
                    '/works/' +
                    works[this.state.index].node.frontmatter.title
                      .replace(/\s/g, '-')
                      .toLowerCase()
                  }
                >
                  <h2
                    className="absolute bottom-0 nt4 ma0-ns pa0 f5 f4-l"
                    style={{ bottom: '10%' }}
                    ref={el => (this.titleNode = el)}
                  >
                    {/* {works[this.state.index].node.frontmatter.title} */}
                  </h2>
                </Link>
              </div>
            )}
            <div
              className="absolute w-100 z-9999"
              style={{
                bottom: '10%',
                left: 0,
              }}
            >
              <Transition
                timeout={1000}
                appear
                in={showControls}
                onEnter={node => {
                  TweenMax.set(node, {
                    autoAlpha: 1,
                    y: 0,
                  })
                }}
                addEndListener={(node, done) => {
                  TweenMax.to(node, 1, {
                    y: showControls ? 0 : 30,
                    autoAlpha: showControls ? 1 : 0,
                    onComplete: done,
                    delay: showControls ? 0.5 : 0,
                  })
                }}
              >
                <div className="mw8 center ph4">
                  <div className="relative">
                  <div
                    className="absolute w-100 h-100 top-0 ph4 left-0 z-9999 white flex items-center justify-center"
                    style={{
                      transform: 'translateY(-50%)',
                      top: '50%',
                    }}
                    ref={el => (this.preloaderNode = el)}
                  >
                    <div
                      className="near-white f7 tracked ttu fw8 nt3 text tc w-100"
                      ref={el => (this.preloaderLabel = el)}
                    />
                    <div
                      className="absolute left-0 bg-near-white bar"
                      style={{
                        height: 1,
                      }}
                    />
                    <div
                      className="bg-near-white"
                      ref={el => (this.dragCursor = el)}
                      style={{
                        position: 'absolute',
                        left: 0,
                        width: 16,
                        height: 16,
                        borderRadius: '50%',
                      }}
                    />
                  </div>
                  </div>
                </div>
              </Transition>
            </div>
          </div>
        </div>
        <div className="bg-white">
          <TransitionGroup appear>
            <Transition
              key={selectedIndex}
              mountOnEnter
              unmountOnExit
              timeout={1000}
              onEnter={node => {
                const fadeElements = node.querySelectorAll('.fade')
                const textCover = node.querySelectorAll('.text-cover')
                const textSplit = node.querySelectorAll('.text-split')
                TweenMax.killTweensOf(node)
                TweenMax.set(fadeElements, {
                  // y: -30,
                  opacity: 0,
                })
                TweenMax.set(textCover, {
                  x: '-101%',
                })
                TweenMax.set(textSplit, {
                  opacity: 0,
                  y: -20,
                  scaleX: 1.5,
                })
                TweenMax.staggerTo(
                  fadeElements,
                  0.75,
                  {
                    // y: 0,
                    opacity: 1,
                    delay: 0.5,
                  },
                  0.2
                )
                TweenMax.staggerTo(
                  textCover,
                  0.6,
                  {
                    x: '101%',
                    delay: 0.7,
                  },
                  0.2
                )
                TweenMax.staggerTo(
                  textCover,
                  0.6,
                  {
                    x: '101%',
                    delay: 0.7,
                  },
                  0.2
                )
                TweenMax.staggerTo(
                  textSplit,
                  0.25,
                  {
                    opacity: 1,
                    scaleX: 1,
                    y: 0,
                    delay: 0.6,
                  },
                  0.05
                )
              }}
              onExit={node => {
                const fadeInElements = node.querySelectorAll('.fade')
                const textSplit = node.querySelectorAll('.text-split')
                TweenMax.killTweensOf(node)
                TweenMax.staggerTo(
                  fadeInElements,
                  0.5,
                  {
                    // y: -30,
                    opacity: 0,
                    delay: 0.4,
                  },
                  -0.01
                )
                TweenMax.staggerTo(
                  node.querySelectorAll('.text-cover'),
                  0.5,
                  {
                    x: '-101%',
                    delay: 0.3,
                  },
                  -0.1
                )
                TweenMax.staggerTo(
                  textSplit,
                  0.25,
                  {
                    opacity: 0,
                    scale: 1,
                    y: 30,
                  },
                  -0.05
                )
              }}
              // addEndListener={(node, done) => {
              //   TweenMax.eventCallback("onComplete", () => {
              //     console.log('completed')
              //     // done()
              //   })
              // }}
            >
              {this.props.children}
            </Transition>
          </TransitionGroup>
        </div>
      </>
    )
  }
}

export default props => (
  <StaticQuery
    query={graphql`
      query works {
        allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/works/" } }) {
          edges {
            node {
              id
              excerpt(pruneLength: 5000)
              frontmatter {
                url
                title
                type
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
    render={data => <WorksLayout data={data} {...props} />}
  />
)
