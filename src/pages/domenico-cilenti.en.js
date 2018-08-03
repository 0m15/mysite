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
        Domenico Cilenti is executive chef, chef manager and patron of the restaurant "Porta di Basso" in Peschici.
      </p>
    </div>
    <div className='mw7-l center pl5 pr7-l pr5-m pr2'>
        <img
            className='pr2-ns absolute-l right-0-l w-25-l mt5-l'
            src={imgdc} />
        <p className='f6'>
            Born in Peschici in 1972, he spent much of his initial culinary career in the kitchen of his family restaurant. He then set off for Switzerland, where he worked as a sous chef in the kitchens of Chef Dario Ranza, excutive chefs at the Villa Principe Leopoldo in Lugano. Since 2003, the date of opening of the restaurant "Porta di Basso", the territory of Gargano, relatively unknown to most, becomes a treasure of the international culinary world thanks to the work of Domenico and other regional chefs leading exponents of innovative Apulian cuisine. Domenico's cuisine is focused on the creation of a total experience made of sharp nuances, of brilliant flavors typical of southern Italy, composed of entirely organic, biodynamic or wild products. "Opening the Porta di Basso restaurant seemed to us the best way to reveal in the dishes the natural complexity of the elements that make up our territory," Domenico explains. The bold style that characterizes the combinations of his dishes allows him in 2003, just one year after opening, to enter the Michelin guide, Gambero Rosso, l'Espresso and other national and international magazines. In 2006 he won the prize for best young chef in Apulia, in 2008 he won the prize for best young chef at noon by Luigi Cremona, a well-known journalist in the culinary world and in the same year he was awarded the title of chef of the year in Apulia. Today Domenico Cilenti is recognized as one of the most influential Apulian cousins Chefs in the world. From 2009 to 2011 he became one of the cooks of the famous program "The Chef's Test" conducted by Antonella Clerici on Rai Uno. Since 2011 he has been one of the curators together with FOOD SUD SYSTEM (collective of chefs) of the food and wine events of "We are in Puglia". Today he lives happily with Annalisa and her daughters Ludovica of 5 years and Sveva of 2. Domenico's tasting menus consist of more than 20 courses. They take the culinary tradition of southern Italy, bringing it back to the essentials and then recomposing it in a completely new narrative. A stop at the restaurant "Porta di Basso" will take guests on a breathtaking culinary tour of the Gargano, traveling through the mild and sunny climates of the only tip of the Adriatic coast, characterized by fish and its reflections, the warmest color of the Umbrian Forest, one of the oldest and wildest nature reserves in Italy through the Lake of Varano and its unique fishing tradition. All this, like the flavors of Domenico, are present in the dishes of the "Porta di Basso".
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
