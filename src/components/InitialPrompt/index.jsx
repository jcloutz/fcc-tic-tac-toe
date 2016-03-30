import React from 'react'
import TypeWriter from '../TypeWriter'
import { hashHistory } from 'react-router'

const InitialPrompt = () => (
  <div>
    <TypeWriter
      message='DO YOU WANT TO PLAY A GAME?'
      startDelay={2000}
      keystrokeDelay={80}
      enterTimeout={500}
      leaveTimeout={500}
    />
    <div className='prompt__button-container'>
      <button onClick={() => {
        hashHistory.push('/players')
      }}>
        Yes
      </button>
      <button>No</button>
    </div>
  </div>
)

export default InitialPrompt
