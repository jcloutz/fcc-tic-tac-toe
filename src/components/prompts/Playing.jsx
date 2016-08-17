import React from 'react'
import { connect } from 'react-redux'
import Prompt from '../Prompt'
import { nextGameState } from '../../modules/gameState'

const ChooseSide = ({ nextGameState }) => (
  <div>
    <Prompt
      message={'Let\'s play.'}>
        <button onClick={() => {
          nextGameState()
        }}>
          Advance
        </button>
    </Prompt>
  </div>
)

export default connect(() => ({}), { nextGameState })(ChooseSide)
