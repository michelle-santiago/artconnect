import React from "react"
import { NavLink } from "react-router-dom"
import { Navbar} from "flowbite-react"

const Header = () => {
  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="" className="">
        <span className="block text-primary-950 px-2 font-bold tracking-wider text-2xl font-serif">artconnect</span>	
      </Navbar.Brand>
      <div className="flex md:order-2 gap-2">
          <NavLink className="block text-primary-950 text-sm px-4 py-2 font-bold font-sans" to='/login'>
            Sign in
          </NavLink>
          <NavLink className="block text-white bg-primary-950 text-sm px-4 py-2 font-bold font-sans" to='/register'>
            Sign up
          </NavLink>
      </div>
    </Navbar>
  )
}

export default Header