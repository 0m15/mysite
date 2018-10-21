import React from 'react'
import Link from 'gatsby-link'

const Header = ({ siteTitle, lang }) => {
  return (
    <div className="fixed w-100 pt4 pb4 center pl3 pl4 z-999">
      <div className="flex items-start">
        <h1 className="f6 w5 ma0">
          <Link to={`/`} className="near-black">
            simc
          </Link>
        </h1>
        <div className="w100 tr ml-auto pr4 pr5-l">
          <ul className="flex-l flex-wrap-l justify-end list ml-auto f6">
            <li className="mr3-l mb0">
              <Link to={'/'} className="" activeClassName="bb bw1 fw7" exact>
                home
              </Link>
            </li>
            <li className="mr3-l mb0">
              <Link
                to={`/about`}
                className=""
                activeClassName="bb bw1 fw7"
                exact
              >
                about
              </Link>
            </li>
            <li className="mr3-l mb0">
              <Link
                to={'/works'}
                className=""
                activeClassName="bb bw1 fw7"
                exact
              >
                works
              </Link>
            </li>
            {/* <li className='mr3-l mb0'>
              <Link
                to={`/blog`}
                className=''
                activeClassName='bb bw1 fw7' exact>
                blog
              </Link>
            </li> */}
            <li>
              <Link
                to={`/contacts`}
                className=""
                activeClassName="bb bw1 fw7"
                exact
              >
                contacts
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Header
