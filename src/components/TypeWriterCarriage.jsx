import React from 'react'

const TypeWriterCarriage = ({ visible, hidden }) => {
  let counter = 0

  const visChars = visible.map((char) => (
    <span key={counter++}>{char}</span>
  ))
  const hidChars = hidden.map((char) => (
    <span key={counter++}>{char}</span>
  ))

  return (
    <div>
      {visChars}
      <span className='typewriter__caret'></span>
      <span className='typewriter__text--hide'>
        {hidChars}
      </span>
    </div>
  )
}

const { array } = React.PropTypes

TypeWriterCarriage.propTypes = {
  visible: array,
  hidden: array
}

export default TypeWriterCarriage
