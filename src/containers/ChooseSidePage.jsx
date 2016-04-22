import React from 'react'
import { connect } from 'react-redux'
import Prompt from '../components/Prompt'
import { setPlayer1Side } from '../actions'
import { hashHistory } from 'react-router'

const ChooseSidePage = ({ dispatch }) => (
  <div>
    <Prompt
      message='Choose Side For Player 1'
    >
      <div>
        <button onClick={() => {
          dispatch(setPlayer1Side('X'))
          hashHistory.push('/play')
        }}
        >
          X
        </button>
        <button onClick={() => {
          dispatch(setPlayer1Side('O'))
          hashHistory.push('/play')
        }}
        >
          O
        </button>
      </div>
    </Prompt>
  </div>
)

const { func } = React.PropTypes

ChooseSidePage.propTypes = {
  dispatch: func
}

export default connect()(ChooseSidePage)
