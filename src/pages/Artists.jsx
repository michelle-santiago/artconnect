import React, { useContext, useState, useEffect } from 'react'
import { CurrentUserContext } from '../utils/providers/CurrentUserProvider'
import { getArtists } from '../api/api'
import toast, { Toaster } from 'react-hot-toast'
import { Card } from 'flowbite-react'
import { NavLink } from 'react-router-dom'
const Artists = () => {
  const { currentUser } = useContext(CurrentUserContext)
  const [artists, setArtists] = useState([])
  const user = { currentUser }
  
	useEffect(() => {
    getArtists(
      {"Authorization" : user.currentUser.token}
    ).then((res) => {
			setArtists(res.data);
		})
		.catch((err) => {
			toast.error(err.response.data.error)
		});
	}, []);

  return (
    <div className="px-20">
      <div className="py-10">
        <h2 className="text-4xl font-extrabold=">Artists open for commissions</h2>
        <p className="my-4 text-lg text-gray-500">Find the artist that connects with the art style of your choice. Visit their page to see what they offer</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
      { artists.map((artist,index) => {
        return (
          <div key={index}>
            <Card className="max-w-xs">
              <div className="flex flex-col items-center pb-10">
                { artist.avatar_url === null? 
                  <div className="relative w-24 h-24 overflow-hidden rounded-full bg-primary-50">
                    <svg className="absolute w-24 h-24 text-primary-500 -left-.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                  </div>
                  :
                  <img src={artist.avatar_url} className="w-24 h-24 mb-3 rounded-full shadow-lg"/>
                }
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{artist.first_name} {artist.last_name}</h5>
                <span className="text-sm text-gray-500">{artist.email}</span>
                <div className="flex mt-4 space-x-3 md:mt-6">
                  <NavLink className="inline-flex items-center px-4 py-2 text-sm bg-primary-950 text-center text-white font-bold font-sans" to={`/artists/${artist.id}`}>
                    Visit
                  </NavLink>
                  <NavLink className="inline-flex items-center border px-4 py-2 text-sm text-center text-primary-950 font-bold font-sans" to='/messages'>
                    Message
                  </NavLink>
                </div>
              </div>
            </Card>
          </div>
          )
        })}
      </div>
      <Toaster position="top-center" reverseOrder={false}/>
    </div>
  )
}

export default Artists