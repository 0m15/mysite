module.exports = {
  siteMetadata: {
    title: 'simc',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-yaml',
    'gatsby-transformer-remark',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/data/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: 'gatsby-plugin-i18n',
      options: {        
        langKeyDefault: 'it',
        useLangKeyLayout: false,
      }
    }
  ],
}
