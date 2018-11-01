import React from 'react'
import TextCover from '../components/text-cover'

const CURSOR_SIZE = 32

class IndexPage extends React.Component {
  render() {
    return (
      <div className="white absolute w-100 z-999">
        <div className="pt6 mw8 ph4 center f4 fade">
          <TextCover coverColor='near-black' text='digital designer &amp; coder' /><br/>
          <TextCover coverColor='near-black' text='works 2014—2018.' />{' '}
          <a className="white hover" href="mailto:simonecarella@gmail.com"><TextCover coverColor='near-black' text='contact me here.' /></a>
          {/* <p className="fade o-0 hidden">
            lorem ipsum dolor
          </p> */}
        </div>
      </div>
    )
  }
}

export default IndexPage
