import React from 'react'
import { connect } from 'react-redux'
import Prompt from '../Prompt'

const ChooseSide = ({ prompt }) => (
  <div>
    <Prompt
      message={'Let\'s play.'} />
  </div>
)

const { string } = React.PropTypes

ChooseSide.propTypes = {
  prompt: string
}
export default connect(({ prompt }) => ({}), {})(ChooseSide)
