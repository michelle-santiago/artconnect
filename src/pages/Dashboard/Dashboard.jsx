import React, {useState} from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import Navbars from '../../components/Navbars'
const Dashboard = () => {
   const [open, setOpen] = useState(false);
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
                  Dashboard
               </h1>
           </div>
           <div className="pt-6">
             <NavLink to="" className="flex pt-2 rounded-md cursor-pointer hover:bg-light-white text-primary-950 text-sm items-center gap-x-4 bg-light-white">
               <button className="cursor-pointer duration-500">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                   <path fillRule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z" clipRule="evenodd" />
                   <path fillRule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zM6 12a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V12zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 15a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V15zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 18a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V18zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                 </svg>
               </button>
               <span className={`${!open && "hidden"} origin-left duration-200`}>
                 Requests
               </span>
             </NavLink>
             <NavLink to="commissions" className="flex pt-2 rounded-md cursor-pointer hover:bg-light-white text-primary-950 text-sm items-center gap-x-4 bg-light-white">
               <button className="cursor-pointer duration-500">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                   <path fillRule="evenodd" d="M20.599 1.5c-.376 0-.743.111-1.055.32l-5.08 3.385a18.747 18.747 0 00-3.471 2.987 10.04 10.04 0 014.815 4.815 18.748 18.748 0 002.987-3.472l3.386-5.079A1.902 1.902 0 0020.599 1.5zm-8.3 14.025a18.76 18.76 0 001.896-1.207 8.026 8.026 0 00-4.513-4.513A18.75 18.75 0 008.475 11.7l-.278.5a5.26 5.26 0 013.601 3.602l.502-.278zM6.75 13.5A3.75 3.75 0 003 17.25a1.5 1.5 0 01-1.601 1.497.75.75 0 00-.7 1.123 5.25 5.25 0 009.8-2.62 3.75 3.75 0 00-3.75-3.75z" clipRule="evenodd" />
                 </svg>
               </button>
               <span className={`${!open && "hidden"} origin-left duration-200`}>
                 Commissions
               </span>
             </NavLink>
           </div>
         </aside>
         <div className="p-7 h-[90%] overflow-y-scroll w-full">
           <Outlet/>
         </div>
       </div>
     </>
   )
}

export default Dashboard