import React, { useEffect, useState, useContext } from 'react'
import { getCommissions } from '../../api/api'
import { CurrentUserContext } from '../../utils/providers/CurrentUserProvider'
import toast, { Toaster } from 'react-hot-toast'
import { updateCommissionStatus } from '../../api/api'
import { LazyLoadComponent } from 'react-lazy-load-image-component'
import CommissionForm from '../Artist/CommissionForm'
import { Button, Card } from 'flowbite-react'
import CommissionProcess from './CommissionProcess'
import { CommissionsContext } from '../../utils/providers/CommissionsProvider'
const Commissions = () => {
  const { currentUser } = useContext(CurrentUserContext)
  const { commissions, setCommissions } = useContext(CommissionsContext)
  // const [commissions, setCommissions] = useState([])
  const [allCommissions, setAllCommissions] = useState([])
  const user = { currentUser }
  const [processData, setProcessData] = useState("");
  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
    getCommissions(
      {"Authorization" : user.currentUser.token}
    ).then((res) => {
      const commissionsData = res.data
      const result = commissionsData.filter(commission => commission.status !== null);
      setCommissions(result);
      setAllCommissions(result)
		})
		.catch((err) => {
      console.log(err)
			toast.error(err.response.data.error)
		});
	}, []);

  const handleFilter = (e) => {
    const result = commissions.filter(commission => commission.status === e.target.value);
    if(e.target.value !== "all"){
      setCommissions(result);
    }else{
      setCommissions(allCommissions);
    }
  }

  const handleCommissionStatus = (commissionData) =>{
    commissionData.status = "completed"
    updateCommissionStatus(
      {
        "Authorization" : user.currentUser.token,
      },
      {
        commission_id: commissionData.id
      }).then(res => {
          toast.success("Commission Status Updated Successfully")				
          const newCommissions = commissions.map(data => {
            if (data.id === commissionData.id) {
              return commissionData
            }
            return data;
          });
          setCommissions(newCommissions);
        }).catch(err => {
        console.log(err)
        let errors = err.response.data.errors
        if(errors.length > 1) {
          errors = errors.join("\n")	
        }
        toast.error(errors)
      })
  }
  const viewProcess = ((data)=>{
    setShowModal(true)
    setProcessData(data)
  })
  return (
    <div>
      <div className="flex justify-between border-b mb-2">
        <h2 className="text-2xl font-extrabold=">Commissions</h2>
        <div className="flex items-center justify-between pb-4 bg-white">
          <select onChange={handleFilter} id="filter" className="text-gray-500 bg-white focus:ring-0 focus:ring-primary-950 focus:border-primary-950 font-medium rounded-lg text-sm px-3 py-1.5">
            <option disabled={true}>Filter</option>
            <option value="all">All</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>  
        </div>
      </div>
      <table className="min-w-full bg-white divide-y divide-gray-200">
        <thead className="bg-gray-100">
            <tr className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              <th scope="col" className="p-2">#</th>
              <th scope="col" className="p-2">Thumbnail</th>
              <th scope="col" className="p-2">Kind</th>
              <th scope="col" className="p-2">Price</th>
              <th scope="col" className="p-2">Duration</th>
              <th scope="col" className="p-2">Status</th>
              <th scope="col" className="p-2">Action</th>
            </tr>
        </thead>
        <tbody className="mx-2 my-2">
        { commissions.map((commission, index) => {
          return (
            <tr key={commission.id} className="text-sm font-normal text-gray-900 whitespace-nowrap">
              <td className="p-2">{index + 1}</td>
              <td className="p-2">
                <LazyLoadComponent>
                  <img className="w-10 h-10 rounded-lg bg-gray-500" src={commission.image_url}/>
                </LazyLoadComponent>
              </td>
              <td className="p-2 max-w-xs truncate ..."><span className="">{commission.kind}</span></td>
              <td className="p-2">${commission.price}</td>
              <td className="p-2">{commission.duration} days</td>
              <td className="p-2">
                { user.currentUser.role === "artist" ?
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" onChange={() =>handleCommissionStatus(commission)} className="sr-only peer" checked={commission.status === "completed" && true} disabled={commission.status === "completed" && true}/>
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                    <span className="ml-3 text-sm font-medium text-gray-900">{commission.status}</span>
                  </label>
                : commission.status
                }
              </td>
              <td className="p-2 flex gap-2">
                {user.currentUser.role === "artist" && <CommissionForm action="update" commission={commission} location="dashboard"/> }
                <Button color="light" onClick={() => viewProcess(commission)}>View Process</Button>
              </td>
              { showModal? 
              <div className="fixed w-full h-full top-0 left-0 flex items-center justify-center inset-0 z-50 outline-none focus:outline-none">
              <div className="absolute w-full h-full ">
              <Card className="w-full shadow-none">
                <button onClick={() => setShowModal(false)} className="absolute m-3 top-0 right-0 text-primary-500 hover:text-primary-950">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <h1 className="text-2xl font-bold">Commission</h1>
                <CommissionProcess commission={processData}/>
              </Card>
              </div>
            </div>
          : null }
            </tr>
            
          )
        })}
        </tbody>
      </table>
      
      
      <Toaster position="top-center" reverseOrder={false}/>
    </div>
  )
}

export default Commissions