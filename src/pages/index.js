import React from 'react'
import TextCover from '../components/text-cover'

const CURSOR_SIZE = 32

class IndexPage extends React.Component {
  render() {
    return (
      <div className="white relative bg-near-black">
        <div className="pt6 mw7 ph4 center f4 fade">
          <TextCover coverColor='near-black' text='digital designer &amp; coder' /><br/>
          <TextCover coverColor='near-black' text='works 2014—2018' />
          {/* <p className="fade o-0 hidden">
            lorem ipsum dolor
          </p> */}
        </div>
      </div>
    )
  }
}

export default IndexPage
