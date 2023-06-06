import React, { useContext, useState, useEffect } from 'react'
import { Card } from 'flowbite-react'
import CommissionProcessForm from './CommissionProcessForm'
import { CurrentUserContext } from '../../utils/providers/CurrentUserProvider'
import { updateProcessStatus } from '../../api/api'
import toast, { Toaster } from 'react-hot-toast'
import { CommissionsContext } from '../../utils/providers/CommissionsProvider'
const CommissionProcess = (props) => {
  const commission = props.commission
  const commissionProcess = props.commission.process
  const commissionId = commission.id
  // const { processes, setProcesses } = useState(CommissionsContext)
  const [processes, setProcesses] = useState(commissionProcess)
  const { currentUser } = useContext(CurrentUserContext)
  const user = { currentUser }

  // const [commissionProcesses, setCommissionProcesses] = useState([])
  // useEffect(()=>{
  //     setProcesses(commissionProcess)
  // },[])
  const handleProcessStatus = (processData) =>{
    processData.status = "completed"
    updateProcessStatus(
      {
        "Authorization" : user.currentUser.token,
      },
      {
        commission_id: commissionId
      }).then(res => {
          toast.success("Process completed Successfully")
          const processLength = processes.length				
          const newProcesses = processes.map((data, index) => {
            if (processLength === index + 1) {
              return processData
            }
            return data;
          });
          setProcesses(newProcesses);
        }).catch(err => {
        console.log(err)
        let errors = err.response.data.errors
        if(errors.length > 1) {
          errors = errors.join("\n")	
        }
        toast.error(errors)
      })
  }
  return (
    <div className="h-screen">
      <div className="w-full border-b flex flex-row items-center bg-white">
        <div className="w-full flex flex-row items-baseline justify-between leading-normal">
          <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900">{commission.kind}</h5>
          <p className="mb-3 font-normal text-gray-700">${commission.price}</p>
          <p className="text-primary-950 gap-2">
            <span>{commission.duration} days</span> 
          </p>
        </div>
      </div>
      <h3 className="mb-2 text-xl font-bold tracking-tight text-gray-900">Process</h3>
      <CommissionProcessForm action="add" commissionId={commission.id}/>
      <table className="min-w-full bg-white divide-y divide-gray-200">
        <thead className="bg-gray-100">
            <tr className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              <th scope="col" className="p-2">#</th>
              <th scope="col" className="p-2">Phase</th>
              <th scope="col" className="p-2">Status</th>
              <th scope="col" className="p-2">Datetime</th>
              <th scope="col" className="p-2">Price</th>
              <th scope="col" className="p-2">Payment Status</th>
              <th scope="col" className="p-2">Remarks</th>
              { user.currentUser.role === "artist" && <th scope="col" className="p-2">Action</th> }
            </tr>
        </thead>
        <tbody className="mx-2 my-2">
          {processes.map((process,index) => {
          return (
            <tr key={index} className=" rounded-lg">
              <td className="p-2">{index + 1}</td>
              <td className="p-2">{process.phase}</td>
              <td className="p-2">
                { user.currentUser.role === "artist" ?
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" onChange={() =>handleProcessStatus(process)} className="sr-only peer" checked={process.status === "completed" && true} disabled={process.status === "completed" && true}/>
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                    <span className="ml-3 text-sm font-medium text-gray-900">{process.status}</span>
                  </label>
                : process.status
                }
              </td>
              <td className="p-2">{process.datetime}</td>
              <td className="p-2">{process.price}</td>
              <td className="p-2">{process.payment}</td>
              <td className="p-2">{process.remarks}</td>
              { user.currentUser.role === "artist" && 
              <td className='p-2'>
                <CommissionProcessForm action="update" process={process} commissionId={commission.id}/>
              </td>
              }
            </tr>
          )})}
      </tbody>
     </table>
     <Toaster position="top-center" reverseOrder={false}/>
    </div>
  )
}

export default CommissionProcess