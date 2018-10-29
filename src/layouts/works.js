import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import { Transition, TransitionGroup } from 'react-transition-group'
import { TimelineLite, TweenLite } from 'gsap/all'
import Slideshow from '../components/carousel'

const tl = new TimelineLite({ paused: true })
class WorksLayout extends React.Component {
  state = { index: 0 }
  scroll = new TimelineLite({ paused: true })

  next = () => {
    this.setState({
      index: this.state.index + 1,
    })
  }

  prev = () => {
    this.setState({
      index: this.state.index - 1,
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
            <div
              className="absolute w-100 top-0 left-0 z-9999"
              style={{
                transform: 'translateY(-50%)',
                top: '50%',
                height: '50vh',
              }}
            >
              <Link
                className="db w-50 center h-100"
                to={
                  '/works/' +
                  works[this.state.index].node.frontmatter.title
                    .replace(/\s/g, '-')
                    .toLowerCase()
                }
              >
                <div className="w-50 center h-100" />
              </Link>
            </div>
            <div
              className="absolute w-100 z-9999"
              style={{
                bottom: '5%',
                left: 0,
              }}
            >
              <Transition
                timeout={1000}
                mountOnEnter
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
          <TransitionGroup>
            <Transition
              key={typeof window !== 'undefined' ? window.location.pathname : ''}
              timeout={1000}
              mountOnEnter
              unmountOnExit
              appear
              onEnter={node => {
                TweenLite.set(node.querySelectorAll('.fade'), {
                  y: 30,
                  opacity: 0,
                })
                tl.staggerTo(node.querySelectorAll('.fade'), 1, {
                  y: 0,
                  opacity: 1,
                }, 0.1).play()
              }}
              onExit={node => {
                // TweenLite.set(node, {
                //   y: 0,
                //   opacity: 1,
                // })
                tl.staggerTo(node.querySelectorAll('.fade'), 1, {
                  y: -30,
                  opacity: 0,
                }, 0.1).play()
              }}
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
