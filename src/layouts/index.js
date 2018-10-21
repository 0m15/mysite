import React from 'react'
// import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import './index.scss'

const Layout = ({ children, data }) => {
  return (
    <div style={{
      minHeight: '100vh',
    }}>
      <Helmet
        title={'simonecarella'}
        meta={[
          { name: 'description', content: 'Sample' },
          { name: 'keywords', content: 'sample, something' },
        ]}
      />
      {/* <Cursor /> */}
      {/* <Header
          siteTitle={'simc'}
        /> */}
      <main style={{ height: '100vh' }}>
        {children}
      </main>
      {/* <Footer
          siteTitle={'simc'}
        /> */}
    </div>
  )
}

export default Layout

export const pageQuery = graphql`
  query Layout {
    site {
      siteMetadata {
        title
      }
    }
  }
`
