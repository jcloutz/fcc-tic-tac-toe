import React from 'react'
import TypeWriterCarriage from './TypeWriterCarriage'
require('./typewriter.styl')

export default class TypeWriter extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      status: 'idle',
      message: this.props.message,
      visibleChars: '',
      hiddenChars: this.props.message
    }

    this.props = {
      status: 'idle',
      message: 'No Message',
      startDelay: 1500,
      keystrokeDelay: 50,
      onFinish: () => {}
    }

    this.typeStartTimeout = null
    this.typeKeystrokeInterval = null

    this.typeMessage = this.typeMessage.bind(this)
  }

  componentDidMount () {
    // Create promise to begin rendering typed characters after start delay.
    this.setState({status: 'typing'}, () => {
      this.typeMessage()
    })
  }

  componentWillReceiveProps (next) {
    clearInterval(this.typeKeystrokeInterval)
    clearTimeout(this.typeStartTimeout)

    this.setState({status: next.status}, () => {
      this.typeMessage()
    })
  }

  componentWillUnmount () {
    // clear timeout and intervals
    clearTimeout(this.typeStartTimeout)
    clearInterval(this.typeKeystrokeInterval)
  } // end componentWillUnmount

  typeMessage () {
    // assign delays based on typing direction
    let startDelay = this.state.status === 'typing' ? this.props.startDelay : 300
    let keystrokeDelay = this.state.status === 'typing' ? this.props.keystrokeDelay : 30

    this.typeStartTimeout = setTimeout(() => {
      this.typeKeystrokeInterval = setInterval(() => {
        // set defaults
        let {visibleChars, hiddenChars} = this.state
        let completed = null
        let completeType = null

        if (this.state.status === 'typing') {
          // move caret to the right
          visibleChars += hiddenChars.slice(0, 1)
          hiddenChars = hiddenChars.slice(1, hiddenChars.length)
          completed = hiddenChars.length === 0
          completeType = 'typing'
        } else {
          // move carat left
          hiddenChars = visibleChars.slice(visibleChars.length - 1, visibleChars.length) + hiddenChars
          visibleChars = visibleChars.slice(0, visibleChars.length - 1)
          completed = visibleChars.length === 0
          completeType = 'deleting'
        }

        // set state to current values
        this.setState({
          visibleChars,
          hiddenChars,
          status: completed ? 'idle' : completeType
        })

        if (completed) {
          this.props.onFinish(completeType)
          clearInterval(this.typeKeystrokeInterval)
        }
      }, keystrokeDelay)
    }, startDelay)
  }

  render () {
    const {visibleChars, hiddenChars} = this.state
    return (
      <div className='typewriter'>
        <TypeWriterCarriage
          visible={visibleChars}
          hidden={hiddenChars}
        />
      </div>
    )
  }
}

const { number, string, func } = React.PropTypes

TypeWriter.propTypes = {
  status: string,
  message: string,
  startDelay: number,
  keystrokeDelay: number,
  onFinish: func
}
