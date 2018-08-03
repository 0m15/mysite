import React from 'react'
import Link from 'gatsby-link'
import PageTitle from '../components/page-title'


const MenuPage = () => (
  <div>
    <PageTitle title='reservations' />
    <div className='mw6-l center pl5 pr4'>
        <p className='f6'>
            Al ristorante Porta di Basso, è nostro obiettivo concedere un'esperienza.
            Abbiamo scelto di servire un menu <i>à la carte</i> oppure tre diversi menù degustazione.<br/>
            Il menu delle bevande è stato curato per aggiungere una dimensione extra per ciascuna delle portate. In questo modo possiamo garantire ai nostri ospiti un'esperienza unica e precisa in ogni momento stagionale.
        </p>
    </div>
  </div>
)

export default MenuPage
