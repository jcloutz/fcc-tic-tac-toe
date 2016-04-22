import React from 'react'
import TypewriterCarriage from './TypewriterCarriage'

class Typewriter extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      status: 'idle',
      message: this.props.message.split(''),
      visibleChars: [],
      hiddenChars: this.props.message.split('') // split to array
    }

    this.typeStartTimeout = null
    this.typeKeystrokeInterval = null
    this.typeMessage = this.typeMessage.bind(this)
  }

  componentDidMount () {
    this.typeMessage()
  }

  componentWillUnmount () {
    // clear timeout and intervals
    clearTimeout(this.typeStartTimeout)
    clearInterval(this.typeKeystrokeInterval)
  } // end componentWillUnmount

  typeMessage () {
    // assign delays based on typing direction
    const { startDelay, keystrokeDelay } = this.props
    this.typeStartTimeout = setTimeout(() => {
      this.typeKeystrokeInterval = setInterval(() => {
        // set defaults
        let {visibleChars, hiddenChars} = this.state
        let completed = null

        // move caret to the right
        visibleChars.push(hiddenChars.shift())
        completed = hiddenChars.length === 0

        // set state to current values
        this.setState({
          visibleChars,
          hiddenChars
        })

        if (completed) {
          this.props.onFinish()
          clearInterval(this.typeKeystrokeInterval)
        }
      }, keystrokeDelay)
    }, startDelay)
  }

  render () {
    const {visibleChars, hiddenChars} = this.state
    return (
      <div className='typewriter'>
        <TypewriterCarriage
          visible={visibleChars}
          hidden={hiddenChars}
        />
      </div>
    )
  }
}

const { number, string, func } = React.PropTypes

Typewriter.propTypes = {
  status: string,
  message: string,
  startDelay: number,
  keystrokeDelay: number,
  onFinish: func
}

Typewriter.defaultProps = {
  message: 'No Message',
  startDelay: 1500,
  keystrokeDelay: 30
}

export default Typewriter
