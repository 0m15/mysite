import React from 'react'
import Link from 'gatsby-link'
import PageTitle from '../components/page-title'
import img0 from '../images/photos/ristorante/4.jpg'
import imgr1 from '../images/photos/ristorante/1.webp'
import imgp from '../images/photos/ristorante/5.webp'
import img4 from '../images/photos/ristorante/7.webp'
import img1 from '../images/photos/1.jpg'
import img2 from '../images/photos/2.jpg'
import img3 from '../images/photos/3.jpg'


const MenuPage = () => (
  <div>
    <PageTitle title='ristorante' />
    <div className='mw7-l center pl5 pr4'>
      {/* <h2 className='ttu tracked f6 mb2'>il ristorante</h2> */}
      <p className='f3'>
        "Porta di Basso" takes its name from the access door of the old town adjacent to the Norman castle of Peschici. First Saracen, then Slava, then destroyed and conquered by the Normans, then Swabian and Angevin and finally Aragonese, the location of the restaurant Porta di Basso is at the heart of the Mediterranean history of Italy. Composed of three rooms, with 8 tables and 13 in summer, it overlooks a majestic steep overhanging view, 90 meters high above sea level.
      </p>
    </div>
    <div className='flex-ns flex-wrap-ns justify-start pl6-l mv4 ml-auto'>
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
          src={imgr1} />
      </div>
    </div>
    <div className='mw7-l center pl5 pr7-l pr5-m pr2'>
      <h2 className='ttu tracked f6 mb2'>the origins</h2>
      <img
        className='db absolute-l left-0-l w-50-m w-20-l fr-m pl3-m mt3-l mb3-m'
        src={imgp} />
      <p className='f6 mb5'>
        The first culinary experiment was born in 1982.
        Mrs. Pina is the owner and cook of the family restaurant. His dry and concrete style, the choice of local ingredients, homemade bread and pasta and the traditional use of the dispossessed formed the future of Domenico who until '88, not yet twenty, helps and manages with his mother. The dishes were based on the honest and accurate tradition of the home cooking of the Cilenti family, made up of the genuineness of the products and the knowledge handed down on a family basis that over time has allowed the stratification of the different culinary traditions of the famous Pisician. This internal biodiversity will form Domenico and accompany him in the choice of the opening of the restaurant "Porta di Basso".
      </p>
      <img
        className='db absolute-l right-0-l w-50-m w-25-l fl-m pr3-m mt3-l mb3-m'
        src={img4} />
      <h2 className='ttu tracked f6 mb2'>
        location
      </h2>
      <p className='f6 mb5'>
        The village of Peschici, where is located the restaurant "Porta di Basso", was founded in the eleventh century by a handful of Slavic soldiers sent by Otto I to face the threat of the Saracens. The Castle of Peschici was built by the Byzantines around the year 970 to protect the Gargano coast and then rebuilt by Frederick II. In Spanish times it became an important bulwark against Turkish incursions.<br/>
        Today it can be visited thanks to an extensive internal restoration.<br/>
        The urban fabric around the Byzantine walls has an intricate morphology, made of alleys, squares, courtyards, stairways, narrow passages, arches and especially white houses, typical of Mediterranean architecture.
        In this scenario, large overhanging windows offer an endless view of the sea with its colors, the bushy trees of wild figs that climb along the steep wall that, in October, offers peace to the nests of seagull.
      </p>
      <h2 className='ttu tracked f6 mb2'>
        works of art
      </h2>
      <p className='f6'>
        The restaurant hosts a permanent exhibition of paintings by the painter Leon Marino and a sculpture by the neo-primitive painter and sculptor Michele Circiello. Marino's works, so suggestive and singular, light up the original archaeological curiosity of the Gargano promontory while among the fragments of earth and fragments of the sculptor Michele Circiello we recognize a sort of auroral transfiguration of the rock motif.
      </p>
    </div>
  </div>
)

export default MenuPage
