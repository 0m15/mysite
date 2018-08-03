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
        "Porta di Basso" prende il nome dalla porta d'accesso del centro storico adiacente al castello Normanno di Peschici. Prima Saracena, poi Slava, poi distrutta e conquistata dai Normanni, poi Sveva e Angioina ed infine Aragonese, la location del ristorante Porta di Basso è al centro della storia mediterranea dell'Italia. Composto da tre ambienti, con 8 tavoli e 13 nella stagione estiva, si affaccia maestosa su una ripida visuale a strapiombo, dell'altezza di 90 metri sul livello del mare.
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
      <h2 className='ttu tracked f6 mb2'>le origini</h2>
      <img
        className='db absolute-l left-0-l w-50-m w-20-l fr-m pl3-m mt3-l mb3-m'
        src={imgp} />
      <p className='f6 mb5'>
        Il primo esperimento culinario nasce nel '82. <br/>
        La signora Pina è titolare e cuoca del ristorante di famiglia. Il suo stile asciutto e concreto, la scelta degli ingredienti del territorio, il pane e la pasta fatti in casa e l'utilizzo tradizionale degli ingriedenti formarono il futuro di Domenico che fino all'88, non ancora ventenne, aiuta e gestisce con la mamma. I piatti affondavano nella tradizione onesta e accurata della cucina casalinga della famiglia Cilenti, fatta della genuinità dei prodotti e da quella conoscenza tramandata su base familiare che ha permesso nel tempo lo stratificarsi delle singole diverse tradizioni culinarie delle famigie peschiciane.
        Questa biodiversità interna formerà Domenico e lo accompagnerà nella scelta dell'apertura del ristorante "Porta di Basso".
      </p>
      <img
        className='db absolute-l right-0-l w-50-m w-25-l fl-m pr3-m mt3-l mb3-m'
        src={img4} />
      <h2 className='ttu tracked f6 mb2'>
        la location
      </h2>
      <p className='f6 mb5'>
        Il borgo di Peschici, dove è ubicato il ristorante "Porta di Basso", fu fondato nell'XI secolo da un manipolo di soldati slavi inviati da Ottone I per far fronte alla minaccia dei saraceni. Il Castello di Peschici fu costruito dai bizantini intorno all'anno 970 per proteggere la costa garganica e ricostruito poi da Federico II. Divenne in epoca spagnola un importante baluardo contro le incursioni turche.<br/>
        E’ oggi visitabile grazie ad una vasta opera di restauro interno.<br/>
        Il tessuto urbano intorno le mura bizantine presenta una morfologia intricatissima, fatta di vicoli, piazzette, corti, scalinate, stretti passaggi, archi e soprattutto case bianche, tipiche dell'architettura mediterranea.<br/>
        In questo scenario, grandi finestroni a strapiombo, offrono la vista sconfinata del mare con i suoi colori, gli alberi cespugliosi di fichi spontanei che si inerpicano lungo la parete ripida che, ad ottobre, offre pace ai nidi di gabbiano.
      </p>
      <h2 className='ttu tracked f6 mb2'>
        le opere
      </h2>
      <p className='f6'>
        Il Ristorante Porta ospita una mostra permanente di quadri del pittore Leon Marino ed una scultura del pittore e scultore neoprimitivo Michele Circiello. Le opere di Marino, così suggestive e singolari, accendono la curiosità archeologica originaria del promontorio garganico mentre tra i frammenti di terra e schegge dello scultore Michele Circiello riconosciamo una specie di aurorale trasfigurazione del motivo rupestre.
      </p>
    </div>
  </div>
)

export default MenuPage
