/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
// create profiles pages
const path = require('path')

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions
  const pageTemplate = path.resolve(`./src/layouts/work.js`)

  return graphql(`
    {
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
              cover {
                publicURL
              }
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      console.log('! Error')
      return Promise.reject(result.errors)
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      const path = node.frontmatter.title.replace(/\s/g, '-').toLowerCase()
      console.log('[i] Creating page /works/' + path)
      createPage({
        path: '/works/' + path,
        component: pageTemplate,
        context: {
          id: node.id,
          node,
          pathname: path,
        }, // additional data can be passed via context
      })
    })
  })
}
