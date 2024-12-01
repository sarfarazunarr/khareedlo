"use client";
import useCartStore from '@/store/cartstore';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const CartCal = ({ isCheckout = false }: { isCheckout?: boolean }) => {
    const { cart } = useCartStore();
    const totalAmount = cart.reduce((total, item) => total + item.totalAmount, 0);
    const totalAmountFixed = Number(totalAmount.toFixed(2));
    const shipping = 13;
    const tax = Number(((totalAmount / 100) * 10).toFixed(2));
    const orderTotal = Number((totalAmount + shipping + tax).toFixed(2));
    return (
        <div className="summary col-span-full md:col-span-2 bg-primary-50 p-3 px-5 mx-2">
            {!isCheckout && <>
                <h3 className='text-3xl font-bold py-4'>Summary</h3>
                <p className='text-xl '>Estimate Shipping and Tax</p>
                <p className='text-sm text-gray-800 pt-2 '>Enter your destination to get a shipping estimate.</p>
                <p className='text-xl py-5'>Apply Discount Code</p>
                <div className="flex flex-col border-b border-gray-400 pb-4 w-full">
                    <label htmlFor="discount" className='text-sm font-semibold text-black'>Enter Discount Code</label>
                    <input type="text" className='p-3 rounded-md bg-white border border-gray-500 placeholder:text-gray-600' placeholder='Enter Discount Code' />
                    <button className='bg-transparent border border-primary-700 py-3 my-2 rounded-full text-primary-700'>Apply Coupon Code</button>
                </div>
            </>}
            {isCheckout &&
                <>
                <h3 className='text-3xl font-bold py-4'>Products</h3>

                    <div className='flex flex-col gap-2'>
                        {cart.map((item, index) => (
                            <div key={index} className="flex justify-between items-center bg-blue-950 rounded-md p-2">
                            <div className='flex justify-start gap-2 items-center'>
                            <Image src={item.image} width={75} height={75} alt={item.title} className='object-contain' />
                            <Link href={`/products/${item.id}`} title={item.title} className='text-lg font-semibold text-white'>{item.title.length > 18 ? item.title.slice(0, 18) + '...' : item.title}</Link>
                            </div>
                            <p className='text-gray-200'>{item.quantity} x {item.price}</p>
                        </div>
                        ))}
                        
                    </div>
                </>
            }
            <div className="flex justify-between pt-4 items-center font-semibold text-sm">
                <h3>Subtotal</h3>
                <h3>${totalAmountFixed}</h3>
            </div>
            <div className="flex justify-between pt-4 items-center font-semibold text-sm">
                <h3>Shipping</h3>
                <h3>${shipping}</h3>
            </div>
            <div className="flex justify-between pt-4 items-center font-semibold text-sm">
                <h3>GST (10%)</h3>
                <h3>${tax}</h3>
            </div>
            <div className="flex justify-between pt-4 items-center font-semibold text-sm">
                <h3>Order Total</h3>
                <h3 className='text-lg'>${orderTotal}</h3>
            </div>

            {(!isCheckout && cart.length > 0) && <><Link href={"/checkout"}><button className='font-semibold my-1.5 mt-3 text-white bg-primary-600 w-full py-3 rounded-full'>Proceed to Checkout</button></Link>
                <button className='font-semibold my-1.5 text-white bg-green-600 w-full py-3 rounded-full'>Checkout with 1Link</button></>}
        </div>
    )
}

export default CartCal
