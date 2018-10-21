import React from 'react'

const Footer = () => (
  <div className="fixed w-100 bottom-0 z-999 mb2">
    <div className="w4 bt mb3 b--gray" />
    <div className="pl4 pr4 center flex-l flex-wrap-l align-center">
      <h2 className="f7 normal">
        <strong>simone carella</strong>
        <br />
        visual/ui/ux designer<br />front-end developer<br />
        <small>simonecarella@gmail.com</small>
      </h2>
      <div className="ml-auto mt4 mt0-l">
        <ul className="flex-l flex-wrap-l list f7 ttu tracked">
          <li className="mr3-l mb0">
            <a href="https://www.behance.net/ffeuer">behance</a>
          </li>
          <li>
            <a href="mailto:simonecarella@gmail.com">email</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
)

export default Footer
