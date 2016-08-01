import React from 'react'
import { connect } from 'react-redux'
import Prompt from '../components/Prompt'
import { hashHistory } from 'react-router'
import { setPlayerMarker } from '../modules/game'

const ChooseSidePage = ({ setPlayerMarker }) => (
  <div>
    <Prompt
      message='Choose Your Side.'
    >
      <div>
        <button onClick={() => {
          setPlayerMarker('x')
          hashHistory.push('/play')
        }}
        >
          X
        </button>
        <button onClick={() => {
          setPlayerMarker('o')
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
  dispatch: func,
  setPlayerMarker: func
}

export default connect(() => ({}), { setPlayerMarker })(ChooseSidePage)
