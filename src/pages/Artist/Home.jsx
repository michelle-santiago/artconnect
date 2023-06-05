import React, { useEffect, useContext, useState } from 'react'
import Navbars from '../../components/Navbars'
import { useParams} from 'react-router-dom'
import { CurrentUserContext } from '../../utils/providers/CurrentUserProvider'
import { CommissionsContext } from '../../utils/providers/CommissionsProvider';
import { getArtist, getCommissions, updateMaxSlot } from '../../api/api'
import { Button, Card } from 'flowbite-react';
import toast, { Toaster } from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
const Home = () => {
  const { username } = useParams();
  const { currentUser } = useContext(CurrentUserContext)
  const user = { currentUser }
  const [artist, setArtist] = useState({})
  const { setArtistInfo } = useContext(CommissionsContext)
  const [slotsTaken, setSlotsTaken] = useState("0")
  const [maxSlot, setMaxSlot] = useState("5")
  const [slotStatus, setSlotStatus] = useState("Open")
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    getArtist(
      {"Authorization" : user.currentUser.token}, username
    ).then((res) => {
			setArtist(res.data);
      setMaxSlot(res.data.max_slot)
      setArtistInfo(res.data)
		})
		.catch((err) => {
			toast.error(err.response.data.error)
		});

    getCommissions(
      {"Authorization" : user.currentUser.token}
    ).then((res) => {
      const commissions = res.data
      const newCommissions = commissions.filter(commission => commission.status === "in progress")
      setSlotsTaken(newCommissions.length)
		})
		.catch((err) => {
      console.log(err)
			toast.error(err.response.data.error)
		});
	}, []);

  useEffect(() => {
    if(slotsTaken <= maxSlot){
      setSlotStatus(maxSlot == slotsTaken ? " Closed" : " Open") 
    }
  }, [maxSlot]);
  
  const handleUpdate = () =>{
    if(maxSlot < slotsTaken){
      toast.error("Maximum commission slot can't be less than taken slots")
      setMaxSlot(artist.max_slot)
    }else{
      updateMaxSlot(
        {
          "Authorization" : user.currentUser.token,
          "Content-Type" : "multipart/form-data"
        },
        {
          max_slot: maxSlot
        }).then(res => {
            toast.success("Updated Successfully")	
            const updatedArtist = artist 
            updatedArtist.max_slot = res.data.max_slot
            setArtist(updatedArtist)
          }).catch(err => {
          console.log(err)
          let errors = err.response.data.errors
          if(errors.length > 1) {
            errors = errors.join("\n")	
          }
          toast.error(errors)
        })
    }
    
  } 
  const handleChange = (e) =>{
    setMaxSlot(e.target.value)
  }
  return (
    <>
      <div className="fixed top-0 z-50 w-full">
        <Navbars category="artist"/>
      </div>
      <div className="pt-20">
        <section className="bg-white">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
              <div className="flex flex-col justify-center">
                  <h1 className="mb-4 text-4xl font-extrabold pb-5 tracking-tight leading-none text-gray-900 md:text-4xl lg:text-6xl">
                    Commissions {slotStatus}({slotsTaken}/{maxSlot})
                    {artist.id === user.currentUser.id &&
                      <button onClick={() => setShowModal(true)} className="p-5">   
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>
                      </button>
                    } 
                  </h1>
                  <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                      <NavLink to="/commissions" className="inline-flex border justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary-950 hover:bg-primary-800 focus:ring-4 focus:ring-blue-300">
                          Check Commissions
                          <svg aria-hidden="true" className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                      </NavLink>
                      <NavLink to="/terms" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100">
                          Read Terms and conditions
                      </NavLink>  
                  </div>
              </div>
              <div>
                <img className="mx-auto w-full h-64 rounded-lg sm:h-96 shadow-xl" src="/images/artisthome.jpg"/>
              </div>
            </div>
          </section> 
          { showModal &&
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <Card className="w-full shadow-none lg:max-w-screen-lg md:max-w-screen-sm p-4">
                  <button onClick={() => setShowModal(false)} className="absolute m-3 top-0 right-0 text-primary-500 hover:text-primary-950">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <input type="number" id="max_slot" onChange={(e) => handleChange(e)} value={maxSlot} className="h-11 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block" required/>
                  <Button 
                    className="mt-2 mb-2 text-xl font-semibold bg-primary-950 focus:ring-transparent hover:bg-white hover:border-solid hover:border-primary-950 hover:text-black"
                    onClick={() => handleUpdate()}
                  >
                    Update Slot
                  </Button>
                </Card>
                </div>
              </div>
        }
        <Toaster position="top-center" reverseOrder={false}/>
      </div>
    </>
  )
}

export default Home