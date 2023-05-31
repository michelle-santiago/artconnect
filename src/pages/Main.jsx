import React from "react";
import { Outlet, Navigate} from "react-router-dom";
import Navbars from "../components/Navbars";
import { mainMenu } from "../constants/mainMenu";
const Main = () => {
  const user = JSON.parse(sessionStorage.getItem("current_user"))
  const menuItems = mainMenu;
  return user? 
  <>
    <div className="fixed top-0 z-50 w-full">
      <Navbars menuItems={menuItems}/>
    </div>
    <div className="pt-20"> 
      <Outlet/> 
    </div>

  </>
  :
  <Navigate to="/login"/>
}

export default Main;