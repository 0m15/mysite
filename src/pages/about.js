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
      <ParallaxLayer speed={0.5} offset={0.25}>
        <PageTitle title="about" />
      </ParallaxLayer>
      <ParallaxLayer offset={1.05} speed={0.2} >
        <div className="mw7 center pl6pr4">
        {/* <img
            className='pr2-ns absolute-l right-0-l w-25-l mt0-l'
            src={imgdc} /> */}
        <p className="f3 fw8 lh-title">
          UI/UX<br />
          Visual Design<br />
          Front-end development
        </p>
        <p className="f5 fw7 lh-copy pr6-l">
          My name is Simone Carella and I was born in Foggia in 1984.<br />
          Since ~1998, I have been studying graphics and software development as a
          self-taught person. <br />
          Initially by using simple perl scripts to manage text based cms. Then by
          learning php, python and javascript.<br />
          In 2005 I attended a course in Video Design at the IED in Rome for two
          years.<br />
          Since ~2008 I started working, first as a freelancer, then as a
          consultant for several companies operating in Rome, from independent
          publishing (NERO editions) to the public and parastatal sector (ACI
          Informatica, CONI Servizi), to then join small to large web agencies
          and distributed start-up teams. Then, after two experiences with stereomood and musixmatch,
          I started getting more involved in the UI/UX process, as I cured the product design of Rebrandly,
          for the very first mobile and desktop version. Most of the original ui/ux is still in use while
          the user base is growing and the service gains popularity.<br/>
          Since 2016 I have been working with Accurat, an Milan based agency, to
          design and implement infographic systems, dashboards and reporting and
          analytics tools.
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
