import React from 'react'
import TextCover from '../components/text-cover'
import Cover from '../components/cover'

const CURSOR_SIZE = 32

class IndexPage extends React.Component {
  render() {
    return (
      <div className="white absolute w-100 z-999">
        <div className="pt6 mw8 ph4 center f4 fade">
          <Cover/>
          {/* <p className="fade o-0 hidden">
            lorem ipsum dolor
          </p> */}
        </div>
      </div>
    )
  }
}

export default IndexPage
