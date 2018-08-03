import React from 'react'
import Link from 'gatsby-link'
import img0 from '../images/photos/0.jpg'
import img1 from '../images/photos/1.jpg'
import img2 from '../images/photos/2.jpg'
import img3 from '../images/photos/3.jpg'
import PageTitle from '../components/page-title'
import TypeHoverEffect from '../components/type-hover-effect'

const IndexPage = () => (
  <main>
    <PageTitle title='portadibasso' />
    <div className='flex-ns flex-wrap-ns ml-auto justify-end pl6-l'>
      <div className='w-50-ns tr-ns'>
        <img
          className='db w-60-ns ml-auto-ns mb2 mr2'
          src={img0} />
        <div className='flex flex-wrap'>
          <div className='w-50-ns'>
            <img
              className='mb2 pr2-ns'
              src={img2} />
          </div>
          <div className='w-50-ns'>
            <img
              className='pr2-ns'
              src={img3} />
          </div>
        </div>
      </div>
      <div className='w-50-ns'>
        <h2 className='f3-ns f4 mt4-ns normal fw1 mb1 l'>
          <strong>contemporary</strong><br/>
          south italian<br/>
          fine dining restaurant
        </h2>
        <img
          className=''
          src={img1} />

        <Link to='en/prenotazioni'>
          Book a table →
        </Link>
      </div>
    </div>
  </main>
)

export default IndexPage
