import React from 'react'
import Link from 'gatsby-link'
import img0 from './photos/ristorante/4.jpg'
import img1 from './1.jpg'
import img2 from './2.jpg'
import img3 from './3.jpg'

const MenuPage = () => (
  <div>
    <div className='mw6-l center ph4'>
    <h1 className='f1 normal mb3 absolute left-0 pl4-l ma0 pa0 lh-solid'
            style={{
                transform: 'rotate(90deg)',
                transformOrigin: 'left',
                marginLeft: '1em',
                top: 40,
            }}>
            Ristorante
        </h1>
        <p className='f6'>
          "Porta di Basso" prende il nome dalla porta d'accesso del centro storico adiacente al castello Normanno di Peschici. Prima Saracena, poi Slava, poi distrutta e conquistata dai Normanni, poi Sveva e Angioina ed infine Aragonese, la location del ristorante Porta di Basso è al centro della storia mediterranea dell'Italia. Composto da tre ambienti, con 8 tavoli e 13 nella stagione estiva, si affaccia maestosa su una ripida visuale a strapiombo, dell'altezza di 90 metri sul livello del mare. 
          A solo un anno dall'apertura, il ristorante "Porta di Basso" entra nelle prestigiose guida Michelin, Touring Club, Identita Golose, Lonely Planet ed altre prestigiose guide nazionali ed internazionali.
          La cucina di Domenico Cilenti è una commistione di intuizioni, sfumature cromatiche, tecnica ed improvvisazione nelle quali, il rapporto con il territorio e le sue stagioni, diviene orizzonte concettuale entro cui creare i suoi piatti.
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
