import React, { useState } from 'react'
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi'
import SideMenu from './SideMenu';
import '../../index.css'

const Navbar = ({ activeMenu }) => {

  const [openSideMenu, setOpenSideMenu] = useState(false);
  return (
    <div className='flex gap-5 border bg-white border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30'>
      <button
        className='block lg:hidden text-black'
        onClick={() => {
          setOpenSideMenu(!openSideMenu)
        }}
      >
        {openSideMenu ? (
          <HiOutlineX className='text-2xl' />
        ) : (
          <HiOutlineMenu className='text-2xl' />
        )}
      </button>

      <h2 className="text-lg font-medium text-black relative animate-glitch">
        <span className="absolute left-0 top-0 text-purple-600 clip-path-glitch">Expense Tracker</span>
        <span className="absolute left-0 top-0 text-blue-600 clip-path-glitch2">Expense Tracker</span>
        Expense Tracker
      </h2>


      {openSideMenu && (
        <div className='fixed top-[61px] -ml-4 bg-white'>
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  )
}

export default Navbar
