import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import { Transition, TransitionGroup } from 'react-transition-group'
import { TimelineLite, TweenLite, TweenMax } from 'gsap/all'
import Slideshow from '../components/carousel'

const tl = new TimelineLite({ paused: true })

class WorksLayout extends React.Component {
  state = { index: 0 }
  scroll = new TimelineLite({ paused: true })

  next = () => {
    this.setState({
      index: Math.min(this.state.index + 1, this.props.data.allMarkdownRemark.edges.length - 1),
    })
  }

  prev = () => {
    this.setState({
      index: Math.max(this.state.index - 1, 0),
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
    const selectedIndex = this.props.pageContext.node
      ? works.findIndex(d => d.node.id === this.props.pageContext.node.id)
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
            />
            {!showDetail && <div
              className="absolute w-100 top-0 left-0 z-9999"
              style={{
                transform: 'translateY(-50%)',
                top: '50%',
                height: '50vh',
              }}
            >
              <Link
                className="db w-100 flex items-center justify-center h-100 white"
                to={
                  '/works/' +
                  works[this.state.index].node.frontmatter.title
                    .replace(/\s/g, '-')
                    .toLowerCase()
                }
              >
                <h2 className="">
                  {works[this.state.index].node.frontmatter.title}
                </h2>
              </Link>
            </div>}
            <div
              className="absolute w-100 z-9999"
              style={{
                bottom: '5%',
                left: 0,
              }}
            >
              <Transition
                timeout={1000}
                appear
                in={showControls}
                addEndListener={(node, done) => {
                  TweenLite.to(node, 1, {
                    y: showControls ? 0 : 30,
                    autoAlpha: showControls ? 1 : 0,
                    onComplete: done,
                    delay: showControls ? 0.5 : 0,
                  })
                }}
              >
                <div>
                  <div className="center flex justify-center w-50 white">
                    <div className="w-40 tc f7 pointer" onClick={this.prev}>
                      Prev
                    </div>
                    <div className="w-40 tc f7 pointer" onClick={this.next}>
                      Next
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
                TweenMax.killTweensOf(node)
                TweenMax.set(fadeElements, {
                  // y: -30,
                  opacity: 0,
                })
                TweenMax.set(textCover, {
                  x: '-101%',
                })
                TweenMax.staggerTo(fadeElements, 0.75, {
                  // y: 0,
                  opacity: 1,
                }, 0.1)
                TweenMax.staggerTo(textCover, 0.75, {
                  x: '101%',
                  delay: 0.1,
                }, 0.1)
              }}
              onExit={node => {
                TweenMax.killTweensOf(node)
                TweenMax.staggerTo(node.querySelectorAll('.fade'), 0.75, {
                  // y: -30,
                  opacity: 0,
                  delay: 0.1,
                }, 0.1)
                TweenMax.staggerTo(node.querySelectorAll('.text-cover'), 0.75, {
                  x: '-101%',
                }, 0.1)
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
