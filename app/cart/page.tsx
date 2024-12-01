"use client";
import useCartStore from '@/store/cartstore';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { BiTrash } from 'react-icons/bi'
import CartCal from './CartCal';

const Cart = () => {
    const { cart, removeFromCart, clearCart, updateQuantity } = useCartStore();

    const onChange = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
        updateQuantity(id, Number(e.target.value));
    }
    return (
        <div className='w-full p-4 md:p-10 bg-white'>
            <h1 className='text-4xl font-semibold py-5'>Shopping Cart</h1>
            <div className="grid grid-cols-6 gap-3">
                <div className="cart_area col-span-full md:col-span-4 p-5 flex flex-col gap-2">
                    <table className='hidden md:block'>
                        <thead>
                            <tr className='font-semibold py-2 border-b border-gray-300 text-center'>
                                <td className='text-left' >Item</td>
                                <td>Price</td>
                                <td>Qty</td>
                                <td>Subtotal</td>
                                <td>Remove</td>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.length === 0 && <tr className='py-3 border-b border-gray-300'><td className='text-center py-5' colSpan={5}>Cart is empty</td></tr>}
                            {cart.length > 0 && cart.map((item, index) => (
                                <tr key={index} className='py-3 border-b border-gray-300'>
                                    <td className='flex items-center justify-start gap-3 h-auto py-2 w-96'><Image src={item.image} width={50} height={50} className='rounded-md' alt={item.title} /> <h1>{item.title}</h1></td>
                                    <td className='font-semibold mx-3'>{item.price}</td>
                                    <td><input type="number" className='px-3 w-20 py-2 bg-primary-100 rounded-md' min={1} value={item.quantity} onChange={(event) => onChange(item.id, event)} /></td>
                                    <td className='font-semibold mx-3'>{item.totalAmount}</td>
                                    <td className='font-semibold text-2xl text-red-500' onClick={() => removeFromCart(item.id)}><BiTrash className='hover:scale-110 cursor-pointer' /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className='md:hidden flex flex-col gap-2 justify-center items-center'>
                        {cart.length === 0 && <tr className='py-3 border-b border-gray-300'><td className='text-center py-5' colSpan={5}>Cart is empty</td></tr>}
                        {cart.length > 0 && cart.map((item, index) => (
                            <div key={index} className='w-full px-3 flex flex-col py-2 border border-gray-400 justify-center items-center'>
                                <Image src={item.image} width={200} height={200} alt={item.title} />
                                <h3 className='text-2xl font-semibold text-gray-900 py-2'>{item.title.slice(0, 18)}</h3>
                                <div className="grid w-full grid-cols-2 gap-2 items-center">
                                    <p className='font-semibold'>Price: {item.price}</p>
                                    <div className='flex justify-start items-center gap-2'><span>Qty</span><input type="number" className='px-3 w-20 py-2 bg-primary-100 rounded-md' min={1} value={item.quantity} onChange={(event) => onChange(item.id, event)} /> </div>
                                    <p>Sub Total: {item.totalAmount}</p>
                                    <p className='font-semibold text-2xl text-red-500 flex justify-center items-center gap-2' onClick={() => removeFromCart(item.id)}><BiTrash className='hover:scale-110 cursor-pointer' /> <span className='text-lg'>Delete</span></p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex flex-start gap-3 text-sm">
                            <Link href="/store"><button className='px-3 py-2 rounded-full bg-white text-gray-500 border border-gray-500'>Continue Shopping</button></Link>
                            <button className='px-3 py-2 rounded-full bg-black text-white' onClick={clearCart}>Clear Shopping Cart</button>
                        </div>
                    </div>
                </div>
                <CartCal />
            </div>
        </div>
    )
}

export default Cart
