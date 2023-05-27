import React from 'react'
import { Navbar, Dropdown, Avatar } from 'flowbite-react'
const Header = () => {
  return (
  <Navbar fluid rounded>
    <Navbar.Brand href=''>
      <span className='self-center whitespace-nowrap text-xl font-semibold dark:text-white'>Artconnect</span>
    </Navbar.Brand>
    <div className='flex md:order-2'>
      <Dropdown inline arrowIcon={false} label={<Avatar alt='User settings' img='' rounded/>}>
        <Dropdown.Header>
          <span className='block text-sm'>
            Mishil
          </span>
          <span className='block truncate text-sm font-medium'>
            mishil@gmail.com
          </span>
        </Dropdown.Header>
        <Dropdown.Item>Dashboard</Dropdown.Item>
        <Dropdown.Item>Messages</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item>Sign out</Dropdown.Item>
      </Dropdown>
    </div>
  </Navbar>
  )
}

export default Header