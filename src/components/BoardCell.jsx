import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const BoardCell = ({
  marker,
  row,
  cell,
  handleCellClick
}) => {
  let content

  switch (marker) {
    case 'x':
      content = <div className='board-cell-marker board-cell-marker__x' />
      break
    case 'o':
      content = <div className='board-cell-marker board-cell-marker__o' />
      break
    default:
      content = null
  }

  return (
    <div
      className={'board-cell'}
      onClick={() => {
        if (!marker) handleCellClick(row, cell)
      }}>
      <ReactCSSTransitionGroup
        transitionName='board-cell-marker'
        transitionEnterTimeout={800}
        transitionLeaveTimeout={800}>
      {content}
      </ReactCSSTransitionGroup>
    </div>
  )
}

const { string, number, func } = React.PropTypes

BoardCell.propTypes = {
  marker: string,
  row: number,
  cell: number,
  handleCellClick: func
}

export default BoardCell
