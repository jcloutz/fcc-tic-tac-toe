import React from 'react'
const { string } = React.PropTypes

const TypeWriterCharacter = ({ character }) => (
  <span className='typewriter__text--show'>{character}</span>
)
TypeWriterCharacter.propTypes = {
  character: string.required
}
export default TypeWriterCharacter
