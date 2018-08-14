import React from 'react'
import Link from 'gatsby-link'
// import img0 from '../images/photos/0.jpg'
// import img1 from '../images/photos/1.jpg'
// import img2 from '../images/photos/2.jpg'
// import img3 from '../images/photos/3.jpg'
import Img from 'gatsby-image'
import PageTitle from '../components/page-title'
import TypeBlurEffect from '../components/type-blur-effect'
import { Parallax, ParallaxLayer } from 'react-spring'

const IndexPage = ({ data }) => {
  console.log('data', data);
  return (
    <div className='mw8 center h-100 flex flex-column justify-center ph4 ph5-l' style={{
    }}>
        <h1 className='ma0 serif f1 fw1 lh-title'>
          <TypeBlurEffect text='Hello,' style={{ fontSize: '4em' }} /><br/>
          <TypeBlurEffect text={'I\'m Simone Carella.'} /><br/>
        </h1>
        <h2 className='ma0 pa0 serif f2 pb4 fw1 lh-title'>
          <TypeBlurEffect
            delay={50}
            text={'graphic design, ui/ux, front-end developer'}
          />
        </h2>
        <p className='ma0 pa0 f6 mt6 fw5 lh-title' style={{
          transform: 'rotate(90deg)',
          position: 'absolute',
          right: 0,
          top: 0,
        }}>
          <a href='mailto:simonecarella@gmail.com' className='db black'>
            simonecarella@gmail.com<br/>
            based in bologna, italy<br/>
          </a>
        </p>
    </div>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query MosaicImageQuery {
    img0: imageSharp(id: { regex: "/rebr.png/" }) {
      sizes(
        maxWidth: 800,
      ) {
        ...GatsbyImageSharpSizes
      }
    }
    img1: imageSharp(id: { regex: "/bbl.jpg/" }) {
      sizes(
        maxWidth: 1240,
        duotone: { highlight: "#FADE3D", shadow: "#ff6600", opacity: 100 },
      ) {
        ...GatsbyImageSharpSizes
      }
    }
    img2: imageSharp(id: { regex: "/plebe.jpg/" }) {
      sizes(
        maxWidth: 600,
        duotone: { highlight: "#ffffff", shadow: "#ff6000", opacity: 100 },
    ) {
        ...GatsbyImageSharpSizes
      }
    }
    img3: imageSharp(id: { regex: "/logos.jpg/" }) {
      sizes(
        maxWidth: 600,
        maxHeight: 800,
        duotone: { highlight: "#ffffff", shadow: "#C96DC3", opacity: 100 },
      ) {
        ...GatsbyImageSharpSizes
      }
    }
  }
`
