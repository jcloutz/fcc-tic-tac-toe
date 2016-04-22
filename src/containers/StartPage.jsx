import React from 'react'
import { connect } from 'react-redux'
import Prompt from '../components/Prompt'
import { hashHistory } from 'react-router'

const StartPage = ({ dispatch }) => (
  <Prompt
    message='Would you like to play a game?'
  >
    <button
      onClick={() => {
        dispatch({type: 'START_GAME'})
        hashHistory.push('/players')
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

export default connect()(StartPage)
