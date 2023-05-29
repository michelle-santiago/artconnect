import React from 'react'
import { useParams } from 'react-router-dom';
const Artists = () => {
  let { username } = useParams();
  return (
    <div>Artist {username}</div>
  )
}

export default Artists