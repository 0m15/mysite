import React from 'react'
import Link from 'gatsby-link'
import PageTitle from '../components/page-title'
import map from '../images/map.jpg'

const MenuPage = () => (
  <div>
    <PageTitle title='contatti' />
    <main className='mw7-l center pl5 pr4 fw2'>
        <p className='fw3 mb3 f3'>
            via cristoforo colombo, 38<br/>
            peschici - gargano, italy<br/>
            tel: +39 0884 56 34 78<br/>
            email: info@portadibasso.it
        </p>
    </main>
    <p className='tc'>
        <img src={map} className='ml-auto w100 bb mt4' />
    </p>
  </div>
)

export default MenuPage
