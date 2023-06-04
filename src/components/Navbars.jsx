import {React, useContext} from "react"
import { Navbar, Dropdown} from "flowbite-react"
import { NavLink } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { CurrentUserContext } from "../utils/providers/CurrentUserProvider"
import { mainMenu } from "../constants/mainMenu"
import { artistMenu } from "../constants/artistMenu"
import { useParams } from "react-router-dom"

const Navbars = ({category}) => {
  const { currentUser } = useContext(CurrentUserContext)
  const { username } = useParams();
  let categoryData = { category }
  if (username === "home" || username === "artists" || username === undefined){
    categoryData = "main"
  } 
  let menus = categoryData === "main" ? mainMenu : artistMenu
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("current_user");
    navigate("/login");
  };

  return (
    <>
      <Navbar fluid rounded >
        <Navbar.Toggle />
        <div className="flex md:order-2 gap-2 ">
          <Dropdown inline arrowIcon={false} label={
            <div className="flex p-2">
              <div className="relative w-8 h-8 overflow-hidden rounded bg-primary-50">
                { currentUser.avatar === null? 
                  <svg className="absolute w-8 h-8 text-secondary-400 -left-.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                  :
                  <img src={currentUser.avatar} className="h-8 w-8"/>
                }
              </div>
            </div>
          }>
            <Dropdown.Header>
              <span className="block text-sm font-semibold">
                {currentUser.fullname.toUpperCase()}
              </span>
              <span className="block truncate text-sm font-medium">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item>
              <NavLink to={"/dashboard"}>Dashboard</NavLink>
            </Dropdown.Item>
            <Dropdown.Item>Messages</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
          </Dropdown>
        </div>
        <Navbar.Collapse>
          <NavLink className="block text-primary-950 px-2 font-bold tracking-wider text-2xl font-serif truncate" 
          to={`${categoryData === "main"? "/": "/"+username}`}
          >
            { categoryData === "main"?
              <span className="block text-primary-950 px-2 font-bold tracking-wider text-2xl font-serif">artconnect</span>	   
            :
              <span className="">{username}</span>	
            }
          
          </NavLink>
          { menus.map((menu,index) => 
            <NavLink key={index} className="block text-primary-950 text-sm px-4 py-2 font-semibold tracking-wider font-sans" 
            to={categoryData === "main" ? menu.path : "/"+username+menu.path}
            >
              {menu.name}
            </NavLink>
          )}
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default Navbars