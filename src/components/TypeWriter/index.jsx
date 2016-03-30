import React from 'react'
import TypeWriterCarriage from './TypeWriterCarriage'
require('./typewriter.styl')

export default class TypeWriter extends React.Component {
  constructor (props) {
    super(props)
    this.typeStartTimeout = null // will be used for interval
    this.typeKeystrokeInterval = null
    this.state = {
      status: 'idle',
      message: this.props.message,
      visibleChars: '',
      hiddenChars: this.props.message
    }
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
    this.typeStartTimeout = setTimeout(() => {
      this.typeKeystrokeInterval = setInterval(() => {
        let {visibleChars, hiddenChars} = this.state
        let completed = null
        let incompleteStatus = null

        if (this.state.status === 'typing') {
          visibleChars += hiddenChars.slice(0, 1)
          hiddenChars = hiddenChars.slice(1, hiddenChars.length)
          completed = hiddenChars.length === 0
          incompleteStatus = 'typing'
        } else { // deleting
          hiddenChars = visibleChars.slice(visibleChars.length - 1, visibleChars.length) + hiddenChars
          visibleChars = visibleChars.slice(0, visibleChars.length - 1)
          completed = visibleChars.length === 0
          incompleteStatus = 'deleting'
        }

        this.setState({
          visibleChars,
          hiddenChars,
          status: completed ? 'idle' : incompleteStatus
        })

        if (completed) {
          clearInterval(this.typeKeystrokeInterval)
        }
      }, this.props.keystrokeDelay)
    }, this.props.startDelay)
  }

  render () {
    const {visibleChars, hiddenChars} = this.state
    return (
      <div className='typewriter'>
        <TypeWriterCarriage
          visible={visibleChars}
          hidden={hiddenChars}
          enterTimeout={500}
          leaveTimeout={500}
        />
      </div>
    )
  } // end render()
}

const { number, string } = React.PropTypes

TypeWriter.propTypes = {
  status: string,
  message: string,
  startDelay: number,
  keystrokeDelay: number,
  enterTimeout: number,
  leaveTimeout: number
}
