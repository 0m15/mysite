import React from 'react'
import Link from 'gatsby-link'

const Page = ({
    title,
    description,
    links,
    children,
}) => (
    <h1
      style={{
        // fontSize: '15em',
        // zIndex: -1,
        // whiteSpace: 'nowrap',
      }}
      className='f1 tc mt6 mb7 lh-solid fw8 pa0'>
        {title}.<br/>
        <span>

        </span>
    </h1>
)

export default Page
