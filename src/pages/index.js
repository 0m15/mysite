import React from 'react'
import Link from 'gatsby-link'
import TypeHoverEffect from '../components/type-hover-effect'

const IndexPage = () => (
  <div>
    <ul style={{ fontSize: '2em', marginTop: '4em'}}>
      <li>
        <Link to='ristorante'>
          il ristorante
        </Link>
      </li>
      <li>
        <Link to='menu'>
          menu
        </Link>
      </li>
      <li>
        <Link to='about'>
          prenotazioni
        </Link>
      </li>
      <li>
        <Link to='about'>
          dove siamo/contatti
        </Link>
      </li>
    </ul>
  </div>
)

export default IndexPage
