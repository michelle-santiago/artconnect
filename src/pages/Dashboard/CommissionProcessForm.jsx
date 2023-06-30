import React, {useState, useContext, useEffect} from 'react'
import { CurrentUserContext } from '../../utils/providers/CurrentUserProvider'
import { commissionProcessFields } from '../../constants/commissionProcessFields'
import toast, { Toaster } from 'react-hot-toast'
import { createCommissionProcess, updateCommissionProcess } from '../../api/api'
import { Button, Card, Label } from 'flowbite-react'
import { CommissionsContext } from '../../utils/providers/CommissionsProvider'

const CommissionProcessForm = (props) => {
  const action = props.action
  const process = props.process
  const { currentUser } = useContext(CurrentUserContext)
  const user = { currentUser }
  const fields = commissionProcessFields;
  let fieldsState = {};
  fields.forEach(field  => fieldsState[field.name] = "");
  const [ commissionProcess, setCommissionProcess ] = useState(fieldsState);
  const [showModal, setShowModal] = useState(false);
  const { commissions, setCommissions, commission, setProcesses, setCommission } = useContext(CommissionsContext)
  
  useEffect(()=>{
    setProcesses(commission.process)
  },[setCommission])


  useEffect(()=>{
    if (action === "update"){
      let processState = {};
      Object.keys(process).forEach(k => process[k] === null ? processState[k] = "" : processState[k] = process[k])
      setCommissionProcess(processState)
      console.log(processState,"s")
      console.log(commissionProcess,"a")
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
    if(commissionProcess.phase === ""){
      toast.error("Please input phase")
    }else{
      toast.promise(
        createCommissionProcess(
          {
            "Authorization" : user.currentUser.token,
          },
          {
            phase: commissionProcess.phase,
            p_status: "pending",
            p_price: commissionProcess.p_price,
            payment_status: commissionProcess.payment_status,
            remarks: commissionProcess.remarks,
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
              setProcesses(updatedCommission.process)
              setShowModal(false)
              setCommissionProcess(fieldsState)
          }).catch(err => {
            console.log(err,"ee")
            throw err
          }),
          {
            loading: "Adding...",
            success: "Process Added Successfully",
            error: (err) => err.response.data.error,
          }
      )
    }
   
  } 
  const editCommissionProcess = () =>{
    if(commissionProcess.phase === ""){
      toast.error("Please input phase")
    }else{
      toast.promise(
        updateCommissionProcess(
          {
            "Authorization" : user.currentUser.token,
          },
          {
            phase: commissionProcess.phase,
            p_status: commissionProcess.p_status,
            p_price: commissionProcess.p_price,
            payment_status: commissionProcess.payment_status,
            remarks: commissionProcess.remarks,
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
              setProcesses(updatedCommission.process)
              setShowModal(false)
          }).catch(err => {
            throw err
          }),
          {
            loading: "Updating...",
            success: "Process Updated Successfully",
            error: (err) => err.response.data.error,
          }
      )
    }
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
          <Card className="relative w-full lg:max-w-screen-lg md:max-w-screen-sm">
            <button onClick={() => setShowModal(false)} className="absolute m-5 top-0 right-0 text-primary-500 hover:text-primary-950">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h1 className="text-2xl font-bold"> {action === "add" ? "Create" : "Update"} Process</h1>
            <form className="w-full" onSubmit={handleSubmit}>
              { fields.map((field,index) =>
               <div key={index} className="mb-2 flex flex-col gap-y-2">
                { field.type !== "radio" ?
                  <>
                    {field.name === "phase" && action === "update" ?
                      <h1 className="font-semibold text-xl">{commissionProcess[field.name]}</h1>
                    :
                      <>
                        <Label htmlFor={field.labelFor} >{field.labelText}</Label>
                        <input
                          onChange={handleChange}
                          value={commissionProcess[field.name]}
                          id={field.id}
                          name={field.name}
                          type={field.type}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 focus:ring-primary-950 focus:border-primary-950 block w-full p-2.5"
                          placeholder={field.placeholder}
                        />
                      </>
                    }
                  </>
              	:
                  <>
                    { field.id === "bordered-radio-1" && 
                      <>
                        <Label htmlFor="payment-status" className="flex items-center gap-2" >
                          Payment Status 
                          <span className="border text-xs p-1 hover:bg-primary-300">{commissionProcess.payment_status === ""? "N/A" : commissionProcess.payment_status.toUpperCase()} </span>
                        </Label> 
                        <div>Select from choices to change</div>
                      </>
                    }
                     <div className="flex items-center pl-4 border border-gray-200 rounded-lg"> 
                      <input
                        onChange={handleChange}
                        value={field.labelText.toLowerCase()}
                        id={field.id}
                        name={field.name}
                        type={field.type}
                        className="w-3 h-3 text-primary-950 bg-gray-100 border-gray-300 focus:ring-0"
                        placeholder={field.placeholder}
                      />
                      <label htmlFor={field.labelFor} className="w-full py-1.5 ml-4 text-sm font-medium text-gray-900">{field.labelText === ""? "N/A" : field.labelText}</label>
                     </div>
                  </>
                }
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