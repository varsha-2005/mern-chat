import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
const Layout = () => {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
