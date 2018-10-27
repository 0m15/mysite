import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import { TimelineLite, TweenLite, TweenMax, Elastic, Back, Power2 } from 'gsap'
import Slideshow, { pan } from '../components/carousel'

const CURSOR_SIZE = 32

class IndexPage extends React.Component {
  state = {
    index: 0,
  }
  slideshow = null
  scroll = new TimelineLite({ paused: true })

  componentDidMount = () => {
    window.addEventListener('mousedown', this.mouseDown, { passive: true })
    window.addEventListener('mouseup', this.mouseUp, { passive: true })
    window.addEventListener('mousemove', this.mousemove, { passive: true })
  }

  mouseDown = () => {
    this.mousedown = true
  }

  mouseUp = () => {
    this.mousedown = false
  }

  mousemove = (evt) => {
    if (!this.mousedown) {
      return
    }

    const x = evt.clientX / window.innerWidth
    requestAnimationFrame(() => {
      // TweenLite.to(pan, 1.0, {
      //   x: x * 3,
      // }).play()
      pan.x = x * 3
    })
  }

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
    const works = this.props.data.allMarkdownRemark.edges
    const images = works.map(({ node }) => {
      return node.frontmatter.cover.publicURL
    })
    return (
      <>
        <div className="mw8 center">
          <div className="ph5">
            <h1 className="f6 ma0 pa0 pt5 relative z-9999 no-cursor"
            >
              simone carella
              <span className="db fw1">digital designer/coder</span>
            </h1>
            <Slideshow
              ref={comp => this.slideshow = comp}
              index={this.state.index}
              images={images}
            />
            <div className="absolute z-9999">
              <div onClick={this.next}>next</div>
              <div onClick={this.prev}>prev</div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default ({ children, ...rest }) => (
  <StaticQuery
    query={graphql`
      query works {
        allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/works/" } }) {
          edges {
            node {
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
    render={data => <IndexPage data={data} {...rest} />}
  />
)
