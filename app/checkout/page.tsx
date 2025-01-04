"use client";
import React, { useEffect, useState } from 'react'
import CartCal from '../cart/CartCal'
import { FaCircleCheck } from 'react-icons/fa6';
import useCartStore from '@/store/cartstore';

import Link from 'next/link';

const CheckoutPage = () => {





    interface minProduct {
        productId: string,
        qty: number
    }
    interface IOrder {
        user_id?: string;
        customerName: string;
        customerEmail: string;
        customerPhone: string;
        deliveryAddress: string;
        billingAddress: string;
        products: minProduct[];
        paymentStatus: string;
        payment_method: string;
    }

    interface IOrderWithIds extends IOrder { order_id: string; amount: number }

    const [data, setData] = useState<IOrder>({
        user_id: "",
        customerName: "",
        customerEmail: "",
        customerPhone: "",
        deliveryAddress: "",
        billingAddress: "",
        products: [],
        paymentStatus: "unpaid",
        payment_method: "cod",
    })


    const [isOrdered, setIsOrdered] = useState(false);
    const [orderdata, setOrderdata] = useState<IOrderWithIds>();
    const [loading, setLoading] = useState(false);
    const { clearCart, cart } = useCartStore();
    
    useEffect(() => {
        cart.map((item) => {
            setData({ ...data, products: [...data.products, { productId: item._id, qty: item.quantity }] });
        });
        if(localStorage.getItem('user_id')){
            setData({...data, user_id: localStorage.getItem('user_id') || ""});
        }
    }, [cart]);

    const handleOrder = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(cart.length <= 0){
            alert('Cart is empty');
            return;
        }
        try {
            setLoading(true)
            const res = await fetch(`/api/orders`, {
                method: "POST",
                body: JSON.stringify(data),
            })
            console.log(res, data);
            if (res.status == 201) {
                const data = await res.json();
                setOrderdata(data.data);
                if (data.user_id) {
                    localStorage.setItem('user_id', data.user_id);
                }
                clearCart();
                setIsOrdered(true);
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            console.log(error)
            alert("Failed to place order! Try Again")
        }
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }
    return (
        <>
            {!isOrdered && <div className='w-full p-10 md:px-40 gap-10 bg-white flex flex-col md:flex-row justify-between'>
                <div className='w-full md:w-2/3'>
                    <h1 className='text-3xl font-bold'>Checkout</h1>
                    <form onSubmit={handleOrder} className='mt-5'>
                        <div className='my-5'>
                            <label htmlFor='name' className='block mb-2'>Name</label>
                            <input type='text' id='name' name="customerName" className='border border-gray-400 p-2 rounded w-full' onChange={onChange} required value={data.customerName} />
                        </div>
                        <div className='my-5'>
                            <label htmlFor='email' className='block mb-2'>Email</label>
                            <input type='email' id='email' name="customerEmail" className='border border-gray-400 p-2 rounded w-full' onChange={(e) => onChange(e)} required value={data.customerEmail} />
                        </div>
                        <div className='my-5'>
                            <label htmlFor='phone' className='block mb-2'>Phone</label>
                            <input type='text' id='phone' name="customerPhone" className='border border-gray-400 p-2 rounded w-full' onChange={(e) => onChange(e)} required value={data.customerPhone} />
                        </div>
                        <div className='my-5'>
                            <label htmlFor='address' className='block mb-2'>Delivery Address</label>
                            <textarea id='address' name="deliveryAddress" className='border border-gray-400 p-2 rounded w-full' onChange={(e) => onChange(e)} required rows={4} value={data.deliveryAddress} />
                        </div>
                        <div className='my-5'>
                            <label htmlFor='address' className='block mb-2'>Billing Address</label>
                            <textarea id='address' name="billingAddress" className='border border-gray-400 p-2 rounded w-full' onChange={(e) => onChange(e)} required rows={4} value={data.billingAddress} />
                        </div>

                        <button type='submit' className='bg-blue-800 text-white p-2 w-full rounded mt-5 disabled:bg-gray-500 disabled:text-gray-900' disabled={cart.length <= 0 || loading}>{loading ? "Placing Order" : "Checkout"}</button>
                    </form>
                </div>
                <div className='w-full md:w-1/2'>
                    <CartCal isCheckout={true} />
                </div>
            </div>}
            {isOrdered && orderdata && <div className='w-full md:w-1/2 mx-auto p-5 md:p-10 md:px-20 gap-10 bg-white flex flex-col justify-center items-center'>
                <div className='w-full'>
                    <FaCircleCheck className='size-14 text-green-500 mx-auto my-3 mb-5' />
                    <h1 className='text-3xl text-center font-bold'>Order Placed Successfully</h1>
                    <p className='text-center text-xl'>Order Id: {orderdata.order_id}</p>
                    <p className='text-center'>Hi {orderdata.customerName} Your order has been placed successfully and will be delivered to your give address!</p>
                </div>
                <div className='w-full'>
                    <CartCal isCheckout={true} amount={orderdata.amount} />
                </div>
                <div className="flex -mt-10 justify-center items-center"><Link href={"/"} className='bg-blue-800 text-white p-2 w-full rounded mt-5 text-center'>Continue Shopping</Link>
                </div>
            </div>}
        </>
    )
}

export default CheckoutPage

