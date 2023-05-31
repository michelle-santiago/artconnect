import React, { useState, useEffect, useContext } from 'react'
import { getRequests } from '../../api/api'
import { CurrentUserContext } from '../../utils/providers/CurrentUserProvider'
import toast, { Toaster } from 'react-hot-toast'
import { Button } from 'flowbite-react'
import { LazyLoadComponent } from 'react-lazy-load-image-component'
import { updateRequest } from '../../api/api'
import { updatePayment } from '../../api/api'
import { cancelRequest } from '../../api/api'
const Requests = () => {
  const { currentUser } = useContext(CurrentUserContext)
  const [requests, setRequests] = useState([])
  const [allRequests, setAllRequests] = useState([])
  const [action, setAction] = useState("approved")
  const user = { currentUser }

  useEffect(() => {
    getRequests(
      {"Authorization" : user.currentUser.token}
    ).then((res) => {
			setRequests(res.data);
      setAllRequests(res.data)
		})
		.catch((err) => {
      console.log(err)
			toast.error(err.response.data.error)
		});
	}, []);

  const handleFilter = (e) => {
    const result = requests.filter(request => request.status === e.target.value);
    if(e.target.value !== "all"){
      setRequests(result);
    }else{
      setRequests(allRequests);
    }
  }

  const handleCancel = (requestData) =>{
    requestData.status = "cancelled"
    cancelRequest(
      {
        "Authorization" : user.currentUser.token
      },
      {
        request_id: requestData.id,
        status: "cancelled"
            
      }).then(res => {
          toast.success("Request Cancelled Successfully")				
          const newRequests = requests.map(data => {
          if (data.id === requestData.id) {
            return requestData
          }
          return data;
        });
        setRequests(newRequests);
        }).catch(err => {
        console.log(err)
        let errors = err.response.data.errors
        if(errors.length > 1) {
          errors = errors.join("\n")	
        }
        toast.error(errors)
      })
  }

  const handleAction = (e) =>{
    setAction(e.target.value)
  }

  const handleUpdate = (requestData) =>{
    requestData.status = action
    updateRequest(
      {
        "Authorization" : user.currentUser.token
      },
      {
        request_id: requestData.id,
        kind: requestData.kind,
        price: requestData.price,
        duration: requestData.duration,
        image_url: requestData.image_url,
        client_id: requestData.client_id,
        status: action,
        phase: "sketch",
        p_status: "pending",
        c_status: "in progress"
      }).then(res => {
          toast.success("Request Updated Successfully")				
          const newRequests = requests.map(data => {
            if (data.id === requestData.id) {
              return requestData
            }
            return data;
          });
          setRequests(newRequests);
        }).catch(err => {
        let errors = err.response.data.errors
        if(errors.length > 1) {
          errors = errors.join("\n")	
        }
        toast.error(errors)
      })
  } 
  const handlePayment = (requestData) =>{
    requestData.payment_status = "paid"
    updatePayment(
      {
        "Authorization" : user.currentUser.token,
      },
      {
        request_id: requestData.id
      }).then(res => {
          toast.success("Payment updated Successfully")				
          const newRequests = requests.map(data => {
            if (data.id === requestData.id) {
              return requestData
            }
            return data;
          });
          setRequests(newRequests);
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
    <div className="">
      <div className="flex justify-between border-b mb-2">
        <h2 className="text-2xl font-extrabold=">Requests</h2>
        <div className="flex items-center justify-between pb-4 bg-white">
          <select onChange={handleFilter} id="filter" className="text-gray-500 bg-white focus:ring-0 focus:ring-primary-950 focus:border-primary-950 font-medium rounded-lg text-sm px-3 py-1.5">
            <option disabled={true}>Filter</option>
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approve</option>
            <option value="declined">Decline</option>
            <option value="cancelled">Cancel</option>
            <option value="refund">Refund</option>
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
                <th scope="col" className="p-2">Payment Status</th>
                <th scope="col" className="p-2">Status</th>
                <th scope="col" className="p-2">Action</th>
            </tr>
        </thead>
        <tbody className="mx-2 my-2">
            { requests.map((request, index) => {
              return (
                <tr key={request.id} className="text-sm font-normal text-gray-900 whitespace-nowrap">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">
                    <LazyLoadComponent>
                      <img className="w-10 h-10 rounded-lg bg-gray-500" src={request.image_url}/>
                    </LazyLoadComponent>
                  </td>
                  <td className="p-2 max-w-xs truncate ..."><span className="">{request.kind}</span></td>
                  <td className="p-2">${request.price}</td>
                  <td className="p-2">{request.duration} days</td>
                  <td className="p-2">
                    { user.currentUser.role === "artist" ?
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" onChange={() =>handlePayment(request)} className="sr-only peer" checked={request.payment_status === "paid" && true} disabled={request.payment_status === "paid" && true}/>
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                        <span className="ml-3 text-sm font-medium text-gray-900">{request.payment_status}</span>
                      </label>
                   : request.payment_status
                    }
                  </td>
                  <td className="p-2"> {request.status}</td>
                  <td className="flex gap-2 items-center p-2">
                  { user.currentUser.role === "artist" ?
                    <>
                      <select id="action" onChange={handleAction}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 focus:ring-primary-950 focus:border-primary-950 block w-full p-2.5">
                        <option disabled={true}>Select</option>
                        <option value="approved">Approve</option>
                        <option value="declined">Decline</option>
                        <option value="cancelled">Cancel</option>
                        <option value="refund">Refund</option>
                      </select>  
                    <Button onClick={() =>handleUpdate(request)}>Update</Button>
                    </>
                  :
                  request.status === "pending" && <Button color="failure" onClick={() =>handleCancel(request)}>Cancel</Button>
                  }
                  </td>
                  
                </tr>
              )
            })}
        </tbody>
    </table>
      <Toaster position="top-center" reverseOrder={false}/>
    </div>

  )
}

export default Requests