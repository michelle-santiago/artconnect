import React, { useState, useEffect, useContext } from 'react'
import Navbars from '../../components/Navbars'
import { MessagesContext } from '../../utils/providers/MessagesProvider'
import { getContacts } from '../../api/api'
import { CurrentUserContext } from '../../utils/providers/CurrentUserProvider'
import toast from 'react-hot-toast'
import MessagesRoom from './MessagesRoom'
import Skeleton from 'react-loading-skeleton'

const DirectMessages = () => {
  const { currentUser } = useContext(CurrentUserContext)
  const user = { currentUser }
  const [open, setOpen] = useState(false);
  const { contacts, updateContact, updateContacts} = useContext(MessagesContext)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(()=>{
    getContacts(
      {"Authorization" : user.currentUser.token}
    ).then((res) => {
      setIsLoading(false)
      updateContacts(res.data)
		})
		.catch((err) => {
			toast.error(err.response.data.error)
		});
  },[])

  const handleContact= (contact) =>{
    updateContact(contact)	
  }
  return (
    <>
      <div className="fixed top-0 z-50 w-full">
         <Navbars category="artist"/>
      </div>
      <div className="w-full fixed top-14 left-0 z-40 h-screen flex">
        <aside className={`${open ? "w-64" : "w-14"} bg-gray-100 p-2 pt-8 relative duration-300`}>
          <button className={`absolute cursor-pointer -right-3 top-9 w-7 ${!open && "rotate-180"}  border-2 rounded-full bg-white`} onClick={() => setOpen(!open)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" clipRule="evenodd" />
            </svg>
          </button>
          <div className="flex gap-x-4 items-center">
           <button className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"} text-primary-950`}>
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                 <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                 </svg>
           </button>
              <h1 className={`text-primary-950 origin-left font-medium text-xl duration-200 ${!open && "scale-0"}`}>
                 Contacts
              </h1>
          </div>
          <div className="pt-6">
            <ul>
              {isLoading ? 
                <Skeleton circle count={5} height="40px" width="40px"/>
              :
                contacts.map((contact, index)=>{
                  return(
                    <li key={index}to="" className="flex pt-2 rounded-md cursor-pointer hover:bg-light-white text-primary-950 text-sm items-center gap-x-4 bg-light-white">
                      <button onClick={() => handleContact(contact)} className="cursor-pointer duration-500">
                        {contact.avatar_url === null?
                            <div className="relative w-10 h-10 overflow-hidden rounded-full bg-gray-500">
                            <svg className="absolute w-12 h-12 text-primary-200 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                          </div>
                        :
                        <img className="w-10 h-10 rounded-full bg-gray-500" src={contact.avatar_url}/>
                        }
                        
                      </button>
                      <span className={`${!open && "hidden"} origin-left duration-200`}>
                        {contact.first_name} {contact.last_name}
                      </span>
                    </li>
                  )   
                })
              }
           
            </ul>
          </div>
        </aside>
        <div className="p-7 h-[90%] overflow-y-scroll w-full">
          <MessagesRoom category="direct"/>
        </div>
      </div>
    </>
  )
}

export default DirectMessages