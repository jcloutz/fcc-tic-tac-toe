import React from 'react'
import TypeWriter from '../TypeWriter'
import InputContainer from '../InputContainer'
import { hashHistory } from 'react-router'

class InitialPrompt extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      typewriterStatus: 'typing',
      showOptions: false
    }
    this.handleConfirmClick = this.handleConfirmClick.bind(this)
    this.handleCancelClick = this.handleCancelClick.bind(this)
    this.handleTypeWriterFinishEvent = this.handleTypeWriterFinishEvent.bind(this)
  }

  handleConfirmClick (e) {
    this.setState({typewriterStatus: 'deleting', showOptions: false})
  }

  handleCancelClick (e) {
    this.setState({typewriterStatus: 'typing'})
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

  render () {
    return (
      <div>
        <TypeWriter
          message='WOULD YOU LIKE TO PLAY A GAME?'
          status={this.state.typewriterStatus}
          startDelay={3000}
          keystrokeDelay={80}
          onFinish={this.handleTypeWriterFinishEvent}
        />
        <InputContainer visible={this.state.showOptions}>
          <div>
            <button onClick={this.handleConfirmClick}>
              Yes
            </button>
            <button onClick={this.handleCancelClick}>
              No
            </button>
          </div>
        </InputContainer>
      </div>
    )
  }
}

export default InitialPrompt
