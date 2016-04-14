import React from 'react'

const TypeWriterCarriage = ({ visible, hidden }) => {
  let counter = 0

  const visChars = visible.split('').map((char) => (
    <span key={counter++}>{char}</span>
  ))
  const hidChars = hidden.split('').map((char) => (
    <span key={counter++}>{char}</span>
  ))

  return (
    <div>
      > {visChars}
      <span className='typewriter__caret'></span>
      <span className='typewriter__text--hide'>
        {hidChars}
      </span>
    </div>
  )
}

const { string } = React.PropTypes

TypeWriterCarriage.propTypes = {
  visible: string,
  hidden: string
}

export default TypeWriterCarriage
