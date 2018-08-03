import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Header from '../components/header'
import Footer from '../components/footer'
import { getCurrentLangKey, getLangs, getUrlForLang } from 'ptz-i18n'
import { IntlProvider } from 'react-intl'
import 'intl'
import 'tachyons'
import './index.css'

const Layout = ({ children, data, location, i18nMessages }) => {
  const url = location.pathname
  const { langs, defaultLangKey } = data.site.siteMetadata.languages
  const langKey = getCurrentLangKey(langs, defaultLangKey, url)
  const homeLink = `/${langKey}/`
  const langsMenu = getLangs(langs, langKey, getUrlForLang(homeLink, url))

  return (
    <IntlProvider
      locale={langKey}
      messages={i18nMessages}
    >
      <div
        className=''>
        <Helmet
          title={'domenico cilenti porta di basso peschici'}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        />
        <Header
          siteTitle={data.site.siteMetadata.title}
          messages={i18nMessages}
          lang={langKey}
        />
        <main style={{ minHeight: '40vh' }}>
          {children()}
        </main>
        <Footer
          siteTitle={data.site.siteMetadata.title}
        />
      </div>
    </IntlProvider>
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
        languages {
          defaultLangKey
          langs
        }
      }
    }
  }
`
