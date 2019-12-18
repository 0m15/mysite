import React from 'react'
import Helmet from 'react-helmet'
// import Header from '../components/header'
import './index.scss'

const Layout = ({ children, data, ...rest }) => {
  return (
    <div className="" style={{
      minHeight: '100vh',
    }}>
      <Helmet
        title={'simone carella'}
        meta={[
          { name: 'description', content: 'Sample' },
          { name: 'keywords', content: 'sample, something' },
        ]}
      />
      {children}
    </div>
  )
}

export default Layout