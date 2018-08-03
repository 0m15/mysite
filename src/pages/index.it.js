import React from 'react'
import Link from 'gatsby-link'
// import img0 from '../images/photos/0.jpg'
// import img1 from '../images/photos/1.jpg'
// import img2 from '../images/photos/2.jpg'
// import img3 from '../images/photos/3.jpg'
import Img from 'gatsby-image'
import PageTitle from '../components/page-title'
import TypeHoverEffect from '../components/type-hover-effect'

const IndexPage = ({ data }) => {
  console.log('data', data);
  return (
  <main>
    <PageTitle title='portadibasso' />
    <div className='flex-ns flex-wrap-ns ml-auto justify-end pl6-l'>
      <div className='w-50-ns tr-ns'>
        <Img
          sizes={data.img0.sizes}
          className='db w-60-ns ml-auto-ns mb2 mr2' />
        <div className='flex flex-wrap'>
          <div className='w-50-ns'>
            <Img
              sizes={data.img2.sizes}
              className='mb2 pr2-ns' />
          </div>
          <div className='w-50-ns'>
            <Img
              sizes={data.img3.sizes}
              className='pr2-ns' />
          </div>
        </div>
      </div>
      <div className='w-50-ns'>
        <h2 className='f3-ns f4 mt4-ns normal fw1 mb1 l'>
          <strong>contemporary</strong><br/>
          south italian<br/>
          fine dining restaurant
        </h2>
        <Img
          sizes={data.img1.sizes}
          className='' />

        <Link>
          Prenota un tavolo →
        </Link>
      </div>
    </div>
  </main>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query MosaicImageQuery {
    img0: imageSharp(id: { regex: "/photos\/homepage\/0.jpg/" }) {
      sizes(
        maxWidth: 1240,
        duotone: { highlight: "#F9FAEC", shadow: "#A56C2B", opacity: 60 },
        traceSVG: { color: "#A56C2B" }
      ) {
        ...GatsbyImageSharpSizes
      }
    }
    img1: imageSharp(id: { regex: "/photos\/homepage\/1.jpg/" }) {
      sizes(
        maxWidth: 1240,
        duotone: { highlight: "#F9FAEC", shadow: "#A56C2B", opacity: 60 },
        traceSVG: { color: "#A56C2B" }
      ) {
        ...GatsbyImageSharpSizes
      }
    }
    img2: imageSharp(id: { regex: "/photos\/homepage\/2.jpg/" }) {
      sizes(
        maxWidth: 1240,
        duotone: { highlight: "#F9FAEC", shadow: "#A56C2B", opacity: 60 },
        traceSVG: { color: "#A56C2B" }
    ) {
        ...GatsbyImageSharpSizes
      }
    }
    img3: imageSharp(id: { regex: "/photos\/homepage\/3.jpg/" }) {
      sizes(
        maxWidth: 1240,
        duotone: { highlight: "#F9FAEC", shadow: "#A56C2B", opacity: 60 },
        traceSVG: { color: "#A56C2B" }
      ) {
        ...GatsbyImageSharpSizes
      }
    }
  }
`
