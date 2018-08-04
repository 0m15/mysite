import React from 'react'
import Link from 'gatsby-link'
import PageTitle from '../components/page-title'
import { Parallax, ParallaxLayer } from 'react-spring'

const MenuPage = () => (
  <Parallax pages={2}>
    <ParallaxLayer offset={0.25} speed={0.7}>
      <PageTitle title='works' />
    </ParallaxLayer>
    <ParallaxLayer offset={1.1} speed={0.1}>
        <div  className='mw7-l center pl3 pr4 pl4-l pr5-l fw6' style={{ height: 1200 }}>
        <div className='pv3 f5 mt2 mb2'>
            <h2 className='f6 fw1 mb2'>Front-end</h2>
            <div className='flex  bb b--light-gray pv1'>
                <div>Unicredit</div>
                <div className='ml-auto gray f6'>Accurat</div>
            </div>
            <div className='flex  bb b--light-gray pv1'>
                <div>Findomestic</div>
                <div className='ml-auto gray f6'>Accurat</div>
            </div>
            <div className='flex  bb b--light-gray pv1'>
                <div>Sanofi</div>
                <div className='ml-auto gray f6'>Accurat</div>
            </div>
            <div className='flex  bb b--light-gray pv1'>
                <div>Celli group</div>
                <div className='ml-auto gray f6'>Accurat</div>
            </div>
            <div className='flex bb b--light-gray pv1'>
                <div>Musixmatch</div>
            </div>
            <div className='flex  bb b--light-gray pv1'>
                <div>Cortos – La martina</div>
                <div className='ml-auto gray f6'>Collateral</div>
            </div>

        </div>
        <div className='pv3 f5 mt2 mb2'>
            <h2 className='f6 fw1 mb2'>UI/UX</h2>
            <div className='flex bb b--light-gray pv1'>
                <div>Rebrandly</div>
            </div>
            <div className='flex  bb b--light-gray pv1'>
                <div>Celli group</div>
                <div className='ml-auto gray f6'>Accurat</div>
            </div>
            <div className='flex  bb b--light-gray pv1'>
                <div>Portadibasso</div>
            </div>
            <div className='flex  bb b--light-gray pv1'>
                <div>Gli orti di malva</div>
            </div>
            <div className='flex  bb b--light-gray pv1'>
                <div>Cortos – La martina</div>
                <div>Collateral</div>
            </div>
        </div>
        </div>
    </ParallaxLayer>
  </Parallax>
)

export default MenuPage
