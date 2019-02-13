import React from 'react'
import { Link } from 'gatsby'
import Helmet from 'react-helmet'
import TextCover from '../components/text-cover'
import Scroller, { Layer } from '../components/scroller'

// class ImageScroller extends React.Component {
//   componentDidMount = () => {
//     window.addEventListener('mousewheel', this.mousewheel, )
//   }

//   getRef = el => {
//     this.node = el
//   }
//   render() {
//     return (
//       <div ref={this.getRef}>
//         {this.props.children}
//       </div>

//     )
//   }
// }

class WorkLayout extends React.Component {
  render() {
    const { children, data, pageContext, ...rest } = this.props
    const { node } = pageContext
    return (
      <>
        <Helmet title={node.frontmatter.title} />
        <Scroller maxSpeed={0.7}>
          <Layer speed={0.5}>
            <div className="relative vh-100 pb4 near-white z-999">
              <div className="mw8 center ph4 flex flex-column justify-center h-100">
                <div
                  className="flex items-center"
                  style={{
                    // transform: 'translateY(-100%)',
                    height: '50vh',
                  }}
                >
                  <Layer speed={0.1} delay>
                    <h2 className="ma0 pa0 f1 serif fw1 overflow-hidden lh-title">
                      <div className="title fade">
                        {node.frontmatter.title}
                      </div>
                    </h2>
                  </Layer>
                  <div className="ml-auto" />
                </div>
                <div className="flex f7 pt4">
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
          </Layer>
          <Layer speed={0.3}>
            <div
              className="relative bg-near-black near-white fade pt5 w-100 vh-100 z-9999"
              style={{
                minHeight: '100vh',
                height: 'auto',
              }}
            >
              <div className="mw8 center ph4 pt4 fade z-10">
                <div className="flex">
                  <div className="w-40">
                    <p className="f6 lh-copy ma0 pa0">{node.excerpt}</p>
                    <div className="fade f3 z-9999 pt5" style={{  }}>
                  <Link
                    className="white mr3 no-underline"
                    style={{ marginLeft: -30 }}
                    to={'/'}
                  >
                    ← All projects
                  </Link>
                  /
                  <Link
                    className="white ml3 no-underline"
                    to={pageContext.nextUrl}
                  >
                    Next Project
                  </Link>
                </div>
                  </div>
                  <div className="w-50 ml-auto">
                    <Layer speed={0.4}>
                      <div>
                        {node.frontmatter.images.map((image, i) => {
                          return (
                            <img
                              key={i}
                              src={image.publicURL}
                              className="mb3"
                            />
                          )
                        })}
                      </div>
                    </Layer>
                  </div>
                </div>
              </div>
            </div>
          </Layer>
        </Scroller>
      </>
    )
  }
}

export default WorkLayout
