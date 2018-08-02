import React from 'react'
import Link from 'gatsby-link'

const Header = ({ siteTitle }) => (
  <div className='pv4 mb5 ph4'>
    <div className='center flex-l flex-wrap-l align-center'>
      <h1 className='f7 w4'>
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
        </Link>
      </h1>
      <div className='absolute left-0 w3 bt mb1 b--gray' style={{ top: 82 }} />
      <div className='ml-auto mt4 mt0-l'>
        <ul className='flex-l flex-wrap-l list ttu tracked' style={{ fontSize: 11 }}>
          <li className='mr3-l mb0'>
            <Link to='ristorante'>
              il ristorante
            </Link>
          </li>
          <li className='mr3-l mb0'>
            <Link to='domenico-cilenti'>
              domenico cilenti
            </Link>
          </li>
          <li className='mr3-l mb0'>
            <Link to='menu'>
              menu
            </Link>
          </li>
          <li className='mr3-l mb0'>
            <Link to='staff'>
              staff
            </Link>
          </li>
          <li className='mr3-l mb0'>
            <Link to='about'>
              prenotazioni
            </Link>
          </li>
          <li>
            <Link to='about'>
              dove siamo/contatti
            </Link>
          </li>
          <li className='gray ml5-l'>
            <Link to='/en'>
              english
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </div>
)

export default Header
