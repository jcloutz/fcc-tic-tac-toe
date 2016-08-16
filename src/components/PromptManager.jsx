import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Prompt from './Prompt'
import WantToPlay from './prompts/WantToPlay'
import ChooseSide from './prompts/ChooseSide'
import GameOver from './prompts/GameOver'
import Playing from './prompts/Playing'

const prompts = {
  'GAME_WANT_TO_PLAY': WantToPlay,
  'GAME_CHOOSE_SIDE': ChooseSide,
  'GAME_PLAY': Playing,
  'GAME_OVER': GameOver
}

const PromptManager = ({ gameState }) => {
  console.log(gameState)
  if (!prompts[gameState]) {
    return <Prompt message='' />
  }

  const StatePrompt = prompts[gameState]
  return <StatePrompt />
}

const { string } = PropTypes

PromptManager.propTypes = {
  gameState: string
}
export default connect((state) => ({
  gameState: state.gameState
}))(PromptManager)
