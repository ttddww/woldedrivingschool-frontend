import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar, { Footer } from './Navbar'

export default function Layout() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Navbar open={open} setOpen={setOpen} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
