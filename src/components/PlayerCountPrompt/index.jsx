import React from 'react'
import TypeWriter from '../TypeWriter'
import InputContainer from '../InputContainer'
import { hashHistory } from 'react-router'

class PlayerCount extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showOptions: false
    }
    this.handleTypeWriterFinishEvent = this.handleTypeWriterFinishEvent.bind(this)
    this.handlePlayerCountClick = this.handlePlayerCountClick.bind(this)
  }
  handleTypeWriterFinishEvent (type) {
    if (type === 'typing') {
      this.setState({
        showOptions: type === 'typing'
      })
    } else {
      hashHistory.push('/players')
    }
  }
  handlePlayerCountClick (count) {
    console.log(count)
    hashHistory.push('/')
  }
  render () {
    return (
      <div>
        <TypeWriter
          message='How many players?'
          status='typing'
          startDelay={2000}
          keystrokeDelay={80}
          onFinish={this.handleTypeWriterFinishEvent}
        />
        <InputContainer visible={this.state.showOptions}>
          <div>
            <button onClick={() => {this.handlePlayerCountClick(0)}}>
              Zero
            </button>
            <button onClick={() => {this.handlePlayerCountClick(1)}}>
              One
            </button>
            <button onClick={() => {this.handlePlayerCountClick(2)}}>
              Two
            </button>
          </div>
        </InputContainer>
      </div>
    )
  }
}

export default PlayerCount
