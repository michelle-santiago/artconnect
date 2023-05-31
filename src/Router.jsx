import React from "react"
import { BrowserRouter, Route,Routes } from "react-router-dom"
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Message from "./pages/Messages/Messages";
import DirectMessages from "./pages/Messages/DirectMessages";
import CommissionMessages from "./pages/Messages/CommissionMessages";
import Main from "./pages/Main";
import Artists from "./pages/Artists";
import Artist from "./pages/Artist/Artist";
import Dashboard from "./pages/Dashboard/Dashboard";
import DashboardRequests from "./pages/Dashboard/Requests";
import DashboardCommissions from "./pages/Dashboard/Commissions";
import DashboardProcess  from "./pages/Dashboard/CommissionProcess";
import Artworks from "./pages/Artworks";
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register />} />
          
          <Route element={<Main />}>
            <Route path="/" element={<Home />}/>
            <Route path="/artworks" element={<Artworks />} />
            <Route path="message"> 
              <Route index element={<Message />} />
              <Route path="direct" element={<DirectMessages />} />
              <Route path="commission" element={<CommissionMessages />} />
            </Route>

            <Route path="dashboard" element={<Dashboard />}> 
                <Route path="requests" element={<DashboardRequests />} />
                <Route path="commissions" element={<DashboardCommissions />}/>
                <Route path="process" element={<DashboardProcess />} />

            </Route>

            <Route path="/artists">
              <Route index element={<Artists />} />
              <Route path=":id"> 
                <Route index element={<Artist/>}/> 
              </Route>
            </Route> 
            <Route path="*" element={<Home/>}/>
          </Route>
            
      </Routes>
    </BrowserRouter>
  )
}

export default Router