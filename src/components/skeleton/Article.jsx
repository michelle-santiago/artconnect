import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Article = () => {
   return(
    <p className="mb-0">
      <Skeleton count={5}/>
    </p>
   )
}


export default Article