import React, { useContext, useEffect } from 'react'
import CommissionProcessForm from './CommissionProcessForm'
import { CurrentUserContext } from '../../utils/providers/CurrentUserProvider'
import { updateProcessStatus } from '../../api/api'
import toast, { Toaster } from 'react-hot-toast'
import { CommissionsContext } from '../../utils/providers/CommissionsProvider'
import dateFormat from '../../helper/dateFormat'

const CommissionProcess = () => {
  const { currentUser } = useContext(CurrentUserContext)
  const user = { currentUser }
  const { commission, commissions, processes, setProcesses, setCommissions, setCommission } = useContext(CommissionsContext)

  useEffect(()=>{
    setProcesses(commission.process)
  },[setCommission])

  const handleProcessStatus = (processData) =>{
    processData.p_status = "completed"
    toast.promise(
      updateProcessStatus(
        {
          "Authorization" : user.currentUser.token,
        },
        {
          commission_id: commission.id
        }).then(res => {
          const updatedCommission = res.data
          const newCommissions = commissions.map(data => {
            if (data.id === updatedCommission.id) {
              return updatedCommission
            }
            return data;
          });
          setCommissions(newCommissions)
          setCommission(updatedCommission)
        }).catch(err => {
          let errors = err.response.data.errors
          if(errors.length > 1) {
            errors = errors.join("\n")	
          }
          throw errors
        }),
        {
          loading: "Updating...",
          success: "Completed successfully",
          error: (errors) => errors
        }
    )
  
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
      <div className="overflow-y-scroll h-96">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead className="bg-gray-100">
              <tr className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                <th scope="col" className="p-2">#</th>
                <th scope="col" className="p-2">Phase</th>
                <th scope="col" className="p-2">Status</th>
                <th scope="col" className="p-2">Datetime</th>
                <th scope="col" className="p-2">Price</th>
                <th scope="col" className="p-2">Payment Status</th>
                { user.currentUser.role === "artist" && <th scope="col" className="p-2">Action</th> }
              </tr>
          </thead>
          <tbody className="mx-2 my-2">
            {processes && processes.map((process,index) => {
            return (
              <tr key={index} className=" rounded-lg">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{process.phase}</td>
                <td className="p-2">
                  { user.currentUser.role === "artist" ?
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" value="" onChange={() =>handleProcessStatus(process)} className="sr-only peer" checked={process.p_status === "completed" && true} disabled={process.p_status === "completed" && true}/>
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                      <span className="ml-3 text-sm font-medium text-gray-900">{process.p_status}</span>
                    </label>
                  : process.p_status
                  }
                </td>
                <td className="p-2">{dateFormat(process.datetime)}</td>
                <td className="p-2">{process.p_price}</td>
                <td className="p-2">{process.payment_status}</td>
                { user.currentUser.role === "artist" && process.p_status !== "completed" &&
                <td className='p-2'>
                  <CommissionProcessForm action="update" process={process}/>
                </td>
                }
              </tr>
            )})}
        </tbody>
      </table>
     </div>
     <Toaster position="top-center" reverseOrder={false}/>
    </div>
  )
}

export default CommissionProcess