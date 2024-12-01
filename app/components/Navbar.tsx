"use client";
import Link from 'next/link';
import React, { useState } from 'react'
import CartIcon from './CartIcon';

const Navbar = () => {
    const [open, setOpen] = useState(false);
    return (
        <div className='grid grid-cols-10 items-center p-5 px-2 z-10 relative lg:px-10 order-1 gap-10 md:gap-0'>
            <h2 className='text-4xl font-bold col-span-5 lg:col-span-2 select-none'>KahreedLo</h2>
            <ul className='hidden md:flex lg:col-span-6 col-span-10 order-3 lg:order-2 lg:flex flex-row items-start justify-center md:py-5 lg:py-0 gap-4'>
                <Link href={"/"} className='navLink'>Home</Link>
                <Link href={"/store"} className='navLink'>Store</Link>
                <Link href={"/category/jewelery"} className='navLink'>Jewelery</Link>
                <Link href={"/category/electronics"} className='navLink'>Electronics</Link>
                <Link href={"/category/men's%20clothing"} className='navLink'>Men Clothing</Link>
                <Link href={"/category/women's%20clothing"} className='navLink'>Women Clothing</Link>
            </ul>
            {/* Mobile Navbar */}
            <ul className={`col-span-10 md:hidden order-3 lg:order-2 items-start justify-center flex-col gap-4 bg-gray-300 absolute top-20 w-full px-10 py-5 ${open ? 'flex' : 'hidden'} transition-all duration-200`}>
                <Link href={"/"} className='w-full border-b border-gray-400 hover:bg-blue-900 block hover:text-white transition-all duration-200 p-2 hover:rounded-md' onClick={() => setOpen(false)}>Home</Link>
                <Link href={"/store"} className='w-full border-b border-gray-400 hover:bg-blue-900 block hover:text-white transition-all duration-200 p-2 hover:rounded-md' onClick={() => setOpen(false)}>Store</Link>
                <Link href={"/category/jewelery"} className='w-full border-b border-gray-400 hover:bg-blue-900 block hover:text-white transition-all duration-200 p-2 hover:rounded-md' onClick={() => setOpen(false)}>Jewelery</Link>
                <Link href={"/category/electronics"} className='w-full border-b border-gray-400 hover:bg-blue-900 block hover:text-white transition-all duration-200 p-2 hover:rounded-md' onClick={() => setOpen(false)}>Electronics</Link>
                <Link href={"/category/men's%20clothing"} className='w-full border-b border-gray-400 hover:bg-blue-900 block hover:text-white transition-all duration-200 p-2 hover:rounded-md' onClick={() => setOpen(false)}>Men Clothing</Link>
                <Link href={"/category/women's%20clothing"} className='w-full border-b border-gray-400 hover:bg-blue-900 block hover:text-white transition-all duration-200 p-2 hover:rounded-md' onClick={() => setOpen(false)}>Women Clothing</Link>
            </ul>
            <div className='flex col-span-5 order-2 lg:order-3 lg:col-span-2 justify-center gap-2'>
                <CartIcon />
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
