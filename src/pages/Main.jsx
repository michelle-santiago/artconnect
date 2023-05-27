import React from 'react';
import { Outlet, Navigate} from 'react-router-dom';
import Header from '../components/Header';
const Main = () => {
  const token = sessionStorage.getItem('token')
  return token ? 
  <>
    <Header/>
    <Outlet/> 
  </>
  :
  <Navigate to='/login'/>
}

export default Main;