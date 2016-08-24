import React from 'react'
import { connect } from 'react-redux'
import Prompt from '../Prompt'
import { setBoardVisibility, setPlayer } from '../../modules/game'
import { nextGameState } from '../../modules/gameState'

const ChooseSidePage = ({ setPlayer, nextGameState, setBoardVisibility }) => (
  <div>
    <Prompt
      message='Choose Your Side.'
    >
      <div>
        <button onClick={() => {
          setPlayer('x')
          nextGameState()
          setBoardVisibility(true)
        }}
        >
          X
        </button>
        <button onClick={() => {
          setPlayer('o')
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
  setPlayer: func,
  setBoardVisibility: func
}

export default connect(() => ({}), { setPlayer, nextGameState, setBoardVisibility })(ChooseSidePage)
