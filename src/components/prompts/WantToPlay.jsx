import React from 'react'
import { connect } from 'react-redux'
import Prompt from '../Prompt'
import { nextGameState } from '../../modules/gameState'

const EnterName = ({ nextGameState }) => (
  <Prompt
    message='Would you like to play a game?'
  >
    <button
      onClick={() => {
        nextGameState()
      }}
    >
      Yes
    </button>
  </Prompt>
)

const { func } = React.PropTypes

EnterName.propTypes = {
  nextGameState: func
}

export default connect(() => ({}), { nextGameState })(EnterName)
