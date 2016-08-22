import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
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
    if (!this.props.board.winner && this.props.board.clickable && gameStates.GAME_PLAY === this.props.gameState) {
      const { placeMarker } = this.props
      const { active } = this.props.board

      placeMarker({
        row,
        cell,
        marker: active
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

    const gridBars = [
      <div key='horizontal-bars' className='board-grid__bar--horizontal'></div>,
      <div key='vertical-bars' className='board-grid__bar--vertical'></div>
    ]
    return (
      <div>
        <div className={'board ' + showGridClass}>
          <div className='board-grid'>
            <ReactCSSTransitionGroup
              transitionName='board-grid__bar'
              transitionEnterTimeout={2400}
              transitionLeaveTimeout={3200}>
              {board.visible && gridBars}
            </ReactCSSTransitionGroup>
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
  placeMarker: func
}

export default connect(
  state => ({
    gameState: state.gameState,
    board: state.board
  }),
  {
    placeMarker
  }
)(Board)
