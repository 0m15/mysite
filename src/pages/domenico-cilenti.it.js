import React from 'react'
import Link from 'gatsby-link'
import PageTitle from '../components/page-title'
import imgdc from '../images/photos/domenico-cilenti/1.webp'
import img0 from '../images/photos/ristorante/4.jpg'
import img1 from '../images/photos/1.jpg'
import img2 from '../images/photos/2.jpg'
import img3 from '../images/photos/3.jpg'

const MenuPage = () => (
  <div>
    <PageTitle title='domenico cilenti' />
    <div className='mw7-l center pl5 pr4 mb4'>
      {/* <h2 className='ttu tracked f6 mb2'>il ristorante</h2> */}
      <p className='f3'>
      Domenico Cilenti è executive chef, chef manager e patron del ristorante "Porta di Basso" in Peschici.
      </p>
    </div>
    <div className='mw7-l center pl5 pr7-l pr5-m pr2'>
        <img
            className='pr2-ns absolute-l right-0-l w-25-l mt5-l'
            src={imgdc} />
        <p className='f6'>
            Nato a Peschici nel 1972, trascorre gran parte della sua iniziale carriera culinaria nella cucina del ristorante di famiglia. Successivamente parte alla volta della Svizzera dove lavorerà come sous chef nelle cucine dello Chef
            Dario Ranza, excutive chef della Villa Principe Leopoldo di Lugano.
            A partire dal 2003, data di apertura del ristorante "Porta di Basso", il territorio del Gargano, relativamente sconosciuto ai più, diventa tesoro del mondo culinario internazionale grazie al lavoro di Domenico e di altri chef regionali esponenti di spicco della cucina d'innovazione pugliese. La cucina di Domenico è focalizzata sulla creazione di un'esperienza totale fatta di sfumature nette, di sapori brillanti tipici del sud Italia, composta da prodotti interamente biologici, biodinamici o selvatici. «Aprire il ristorante Porta di Basso ci è sembrato il modo migliore per far trasparire nei piatti la naturale complessità degli elementi che compongono il nostro territorio », spiega Domenico. Lo stile audace che caratterizza gli abbinamenti dei suoi piatti gli permette nel 2003, ad un anno appena dall'apertura, di entrare nella guida Michelin, Gambero Rosso, l'Espresso e altre riviste nazionali ed internazionali. Nel 2006 vince il premio come miglior giovane chef della Puglia, nel 2008 quello di miglior giovane chef  del mezzogiorno a cura di Luigi Cremona, noto giornalista del mondo culinario e nello stesso anno viene insignito del titolo di chef dell’anno in Puglia.
            Oggi Domenico Cilenti è riconosciuto come uno dei più influenti cousine Chefs pugliesi nel mondo. Dal 2009 al 2011  diventa uno dei cuochi del famoso programma “La Prova del Cuoco” condotto da Antonella Clerici su Rai Uno. Dal 2011 diventa uno dei curatori insieme al FOOD SUD SYSTEM (collettivo di chef) degli
            eventi enogastronomici del "We are in Puglia".
            Oggi vive felicemente con Annalisa e le sue figlie Ludovica di 5 anni e Sveva di 2.
            I menu degustazione di Domenico sono composti da più 20 portate. Prendono la tradizione culinaria del sud Italia, riportandola all'essenziale per poi ricomporla in una narrativa completamente nuova. Una sosta al ristorante "Porta di Basso" trasporterà gli ospiti in un tour culinario mozzafiato del Gargano, viaggiando tra i climi miti ed assolati dell'unica punta del litorale adriatico, caratterizzato dal pescato e i suoi riflessi, dal colore più caldo della Foresta Umbra, una delle più vecchie e selvaggie riserve naturali d'Italia fin attraverso il Lago di Varano e la sua peculiare tradizione di pesca.
            Tutto questo, come i sapori di Domenico, sono presenti nei piatti del "Porta di Basso"
        </p>
        <ul className='list f6 mt4'>
            <li className='ma0'>
                <Link>
                    Bio PDF →
                </Link>
            </li>
        </ul>
    </div>
  </div>
)

export default MenuPage
