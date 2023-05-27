import React from 'react'
import { Navbar } from 'flowbite-react'
const Navbars = () => {
  return (
    <Navbar fluid rounded>
      <Navbar.Collapse>
        <Navbar.Link active href="/home">Home</Navbar.Link>
        <Navbar.Link href="/navbars">Artists</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navbars