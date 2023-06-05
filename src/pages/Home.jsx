import React from 'react'
import { NavLink } from 'react-router-dom'
import Navbars from '../components/Navbars'
const Home = () => {
  return (
    <>
      <div className="fixed top-0 z-50 w-full">
        <Navbars category="main"/>
      </div>
      <div className="pt-20"> 
        <section className="bg-white">
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
            <div className="flex flex-col justify-center">
                <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl">Get Started Selling Your First Art Commissions</h1>
                <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl">Connect your art with us and level up your commissions</p>
                <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                    <NavLink to="/register" className="inline-flex border justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary-950 hover:bg-primary-800 focus:ring-4 focus:ring-blue-300">
                        Get started
                        <svg aria-hidden="true" className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </NavLink>
                    <a href="#" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100">
                        Learn more
                    </a>  
                </div>
            </div>
            <div>
              <img className="mx-auto w-full h-64 rounded-lg sm:h-96 shadow-xl" src="/images/home.png"/>
            </div>
          </div>
        </section>  
      </div>
    </>
  )
}

export default Home