import React from 'react'
import CSSTransitionGroup from 'react-addons-css-transition-group'

const TypeWriterCarriage = ({visible, hidden, enterTimeout, leaveTimeout}) => {
  let counter = 0

  const visChars = visible.split('').map((char) => (
    <span key={counter++}>{char}</span>
  ))
  const hidChars = hidden.split('').map((char) => (
    <span key={counter++}>{char}</span>
  ))

  return (
    <div>
      <CSSTransitionGroup
        className='typewriter__carriage'
        transitionName='typewriter__character'
        transitionEnterTimeout={enterTimeout}
        transitionLeaveTimeout={leaveTimeout}
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

export default TypeWriterCarriage
