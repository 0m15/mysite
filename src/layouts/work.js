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
        <div>
          <div
            className="absolute w-100 left-0 pb4 work-detail z-9999"
            style={{
              top: '80%',
            }}
          >
            <div
              className="white fade"
              style={{
                height: '20vh',
              }}
            >
              <div className="mw7 center ph4 relative z-9999">
                <div
                  className="absolute flex items-center w-100 ph4 top-0 left-0 z-9999"
                  style={{
                    transform: 'translateY(-100%)',
                    top: '50%',
                    height: '50vh',
                  }}
                >
                    <h2 className="ma0 pa0">
                      <TextCover text={node.frontmatter.title} />
                    </h2>
                    <div className="ml-auto">
                      <Link className="white fw8" to={pageContext.nextUrl}>Next Project</Link>
                    </div>
                </div>
                {/* <h2 className="f4 ma0 pb3">
                  <span className="dib relative overflow-hidden">
                    <span className="fade">{node.frontmatter.title}</span>
                    <div
                      className="absolute left-0 w-100 h-100 top-0 bg-white text-cover"
                      style={{
                        mixBlendMode: 'difference',
                      }}
                    />
                  </span>
                </h2> */}
                <div className="flex f7">
                  <div className="w-third">
                    {node.frontmatter.type.split(',').map((t, i) => {
                      return <>
                        <TextCover text={t} key={i} />
                          {i < node.frontmatter.type.split(',').length -1  && ', '}
                        </>
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
              {/* <div className="tc f7 o-10 absolute bottom-0 white w-100 pb4 fw8">
              Scroll
            </div> */}
            </div>
            <div
              className="bg-white pt5"
              style={{
                minHeight: '100vh',
              }}
            >
              <div className="mw7 center ph4 pt4 fade">
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
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default WorkLayout
