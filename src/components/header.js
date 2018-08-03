import React from 'react'
import Link from 'gatsby-link'
import { FormattedMessage } from 'react-intl'
import logo from '../images/images/logo_01.png'

const Header = ({ siteTitle, lang, messages }) => {
  const defaultLang = lang || 'it'
  return (
    <div className='pt4 pb4 mb5'>
      <div>
        <Link
          to={`/${lang}/`}
          style={{
            textDecoration: 'none',
            fontWeight: 'normal',
          }}
        >
          <img src={logo} width={140} className='absolute' style={{ top: 0, left: 20 }} />
        </Link>
        {/* <h1 className='f7 pl4 w5 absolute'>
          <Link
            to={`/${lang}/`}
            style={{
              textDecoration: 'none',
              fontWeight: 'normal',
            }}
          >
          &nbsp;&nbsp;domenico cilenti<br/>
          <strong>portadibasso</strong><br/>
          peschici
          </Link>
        </h1> */}
        <div className='absolute left-0 w3 bt mb1' style={{ top: 82 }} />
        <div className='w100 ph4 tr ml-auto'>
          <ul className='flex-l flex-wrap-l justify-end list ml-auto f6'>
            <li className='mr3-l mb0'>
              <Link
                to={`/${lang}/${messages['restaurant']}`}
                className='near-black'
                activeClassName='bb bw1 fw7' exact>
                <FormattedMessage id='restaurant' />
              </Link>
            </li>
            <li className='mr3-l mb0'>
              <Link
                to={`/${lang}/${messages['domenico cilenti'].replace(' ', '-')}`}
                className='near-black'
                activeClassName='bb bw1 fw7' exact>
                <FormattedMessage id='domenico cilenti' />
              </Link>
            </li>
            <li className='mr3-l mb0'>
              <Link
                to={`/${lang}/${messages['menu']}`}
                className='near-black'
                activeClassName='bb bw1 fw7' exact>
                <FormattedMessage id='menu' />
              </Link>
            </li>
            <li className='mr3-l mb0'>
              <Link
                to={`/${lang}/${messages['staff']}`}
                className='near-black'
                activeClassName='bb bw1 fw7' exact>
                <FormattedMessage id='staff' />
              </Link>
            </li>
            <li className='mr3-l mb0'>
              <Link
                to={`/${lang}/${messages['prenotazioni']}`}
                className='near-black'
                activeClassName='bb bw1 fw7' exact>
                <FormattedMessage id='prenotazioni' />
              </Link>
            </li>
            <li className='mr3-l mb0'>
              <Link
                to={`/${lang}/${messages['eventi']}`}
                className='near-black'
                activeClassName='bb bw1 fw7' exact>
                <FormattedMessage id='eventi' />
              </Link>
            </li>
            <li>
              <Link
                to={`/${lang}/${messages['contatti']}`}
                className='near-black'
                activeClassName='bb bw1 fw7' exact>
                <FormattedMessage id='contatti' />
              </Link>
            </li>
            <li className='gray ml5-l'>
              <Link to={lang === 'en' ? '/it/' : '/en/'}>
                <FormattedMessage id='english' />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Header
