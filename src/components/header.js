import React from 'react'
import Link from 'gatsby-link'

class Header extends React.Component {
  componentDidMount = () => {
    console.log('mount#jheader')
  }

  render() {
    return (
      <div className="fixed w-100 pt4 pb4 center z-999 top-0">
        <div className="mw7 center ph4 flex">
        <h1 className="f6 ma0">
          <Link to={`/`} className="near-white no-underline">
            Sc
          </Link>
        </h1>
        <div className="ml-auto f6 ma0">
          <Link to={`/`} className="near-white no-underline">
            about
          </Link>
        </div>
        </div>
      </div>
    )
  }
}

export default Header
