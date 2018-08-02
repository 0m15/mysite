import React from 'react'
import Link from 'gatsby-link'

const Page = ({
    title,
    description,
    links,
    children,
}) => (
    <h1 className='f1 normal mb3 fixed left-0 pl5 ml3 ma0 pa0 lh-solid'
        style={{
            transform: 'rotate(90deg)',
            transformOrigin: 'left',
            top: 40,
            whiteSpace: 'nowrap',
            fontSize: '5em',
        }}>
        {title}
    </h1>
)

export default Page
