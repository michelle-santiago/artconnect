import React from "react"
import { Navbar, Dropdown} from "flowbite-react"
import { NavLink } from "react-router-dom"

const Navbars = ({menuItems}) => {
  const menus = menuItems
  return (
  <Navbar fluid rounded>
     <div className="flex items-baseline">
      <Navbar.Brand href="" className="pr-10">
        <span className="block text-lg px-4 py-2 whitespace-nowrap text-3xl font-semibold tracking-widest">art<span className="text-secondary-500">connect</span></span>	
      </Navbar.Brand>
      <Navbar.Collapse>
        { menus.map((menu,index) => 
          <NavLink key={index} className="block text-primary-950 text-sm px-4 py-2 font-bold font-sans" to={menu.path}>
            {menu.name}
          </NavLink>
        )}
      </Navbar.Collapse>
    </div>
  
    <div className="flex md:order-2">
      <Dropdown inline arrowIcon={false} label={
        <div className="relative w-8 h-8 overflow-hidden rounded-full bg-primary-50">
          <svg className="absolute w-10 h-10 text-secondary-500 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
        </div>
      }>
        <Dropdown.Header>
          <span className="block text-sm">
            Mishil
          </span>
          <span className="block truncate text-sm font-medium">
            mishil@gmail.com
          </span>
        </Dropdown.Header>
        <Dropdown.Item>Dashboard</Dropdown.Item>
        <Dropdown.Item>Messages</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item>Sign out</Dropdown.Item>
      </Dropdown>
    </div>
  </Navbar>
  )
}

export default Navbars