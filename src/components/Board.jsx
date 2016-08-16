import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import BoardCell from './boardCell'

class Board extends Component {
  constructor (props) {
    super(props)
    this.handleCellClick = this.handleCellClick.bind(this)
    // this.handleAITurn = this.handleAITurn.bind(this)
  }

  componentDidMount () {
    setTimeout(() => {
      this.setState({ clickEnabled: true })
    }, 2400)
  }

  handleCellClick (row, cell) {
    if (!this.props.gameOver && this.props.board.clickable) {
      const { placeMarker, activePlayer } = this.props

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
    for (let row = 0; row < board.length; row++) {
      for (let cell = 0; cell < board[row].length; cell++) {
        cells.push(
          <BoardCell
            key={`${row}-${cell}`}
            marker={board[row][cell]}
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

const { object, string, bool } = PropTypes
Board.propTypes = {
  board: object,
  gameState: string,
  gameOver: bool
}

export default connect(
  state => ({
    gameState: state.gameState,
    board: state.board
  })
)(Board)
