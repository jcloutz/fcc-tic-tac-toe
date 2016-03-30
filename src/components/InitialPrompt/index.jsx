import React from 'react'
import TypeWriter from '../TypeWriter'
// import { hashHistory } from 'react-router'

class InitialPrompt extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      typewriterStatus: 'typing'
    }
    this.handleConfirmClick = this.handleConfirmClick.bind(this)
    this.handleCancelClick = this.handleCancelClick.bind(this)
  }

  handleConfirmClick (e) {
    this.setState({typewriterStatus: 'deleting'})
  }

  handleCancelClick (e) {
    this.setState({typewriterStatus: 'typing'})
  }

  render () {
    return (
      <div>
        <TypeWriter
          message='DO YOU WANT TO PLAY A GAME?'
          status={this.state.typewriterStatus}
          startDelay={2000}
          keystrokeDelay={80}
          enterTimeout={500}
          leaveTimeout={3000}
        />
        <div className='prompt__button-container'>
          <button onClick={this.handleConfirmClick}>
            Yes
          </button>
          <button onClick={this.handleCancelClick}>
            No
          </button>
        </div>
      </div>
    )
  }
}

export default InitialPrompt
