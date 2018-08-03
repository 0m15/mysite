import React from 'react'
import Link from 'gatsby-link'
import { FormattedMessage } from 'react-intl'

const Header = ({ siteTitle, lang, messages }) => {
  console.log('messages', messages);
  return (
    <div className='pt4 pb4 mb5'>
      <div>
        <h1 className='f7 pl4 w5 absolute'>
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
        </h1>
        <div className='absolute left-0 w3 bt mb1 b--gray' style={{ top: 82 }} />
        <div className='w100 ph4 tr ml-auto'>
          <ul className='flex-l flex-wrap-l justify-end list ml-auto f6'>
            <li className='mr3-l mb0'>
              <Link to={messages['restaurant']} activeClassName='bb bw1 fw7' exact>
                <FormattedMessage id='restaurant' />
              </Link>
            </li>
            <li className='mr3-l mb0'>
              <Link to='domenico-cilenti' activeClassName='bb bw1 fw7' exact>
                <FormattedMessage id='domenico cilenti' />
              </Link>
            </li>
            <li className='mr3-l mb0'>
              <Link to={messages['menu']} activeClassName='bb bw1 fw7' exact>
                <FormattedMessage id='menu' />
              </Link>
            </li>
            <li className='mr3-l mb0'>
              <Link to={messages['staff']} activeClassName='bb bw1 fw7' exact>
                <FormattedMessage id='staff' />
              </Link>
            </li>
            <li className='mr3-l mb0'>
              <Link to={messages['restaurant']} activeClassName='bb bw1 fw7' exact>
                <FormattedMessage id='prenotazioni' />
              </Link>
            </li>
            <li className='mr3-l mb0'>
              <Link to={messages['eventi']} activeClassName='bb bw1 fw7' exact>
                <FormattedMessage id='eventi' />
              </Link>
            </li>
            <li>
              <Link to={messages['contatti']} activeClassName='bb bw1 fw7' exact>
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
