module.exports = {
  siteMetadata: {
    title: 'simone carella',
    siteUrl: '',
  },
  plugins: [
    // 'gatsby-plugin-react-next',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: ['gatsby-remark-copy-linked-files'],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: `${__dirname}/data/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: `gatsby-remark-images`,
      options: {
        maxWidth: 1280,
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-29310174-2',
        // puts tracking script in the head instead of the body
        head: false,
        // anonymize ip
        anonymize: true,
        // do not track
        respectDNT: true,
        // // Avoids sending pageview hits from custom paths
        // exclude: ["/preview/**", "/do-not-track/me/too/"],
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: '',
        short_name: '',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#111111',
        display: 'minimal-ui',
        icon: './src/images/icon.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-netlify',
    {
      resolve: `gatsby-plugin-sass`,
      // options: {
      //   postCssPlugins: [require(`postcss-url`)({ url: 'inline' })],
      // },
    },
    `gatsby-plugin-purgecss`,
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/layouts/index.js`),
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        propsMap: {
          width: 'width',
          height: 'height',
          fill: 'fill',
          stroke: 'stroke',
        },
      },
    },
    // 'gatsby-plugin-offline',
    // {
    //   resolve: 'gatsby-plugin-sitemap',
    //   options: {
    //     serialize: ({ site, allSitePage }) =>
    //       allSitePage.edges.map(edge => {
    //         return {  
    //           url: site.siteMetadata.siteUrl + edge.node.path,
    //           changefreq: `monthly`,
    //           priority: 0.7,
    //         }
    //       }),
    //   },
    // },
  ],
}
