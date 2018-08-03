import React from 'react'
import graphql from 'graphql'
import Layout from './index'
import { addLocaleData } from 'react-intl'

import messages from '../../data/messages/it'
import it from 'react-intl/locale-data/it'
import 'intl/locale-data/jsonp/it'

addLocaleData(it)

export default (props) => (
  <Layout
    {...props}
    i18nMessages={messages}
  />)

export const pageQuery = graphql`
  query LayoutIt {
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
