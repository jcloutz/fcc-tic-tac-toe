import React from 'react'

class Board extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      showGrid: false
    }
  }

  componentDidMount () {
    setTimeout(() => {
      this.setState({
        showGrid: true
      })
    }, 2000)
  }

  render () {
    const showGridClass = this.state.showGrid ? 'show-grid' : ''

    return (
      <div className={'board ' + showGridClass}>
        <div className='board-grid'>
          <div className='horizontal-bars'></div>
          <div className='vertical-bars'></div>
        </div>
        <div className='board-cell-container'>
          <div className='board-cell board-cell-x'></div>
          <div className='board-cell board-cell-o '></div>
          <div className='board-cell board-cell-o'></div>

          <div className='board-cell board-cell-o'></div>
          <div className='board-cell board-cell-x'></div>
          <div className='board-cell board-cell-o'></div>

          <div className='board-cell board-cell-o'></div>
          <div className='board-cell board-cell-x'></div>
          <div className='board-cell board-cell-x'></div>
        </div>
      </div>
    )
  }
}

export default Board
