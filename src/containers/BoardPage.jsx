import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { placeMarker } from '../modules/board'
import { gameOver, toggleActivePlayer } from '../modules/game'

import Board from '../components/Board'

class BoardPage extends Component {
  render () {
    return (
      <Board
        board={this.props.board}
        placeMarker={this.props.placeMarker}
        toggleActivePlayer={this.props.toggleActivePlayer}
        playerMarker={this.props.game.playerMarker}
        aiMarker={this.props.game.aiMarker}
        activePlayer={this.props.game.activePlayer}
        setGameOver={this.props.gameOver}
        gameOver={this.props.game.gameOver}
        winner={this.props.game.winner}
      />
    )
  }
}

const { array, object, func, bool } = PropTypes

BoardPage.propTypes = {
  board: array,
  game: object,
  placeMarker: func,
  toggleActivePlayer: func,
  gameOver: func,
  winner: bool
}
const mapStateToProps = ({ game, board }) => ({
  game,
  board
})

export default connect(mapStateToProps, {
  placeMarker,
  gameOver,
  toggleActivePlayer
})(BoardPage)
