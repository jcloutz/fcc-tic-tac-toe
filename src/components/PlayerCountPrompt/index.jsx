import React from 'react'
import TypeWriter from '../TypeWriter'
const PlayerCount = () => (
  <div>
    <TypeWriter
      message='How many players?'
      startDelay={2000}
      keystrokeDelay={80}
      enterTimeout={500}
      leaveTimeout={500}
    />
  </div>
)

export default PlayerCount
