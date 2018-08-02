import React from 'react'
import Link from 'gatsby-link'
import img0 from './photos/ristorante/4.jpg'
import img1 from './1.jpg'
import img2 from './2.jpg'
import img3 from './3.jpg'

const MenuPage = () => (
  <div>
    <div className='mw6-l center ph4'>
        <h1 className='f1 normal mb3 absolute-l left-0 pl4-l ma0 pa0 lh-solid'
            style={{ transform: 'rotate(90deg)' }}>
            Menù
        </h1>
        <p className='f6'>
            Al ristorante Porta di Basso, è nostro obiettivo concedere un'esperienza.
            Abbiamo scelto di servire un menu <i>à la carte</i> oppure tre diversi menù degustazione.<br/>
            Il menu delle bevande è stato curato per aggiungere una dimensione extra per ciascuna delle portate. In questo modo possiamo garantire ai nostri ospiti un'esperienza unica e precisa in ogni momento stagionale.
        </p>
        <div className='pv3 f6'>
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
        <ul className='list f6'>
            <li className='ma0'>
                <Link>
                    Prenota un tavolo →
                </Link>
            </li>
            <li className='ma0'>
                <Link>
                    Visualizza il Menu in PDF
                </Link>
            </li>
            <li className='ma0'>
                <Link>
                    Carta dei vini
                </Link>
            </li>
        </ul>
        <p className='f7 mv4 gray italic'><i>Per godere appieno questa esperienza, consigliamo di dedicarsi una serata intera.</i></p>
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
