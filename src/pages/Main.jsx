import React from "react";
import { Outlet, Navigate} from "react-router-dom";
import Navbars from "../components/Navbars";
import { mainMenu } from "../constants/mainMenu";
const Main = () => {
  const user = JSON.parse(sessionStorage.getItem("current_user"))
  const menuItems = mainMenu;
  return user? 
  <>
    <Navbars menuItems={menuItems}/>
    <Outlet/> 
  </>
  :
  <Navigate to="/login"/>
}

export default Main;