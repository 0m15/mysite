import React from 'react'
import Helmet from 'react-helmet'
import Header from '../components/header'
import WorksLayout from './works'
import './index.scss'

const Layout = ({ children, data, ...rest }) => {
  return (
    <div className="" style={{
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
      <div>
        {children}
      </div>
      {/* <Footer
          siteTitle={'simc'}
        /> */}
    </div>
  )
}

export default Layout