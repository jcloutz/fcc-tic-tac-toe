import React from 'react'

const BoardCell = ({
  marker
}) => {
  let contentClass

  switch (marker) {
    case 'X':
      contentClass = 'board-cell-x'
      break
    case 'O':
      contentClass = 'board-cell-o'
      break
    default:
      contentClass = ''
  }

  return (
    <div className={'board-cell ' + contentClass}></div>
  )
}
