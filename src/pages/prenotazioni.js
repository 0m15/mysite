import React from 'react'
import Link from 'gatsby-link'
import PageTitle from '../components/page-title'
import img0 from './photos/ristorante/4.jpg'
import img1 from './1.jpg'
import img2 from './2.jpg'
import img3 from './3.jpg'

const MenuPage = () => (
  <div>
    <PageTitle title='prenotazioni' />
    <div className='mw6-l center pl5 pr4'>
        <p className='f6'>
            Al ristorante Porta di Basso, è nostro obiettivo concedere un'esperienza.
            Abbiamo scelto di servire un menu <i>à la carte</i> oppure tre diversi menù degustazione.<br/>
            Il menu delle bevande è stato curato per aggiungere una dimensione extra per ciascuna delle portate. In questo modo possiamo garantire ai nostri ospiti un'esperienza unica e precisa in ogni momento stagionale.
        </p>
    </div>
    <div className='flex-ns flex-wrap-ns justify-start pl6-l mv3 ml-auto'>
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
        <img
          className='mt6'
          src={img1} />
      </div>
    </div>
    <div className='mw6-l center ph3'>
        
    </div>
  </div>
)

export default MenuPage
