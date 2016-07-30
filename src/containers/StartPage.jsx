import React from 'react'
import { connect } from 'react-redux'
import Prompt from '../components/Prompt'
import { hashHistory } from 'react-router'
import { startGame } from '../modules/game'

const StartPage = ({ startGame }) => (
  <Prompt
    message='Would you like to play a game?'
  >
    <button
      onClick={() => {
        startGame()
        hashHistory.push('/choose-side')
      }}
    >
      Start
    </button>
  </Prompt>
)

const { func } = React.PropTypes

StartPage.propTypes = {
  dispatch: func
}

export default connect(() => ({}), { startGame })(StartPage)
