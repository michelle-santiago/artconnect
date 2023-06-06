import React from 'react'
import Navbars from '../../components/Navbars'

const Artworks = () => {
  return (
    <>
    <div className="fixed top-0 z-50 w-full">
      <Navbars category="artist"/>
    </div>
    <div className="pt-20 px-10">
      <h1 className="text-center border-b p-2 mb-4 text-2xl font-extrabold tracking-tight leading-none text-gray-900 md:text-3xl lg:text-4xl">Artworks</h1>
      <div className="grid grid-cols-2 gap-2">   
        <div>
            <img className="h-auto rounded-lg"  src="" alt=""/>
        </div>
        <div>
            <img className="h-auto rounded-lg" src="" alt=""/>
        </div> 
      </div>
    </div>
    </>
  )
}

export default Artworks