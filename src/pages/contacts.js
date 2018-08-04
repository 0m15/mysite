import React from "react"
import Link from "gatsby-link"
import PageTitle from "../components/page-title"
import imgdc from "../images/photos/domenico-cilenti/1.webp"
import img0 from "../images/photos/ristorante/4.jpg"
import img1 from "../images/photos/1.jpg"
import img2 from "../images/photos/2.jpg"
import img3 from "../images/photos/3.jpg"
import { Parallax, ParallaxLayer } from 'react-spring'

const MenuPage = () => (
    <Parallax
      pages={2}
      // scrolling={false}
    >
      <ParallaxLayer speed={0.7} offset={0.25}>
        <PageTitle title="contacts" />
      </ParallaxLayer>
      <ParallaxLayer offset={1.3} speed={0.1} >
        <div className="mw7 center pl4 pr4">
        <p className="f3 fw8 lh-title">
          simonecarella@gmail.com<br />
          +39 328 60 49 566<br />
          I'm based in Bologna, Italy
        </p>
        <ul className="list f6 mt4">
          <li className="ma0">
            <Link>Linkedin →</Link>
          </li>
        </ul>
        </div>
      </ParallaxLayer>
    </Parallax>
)

export default MenuPage
