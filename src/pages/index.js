import React from 'react'
import Link from 'gatsby-link'
import img0 from './0.jpg'
import img1 from './1.jpg'
import img2 from './2.jpg'
import img3 from './3.jpg'
// import TypeHoverEffect from '../components/type-hover-effect'

const IndexPage = () => (
  <main>
    <div className='flex-ns flex-wrap-ns ml-auto justify-end'>
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
        <h2 className='f2 mt2-ns normal fw3 mb1 l'>
          <strong>contemporary</strong><br/>
          south italian<br/>
          fine dining<br/>
          restaurant
        </h2>
        <img
          className=''
          src={img1} />
      </div>
    </div>
  </main>
)

export default IndexPage
