import React, { useState, useCallback, useRef } from 'react'
import { StaticQuery, Link } from 'gatsby'
import Image from 'gatsby-image'
import { maxHeaderSize } from 'http'
import useRaf from '../lib/useRaf'
import TextGlitch from '../components/textglitch'

const IndexPage = ({ data }) => {
  const works = data.allMarkdownRemark.edges
  return (
    <div className="mw9 ph4 center lh-copy">
      <div className="pt6">
        <h1 className="f7 fw8">
          <TextGlitch auto val={'SMNCRLL'} />
        </h1>
        <span className="f7 fw8">
          <TextGlitch auto val={'interactive developer'} />
        </span>
        <span className="f7 fw8">
          <TextGlitch auto val={'simonecarella@gmail.com'} />
        </span>
      </div>
      <div className="pv4">
        <TextGlitch val={'_____________'} />
      </div>
      <div className="">
        {works.map(({ node }, index) => {
          return (
            <Link
              className="no-underline db f3 lh-title"
              key={index}
              to={'/works/' + node.frontmatter.slug}
            >
              <TextGlitch val={node.frontmatter.title} />
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default props => (
  <StaticQuery
    query={graphql`
      query works {
        allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/works/" } }) {
          edges {
            node {
              id
              excerpt(pruneLength: 50)
              frontmatter {
                url
                title
                type
                slug
                images {
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
    render={data => <IndexPage data={data} {...props} />}
  />
)
