import React from 'react'
import Link from 'gatsby-link'

const Footer = (props) => (
  <div className='pv4 mb2 mt3'>
    <div className='w3 bt mt6 mb1 b--gray' />
    <div className='ph4 center flex-l flex-wrap-l align-center'>
      <h2 className='f7'>
        <Link
          to="/"
          style={{
            textDecoration: 'none',
            fontWeight: 'normal',
          }}
        >
        <strong>ristorante porta di basso</strong><br/>
        via cristoforo colombo 38<br/>
        peschici – gargano, italy<br/><br/>
        <small>
            +39 0884 56 34 56<br/>
        </small>
        </Link>
      </h2>
      <div className='ml-auto mt4 mt0-l'>
        <ul className='flex-l flex-wrap-l list f7 ttu tracked'>
          <li className='mr3-l mb0'>
            <Link to='ristorante'>
              facebook
            </Link>
          </li>
          <li className='mr3-l mb0'>
            <Link to='menu'>
              instagram
            </Link>
          </li>
          <li className='mr3-l mb0'>
            <Link to='about'>
              prenotazioni
            </Link>
          </li>
          <li>
            <Link to='about'>
              maps
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </div>
)

export default Footer
