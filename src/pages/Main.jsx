import React from 'react';
import { Outlet, Navigate} from 'react-router-dom';
import Navbars from '../components/Navbars';
import { mainMenu } from '../constants/mainMenu';
const Main = () => {
  const token = sessionStorage.getItem('token')
  const menuItems = mainMenu;
  return token ? 
  <>
    <Navbars menuItems={menuItems}/>
    <Outlet/> 
  </>
  :
  <Navigate to='/login'/>
}

export default Main;