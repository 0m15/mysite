import React from 'react'
import Link from 'gatsby-link'

const IndexPage = () => (
  <div>
    <ul style={{ fontSize: '2em', marginTop: '4em'}}>
      <li>
        <Link to='ristorante'>
          the restaurant
        </Link>
      </li>
      <li>
        <Link to='menu'>
          menu
        </Link>
      </li>
      <li>
        <Link to='about'>
          reservations
        </Link>
      </li>
      <li>
        <Link to='about'>
          where we are/contacts
        </Link>
      </li>
    </ul>
  </div>
)

export default IndexPage
