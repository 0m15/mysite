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
            Domenico Cilenti
        </h1>
        <p className='f6'>
            Domenico Cilenti è executive chef, chef manager e patron del ristorante "Porta di Basso" in Peschici. Nato a Peschici nel 1972, trascorre gran parte della sua iniziale carriera culinaria nella cucina del ristorante di famiglia. Successivamente parte alla volta della Svizzera dove lavorerà come sous chef nelle cucine dello Chef
            Dario Ranza, excutive chef della Villa Principe Leopoldo di Lugano.
            A partire dal 2003, data di apertura del ristorante "Porta di Basso", il territorio del Gargano, relativamente sconosciuto ai più, diventa tesoro del mondo culinario internazionale grazie al lavoro di Domenico e di altri chef regionali esponenti di spicco della cucina d'innovazione pugliese. La cucina di Domenico è focalizzata sulla creazione di un'esperienza totale fatta di sfumature nette, di sapori brillanti tipici del sud Italia, composta da prodotti interamente biologici, biodinamici o selvatici. «Aprire il ristorante Porta di Basso ci è sembrato il modo migliore per far trasparire nei piatti la naturale complessità degli elementi che compongono il nostro territorio », spiega Domenico. Lo stile audace che caratterizza gli abbinamenti dei suoi piatti gli permette nel 2003, ad un anno appena dall'apertura, di entrare nella guida Michelin, Gambero Rosso, l'Espresso e altre riviste nazionali ed internazionali. Nel 2006 vince il premio come miglior giovane chef della Puglia, nel 2008 quello di miglior giovane chef  del mezzogiorno a cura di Luigi Cremona, noto giornalista del mondo culinario e nello stesso anno viene insignito del titolo di chef dell’anno in Puglia.
            Oggi Domenico Cilenti è riconosciuto come uno dei più influenti cousine Chefs pugliesi nel mondo. Dal 2009 al 2011  diventa uno dei cuochi del famoso programma “La Prova del Cuoco” condotto da Antonella Clerici su Rai Uno. Dal 2011 diventa uno dei curatori insieme al FOOD SUD SYSTEM (collettivo di chef) degli
            eventi enogastronomici del "We are in Puglia".
            Oggi vive felicemente con Annalisa e le sue figlie Ludovica di 5 anni e Sveva di 2.
            I menu degustazione di Domenico sono composti da più 20 portate. Prendono la tradizione culinaria del sud Italia, riportandola all'essenziale per poi ricomporla in una narrativa completamente nuova. Una sosta al ristorante "Porta di Basso" trasporterà gli ospiti in un tour culinario mozzafiato del Gargano, viaggiando tra i climi miti ed assolati dell'unica punta del litorale adriatico, caratterizzato dal pescato e i suoi riflessi, dal colore più caldo della Foresta Umbra, una delle più vecchie e selvaggie riserve naturali d'Italia fin attraverso il Lago di Varano e la sua peculiare tradizione di pesca.
            Tutto questo, come i sapori di Domenico, sono presenti nei piatti del "Porta di Basso"
        </p>
        <ul className='list f6'>
            <li className='ma0'>
                <Link>
                    Bio PDF →
                </Link>
            </li>
        </ul>
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
  </div>
)

export default MenuPage
