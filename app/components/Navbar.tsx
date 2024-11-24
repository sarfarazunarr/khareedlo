"use client";
import React, { useState } from 'react'

const Navbar = () => {
    const [open, setOpen] = useState(false);
    return (
        <div className='grid grid-cols-10 items-center p-5 px-2 z-10 relative lg:px-10 order-1 gap-10 md:gap-0'>
            <h2 className='text-4xl font-bold col-span-5 lg:col-span-2 select-none'>KahreedLo</h2>
            <ul className='hidden md:flex lg:col-span-6 col-span-10 order-3 lg:order-2 lg:flex flex-row items-start justify-center md:py-5 lg:py-0 gap-4'>
                <li className='navLink'>Home</li>
                <li className='navLink'>Store</li>
                <li className='navLink'>Categories</li>
                <li className='navLink'>Offers</li>
                <li className='navLink'>About</li>
                <li className='navLink'>Contact</li>
            </ul>
            {/* Mobile Navbar */}
            <ul className={`col-span-10 md:hidden order-3 lg:order-2 items-start justify-center flex-col gap-4 bg-gray-300 absolute top-20 w-full px-10 py-5 ${open ? 'flex' : 'hidden'} transition-all duration-200`}>
                <li className='navLink2'>Home</li>
                <li className='navLink2'>Store</li>
                <li className='navLink2'>Categories</li>
                <li className='navLink2'>Offers</li>
                <li className='navLink2'>About</li>
                <li className='navLink2'>Contact</li>
            </ul>
            <div className='flex col-span-5 order-2 lg:order-3 lg:col-span-2 justify-center gap-2'>
                <button className='py-3 px-5 col-span-3 text-white bg-primary-700 rounded-md hover:bg-primary-950 transition-colors duration-200'>Login</button>
                <button className='py-3 hidden md:block px-5 col-span-2 text-primary-700 border border-primary-700 bg-white rounded-md hover:bg-primary-950 hover:text-white transition-colors duration-200'>Signup</button>
                <div className={`w-8 md:hidden flex flex-col justify-center gap-1 ${open ? 'cross' : ''}`} onClick={() => setOpen(!open)}>
                    <div className="w-full h-1 bg-gray-700 transition-transform duration-500 ease-in-out"></div>
                    <div className="w-full h-1 bg-gray-700 transition-transform duration-500 ease-in-out"></div>
                    <div className="w-full h-1 bg-gray-700 transition-transform duration-500 ease-in-out"></div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
