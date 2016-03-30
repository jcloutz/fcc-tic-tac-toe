import React from 'react'
import CSSTransitionGroup from 'react-addons-css-transition-group'
require('./typewriter.styl')

export default class TypeWriter extends React.Component {
  constructor (props) {
    super(props)
    this.carraige = null // will be used for interval
    this.state = {
      status: 'idle',
      message: this.props.message,
      visibleChars: '',
      hiddenChars: this.props.message
    }
    this.typeMessage = this.typeMessage.bind(this)
    this.deleteMessage = this.deleteMessage.bind(this)
  }

  typeMessage () {
    // this.setState({typing: true})
    let typewriter = new Promise((resolve, reject) => {
      this.typewriter = setTimeout(() => {
        this.setState({status: 'typing'}, () => {
          resolve(true)
        })
      }, this.props.startDelay)
    })
    // start typing characters
    typewriter.then(() => {
      let message = this.state.message.split('')
      let counter = 0
      let _this = this
      // Declare inteveral at class level to allow componentWillUnmount to cancel if necessary
      this.carraige = setInterval(() => {
        if (message.length > 0 && _this.state.status === 'typing') {
          let complete = (counter === message.length)
          this.setState({
            visibleChars: this.state.visibleChars + message.shift(),
            hiddenChars: message.join(''),
            status: complete ? 'idle' : 'typing'
          })
          counter++
        } else {
          console.log('typing finished')
          clearInterval(this.carraige)
        }
      }, this.props.keystrokeDelay)
    })
  }

  deleteMessage () {
    let typewriter = new Promise((resolve, reject) => {
      this.typewriter = setTimeout(() => {
        this.setState({status: 'deleting'}, () => {
          resolve(true)
        })
      }, this.props.startDelay)
    })
    // start typing characters
    typewriter.then(() => {
      let { visibleChars, hiddenChars } = this.state
      let counter = 0
      let _this = this

      // Declare inteveral at class level to allow componentWillUnmount to cancel if necessary
      this.carraige = setInterval(() =>
        debugger
        console.log('deleting')
        if (visibleChars.length > 0 && _this.state.status === 'deleting') {
          let complete = visibleChars.length === 0
          this.setState({
            visibleChars: visibleChars.join(''),
            hiddenChars: visibleChars.pop() + hiddenChars,
            status: complete ? 'idle' : 'typing'
          })
          counter++
        } else {
          console.log('typing finished')
          clearInterval(this.carraige)
        }
      }, this.props.keystrokeDelay)
    })
  }

  componentDidMount () {
    // Create promise to begin rendering typed characters after start delay.
    // this.setState({typing: true, status: 'idle'})
  }

  componentWillUnmount () {
    // clear timeout and intervals
    clearTimeout(this.typewriter)
    clearInterval(this.carraige)
  }

  render () {
    if (this.props.status === 'typing' && this.state.status !== 'typing') {
      console.log('type message triggered')
      this.typeMessage()
    } else if (this.props.status === 'deleting' && this.state.status !== 'deleting') {
      console.log('delete message triggered')
      this.deleteMessage()
    }
    let counter = 0
    const {visibleChars, hiddenChars} = this.state
    const visChars = visibleChars.split('').map((char) => (
      <span key={counter++}>{char}</span>
    ))
    const hidChars = hiddenChars.split('').map((char) => (
      <span key={counter++}>{char}</span>
    ))

    return (
      <div className='typewriter'>
        <CSSTransitionGroup
          className='typewriter__carriage'
          transitionName='typewriter__character'
          transitionEnterTimeout={this.props.enterTimeout}
          transitionLeaveTimeout={this.props.leaveTimeout}
        >
          {visChars}
        </CSSTransitionGroup>
        <span className='typewriter__caret'></span>
        <span className='typewriter__text--hide'>
          {hidChars}
        </span>
      </div>
    )
  }
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
