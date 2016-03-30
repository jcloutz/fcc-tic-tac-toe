import React from 'react'
import CSSTransitionGroup from 'react-addons-css-transition-group'
require('./typewriter.styl')

export default class TypeWriter extends React.Component {
  constructor (props) {
    super(props)
    this.carraige = null // will be used for interval
    this.state = {
      message: this.props.message,
      visibleChars: '',
      hiddenChars: this.props.message
    }
  }

  componentDidMount () {
    // Create promise to begin rendering typed characters after start delay.
    let typewriter = new Promise((resolve, reject) => {
      this.typewriter = setTimeout(() => {
        resolve(true)
      }, this.props.startDelay)
    })
    // start typing characters
    typewriter.then(() => {
      let message = this.state.message.split('')
      let counter = 0

      // Declare inteveral at class level to allow componentWillUnmount to cancel if necessary
      this.carraige = setInterval(() => {
        if (message.length > 0) {
          this.setState({
            visibleChars: this.state.visibleChars + message.shift(),
            hiddenChars: message.join('')
          })
          counter++
        } else {
          clearInterval(this.carraige)
        }
      }, this.props.keystrokeDelay)
    })
  }

  componentWillUnmount () {
    // TODO implement reverse type effect.
    // clear timeout and intervals
    clearTimeout(this.typewriter)
    clearInterval(this.carraige)
    console.log('leaving')
    return false
  }

  render () {
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
  message: string,
  startDelay: number,
  keystrokeDelay: number,
  enterTimeout: number,
  leaveTimeout: number
}
