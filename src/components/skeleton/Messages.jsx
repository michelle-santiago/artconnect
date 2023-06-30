import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Messages = () => {
  return (
    <div className="mb-0">
      <div className="flex justify-between items-baseline">
        <Skeleton width="300px"/>
      </div>
      <div className="h-96 px-6 mt-5 flex-1 overflow-y-scroll pb-7">
        <Skeleton/>
        <div className="flex justify-between items-baseline gap-2">
          <Skeleton square width="30px" height="30px"/>
          <div className="w-full mt-2">
            <Skeleton width="100px"/>
            <Skeleton/>
          </div>
        </div>
        <div className="flex justify-between items-baseline gap-2">
          <Skeleton square width="30px" height="30px"/>
          <div className="w-full mt-2">
            <Skeleton width="100px"/>
            <Skeleton/>
          </div>
        </div>
        <div className="flex justify-between items-baseline gap-2">
          <Skeleton square width="30px" height="30px"/>
          <div className="w-full mt-2">
            <Skeleton width="100px"/>
            <Skeleton/>
          </div>
        </div>
        <div className="flex justify-between items-baseline gap-2">
          <Skeleton square width="30px" height="30px"/>
          <div className="w-full mt-2">
            <Skeleton width="100px"/>
            <Skeleton/>
          </div>
        </div>
        <div className="flex justify-between items-baseline gap-2">
          <Skeleton square width="30px" height="30px"/>
          <div className="w-full mt-2">
            <Skeleton width="100px"/>
            <Skeleton/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Messages