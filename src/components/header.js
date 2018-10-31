import React from 'react'
import Link from 'gatsby-link'

class Header extends React.Component {
  componentDidMount = () => {
    console.log('mount#jheader')
  }

  render() {
    return (
      <div className="fixed w-100 pt4 pb4 center z-999 top-0">
        <div className="mw7 center ph4">
        <h1 className="f6 ma0">
          <Link to={`/`} className="near-white no-underline">
            simonecarella
          </Link>
        </h1>
        </div>
      </div>
    )
  }
}

export default Header
