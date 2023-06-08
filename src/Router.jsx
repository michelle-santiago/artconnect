import React from "react"
import { BrowserRouter, Route,Routes } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import Message from "./pages/Messages/Messages"
import DirectMessages from "./pages/Messages/DirectMessages"
import CommissionMessages from "./pages/Messages/CommissionMessages"
import Main from "./pages/Main"
import Artists from "./pages/Artists"
import ArtistHome from "./pages/Artist/Home"
import ArtistCommissions from "./pages/Artist/Commissions"
import ArtistArtworks from "./pages/Artist/Artworks"
import ArtistAbout from "./pages/Artist/About"
import ArtistTerms from "./pages/Artist/Terms"
import Dashboard from "./pages/Dashboard/Dashboard"
import DashboardRequests from "./pages/Dashboard/Requests"
import DashboardCommissions from "./pages/Dashboard/Commissions"
import DashboardProcess  from "./pages/Dashboard/CommissionProcess"
import DashboardMessages from "./pages/Dashboard/Messages"
import actionCable from 'actioncable'

const CableApp = {}
CableApp.cable = actionCable.createConsumer('wss://artconnect.onrender.com/cable')

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register />} />
          
          <Route element={<Main />}>
            <Route path="/" element={<Home />}/>
            <Route path="message"> 
              <Route index element={<Message />} />
              <Route path="direct" element={<DirectMessages />} />
              <Route path="commission" element={<CommissionMessages />} />
            </Route>

            <Route path="dashboard" element={<Dashboard />}> 
                <Route path="requests" element={<DashboardRequests />} />
                <Route path="commissions" element={<DashboardCommissions />}/>
                <Route path="process" element={<DashboardProcess />} />
                <Route path="message" element={<DashboardMessages cable={CableApp.cable} />} />
            </Route>

            <Route path="/artists" element={<Artists />} />
            <Route path=":username">
              <Route index element={<ArtistHome />}/>
              <Route path="commissions" element={<ArtistCommissions />} /> 
              {/* for future feature */}
              {/* <Route path="artworks" element={<ArtistArtworks />} />  */}
              <Route path="about" element={<ArtistAbout />} /> 
              <Route path="terms" element={<ArtistTerms />} /> 
            </Route>
            <Route path="*" element={<Home/>}/>
          </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router