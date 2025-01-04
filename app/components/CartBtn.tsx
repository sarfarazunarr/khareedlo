"use client";
import React, { useState } from 'react'
import { RiShoppingCartFill } from 'react-icons/ri'
import { CartProduct, ProductCardType } from '@/types/ProductCard'
import useCartStore from '@/store/cartstore'
import { CiCircleCheck } from 'react-icons/ci';

const CartBtn = ({ cartBtn, data }: { cartBtn: boolean, data: ProductCardType }) => {
    const { addToCart } = useCartStore();
    const [isInCart, setIsInCart] = useState(false);
    const handleAddToCart = () => {
        const { id, _id, title, image, price } = data;
        const cartItem: CartProduct = {
            id, _id, title, image, price, quantity: 1, totalAmount: price
        }
        addToCart(cartItem);
        setIsInCart(true);
    }

    return (
        <>
            {cartBtn && <button className='px-3 py-2 rounded-full border-[#0156FF] text-[#0156FF] border-2 hover:bg-[#0156FF] text-sm md:text-lg mx-1 md:mx-4 mb-2 hover:text-white transition-colors duration-300 font-semibold flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:text-gray-700 disabled:border-transparent' disabled={isInCart} onClick={ handleAddToCart} >
                {isInCart ? <CiCircleCheck /> : <RiShoppingCartFill className='text-xl' />} {isInCart ? "Added in Cart" : "Add to cart"}
            </button>
            }
        </>
    )
}

export default CartBtn
