import React from 'react'
import { NavLink } from 'react-router-dom';
const Home = () => {


  return (
    <>  
       <div>Home</div>
       <NavLink  to="/message"  className="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 text-slate-900 ring-1 ring-slate-900/10 hover:ring-slate-900/20">
          Message
      </NavLink>
    </>
  )
}

export default Home