import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import { TimelineLite, TweenLite, TweenMax, Elastic, Back, Power2 } from 'gsap'
import Slideshow from '../components/carousel'

const CURSOR_SIZE = 32

class IndexPage extends React.Component {
  state = {
    index: 0,
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
            <Slideshow index={this.state.index} images={images} />
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
