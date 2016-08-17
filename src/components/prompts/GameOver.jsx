import React from 'react'
import { connect } from 'react-redux'
import Prompt from '../Prompt'
import { setGameState, resetGame, gameStates } from '../../modules/gameState'
import { resetBoard } from '../../modules/board'

const GameOver = ({ setGameState, resetGame, resetBoard }) => (
  <div>
    <Prompt
      message='Game Over, would you like to play again?'
    >
      <div>
        <button onClick={() => {
          resetBoard()
          setGameState(gameStates.GAME_PLAY)
        }}
        >
          Yes
        </button>
        <button onClick={() => {
          resetGame()
        }}
        >
          No
        </button>
      </div>
    </Prompt>
  </div>
)

const { func } = React.PropTypes

GameOver.propTypes = {
  resetGame: func,
  setGameState: func
}

export default connect(() => ({}), { resetGame, setGameState, resetBoard })(GameOver)
