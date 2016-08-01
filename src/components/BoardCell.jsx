import React from 'react'

const BoardCell = ({
  marker,
  row,
  cell,
  handleCellClick
}) => {
  let contentClass

  switch (marker) {
    case 'x':
      contentClass = 'board-cell-x show'
      break
    case 'o':
      contentClass = 'board-cell-o show'
      break
    default:
      contentClass = ''
  }

  return (
    <div
      className={'board-cell ' + contentClass}
      onClick={() => {
        if (!marker) handleCellClick(row, cell)
      }}>
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
