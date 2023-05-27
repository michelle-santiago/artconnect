import React from 'react'
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Message from './pages/Messages/Messages';
import Main from './pages/Main';
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register />} />
        
          <Route path='/' element={<Main />}>
            <Route path='/home' element={<Home />} />
            <Route path='/message' element={<Message />} />
          </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router