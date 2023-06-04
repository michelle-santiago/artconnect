import React from "react"
import { Outlet, Navigate} from "react-router-dom"

const Main = () => {
  const user = JSON.parse(sessionStorage.getItem("current_user"))
  return user ? <Outlet/> : <Navigate to="/login"/>
}

export default Main;