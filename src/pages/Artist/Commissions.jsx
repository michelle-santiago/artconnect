import React, { useState } from 'react'
import { Card } from 'flowbite-react'
import { NavLink } from 'react-router-dom'

const Commissions = ({commissions}) => {
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState("");

  const zoomImage = ((image)=>{
    setShowModal(true)
    setImage(image)
  })

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
    {commissions.map((commission,index) => {
      return (
        <div key={index}>
          <Card className="max-w-xs">
            <div className="flex flex-col items-center pb-10">
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{commission.kind}</h5>
              <div>
                <button onClick={() => zoomImage(commission.image_url)} className="absolute text-white m-1  hover:text-primary-950">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                    <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                </button>
                { commission.image_url === null? 
                  <div className="relative w-24 h-24 overflow-hidden rounded-lg bg-primary-100">
                    <svg className="absolute w-24 h-24 text-primary-500 -left-.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" /></svg>
                  </div>
                  :
                  <img src={commission.image_url} className="w-24 h-24 rounded-lg shadow-lg"/>
                }
              </div>
              <span className="text-sm text-gray-500">{commission.price}</span>
              <div className="flex mt-4 space-x-3 md:mt-6">
                <NavLink className="inline-flex items-center px-4 py-2 text-sm bg-primary-950 text-center text-white font-bold font-sans" to={""}>
                  Request
                </NavLink>
              </div>
          </div>
          </Card>
          { showModal? 
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <Card 
                className="w-full lg:max-w-screen-lg md:max-w-screen-sm [&>img]:hidden md:[&>img]:w-96 md:[&>img]:p-0 md:[&>*]:w-full md:[&>*]:p-16 lg:[&>img]:block"
              >
                <button onClick={() => setShowModal(false)} className="absolute m-3 top-0 right-0 text-primary-500 hover:text-primary-950">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <img src={image} className="mt-3 max-h-96 rounded-lg shadow-lg"/>
              </Card>
              </div>
            </div>
            : null }
        </div> 
      )
    })}
    </div>
  )
}

export default Commissions