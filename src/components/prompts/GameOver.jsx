import React from 'react'
import { connect } from 'react-redux'
import Prompt from '../Prompt'
import { setGameState, resetGame, gameStates } from '../../modules/gameState'
import { resetBoard } from '../../modules/board'

const GameOver = ({ setGameState, resetGame, resetBoard, board }) => {
  let message = ''

  if (board.player === board.winner) {
    message = 'You win, would you like to play again?'
  } else if (board.opponent === board.winner) {
    message = 'I win, would you like to play again?'
  } else { // draw
    message = 'Game is a draw, would you like to play again?'
  }
  return (
    <div>
      <Prompt
        message={message}
      >
        <div>
          <button onClick={() => {
            setGameState(gameStates.GAME_PLAY)
            resetBoard()
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
}

const { func, object } = React.PropTypes

GameOver.propTypes = {
  resetGame: func,
  setGameState: func,
  resetBoard: func,
  board: object
}

export default connect((state) => ({
  board: state.board
}), { resetGame, setGameState, resetBoard })(GameOver)
