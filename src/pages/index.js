import React from 'react'
import Link from 'gatsby-link'
import StackGrid from 'react-stack-grid'
// import TypeHoverEffect from '../components/type-hover-effect'

const IndexPage = () => (
  <main>
    <div className='flex-ns flex-wrap-ns ml-auto justify-end'>
      <div className='w-50-ns tr-ns'>
        <img
          className='db w-60-ns ml-auto-ns mb2 mr2'
          src='photos/home/0570ba_d460eab1ee664134b5fd4b29c9cec7ba.jpg' />
        <div className='flex flex-wrap'>
          <div className='w-50-ns'>
            <img
              className='mb2 pr2-ns'
              src='photos/home/0570ba_0239cf9cc8124a8ab52a558124a5f545.jpg' />
          </div>
          <div className='w-50-ns'>
            <img
              className='pr2-ns'
              src='photos/ristorante/0570ba_020a32628f234242a14a968b84211fe5.jpg' />
          </div>
        </div>
      </div>
      <div className='w-50-ns'>
        <h2 className='f2 mt2-ns normal fw3 mb1 lh1'>
          <strong>contemporary</strong><br/>
          south italian<br/>
          fine dining<br/>
          restaurant
        </h2>
        <img
          className=''
          src='photos/ristorante/0570ba_9a46ed36fd944845b2eb03004050961e.jpg' />
      </div>
    </div>
  </main>
)

export default IndexPage
