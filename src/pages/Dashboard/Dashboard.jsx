import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'
const Dashboard = () => {
  return (
    <>
      <div className="pt-8">
				<button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="fixed top-20 left-4 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
					<span className="sr-only">Open sidebar</span>
					<svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
							<path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
					</svg>
				</button>
      </div>

      <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 " aria-label="Sidebar">
         <div className="h-full px-3 pb-4 overflow-y-auto bg-white ">
            <ul className="space-y-2 font-medium">
               <li>
                  <NavLink to="requests" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100">
                     <span className="ml-3">Requests</span>
                  </NavLink>
									<NavLink to="commissions" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100">
                     <span className="ml-3">Commissions</span>
                  </NavLink>
               </li>
            </ul>
         </div>
      </aside>

      <div className="p-4 sm:ml-64">
         <div className="rounded-lg">
						<Outlet/>
         </div>
      </div>


    </>
  )
}

export default Dashboard