import React, {useState, useContext, useEffect} from 'react'
import { CurrentUserContext } from '../../utils/providers/CurrentUserProvider'
import { commissionProcessFields } from '../../constants/commissionProcessFields'
import toast, { Toaster } from 'react-hot-toast'
import { createCommissionProcess } from '../../api/api'
import { updateCommissionProcess } from '../../api/api'
import { Button, Card, Label } from 'flowbite-react'
import { CommissionsContext } from '../../utils/providers/CommissionsProvider'
const CommissionProcessForm = (props) => {
  const action = props.action
  const commissionProcessData = props.process
  console.log(commissionProcessData)
  console.log(action)
  const commissionId = props.commissionId
  const { currentUser } = useContext(CurrentUserContext)
  const user = { currentUser }
  const fields = commissionProcessFields;
  let fieldsState = {};
  fields.forEach(field  => fieldsState[field.id] = "");
  const [ commissionProcess, setCommissionProcess ] = useState(fieldsState);
  // const {processes, setProcesses} = useContext(CommissionsContext)
  const [showModal, setShowModal] = useState(false);

  useEffect(()=>{
    if (action === "update"){
      console.log(commissionProcessData)
      setCommissionProcess(commissionProcessData)
    }
  },[])

  const handleSubmit = (e) => {
		e.preventDefault();
    if (action === "add"){
		  addCommissionProcess()
    }else{
      editCommissionProcess()
    }
	}
  const addCommissionProcess = () =>{
    createCommissionProcess(
      {
        "Authorization" : user.currentUser.token,
      },
      {
        phase: commissionProcess.phase,
        status: commissionProcess.status,
        price: commissionProcess.price,
        payment_status: commissionProcess.paymentStatus,
        remarks: commissionProcess.remarks,
        commission_id: commissionId
      }).then(res => {
          toast.success("Commission Process Added Successfully")
          const newCommissionProcess = commissionProcess.push(commissionProcess)				
          setCommissionProcess(newCommissionProcess)	
      }).catch(err => {
        toast.error(err.response.data.error)
      })
  } 
  const editCommissionProcess = () =>{
    updateCommissionProcess(
      {
        "Authorization" : user.currentUser.token,
      },
      {
        phase: commissionProcess.phase,
        status: commissionProcess.status,
        price: commissionProcess.price,
        payment_status: commissionProcess.paymentStatus,
        remarks: commissionProcess.remarks,
        commission_id: commissionId
      }).then(res => {
          toast.success("Commission Process Updated Successfully")				
          const newCommissionProcess = commissionProcess.map(data => {
            if (data.id === commissionProcessData.id) {
              return commissionProcess
            }
            return data;
          });
          setCommissionProcess(newCommissionProcess);
        }).catch(err => {
        console.log(err)
        toast.error(err.response.data.error)
      })
  } 
  const handleChange = (e) => {
		setCommissionProcess({...commissionProcess, [e.target.name] : e.target.value})	
	}

  return (
    <>
    { action === "add"?
      user.currentUser.role === "artist" ?   
          <Button
            className="mt-2 mb-2 text-xl font-semibold bg-primary-950 focus:ring-transparent hover:bg-white hover:border-solid hover:border-primary-950 hover:text-black"
            type="button"
            onClick={() => setShowModal(true)}
          >
            Add Process
          </Button>
      : null
    :
      <Button onClick={() => setShowModal(true)}>Update</Button>
    }
    {showModal &&
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-full my-6 mx-auto max-w-3xl">
          <Card className="w-full lg:max-w-screen-lg md:max-w-screen-sm">
            <button onClick={() => setShowModal(false)} className="absolute m-5 top-0 right-0 text-primary-500 hover:text-primary-950">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h1 className="text-2xl font-bold"> {action === "add" ? "Create" : "Update"} Process</h1>
            <form className="w-full" onSubmit={handleSubmit}>
              { fields.map((field,index) =>
              <div key={index} className="mb-4 flex flex-col gap-y-3">
                <Label htmlFor={field.labelFor} >{field.labelText}</Label>
                <input
                  onChange={handleChange}
                  value={commissionProcess[field.id]}
                  id={field.id}
                  name={field.name}
                  type={field.type}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 focus:ring-primary-950 focus:border-primary-950 block w-full p-2.5"
                  placeholder={field.placeholder}
                />
              </div>
              )}
            <Button type="submit" className="w-full mt-6 text-xl font-semibold bg-primary-950 focus:ring-transparent hover:bg-white hover:border-solid hover:border-primary-950 hover:text-black" onSubmit={handleSubmit}>
              Submit
            </Button>
          </form>
        </Card>
      </div>
      <Toaster position="top-center" reverseOrder={false}/>
    </div>
  
    }
    
    </>
  )
}

export default CommissionProcessForm