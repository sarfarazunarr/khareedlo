"use client";
import useCartStore from '@/store/cartstore'
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { BiCart } from 'react-icons/bi'

const CartIcon = () => {
    const {cart} = useCartStore();
    const [cartLength, setCartLength] = useState(0);
    const [cartSidebar, setCartSidebar] = useState(false);

    useEffect(() => {
        setCartLength(cart.length);
    }, [cart]);

  return (
    <div className='relative mt-2'>
      <button onClick={() => setCartSidebar(!cartSidebar)} className=' text-blue-700 text-4xl'><BiCart />
        <span className='absolute top-[-10px] right-[-10px] bg-red-600 text-white text-xs px-2 rounded-full'>{cartLength}</span>
      </button>
      <div className={`absolute top-16 md:top-10 -right-20 md:right-0 w-[22rem] md:w-96 bg-white shadow-lg p-5 border border-gray-300 md:border-gray-500 md:rounded-md z-30 ${!cartSidebar ? 'hidden' : ''}`}>
        <h2 className='font-semibold text-2xl mb-5'>Your Cart</h2>
        <ul className='list-none mb-5'>
          {cart.length > 0 && cart.map((item) => (
            <li key={item.id} className='flex items-center justify-between py-2'>
              <div className='flex items-center gap-3'>
                <Image src={item.image} width={50} height={50} className='rounded-md' alt={item.title} />
                <h3 className='text-sm font-semibold'>{item.title}</h3>
              </div>
              <div className='flex items-center gap-3'>
                <p className='text-sm font-semibold'>${item.price}</p>
                <p className='text-sm font-semibold'>x{item.quantity}</p>
              </div>
            </li>
          ))}
          {cart.length <= 0 && <li className='py-4 text-center text-gray-600 text-xl'>Cart is Empty</li>}
        </ul>
        <div className='flex items-center justify-between'>
          <p className='text-sm font-semibold'>Subtotal</p>
          <p className='text-sm font-semibold'>${Number(cart.reduce((total, item) => total + item.totalAmount, 0)).toFixed(2)}</p>
        </div>
        <div className='flex items-center gap-4 justify-between'>
        <Link href={"/checkout"}><button className='w-full bg-blue-700 text-white py-2 px-4 rounded-md mt-5 text-center disabled:bg-gray-300 disabled:text-gray-700' onClick={() => setCartSidebar(false)} disabled={cart.length <= 0}>Checkout</button></Link>
        <Link href='/cart' className='w-full bg-black text-white py-2 px-4 rounded-md mt-5 text-center' onClick={() => setCartSidebar(false)}>View Cart</Link>
        </div>
      </div>
    </div>
  )
}

export default CartIcon

