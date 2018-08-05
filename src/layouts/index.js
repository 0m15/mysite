import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Header from '../components/header'
import Footer from '../components/footer'
import Cursor from '../components/cursor'
import 'tachyons'
import './index.css'

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
        <Cursor />
        <Header
          siteTitle={'simc'}
        />
        <main style={{ minHeight: '100vh' }}>
          {children()}
        </main>
        <Footer
          siteTitle={'simc'}
        />
      </div>
  )
}

Layout.propTypes = {
  children: PropTypes.func,
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
