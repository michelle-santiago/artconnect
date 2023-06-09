import React, { useEffect, useContext, useState } from 'react'
import Navbars from '../../components/Navbars'
import { useParams } from 'react-router-dom'
import { CurrentUserContext } from '../../utils/providers/CurrentUserProvider'
import { getArtist, updateAbout  } from '../../api/api'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button, Card } from 'flowbite-react';
import toast, { Toaster } from 'react-hot-toast';
import ArticleSkeleton from '../../components/skeleton/Article'

const About = () => {
  const { username } = useParams();
  const { currentUser } = useContext(CurrentUserContext)
  const user = { currentUser }
  const [artist, setArtist] = useState({})
  const [artistAbout, setArtistAbout] = useState('');
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getArtist(
      {"Authorization" : user.currentUser.token}, username
    ).then((res) => {
      setIsLoading(false)
      setArtist(res.data);
      setArtistAbout(res.data.about)
    }).catch((err) => {
      toast.error("Something went wrong, reload the page")
    })

	}, []);

  const handleUpdate = () =>{
    toast.promise(
      updateAbout(
        {
          "Authorization" : user.currentUser.token,
          "Content-Type" : "multipart/form-data"
        },
        {
          about: artistAbout
        }).then(res => {
        }).catch(err => {
          let errors = err.response.data.errors
          if(errors.length > 1) {
            errors = errors.join("\n")	
          }
          throw errors
        }),
        {
          loading: "Updating About...",
          success: "Updated Successfully",
          error: (errors) => errors
        }
    )
  } 
  return (
    <>
      <div className="fixed top-0 z-50 w-full">
        <Navbars category="artist"/>
      </div>

      <div className="pt-20 px-10">
        <h1 className="text-center border-b p-2 mb-4 text-2xl font-extrabold tracking-tight leading-none text-gray-900 md:text-3xl lg:text-4xl">About</h1>
        { isLoading ? 
            <ArticleSkeleton/>
          :
          artist.id === user.currentUser.id ?
            <>
              <Button 
                className="mt-2 mb-2 text-xl font-semibold bg-primary-950 focus:ring-transparent hover:bg-white hover:border-solid hover:border-primary-950 hover:text-black"
                onClick={() => handleUpdate()}
              >
                Save
              </Button>
              <ReactQuill theme="snow" value={artistAbout} onChange={setArtistAbout} />
            </>
          :
            <Card>
              <ReactQuill
                value={artist.about}
                readOnly={true}
                theme={"bubble"}
              />    
            </Card>
        }
       
      
        
      <Toaster position="top-center" reverseOrder={false}/>
      </div>
    </>
  )
}

export default About