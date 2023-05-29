import React from 'react'
import { Card } from 'flowbite-react'
import { NavLink } from 'react-router-dom'

const Commissions = ({commissions}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
    {commissions.map((commission,index) => {
      return (
        <div key={index}>
          <Card className="max-w-xs">
            <div className="flex flex-col items-center pb-10">
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{commission.kind}</h5>
              { commission.image_url === null? 

                <div className="relative w-24 h-24 overflow-hidden rounded-lg bg-primary-50">
                  <svg className="absolute w-24 h-24 text-primary-500 -left-.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" /></svg>

                </div>
                :
                <img src={commission.image_url} className="w-30 h-30 mb-3 rounded-lg shadow-lg"/>
              }
              <span className="text-sm text-gray-500">{commission.price}</span>
              <div className="flex mt-4 space-x-3 md:mt-6">
                <NavLink className="inline-flex items-center px-4 py-2 text-sm bg-primary-950 text-center text-white font-bold font-sans" to={""}>
                  Request
                </NavLink>
              </div>
          </div>
          </Card>
        </div>
      )
    })}
    </div>
  )
}

export default Commissions