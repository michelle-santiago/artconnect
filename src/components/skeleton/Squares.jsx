import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Squares = ({count}) => {
  let squares = []
  for (var i = 0; i < count; i++){
    squares.push(<Skeleton square height="300px" key={i} />)
  }
  return squares
}

export default Squares