import React from 'react'

const Artworks = () => {
  return (
    <div>
      <h1 className="mb-4 text-2xl font-extrabold tracking-tight leading-none text-gray-900 md:text-3xl lg:text-4xl">Artworks</h1>
      
      <div className="grid grid-cols-2 gap-2">   
        <div>
            <img className="h-auto rounded-lg"  src="/images/lotusbubbleart.jpg" alt=""/>
        </div>
        <div>
            <img className="h-auto rounded-lg" src="/images/happyu.jpg" alt=""/>
        </div> 
    </div>
    </div>
  )
}

export default Artworks