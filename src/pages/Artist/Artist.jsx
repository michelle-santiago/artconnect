import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { CurrentUserContext } from '../../utils/providers/CurrentUserProvider';
import { getArtist, getArtistCommissions } from '../../api/api';
import toast, { Toaster } from 'react-hot-toast';
import { Tabs} from 'flowbite-react';
import Commissions from './Commissions';
import CommissionForm from './CommissionForm';
import { CommissionsContext } from '../../utils/providers/CommissionsProvider';
const Artists = () => {
  const { id } = useParams();
  const { currentUser } = useContext(CurrentUserContext)
  const user = { currentUser }
  const [artist, setArtist] = useState({})
  const { setCommissions } = useContext(CommissionsContext)

	useEffect(() => {
    getArtist(
      {"Authorization" : user.currentUser.token}, id
    ).then((res) => {
			setArtist(res.data);
		})
		.catch((err) => {
			toast.error(err.response.data.error)
		});

    getArtistCommissions(
      {"Authorization" : user.currentUser.token}, id
    ).then((res) => {
			setCommissions(res.data);
		})
		.catch((err) => {
			toast.error(err.response.data.error)
		});
	}, []);

  return (
    <div className="w-full px-10 pt-5">
      <div className="flex flex-row items-center bg-white">
        <div>
        { artist.avatar_url === null? 
          <div className="relative w-24 h-24 overflow-hidden rounded-full bg-primary-50">
            <svg className="absolute w-24 h-24 text-primary-500 -left-.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
          </div>
          :
          <img src={artist.avatar_url} className="w-24 h-24 mb-3 rounded-full shadow-lg"/>
        }
        </div>
        <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{artist.first_name} {artist.last_name}</h5>
            <p className="mb-3 font-normal text-gray-700">{artist.email}</p>
            <p className="flex text-primary-950 gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-.53 14.03a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V8.25a.75.75 0 00-1.5 0v5.69l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3z" clipRule="evenodd" />
              </svg>
              <span>Commissions Open 2/{artist.max_slot}</span>
              
          </p>
        </div>
      </div>
      <Tabs.Group aria-label="Tabs with underline" style="underline">
        <Tabs.Item title="Profile">
          <div>
            <h5 className='font-bold'>About</h5>
            <p>
              I'm a self-taught digital artist. My work revolves around creating character designs, environments and concepts.
              Thank you for visiting!
            </p>
          </div>
        </Tabs.Item>
        <Tabs.Item title="Commissions">
          
          {artist.id === user.currentUser.id &&<CommissionForm action="add"/>}
          <Commissions artistId={artist.id}/>
          
        </Tabs.Item>
        <Tabs.Item title="Terms and Agreement" >
          <div>
            <h5 className="font-bold">Terms and Conditions</h5>
            <p>
              By commissioning me in any kind of way, you are agreeing to the terms of service below
              Any statement can be bound to change if discussed with me, the artist, prior to the commission
            </p>
          </div>
        </Tabs.Item>
      </Tabs.Group>
      <Toaster position="top-center" reverseOrder={false}/>
    </div>
  )
}

export default Artists