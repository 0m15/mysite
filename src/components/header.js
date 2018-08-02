import React from 'react'
import Link from 'gatsby-link'

const Header = ({ siteTitle }) => (
  <div className='pt4 pb4 mb5'>
    <div>
      <h1 className='f7 pl4 w5 absolute'>
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
      <div className='w100 ph4 tr ml-auto'>
        <ul className='flex-l flex-wrap-l justify-end list ml-auto f6'>
          <li className='mr3-l mb0'>
            <Link to='ristorante' activeClassName='bb bw1 fw7' exact>
              il ristorante
            </Link>
          </li>
          <li className='mr3-l mb0'>
            <Link to='domenico-cilenti' activeClassName='bb bw1 fw7' exact>
              domenico cilenti
            </Link>
          </li>
          <li className='mr3-l mb0'>
            <Link to='menu' activeClassName='bb bw1 fw7' exact>
              menu
            </Link>
          </li>
          <li className='mr3-l mb0'>
            <Link to='staff' activeClassName='bb bw1 fw7' exact>
              staff
            </Link>
          </li>
          <li className='mr3-l mb0'>
            <Link to='prenotazioni' activeClassName='bb bw1 fw7' exact>
              prenotazioni
            </Link>
          </li>
          <li>
            <Link to='contatti' activeClassName='bb bw1 fw7' exact>
              contatti
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
