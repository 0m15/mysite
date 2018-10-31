import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import { TimelineLite, TweenLite, TweenMax, Elastic, Back, Power2 } from 'gsap'
import Slideshow, { pan } from '../components/carousel'

const CURSOR_SIZE = 32

class IndexPage extends React.Component {
  render() {
    return (
      <div className="white relative bg-near-black">
        <div className=" pt6 mw7 ph4 center f4">
          coder, digital designer &amp; front-end developer. <br/>
          contact me at simonecarella@gmail.com
        </div>
      </div>
    )
  }
}

export default IndexPage
