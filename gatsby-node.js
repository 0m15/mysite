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

    const edges = result.data.allMarkdownRemark.edges
    edges.forEach(({ node }, index) => {
      
      let nextNode = (index === edges.length - 1)
        ? edges[0].node
        : edges[index + 1].node
      
      const path = node.frontmatter.title.replace(/\s/g, '-').toLowerCase()
      const nextPath = nextNode.frontmatter.title.replace(/\s/g, '-').toLowerCase()
      
      console.log('[i] Creating page /works/' + path)
      createPage({
        path: '/works/' + path,
        component: pageTemplate,
        context: {
          id: node.id,
          node,
          pathname: path,
          nextUrl: '/works/' + nextPath,
        }, // additional data can be passed via context
      })
    })
  })
}
