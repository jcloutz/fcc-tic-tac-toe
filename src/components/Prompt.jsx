import React from 'react'
import Typewriter from './Typewriter'
import InputContainer from './InputContainer'

class Prompt extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      showInput: false
    }

    this.handleTypewriterFinish = this.handleTypewriterFinish.bind(this)
  }

  handleTypewriterFinish () {
    this.setState({
      showInput: true
    })
  }

  render () {
    const { message, children, keystrokeDelay, startDelay } = this.props
    const { showInput } = this.state
    return (
      <div>
        <Typewriter
          onFinish={this.handleTypewriterFinish}
          keystrokeDelay={keystrokeDelay}
          startDelay={startDelay}
          message={message}
        />
        <InputContainer
          visible={showInput}>
          {children}
        </InputContainer>
      </div>
    )
  }
}

const { string, element, number } = React.PropTypes

Prompt.propTypes = {
  message: string,
  children: element,
  keystrokeDelay: number,
  startDelay: number
}

export default Prompt
