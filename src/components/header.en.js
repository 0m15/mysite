import React from 'react'
import Link from 'gatsby-link'

const Header = ({ siteTitle }) => (
  <div className='pv4 mb5 ph4'>
    <div className='mw6-m center'>
      <h1 style={{ margin: 0, fontSize: '1em' }}>
        <Link
          to="/"
          style={{
            textDecoration: 'none',
            fontWeight: 'normal',
          }}
        >
        &nbsp;&nbsp;domenico cilenti<br/>
        <strong>portadibasso</strong><br/>
        peschici<br/>
        &nbsp;&nbsp;south italian<br/>
        <strong>fine dining</strong><br/>
        &nbsp;&nbsp;restaurant
        </Link>
      </h1>
    </div>
    <div>
      <Link to='/'>
        italiano
      </Link>
    </div>
  </div>
)

export default Header
