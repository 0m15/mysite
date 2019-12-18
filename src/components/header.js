import React from 'react'
import Link from 'gatsby-link'

class Header extends React.Component {
  render() {
    return (
      <div className="absolute w-100 pt4 pb4 center z-9999 top-0"  style={{
        // mixBlendMode: 'difference',
      }}>
        <div className="mw9 center ph4 flex">
        <h1 className="f6 ma0">
          <Link to={`/`} className="near-black no-underline">
            S<br/>
            C
          </Link>
        </h1>
        {/* <div className="ml-auto f6 ma0">
          <Link to={`/`} className="near-white no-underline">
            about
          </Link>
        </div> */}
        </div>
      </div>
    )
  }
}

export default Header
