import React, { Component, PropTypes } from 'react'
import BoardCell from './boardCell'
import AIPlayer from '../lib/ai-player'

class Board extends Component {
  constructor (props) {
    super(props)

    this.state = {
      showGrid: false
    }
    this.handleCellClick = this.handleCellClick.bind(this)
    this.handleAITurn = this.handleAITurn.bind(this)
  }

  componentDidMount () {
    this.setState({
      showGrid: true
    }, () => {
      if (this.props.activePlayer === this.props.aiMarker) {
        this.handleAITurn(this.props.aiMarker, this.props.board)
      }
    })
  }

  componentWillReceiveProps ({ activePlayer, playerMarker, aiMarker, board, gameOver }) {
    if (!gameOver) {
      const Ai = new AIPlayer(activePlayer, board)
      if (Ai.gameOver()) {
        this.props.setGameOver()
        this.setState({
          gameOver: true
        })
      } else if (activePlayer === aiMarker) {
        this.handleAITurn(aiMarker, board)
      }
    }
  }

  handleAITurn (aiMarker, board) {
    if (!this.props.gameOver) {
      const Ai = new AIPlayer(aiMarker, board)
      const [row, cell] = Ai.move()

      setTimeout(() => {
        this.props.toggleActivePlayer()
        this.props.placeMarker({
          row,
          cell,
          marker: aiMarker
        })
      }, 1000)
    }
  }

  handleCellClick (row, cell) {
    if (!this.props.gameOver) {
      const { placeMarker, activePlayer, toggleActivePlayer } = this.props

      placeMarker({
        row,
        cell,
        marker: activePlayer
      })

      toggleActivePlayer()
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
      <div className={'board ' + showGridClass}>
        <div className='board-grid'>
          <div className='horizontal-bars'></div>
          <div className='vertical-bars'></div>
        </div>
        <div className='board-cell-container'>
          {cells}
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
  toggleActivePlayer: func,
  aiMarker: string,
  setGameOver: func,
  gameOver: bool
}

export default Board
