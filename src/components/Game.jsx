import React from 'react'
import PromptManager from '../components/PromptManager'
import Board from '../components/Board'
const { element } = React.PropTypes

const Game = ({children}) => (
  <main className='layout__container'>
    <section className='layout__header'>
      <PromptManager />
    </section>
    <section className='layout__board'>
      <Board />
    </section>
    <div className='layout__footer'>
      Footer Content
    </div>
  </main>
)

Game.propTypes = {
  children: element
}

export default Game
