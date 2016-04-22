import React from 'react'
import { connect } from 'react-redux'
import Prompt from '../components/Prompt'
import { setPlayerCount } from '../actions'
import { hashHistory } from 'react-router'

const PlayerCountPage = ({ dispatch }) => (
  <div>
    <Prompt
      message='How many players?'
    >
      <div>
        <button onClick={() => {
          dispatch(setPlayerCount(0))
          hashHistory.push('/choose-side')
        }}
        >
          Zero
        </button>
        <button onClick={() => {
          dispatch(setPlayerCount(1))
          hashHistory.push('/choose-side')
        }}
        >
          One
        </button>
        <button onClick={() => {
          dispatch(setPlayerCount(2))
          hashHistory.push('/choose-side')
        }}
        >
          Two
        </button>
      </div>
    </Prompt>
  </div>
)

const { func } = React.PropTypes

PlayerCountPage.propTypes = {
  dispatch: func
}

export default connect()(PlayerCountPage)
