import React from 'react'
import { connect } from 'react-redux'
import Prompt from '../Prompt'
import { setBoardVisibility } from '../../modules/board'
import { setPlayerMarker } from '../../modules/game'
import { nextGameState } from '../../modules/gameState'

const ChooseSidePage = ({ setPlayerMarker, nextGameState, setBoardVisibility }) => (
  <div>
    <Prompt
      message='Choose Your Side.'
    >
      <div>
        <button onClick={() => {
          setPlayerMarker('x')
          nextGameState()
          setBoardVisibility(true)
        }}
        >
          X
        </button>
        <button onClick={() => {
          setPlayerMarker('o')
          nextGameState()
          setBoardVisibility(true)
        }}
        >
          O
        </button>
      </div>
    </Prompt>
  </div>
)

const { func } = React.PropTypes

ChooseSidePage.propTypes = {
  nextGameState: func,
  setPlayerMarker: func,
  setBoardVisibility: func
}

export default connect(() => ({}), { setPlayerMarker, nextGameState, setBoardVisibility })(ChooseSidePage)
