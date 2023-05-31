import React, { useState, useContext, useEffect } from 'react'
import { CurrentUserContext } from '../../utils/providers/CurrentUserProvider';
import { Button, Label, Card } from 'flowbite-react'
import { commissionFields } from '../../constants/commissionFields';
import toast, { Toaster } from 'react-hot-toast';
import { createCommission } from '../../api/api';
import { updateCommission } from '../../api/api';
import { CommissionsContext } from '../../utils/providers/CommissionsProvider';
const CommissionForm = (props) => {
  const action = props.action
  const commissionData = props.commission
  const location = props.location
  const { currentUser } = useContext(CurrentUserContext)
  const user = { currentUser }
  const fields = commissionFields;
  let fieldsState = {};
  fields.forEach(field  => fieldsState[field.id] = "");
  const [ commission, setCommission ] = useState(fieldsState);
  const {commissions, setCommissions} = useContext(CommissionsContext)
  const [showModal, setShowModal] = useState(false);

  useEffect(()=>{
    if (action === "update"){
      setCommission(commissionData)
    }
  },[])

	const handleSubmit = (e) => {
		e.preventDefault();
    if (action === "add"){
		  addCommission()
    }else{
      editCommission()
    }
	}

  const addCommission = () =>{
    createCommission(
      {
        "Authorization" : user.currentUser.token,
        "Content-Type" : "multipart/form-data"
      },
      {
        kind: commission.kind,
        price: commission.price,
        duration: commission.duration,
        image: commission.image
      }).then(res => {
          toast.success("Commission Added Successfully")				
          setCommissions(prevState => [...prevState,  commission])	
        }).catch(err => {
        let errors = err.response.data.errors
        if(errors.length > 1) {
          errors = errors.join("\n")	
        }
        toast.error(errors)
      })
  } 

  const editCommission = () =>{
    updateCommission(
      {
        "Authorization" : user.currentUser.token,
        "Content-Type" : "multipart/form-data"
      },
      {
        id: commissionData.id,
        kind: commission.kind,
        price: commission.price,
        duration: commission.duration,
        image: commission.image
      }).then(res => {
          toast.success("Commission Updated Successfully")				
          const newCommissions = commissions.map(data => {
            if (data.id === commissionData.id) {
              return commission
            }
            return data;
          });
          setCommissions(newCommissions);
        }).catch(err => {
        let errors = err.response.data.errors
        if(errors.length > 1) {
          errors = errors.join("\n")	
        }
        toast.error(errors)
      })
  } 
	const handleChange = (e) => {
		setCommission({...commission, [e.target.name] : e.target.value})	
	}

	const handleChangeImage = (e) => {
		setCommission({...commission, [e.target.name] : e.target.files[0]})	
 }

  return (
    <>
      { action === "add" ? 
        <Button
          className="mt-2 mb-2 text-xl font-semibold bg-primary-950 focus:ring-transparent hover:bg-white hover:border-solid hover:border-primary-950 hover:text-black"
          type="button"
          onClick={() => setShowModal(true)}
        >
          Add Commission
        </Button>
      : 
        location === "dashboard" ?
          <Button onClick={() => setShowModal(true)}>Update</Button>
        :
          <button
            className="w-full inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white bg-primary-950 hover:text-primary-950 hover:bg-gray-200 focus:ring-4 focus:ring-gray-100"
            type="button"
            onClick={() => setShowModal(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>
            Update
          </button>
      }    
      { showModal &&
        <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            <Card 
              className="w-full lg:max-w-screen-lg md:max-w-screen-sm [&>img]:hidden md:[&>img]:w-96 md:[&>img]:p-0 md:[&>*]:w-full md:[&>*]:p-16 lg:[&>img]:block"
            >
              <button onClick={() => setShowModal(false)} className="absolute m-5 top-0 right-0 text-primary-500 hover:text-primary-950">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <h1 className="text-2xl font-bold"> {action === "add" ? "Create" : "Update"} Commission</h1>
              <form className="w-full" onSubmit={handleSubmit} >
                { fields.map((field,index) =>
                  <div key={index} >
                    { field.type !== "radio"?
                    <>
                      <Label htmlFor={field.labelFor}>
                        {field.labelText}
                      </Label>
                      <input
                        onChange={handleChange}
                        value={commission[field.id]}
                        id={field.id}
                        name={field.name}
                        type={field.type}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 focus:ring-primary-950 focus:border-primary-950 block w-full p-2.5"
                        placeholder={field.placeholder}
                      />
                    </>
                    :
                    <div className="flex items-center pl-4 border border-gray-200 rounded-lg">
                      <input
                        onChange={handleChange}
                        value={field.labelText.toLowerCase()}
                        id={field.id}
                        name={field.name}
                        type={field.type}
                        className="w-4 h-4 text-primary-950 bg-gray-100 border-gray-300 focus:ring-0"
                        placeholder={field.placeholder}
                      />
                      <label htmlFor={field.labelFor} className="w-full py-4 ml-2 text-sm font-medium text-gray-900">{field.labelText}</label>
                    </div>
                    }
                  </div>
                )}

                <label className="block mb-2 mt-6 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Image</label>
                <input
                  onChange={handleChangeImage}
                  name="image"
                  type="file"
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                />    
                <Button type="submit" className="w-full mt-6 text-xl font-semibold bg-primary-950 focus:ring-transparent hover:bg-white hover:border-solid hover:border-primary-950 hover:text-black" onSubmit={handleSubmit}>
                  Submit
                </Button>
              </form>
            </Card>
          </div>
          
          <Toaster position="top-center" reverseOrder={false}/>
        </div>
        </>
      }
    </>
  )
}

export default CommissionForm