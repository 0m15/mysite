import React from 'react'
import Link from 'gatsby-link'
import PageTitle from '../components/page-title'
import img0 from '../images/photos/ristorante/4.jpg'
import img1 from '../images/photos/1.jpg'
import img2 from '../images/photos/2.jpg'
import img3 from '../images/photos/3.jpg'

const MenuPage = () => (
  <div>
    <PageTitle title='menu' />
    <div className='mw7-l center pl5 pr4'>
        <p className='f3'>
          At the Porta di Basso restaurant, it is our goal to grant an experience.<br/>
          We have chosen to serve an à la carte menu or three different tasting menus.<br/>
          The beverage menu has been designed to add an extra dimension to each course. In this way we can guarantee our guests a unique and precise experience at any time of the season.
        </p>
    </div>
    <div className='mw7-l center pl5 pr4'>
        <div className='pv3 f5 mt4 mb4'>
            <h2 className='f6 tracked ttu mb2'>tasting menus</h2>
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
                    Reserve a table →
                </Link>
            </li>
            <li className='ma0'>
                <Link>
                    View PDF Menu
                </Link>
            </li>
            <li className='ma0'>
                <Link>
                    View wine list
                </Link>
            </li>
        </ul>
        <p className='f7 mv4 gray i'>
          To fully enjoy this experience, we recommend an entire evening.
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
