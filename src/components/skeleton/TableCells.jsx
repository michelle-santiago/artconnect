import React from 'react'
import Skeleton from 'react-loading-skeleton'

const TableCells = ({count}) => {
  let cells = []
  let column = []

  for (var i = 0; i < count; i++){
    column.push(<td className="p-2" key={i}><Skeleton/></td>)
  }

  for (var i = 0; i < 10; i++){
    cells.push(
      <tr key={i} className="text-sm font-normal text-gray-900 whitespace-nowrap">
        { column }
      </tr>
    )
  }
  
  return cells
}

export default TableCells