import React from 'react'
import { Link } from 'gatsby'
import Helmet from 'react-helmet'

class WorkLayout extends React.Component {
  componentWillEnter(cb) {
    console.log('willEnter')
    cb()
  }
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
          <div className="bg-black white fade pb6 relative z-9999">
            <div className="mw7 center ph3">
              <h2 className="f4 fade">{node.frontmatter.title}</h2>
              <div className="flex f7 fade">
                <div className="w-third fade">{node.frontmatter.type}</div>
                <div className="w-third fade tc">
                  {node.frontmatter.url ? 'View Project' : ''}
                </div>
                <div className="w-third fade tr">
                  <Link to="/works/intellitower">Next Project</Link>
                </div>
              </div>
            </div>
          </div>
          <div
            className="bg-white fade"
            style={{
              minHeight: '100vh',
            }}
          >
            <div className="mw7 center ph3 pt4 fade">
              <p className="f6 lh-copy ma0 pa0">{node.excerpt}</p>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default WorkLayout
