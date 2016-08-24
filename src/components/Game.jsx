import React from 'react'
import PromptManager from './PromptManager'
import Board from './Board'
import Footer from './Footer'
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
      <Footer />
    </div>
  </main>
)

Game.propTypes = {
  children: element
}

export default Game
