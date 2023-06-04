import React, { useEffect, useContext, useState } from 'react'
import Navbars from '../../components/Navbars'
import { useParams, Navigate } from 'react-router-dom'
import { CurrentUserContext } from '../../utils/providers/CurrentUserProvider'
import { CommissionsContext } from '../../utils/providers/CommissionsProvider';
import { getArtist } from '../../api/api'
const Home = () => {
  const { username } = useParams();
  const { currentUser } = useContext(CurrentUserContext)
  const user = { currentUser }
  const [artist, setArtist] = useState({})
  const { setArtistInfo } = useContext(CommissionsContext)
  
  useEffect(() => {
    getArtist(
      {"Authorization" : user.currentUser.token}, username
    ).then((res) => {
			setArtist(res.data);
      setArtistInfo(res.data)
		})
		.catch((err) => {
			toast.error(err.response.data.error)
		});
	}, []);
  return (
    <>
      <div className="fixed top-0 z-50 w-full">
        <Navbars category="artist"/>
      </div>
      <div className="pt-20">
        <div className="flex justify-center p-5">
        <h1 className="flex items-center text-5xl font-extrabold">Commissions Open (2/{artist.max_slot})</h1>
        </div>
      
      </div>
    </>
  )
}

export default Home