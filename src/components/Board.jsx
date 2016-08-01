import React, { Component, PropTypes } from 'react'
import BoardCell from './boardCell'

class Board extends Component {
  constructor (props) {
    super(props)

    this.state = {
      showGrid: false,
      clickEnabled: false
    }
    this.handleCellClick = this.handleCellClick.bind(this)
    // this.handleAITurn = this.handleAITurn.bind(this)
  }

  componentDidMount () {
    setTimeout(() => {
      this.setState({ showGrid: true })
      setTimeout(() => {
        this.setState({ clickEnabled: true })
      }, 2400)
    }, 1500)
  }

  handleCellClick (row, cell) {
    if (!this.props.gameOver && this.state.clickEnabled) {
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
    const showGridClass = this.state.showGrid ? 'show-grid' : ''

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
        {this.props.gameOver && 'Game Over ' + this.props.winner + ' wins'}
        {this.state.showGrid}
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

const { array, string, func, bool } = PropTypes
Board.propTypes = {
  board: array,
  placeMarker: func,
  activePlayer: string,
  aiMarker: string,
  gameOver: bool,
  winner: string
}

export default Board
