import React from 'react'
import Helmet from 'react-helmet'
import Header from '../components/header'
import WorksLayout from './works'
import './index.scss'

const Layout = ({ children, data, ...rest }) => {
  console.log('layout props', rest)
  return (
    <div className="bg-near-black" style={{
      minHeight: '100vh',
    }}>
      <Helmet
        title={'simonecarella'}
        meta={[
          { name: 'description', content: 'Sample' },
          { name: 'keywords', content: 'sample, something' },
        ]}
      />
      <Header siteTitle={'simc'} />
      <WorksLayout {...rest}>
        {children}
      </WorksLayout>
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
