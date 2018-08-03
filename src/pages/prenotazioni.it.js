import React from 'react'
import Link from 'gatsby-link'
import PageTitle from '../components/page-title'

const MenuPage = () => (
  <div>
    <PageTitle title='prenotazioni' />
    <div className='mw7-l center pl5 pr4'>
      <p className='f3'>
        Le prenotazioni possono essere effettuate via telefono o per email
      </p>
      <p className='mv4'>
        Siamo aperti dal lunedì alla domenica<br/>
        a pranzo e cena
      </p>
      <p className='mv4'>
        CHIUSURA<br/>
        gennaio e febbraio<br/>
        (solo su prenotazione)
      </p>
      <p className='mv4'>
        ORARI DI SERVIZIO:<br/>
        12:00 - 15:00, 19:00 - 22:00<br/>
        SABATO: 19:00 - 22:00
      </p>
      <div>
        <form method="POST" action="https://formspree.io/simonecarella@gmail.com">
        <div className='pv2'>
          <input type="text" name="nome" placeholder="Nome e cognome" />
        </div>
          <div className='pv2'>
            <input type="email" name="email" placeholder="Your email" />
          </div>
          <div className='pv2'>
            <textarea name="message" placeholder="Your message"></textarea>
          </div>
          <div className='pv2'>
            <button type="submit">Send</button>
          </div>
        </form>
      </div>
    </div>
  </div>
)

export default MenuPage
