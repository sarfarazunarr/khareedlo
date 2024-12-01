"use client";
import React, { useState } from 'react'
import CartCal from '../cart/CartCal'
import { FaCircleCheck } from 'react-icons/fa6';
import useCartStore from '@/store/cartstore';
import Link from 'next/link';

const CheckoutPage = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        address: "",
        phone: "",
    })
    const [orderId, setOrderId] = useState(0);
    const [isOrdered, setIsOrdered] = useState(false);
    const {clearCart} = useCartStore();
    const handleOrder = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsOrdered(true);
    }
    const onChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const confirmOrder = () => {
        const randomNumber = Math.floor(100000 + Math.random() * 900000);
        setOrderId(randomNumber);
        clearCart();
    }
    return (
        <>
            {!isOrdered && <div className='w-full p-10 md:px-40 gap-10 bg-white flex flex-col md:flex-row justify-between'>
                <div className='w-full md:w-2/3'>
                    <h1 className='text-3xl font-bold'>Checkout</h1>
                    <form onSubmit={handleOrder} className='mt-5'>
                        <div className='my-5'>
                            <label htmlFor='name' className='block mb-2'>Name</label>
                            <input type='text' id='name' name="name" className='border border-gray-400 p-2 rounded w-full' onChange={onChange} required value={data.name} />
                        </div>
                        <div className='my-5'>
                            <label htmlFor='email' className='block mb-2'>Email</label>
                            <input type='email' id='email' name="email" className='border border-gray-400 p-2 rounded w-full' onChange={(e) => onChange(e)} required value={data.email} />
                        </div>
                        <div className='my-5'>
                            <label htmlFor='address' className='block mb-2'>Address</label>
                            <textarea id='address' name="address" className='border border-gray-400 p-2 rounded w-full' onChange={(e) => onChange(e)} required rows={4} value={data.address} />
                        </div>
                        <div className='my-5'>
                            <label htmlFor='phone' className='block mb-2'>Phone</label>
                            <input type='text' id='phone' name="phone" className='border border-gray-400 p-2 rounded w-full' onChange={(e) => onChange(e)} required value={data.phone} />
                        </div>
                        <button type='submit' className='bg-blue-800 text-white p-2 w-full rounded mt-5'>Checkout</button>
                    </form>
                </div>
                <div className='w-full md:w-1/2'>
                    <CartCal isCheckout={true} />
                </div>
            </div>}
            {isOrdered && <div className='w-full md:w-1/2 mx-auto p-5 md:p-10 md:px-20 gap-10 bg-white flex flex-col justify-center items-center'>
                <div className='w-full'>
                    <FaCircleCheck  className='size-14 text-green-500 mx-auto my-3 mb-5' />
                    <h1 className='text-3xl text-center font-bold'>Order Placed Successfully</h1>
                    {orderId !== 0 && <p className='text-center text-xl'>Order Id: {orderId}</p>}
                    <p className='text-center'>Hi {data.name} Your order has been placed successfully and will be delivered to your give address!</p>
                </div>
                {orderId === 0 && <div className='w-full'>
                    <CartCal isCheckout={true} />
                </div>}
                <div className="flex -mt-10 justify-center items-center">
                    {orderId === 0 ? <button className='bg-blue-800 text-white p-2 w-full rounded mt-5' onClick={confirmOrder}>Confirm Order</button> : <Link href={"/"} className='bg-blue-800 text-white p-2 w-full rounded mt-5 text-center'>Continue Shopping</Link>}
                </div>
            </div>}
        </>
    )
}

export default CheckoutPage

