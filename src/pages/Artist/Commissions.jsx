import React, { useState, useContext, useEffect } from 'react'
import { Card } from 'flowbite-react'
import { CurrentUserContext } from '../../utils/providers/CurrentUserProvider'
import CommissionForm from './CommissionForm'
import { CommissionsContext } from '../../utils/providers/CommissionsProvider'
import { LazyLoadComponent } from 'react-lazy-load-image-component'
import { createRequest, getArtist, getArtistCommissions, getCommissions } from '../../api/api'
import toast, { Toaster } from 'react-hot-toast'
import Navbars from '../../components/Navbars';
import { useParams } from 'react-router-dom'
import SquaresSkeleton from '../../components/skeleton/Squares'

const Commissions = () => {
  const { currentUser } = useContext(CurrentUserContext)
  const user = { currentUser }
  const { username } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState(""); 
  const { commissions, setCommissions, artistInfo, setArtistInfo } = useContext(CommissionsContext)
  const [slotsTaken, setSlotsTaken] = useState("0")
  const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
    getArtist(
      {"Authorization" : user.currentUser.token}, username
    ).then((res) => {
      setArtistInfo(res.data)
		})
		.catch((err) => {
      toast.error("Something went wrong, reload the page")
		});

    getCommissions(
      {"Authorization" : user.currentUser.token}
    ).then((res) => {
      const commissions = res.data
      const newCommissions = commissions.filter(commission => commission.status === "in progress")
      setSlotsTaken(newCommissions.length)
		})
		.catch((err) => {
      toast.error("Something went wrong, reload the page")
		});
	}, []);

  useEffect(() => {
    getArtistCommissions(
      {"Authorization" : user.currentUser.token}, artistInfo.id
    ).then((res) => {
      setIsLoading(false)
			setCommissions(res.data);
		})
		.catch((err) => {
      toast.error("Something went wrong, reload the page")
		});
  }, [artistInfo]);

  const zoomImage = ((image)=>{
    setShowModal(true)
    setImage(image)
  })

  const handleRequest = (commission) =>{
    if( slotsTaken >= artistInfo.max_slot){
      toast.error("Sorry commission slot already full, you can message me for inquiry")
    }else{
      toast.promise(
        createRequest(
          {
            "Authorization" : user.currentUser.token,
            "Content-Type" : "multipart/form-data"
          },
          {
            kind: commission.kind,
            price: commission.price,
            duration: commission.duration,
            image_url: commission.image_url,
            artist_id: commission.artist_id
          }).then(res => {			
          }).catch(err => {
            console.log(err)
            let errors = err.response.data.errors
            if(errors.length > 1) {
              errors = errors.join("\n")	
            }
            throw errors
          }),
          {
            loading: "Requesting",
            success: "Requested Successfully",
            error: (errors) => errors,
          }
      )
    
    }

  } 

  return (
    <>
    <div className="fixed top-0 z-50 w-full">
      <Navbars category="artist"/>
    </div>
    <div className="pt-20 px-20">
    <h1 className="text-center border-b p-2 mb-4 text-2xl font-extrabold tracking-tight leading-none text-gray-900 md:text-3xl lg:text-4xl">Commissions</h1>
      {artistInfo.id === user.currentUser.id &&<CommissionForm action="add"/>}
      <div className="pt-5 grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
        { isLoading ? 
            <SquaresSkeleton count={8}/>
          :
          <>
            { commissions.map((commission,index) => {
              return (
                <div key={index} className="border rounded-lg">
                  <button onClick={() => zoomImage(commission.image_url)} className="absolute text-white m-1  hover:text-primary-950">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                      <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                      <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  { commission.image_url !== null? 
                    <LazyLoadComponent>
                      <div className={`bg-cover bg-center bg-no-repeat bg-gray-300`} style={{ backgroundImage: `url(${commission.image_url})`}}>
                        <div className="px-4 mx-auto max-w-screen-xl py-24 lg:py-40 text-transparent hover:text-white">
                        </div>
                      </div>
                    </LazyLoadComponent>
                    : 
                    <div className="bg-cover bg-center bg-no-repeat bg-gray-300">
                      <div className="px-4 mx-auto max-w-screen-xl py-24 lg:py-40 hover:text-white">
                        <div className="flex flex-col items-center justify-center">
                          <svg className="absolute w-24 h-24 text-primary-500 -left-.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" /></svg>
                        </div>
                      </div>
                    </div>
                  }
                  
                  <h1 className="p-2 text-xl tracking-tight leading-none  truncate ...">{commission.kind}</h1>
                  <div className="flex justify-between">
                    <span className="text-lg p-2">Duration: {commission.duration} days</span>
                    <span className="font-bold text-lg p-2">${commission.price}</span>
                  </div>
                  { commission.artist_id === user.currentUser.id ? 
                    <CommissionForm action="update" commission={commission}/> 
                  : 
                    user.currentUser.role === "client" &&             
                    <button onClick={() => handleRequest(commission)} className="w-full inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white bg-primary-950 hover:text-primary-950 hover:bg-gray-200 focus:ring-4 focus:ring-gray-100">
                      Request
                      <svg aria-hidden="true" className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </button>
                  }
                  { showModal? 
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                      <div className="relative w-auto my-6 mx-auto max-w-3xl">
                      <Card className="w-full shadow-none lg:max-w-screen-lg md:max-w-screen-sm">
                        <button onClick={() => setShowModal(false)} className="absolute m-3 top-0 right-0 text-primary-500 hover:text-primary-950">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                        <img src={image} className="mt-3 max-h-96 rounded-lg shadow-lg"/>
                      </Card>
                      </div>
                    </div>
                  : null }
                </div> 
              )
            })}
          </>
        }
      </div>
      <Toaster position="top-center" reverseOrder={false}/>
    </div>
    </>
  )
}

export default Commissions