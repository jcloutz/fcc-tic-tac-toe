import React from 'react'

const ConsoleLine = ({ visible, hidden }) => {
  let counter = 0

  const visChars = visible.map((char) => (
    <span key={counter++}>{char}</span>
  ))
  const hidChars = hidden.map((char) => (
    <span key={counter++}>{char}</span>
  ))

  return (
    <span>
      {visChars}
      <span className='typewriter__caret'></span>
      <span className='typewriter__text--hide'>
        {hidChars}-
      </span>
    </span>
  )
}

const { array } = React.PropTypes

ConsoleLine.propTypes = {
  visible: array,
  hidden: array
}

export default ConsoleLine
