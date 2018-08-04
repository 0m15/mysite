import React from 'react'
import Link from 'gatsby-link'
// import img0 from '../images/photos/0.jpg'
// import img1 from '../images/photos/1.jpg'
// import img2 from '../images/photos/2.jpg'
// import img3 from '../images/photos/3.jpg'
import Img from 'gatsby-image'
import PageTitle from '../components/page-title'
import TypeHoverEffect from '../components/type-hover-effect'
import { Parallax, ParallaxLayer } from 'react-spring'

const IndexPage = ({ data }) => {
  console.log('data', data);
  return (
    <div>
    <Parallax pages={2} style={{
      top: 0,
    }}>
      <div className='flex-ns flex-wrap-ns justify-start mw8 center'>
      <ParallaxLayer offset={0.72} speed={0.5}>
        <div className='w-33-ns tr-ns'>
          <Img
            sizes={data.img0.sizes}
            className='db w-60-ns ml-auto-ns mb3 mr3' />
          <div className='flex flex-wrap'>
            <div className='w-50-ns'>
              <Img
                sizes={data.img2.sizes}
                className='mb2 mr3-ns' />
            </div>
            <div className='w-50-ns'>
              <Img
                sizes={data.img3.sizes}
                className='mr3-ns' />
            </div>
          </div>
        </div>
      </ParallaxLayer>
      <ParallaxLayer offset={0.5} speed={0.2} className='w-50-ns ml-auto' style={{ marginLeft: '33%'}}>
        <div className='w-50-ns'>
          <h2 className='f2-ns mt4-ns fw9 fw1 mb1 lh-title'>
            <strong>visual & digital designer</strong><br/>
            front end developer<br/>
          </h2>
          <Img
            sizes={data.img1.sizes}
            className='' />
        </div>
      </ParallaxLayer>
      <ParallaxLayer offset={1.5} speed={0.7} className='w-50-ns ml-auto' style={{ marginLeft: '50%'}}>
        <div className='w-50-ns'>
        <h2 className='f3-ns f4 mt4-ns mb1 fw2 l'>
          <strong className='fw8'>contact me</strong><br/>
          simonecarella@gmail.com<br/>
        </h2>
        </div>
      </ParallaxLayer>
      </div>
    </Parallax>
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
