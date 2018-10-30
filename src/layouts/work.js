import React from 'react'
import { Link } from 'gatsby'
import Helmet from 'react-helmet'

class WorkLayout extends React.Component {
  render() {
    const { children, data, pageContext, ...rest } = this.props
    const { node } = pageContext
    return (
      <>
        <Helmet title={node.frontmatter.title} />
        <div
          className="absolute w-100 left-0 pb4 work-detail"
          style={{
            top: '80%',
          }}
        >
          <div
            className="bg-near-black white fade"
            style={{
              height: '20vh',
            }}
          >
            <div className="mw7 center ph4 relative z-9999">
              <h2 className="f4 ma0 pb3">
                <span className="dib relative overflow-hidden">
                  <span className="fade">{node.frontmatter.title}</span>
                  <div
                    className="absolute left-0 w-100 h-100 top-0 bg-white text-cover"
                    style={{
                      mixBlendMode: 'difference',
                    }}
                  />
                </span>
              </h2>
              <div className="flex f6">
                <div className="w-third">
                  <span className="dib relative overflow-hidden">
                    <span className="fade">{node.frontmatter.type}</span>
                    <div className="absolute left-0 w-100 h-100 top-0 bg-white text-cover" />
                  </span>
                </div>
                <div className="w-third fade tc">
                  <span className="dib relative overflow-hidden">
                    <span className="fade">
                      {node.frontmatter.url ? 'View Project' : ''}
                    </span>
                    <div className="absolute left-0 w-100 h-100 top-0 bg-white text-cover" />
                  </span>
                </div>
                <div className="w-third fade tr">
                  <span className="dib relative overflow-hidden">
                    <span className="fade">
                      <Link to="/works/intellitower" className="white fw8">
                        Next Project
                      </Link>
                    </span>
                    <div className="absolute left-0 w-100 h-100 top-0 bg-white text-cover" />
                  </span>
                </div>
              </div>
            </div>
            <div className="tc f7 o-10 absolute bottom-0 white w-100 pb4 fw8">
              Scroll
            </div>
          </div>
          <div
            className="bg-white"
            style={{
              minHeight: '100vh',
            }}
          >
            <div className="mw7 center ph4 pt4 fade">
              <p className="f6 lh-copy ma0 pa0">{node.excerpt}</p>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default WorkLayout
