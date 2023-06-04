import React from 'react'
import Navbars from '../../components/Navbars'

const Terms = () => {
  return (
    <>
    <div className="fixed top-0 z-50 w-full">
      <Navbars category="artist"/>
    </div>
    <div className="pt-20 px-10">
      <h1 className="text-center border-b p-2 mb-4 text-2xl font-extrabold tracking-tight leading-none text-gray-900 md:text-3xl lg:text-4xl">Terms and Conditions</h1>
    </div>
    </>
  )
}

export default Terms