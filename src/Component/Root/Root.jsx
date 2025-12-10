import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../Share/Navbar'

export default function RootLayout() {
  return (
    <div>
      <Navbar/>
      <Outlet></Outlet>
    </div>
  )
}
