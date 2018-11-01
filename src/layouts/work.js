import React from 'react'
import { Link } from 'gatsby'
import Helmet from 'react-helmet'
import TextCover from '../components/text-cover'

class WorkLayout extends React.Component {
  render() {
    const { children, data, pageContext, ...rest } = this.props
    const { node } = pageContext
    return (
      <>
        <Helmet title={node.frontmatter.title} />
        <div className="absolute w-100 top-0 left-0 pb4 work-detail z-999 vh-100 white">
          <div className="mw8 center ph4 flex flex-column justify-center h-100">
            <div className="fade absolute top-0 f4" style={{ top: '25%' }}>
              <Link
                className="white mr3 no-underline"
                style={{ marginLeft: -30 }}
                to={'/'}
              >
                ← All projects
              </Link>
              /
              <Link className="white ml3 no-underline" to={pageContext.nextUrl}>
                Next Project
              </Link>
            </div>
            <div>
              <div
                className="flex items-center"
                style={{
                  // transform: 'translateY(-100%)',
                  height: '50vh',
                }}
              >
                <h2 className="ma0 pa0 f1 serif fw1">
                  <TextCover text={node.frontmatter.title} />
                </h2>
                <div className="ml-auto" />
              </div>
            </div>
            <div className="flex f7">
              <div className="w-third f7">
                {node.frontmatter.type.split(',').map((t, i) => {
                  return (
                    <React.Fragment key={i}>
                      <TextCover text={t} />
                      {i < node.frontmatter.type.split(',').length - 1 && (
                        <br />
                      )}
                    </React.Fragment>
                  )
                })}
              </div>
              <div className="w-third fade tc">
                <span className="dib relative overflow-hidden">
                  <span className="fade">Year: 2018</span>
                  <div className="absolute left-0 w-100 h-100 top-0 bg-white text-cover" />
                </span>
              </div>
              <div className="w-third fade tr">
                <span className="dib relative overflow-hidden">
                  <span className="fade">
                    {node.frontmatter.url ? 'View Project' : ''}
                  </span>
                  <div className="absolute left-0 w-100 h-100 top-0 bg-white text-cover" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* <div
              className="bg-white pt5"
              style={{
                minHeight: '100vh',
              }}
            >
              <div className="mw8 center ph4 pt4 fade">
                <p className="f6 lh-copy ma0 pa0">{node.excerpt}</p>
                <div className="tc">
                  {node.frontmatter.images.map((image, i) => {
                    return (
                      <div key={i} className="pv4">
                        <img src={image.publicURL} />
                      </div>
                    )
                  })}
                </div>
              </div>
            </div> */}
      </>
    )
  }
}

export default WorkLayout
