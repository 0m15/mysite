import React from 'react'
import Link from 'gatsby-link'
import PageTitle from '../components/page-title'

const MenuPage = () => (
  <div>
    <PageTitle title='menu' />
    <div className='mw7-l center pl5 pr4'>
        <p className='f3'>
            Eventi description
        </p>
    </div>
    <div className='mw7-l center pl5 pr4'>
        <div className='pv3 f5 mt4 mb4'>
            <h2 className='f6 tracked ttu mb2'>I menu degustazione</h2>
            <div className='flex bb b--light-gray pv1'>
                <div>Orti e Porti di Puglia</div>
                <div className='ml-auto'>€40</div>
            </div>
            <div className='flex  bb b--light-gray pv1'>
                <div>Made in Puglia</div>
                <div className='ml-auto'>€50</div>
            </div>
            <div className='flex  bb b--light-gray pv1'>
                <div>In onore di Carlo Perini</div>
                <div className='ml-auto'>€60</div>
            </div>
        </div>
    </div>
  </div>
)

export default MenuPage
