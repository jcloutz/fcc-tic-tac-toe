import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import BoardCell from './boardCell'
import { placeMarker, isGameOver, getBestMove, setGameOver, setWinner } from '../modules/game'
import { gameStates, nextGameState } from '../modules/gameState'

class Board extends Component {
  constructor (props) {
    super(props)
    this.handleCellClick = this.handleCellClick.bind(this)
    // this.handleAITurn = this.handleAITurn.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    const { ready, clickable, active, player2, winner, gameOver } = nextProps.game
    if (!winner & !gameOver) {
      const checkGameOver = isGameOver(nextProps.game)
      if (checkGameOver && checkGameOver.winner) {
        // set winning line
        setTimeout(() => {
          this.props.setWinner({
            winner: checkGameOver.winner,
            winningLine: checkGameOver.winningLine
          })
          this.props.nextGameState()
        }, 800)
      } else if (checkGameOver && !checkGameOver.winner) {
        // setGameOver
        setTimeout(() => {
          this.props.setGameOver()
          this.props.nextGameState()
        }, 800)
      }
      // if the ai is able to play and it's his turn
      if (!checkGameOver && ready && !clickable && player2 === active) {
        // get best move and dispatch after 800ms
        const move = getBestMove(nextProps.game)
        setTimeout(() => {
          this.props.placeMarker({
            row: move[0],
            cell: move[1],
            marker: player2
          })
        }, 800)
      }
    }
  }

  handleCellClick (row, cell) {
    const { active, winner, clickable } = this.props.game
    if (!winner && clickable && gameStates.GAME_PLAY === this.props.gameState) {
      const { placeMarker } = this.props

      placeMarker({
        row,
        cell,
        marker: active
      })
    }
  }

  render () {
    const { board, visible, active, clickable } = this.props.game

    let cells = []
    for (let row = 0; row < board.length; row++) {
      for (let cell = 0; cell < board[row].length; cell++) {
        cells.push(
          <BoardCell
            key={`${row}-${cell}`}
            marker={board[row][cell]}
            row={row}
            cell={cell}
            active={active}
            clickable={clickable}
            handleCellClick={this.handleCellClick}
          />
        ) // end push
      }
    }

    const gridBars = [
      <div key='horizontal-bars' className='board-grid__bar--horizontal'></div>,
      <div key='vertical-bars' className='board-grid__bar--vertical'></div>
    ]
    return (
      <div className='board'>
        <div className='board-grid'>
          <ReactCSSTransitionGroup
            transitionName='board-grid__bar'
            transitionEnterTimeout={2400}
            transitionLeaveTimeout={3200}>
            {visible && gridBars}
          </ReactCSSTransitionGroup>
        </div>
        <div className='board-cell-container'>
            {cells}
        </div>
      </div>
    )
  }
}

const { object, string, func } = PropTypes
Board.propTypes = {
  game: object,
  gameState: string,
  placeMarker: func,
  setWinner: func,
  setGameOver: func,
  nextGameState: func
}

export default connect(
  state => ({
    gameState: state.gameState,
    game: state.game
  }),
  {
    placeMarker,
    setWinner,
    setGameOver,
    nextGameState
  }
)(Board)
