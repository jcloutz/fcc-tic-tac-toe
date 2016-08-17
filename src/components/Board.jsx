import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import BoardCell from './boardCell'
import { placeMarker } from '../modules/board'
import { gameStates } from '../modules/gameState'

class Board extends Component {
  constructor (props) {
    super(props)
    this.handleCellClick = this.handleCellClick.bind(this)
    // this.handleAITurn = this.handleAITurn.bind(this)
  }

  handleCellClick (row, cell) {
    if (!this.props.game.winner && this.props.board.clickable && gameStates.GAME_PLAY === this.props.gameState) {
      const { placeMarker } = this.props
      const { activePlayer } = this.props.game

      placeMarker({
        row,
        cell,
        marker: activePlayer
      })
    }
  }

  render () {
    const { board } = this.props
    const showGridClass = board.visible ? 'show-grid' : ''

    let cells = []
    for (let row = 0; row < board.cells.length; row++) {
      for (let cell = 0; cell < board.cells[row].length; cell++) {
        cells.push(
          <BoardCell
            key={`${row}-${cell}`}
            marker={board.cells[row][cell]}
            row={row}
            cell={cell}
            handleCellClick={this.handleCellClick}
          />
        ) // end push
      }
    }
    return (
      <div>
        <div className={'board ' + showGridClass}>
          <div className='board-grid'>
            <div className='horizontal-bars'></div>
            <div className='vertical-bars'></div>
          </div>
          <div className='board-cell-container'>
              {cells}
          </div>
        </div>
      </div>
    )
  }
}

const { object, string, bool, func } = PropTypes
Board.propTypes = {
  board: object,
  gameState: string,
  gameOver: bool,
  game: object,
  placeMarker: func
}

export default connect(
  state => ({
    game: state.game,
    gameState: state.gameState,
    board: state.board
  }),
  {
    placeMarker
  }
)(Board)
